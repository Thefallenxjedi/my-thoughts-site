// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCr2Gxi-3qskoWywEZ3jzDViCHJgvJ0v-w",
  authDomain: "blue-38fae.firebaseapp.com",
  projectId: "blue-38fae",
  storageBucket: "blue-38fae.firebasestorage.app",
  messagingSenderId: "317686667558",
  appId: "1:317686667558:web:d08c3f8c8bbd048ead09e7",
  measurementId: "G-1LC7WND8Y4"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// If on index.html → load thoughts
if (document.getElementById("thoughts")) {
  db.collection("thoughts").orderBy("date", "desc").onSnapshot(snapshot => {
    const container = document.getElementById("thoughts");
    container.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      container.innerHTML += `
        <div class="thought">
          <h2>${data.title}</h2>
          <p>${data.text}</p>
          <div class="date">${new Date(data.date.seconds * 1000).toLocaleString()}</div>
        </div>
      `;
    });
  });
}

// If on admin.html → handle form submit
if (document.getElementById("thoughtForm")) {
  document.getElementById("thoughtForm").addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;

    await db.collection("thoughts").add({
      title,
      text,
      date: new Date()
    });

    document.getElementById("status").innerText = "Saved!";
    document.getElementById("thoughtForm").reset();
  });
}

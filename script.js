// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr2Gxi-3qskoWywEZ3jzDViCHJgvJ0v-w",
  authDomain: "blue-38fae.firebaseapp.com",
  projectId: "blue-38fae",
  storageBucket: "blue-38fae.firebasestorage.app",
  messagingSenderId: "317686667558",
  appId: "1:317686667558:web:d08c3f8c8bbd048ead09e7",
  measurementId: "G-1LC7WND8Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// If we're on admin.html — allow adding new thoughts
if (document.title === "Admin") {
  document.getElementById("thoughtForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = document.getElementById("thoughtInput").value;
    if (text.trim() === "") return;
    await addDoc(collection(db, "thoughts"), {
      text: text,
      date: new Date()
    });
    document.getElementById("thoughtInput").value = "";
    alert("Thought added!");
  });
}

// If we're on index.html — display all thoughts
if (document.title === "My Thoughts") {
  async function loadThoughts() {
    const q = query(collection(db, "thoughts"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const container = document.getElementById("thoughts");
    container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      container.innerHTML += `
        <div class="thought">
          <div>${data.text}</div>
          <div class="date">${new Date(data.date.seconds * 1000).toLocaleString()}</div>
        </div>
      `;
    });
  }
  loadThoughts();
}

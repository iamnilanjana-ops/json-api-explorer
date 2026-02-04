// ============================
// JSON API Explorer - script.js
// ============================

// Select elements
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const message = document.getElementById("message");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 1️⃣ Fetch and display posts (GET)
async function loadPosts() {
  postList.innerHTML = "";
  message.textContent = "Loading posts...";
  message.style.color = "black";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    message.textContent = "";

    // Show only first 10 posts
    posts.slice(0, 10).forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
      `;
      postList.appendChild(postDiv);
    });

  } catch (error) {
    message.textContent = "Error loading posts.";
    message.style.color = "red";
    console.error(error);
  }
}

// Load posts on page load
loadPosts();

// 2️⃣ Handle form submission (POST)
postForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  message.textContent = "Submitting post...";
  message.style.color = "black";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    if (!response.ok) {
      throw new Error("Failed to submit post");
    }

    const data = await response.json();

    message.textContent = "Post submitted successfully!";
    message.style.color = "green";
    postForm.reset();

    // Add new post to UI immediately
    const newPostDiv = document.createElement("div");
    newPostDiv.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <hr />
    `;
    postList.prepend(newPostDiv);

  } catch (error) {
    message.textContent = "Error submitting post.";
    message.style.color = "red";
    console.error(error);
  }
});

// ============================
// JSON API Explorer - script.js
// ============================

// Select elements
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const message = document.getElementById("message");

// 1️⃣ Fetch and display posts
function loadPosts() {
  postList.innerHTML = "Loading posts...";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    })
    .then(posts => {
      postList.innerHTML = "";
      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <hr />
        `;
        postList.appendChild(postDiv);
      });
    })
    .catch(error => {
      postList.innerHTML = "Error loading posts.";
      console.error(error);
    });
}

// Load posts on page load
loadPosts();

// 2️⃣ Handle form submission (POST new post)
postForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  message.textContent = "Submitting...";

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId: 1 })
  })
  .then(response => response.json())
  .then(data => {
    message.textContent = "Post submitted successfully!";
    postForm.reset();
    console.log("Response:", data);
    loadPosts(); // Reload posts (optional)
  })
  .catch(error => {
    message.textContent = "Error submitting post.";
    console.error(error);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("posts.json")
    .then((response) => response.json())
    .then((posts) => {
      const list = document.getElementById("post-list")
      list.innerHTML = posts
        .map(
          (post) =>
            ` <li> <span class="post-date">${post.date}</span> <a href="${post.url}">${post.title}</a> ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")} </li> `,
        )
        .join("")
    })
})

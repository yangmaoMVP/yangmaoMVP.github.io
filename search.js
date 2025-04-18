document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form")
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")
  let articlesCache = null
  async function loadArticles() {
    if (articlesCache) return articlesCache
    const res = await fetch("posts.json")
    if (!res.ok) return []
    const posts = await res.json()
    articlesCache = posts.map((p) => ({ ...p, content: "" }))
    return articlesCache
  }
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const query = searchInput.value.trim().toLowerCase()
    if (query.length < 2) {
      searchResults.innerHTML = "<p>请输入至少2个字符进行搜索</p>"
      return
    }
    const articles = await loadArticles()
    const results = articles.filter(
      (a) => a.title.toLowerCase().includes(query) || a.tags.some((t) => t.toLowerCase().includes(query)),
    )
    if (results.length === 0) {
      searchResults.innerHTML = "<p>未找到匹配的结果，请尝试其他关键词</p>"
      return
    }
    searchResults.innerHTML =
      '<ul class="post-list">' +
      results
        .map(
          (r) =>
            ` <li> <a href="${r.url}">${r.title}</a> <div>${r.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div> </li>`,
        )
        .join("") +
      "</ul>"
  })
})

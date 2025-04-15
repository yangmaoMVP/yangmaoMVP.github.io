
document.addEventListener('DOMContentLoaded', function () {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      const list = document.getElementById('post-list');
      list.innerHTML = posts.map(post => `
        <li class="fade-in">
          <span class="post-date">${post.date}</span>
          <a href="${post.url}">${post.title}</a>
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </li>
      `).join('');
    });

  // 滚动进度条
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const percent = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;
    progressBar.style.width = percent + '%';
  });
});

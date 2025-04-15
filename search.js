// 简单站内搜索脚本
document.addEventListener('DOMContentLoaded', function() {
	// 获取搜索表单和输入框
	const searchForm = document.getElementById('search-form');
	const searchInput = document.getElementById('search-input');
	const searchResults = document.getElementById('search-results');
	
	// 文章数据 - 您可以手动添加或通过脚本生成
	const articles = [
		{ title: "开源阅读", url: "post1.html", tags: ["工具软件", "阅读", "Android", "iOS"], content: "开源阅读是一款功能强大的电子书阅读器应用，支持多种格式，并允许添加自定义书源..." },
		{ title: "巨魔商店(Trollstore)", url: "post2.html", tags: ["工具软件", "iOS", "应用安装"], content: "巨魔商店是一款iOS平台上的第三方应用安装工具，它允许用户在不越狱的情况下安装未经Apple官方认证的应用程序..." },
		{ title: "小火箭Shadowrocket", url: "post3.html", tags: ["工具软件", "网络", "iOS", "Android"], content: "Shadowrocket，俗称"小火箭"，是一款功能强大的网络工具应用，最初为iOS平台设计，现也有安卓平台的版本..." },
		{ title: "虚拟定位", url: "post4.html", tags: ["工具软件", "定位", "iOS", "Android"], content: "虚拟定位是一类能够修改设备GPS位置信息的软件工具，让您的手机或平板在各种基于位置的应用中显示为您设定的位置..." },
		{ title: "大学资料", url: "post5.html", tags: ["学习资源", "大学", "四六级", "考研"], content: "本文为广大大学生精选了丰富的学习资源，包括速成课程、四六级备考资料、考研复习材料等..." },
		{ title: "简历模板", url: "post6.html", tags: ["学习资源", "职场", "求职", "简历"], content: "一份专业、精美的简历是求职过程中的重要敲门砖。无论是应届毕业生还是职场老手，都需要一份能够突出自身优势、符合行业标准的简历..." }
	];
	
	if (searchForm) {
		searchForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const query = searchInput.value.toLowerCase().trim();
			
			if (query.length < 2) {
				searchResults.innerHTML = '<p>请输入至少2个字符进行搜索</p>';
				return;
			}
			
			// 执行搜索
			const results = articles.filter(article => {
				return article.title.toLowerCase().includes(query) || 
					   article.content.toLowerCase().includes(query) ||
					   article.tags.some(tag => tag.toLowerCase().includes(query));
			});
			
			// 显示结果
			if (results.length > 0) {
				let html = '<ul class="post-list">';
				results.forEach(result => {
					html += `
						<li>
							<a href="${result.url}">${result.title}</a>
							<div>
								${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
							</div>
							<p>${result.content.substring(0, 100)}...</p>
						</li>
					`;
				});
				html += '</ul>';
				searchResults.innerHTML = html;
			} else {
				searchResults.innerHTML = '<p>未找到匹配的结果，请尝试其他关键词</p>';
			}
		});
	}
});
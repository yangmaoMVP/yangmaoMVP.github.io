document.addEventListener('DOMContentLoaded', function() {
	// 检查本地存储的主题偏好
	const savedTheme = localStorage.getItem('theme') || 'light';
	applyTheme(savedTheme);
	
	// 创建主题切换按钮
	const themeToggle = document.createElement('button');
	themeToggle.className = 'theme-toggle';
	themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
	themeToggle.title = savedTheme === 'dark' ? '切换到亮色模式' : '切换到深色模式';
	themeToggle.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.8);
		border: none;
		cursor: pointer;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1001;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	`;
	document.body.appendChild(themeToggle);
	
	// 切换主题
	themeToggle.addEventListener('click', function() {
		const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		applyTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
		themeToggle.title = newTheme === 'dark' ? '切换到亮色模式' : '切换到深色模式';
	});
	
	// 应用主题
	function applyTheme(theme) {
		if (theme === 'dark') {
			document.body.classList.add('dark-theme');
			addDarkStyles();
		} else {
			document.body.classList.remove('dark-theme');
			removeDarkStyles();
		}
	}
	
	// 添加深色样式
	function addDarkStyles() {
		const darkStyles = document.createElement('style');
		darkStyles.id = 'dark-theme-styles';
		darkStyles.textContent = `
			body.dark-theme {
				background: linear-gradient(135deg, #1a1f2c 0%, #2d3748 100%);
				color: #e2e8f0;
			}
			
			body.dark-theme .bg-glow {
				background: radial-gradient(circle, #364156 0%, #252f3d66 70%, transparent 100%);
			}
			
			body.dark-theme .card {
				background: rgba(26, 32, 44, 0.95);
				box-shadow: 0 4px 26px rgba(0, 0, 0, 0.2);
			}
			
			body.dark-theme header h1 {
				text-shadow: 0 2px 12px #1a365daa;
			}
			
			body.dark-theme header p {
				color: #a0aec0;
			}
			
			body.dark-theme .top-nav {
				background: rgba(26, 32, 44, 0.8);
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
			}
			
			body.dark-theme .top-nav .site-title {
				color: #63b3ed;
			}
			
			body.dark-theme a {
				color: #63b3ed;
			}
			
			body.dark-theme a:hover {
				color: #4fd1c5;
			}
			
			body.dark-theme .post-list li {
				background: rgba(26, 32, 44, 0.3);
			}
			
			body.dark-theme .post-list li:hover {
				background: rgba(44, 82, 130, 0.3);
			}
			
			body.dark-theme .tag {
				background: linear-gradient(90deg, #2c5282 10%, #553c9a 90%);
				color: #e2e8f0;
			}
			
			body.dark-theme h2 {
				color: #63b3ed;
				border-bottom: 1px solid #2d3748;
			}
			
			body.dark-theme h3 {
				color: #4fd1c5;
			}
			
			body.dark-theme footer {
				background: rgba(26, 32, 44, 0.8);
				color: #a0aec0;
			}
			
			body.dark-theme .related-posts, 
			body.dark-theme .comments {
				background: #2d3748;
			}
		`;
		document.head.appendChild(darkStyles);
	}
	
	// 移除深色样式
	function removeDarkStyles() {
		const darkStyles = document.getElementById('dark-theme-styles');
		if (darkStyles) {
			darkStyles.remove();
		}
	}
});
document.addEventListener('DOMContentLoaded', function() {
	// 添加回到顶部按钮
	const backToTopButton = document.createElement('div');
	backToTopButton.innerHTML = '<i>↑</i>';
	backToTopButton.className = 'back-to-top';
	backToTopButton.style.cssText = `
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: 40px;
		height: 40px;
		background: linear-gradient(90deg, #36d1c4 50%, #5b86e5 95%);
		color: white;
		border-radius: 50%;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.3s;
		z-index: 1000;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	`;
	document.body.appendChild(backToTopButton);
	
	// 滚动到页面底部20%时显示按钮
	window.addEventListener('scroll', function() {
		if (window.scrollY > window.innerHeight * 0.2) {
			backToTopButton.style.opacity = '1';
		} else {
			backToTopButton.style.opacity = '0';
		}
	});
	
	// 点击按钮回到顶部
	backToTopButton.addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
	
	// 图片延迟加载
	document.querySelectorAll('img[data-src]').forEach(img => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					img.src = img.dataset.src;
					observer.disconnect();
				}
			});
		});
		observer.observe(img);
	});
	
	// 添加响应式导航栏
	const nav = document.querySelector('.top-nav');
	if (nav) {
		const mobileMenuButton = document.createElement('button');
		mobileMenuButton.className = 'mobile-menu-button';
		mobileMenuButton.innerHTML = '☰';
		mobileMenuButton.style.cssText = `
			display: none;
			background: none;
			border: none;
			font-size: 24px;
			cursor: pointer;
			color: #327ed8;
		`;
		
		const navLinks = nav.querySelector('ul');
		nav.insertBefore(mobileMenuButton, navLinks);
		
		// 移动端菜单点击事件
		mobileMenuButton.addEventListener('click', function() {
			navLinks.classList.toggle('show-mobile-menu');
		});
		
		// 媒体查询处理
		const mediaQuery = window.matchMedia('(max-width: 600px)');
		
		function handleScreenChange(e) {
			if (e.matches) {
				mobileMenuButton.style.display = 'block';
				navLinks.style.cssText = `
					position: absolute;
					top: 100%;
					left: 0;
					right: 0;
					background: white;
					flex-direction: column;
					padding: 10px;
					display: none;
					border-radius: 0 0 15px 15px;
					box-shadow: 0 5px 10px rgba(0,0,0,0.1);
				`;
				navLinks.classList.add('mobile-menu');
			} else {
				mobileMenuButton.style.display = 'none';
				navLinks.style = '';
				navLinks.classList.remove('mobile-menu', 'show-mobile-menu');
			}
		}
		
		mediaQuery.addListener(handleScreenChange);
		handleScreenChange(mediaQuery);
		
		// 添加显示样式
		const style = document.createElement('style');
		style.innerHTML = `
			.show-mobile-menu {
				display: flex !important;
			}
		`;
		document.head.appendChild(style);
	}
});
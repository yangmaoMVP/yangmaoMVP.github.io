document.addEventListener('DOMContentLoaded', function() { const backToTopButton = document.createElement('div'); backToTopButton.innerHTML = '<i>↑</i>'; backToTopButton.className = 'back-to-top'; backToTopButton.style.cssText = ` position: fixed; bottom: 30px; right: 30px; width: 40px; height: 40px; background: linear-gradient(90deg, #36d1c4 50%, #5b86e5 95%); color: white; border-radius: 50%; text-align: center; line-height: 40px; cursor: pointer; opacity: 0; transition: opacity 0.3s; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1); `; document.body.appendChild(backToTopButton); window.addEventListener('scroll', function() { if (window.scrollY > window.innerHeight * 0.2) { backToTopButton.style.opacity = '1'; } else { backToTopButton.style.opacity = '0'; } }); backToTopButton.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); }); document.querySelectorAll('img[data-src]').forEach(img => { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { img.src = img.dataset.src; observer.disconnect(); } }); }); observer.observe(img); }); const nav = document.querySelector('.top-nav'); if (nav) { const mobileMenuButton = document.createElement('button'); mobileMenuButton.className = 'mobile-menu-button'; mobileMenuButton.innerHTML = '☰'; mobileMenuButton.style.cssText = ` display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: #327ed8; `; const navLinks = nav.querySelector('ul'); nav.insertBefore(mobileMenuButton, navLinks); mobileMenuButton.addEventListener('click', function() { navLinks.classList.toggle('show-mobile-menu'); }); const mediaQuery = window.matchMedia('(max-width: 600px)'); function handleScreenChange(e) { if (e.matches) { mobileMenuButton.style.display = 'block'; navLinks.style.cssText = ` position: absolute; top: 100%; left: 0; right: 0; background: white; flex-direction: column; padding: 10px; display: none; border-radius: 0 0 15px 15px; box-shadow: 0 5px 10px rgba(0,0,0,0.1); `; navLinks.classList.add('mobile-menu'); } else { mobileMenuButton.style.display = 'none'; navLinks.style = ''; navLinks.classList.remove('mobile-menu', 'show-mobile-menu'); } } mediaQuery.addListener(handleScreenChange); handleScreenChange(mediaQuery); const style = document.createElement('style'); style.innerHTML = ` .show-mobile-menu { display: flex !important; } `; document.head.appendChild(style); } }); window.addEventListener("DOMContentLoaded", () => { const canvas = document.getElementById("fuzzy-title"); if (!canvas) return; const text = canvas.dataset.text || "极客科技GeekTech"; const ctx = canvas.getContext("2d"); const fontSize = 64; const fontWeight = 900; const fontFamily = "sans-serif"; const color = "#ffffff"; const baseIntensity = 0.18; const hoverIntensity = 0.5; const fuzzRange = 30; canvas.style.display = "block"; canvas.style.margin = "0 auto"; const offscreen = document.createElement("canvas"); const offCtx = offscreen.getContext("2d"); ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`; const metrics = ctx.measureText(text); const ascent = metrics.actualBoundingBoxAscent || fontSize; const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2; const width = Math.ceil(metrics.width); const height = Math.ceil(ascent + descent); offscreen.width = width; offscreen.height = height; offCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`; offCtx.textBaseline = "alphabetic"; offCtx.fillStyle = color; offCtx.fillText(text, 0, ascent); canvas.width = width + 100; canvas.height = height + 20; ctx.translate(50, 10); let isHovering = false; const draw = () => { ctx.clearRect(-fuzzRange, -fuzzRange, canvas.width, canvas.height); const intensity = isHovering ? hoverIntensity : baseIntensity; for (let y = 0; y < height; y++) { const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange); ctx.drawImage(offscreen, 0, y, width, 1, dx, y, width, 1); } requestAnimationFrame(draw); }; draw(); const isInBounds = (x, y) => { const rect = canvas.getBoundingClientRect(); return ( x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom ); }; canvas.addEventListener("mousemove", (e) => { isHovering = isInBounds(e.clientX, e.clientY); }); canvas.addEventListener("mouseleave", () => { isHovering = false; }); canvas.addEventListener("touchmove", (e) => { const touch = e.touches[0]; if (touch) { isHovering = isInBounds(touch.clientX, touch.clientY); } }); canvas.addEventListener("touchend", () => { isHovering = false; }); }); window.addEventListener("scroll", () => { document.querySelectorAll(".scroll-reveal").forEach(el => { const rect = el.getBoundingClientRect(); if (rect.top < window.innerHeight - 50) { el.classList.add("revealed"); } }); }); const backToTopBtn = document.getElementById("backToTop"); window.addEventListener("scroll", () => { if (window.scrollY > 300) { backToTopBtn.style.display = "block"; } else { backToTopBtn.style.display = "none"; } }); backToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); }); 
// placeholder for future shared functions


// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.createElement("button");
    toggle.className = "dark-mode-toggle";
    toggle.innerText = "🌓";
    document.body.appendChild(toggle);

    const setDark = (enable) => {
        if (enable) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    // Load theme
    if (localStorage.getItem("theme") === "dark") {
        setDark(true);
    }

    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark");
        setDark(!isDark);
    });
});

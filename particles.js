
// Particle Background + Mouse Follow Effect
document.addEventListener("DOMContentLoaded", function() {
  const bg = document.getElementById("particles-bg");
  if (!bg) return;

  bg.style.position = "absolute";
  bg.style.top = "0";
  bg.style.left = "0";
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.style.zIndex = "-1";
  bg.style.overflow = "hidden";
  bg.style.pointerEvents = "none";

  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.left = `${Math.random() * 100}%`;
    bg.appendChild(dot);
  }

  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".dot").forEach(dot => {
      const speed = 0.02 + Math.random() * 0.05;
      const x = (e.clientX / window.innerWidth - 0.5) * speed * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * speed * 100;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});

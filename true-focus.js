
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("true-focus");
  if (!container) return;

  const words = container.dataset.words.split(" ");
  const blurAmount = 5;
  const animationDuration = 2000; // in ms
  const pauseDuration = 1000; // in ms

  let currentIndex = -1;
  let wordElements = [];

  // 初始化元素
  container.innerHTML = "";
  container.style.display = "flex";
  container.style.gap = "1em";
  container.style.flexWrap = "wrap";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.position = "relative";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "focus-word";
    span.style.transition = "filter 0.3s ease";
    span.style.fontSize = "3rem";
    span.style.fontWeight = "900";
    span.style.filter = `blur(${blurAmount}px)`;
    container.appendChild(span);
    wordElements.push(span);
  });

  const focusFrame = document.createElement("div");
  focusFrame.className = "focus-frame";
  focusFrame.innerHTML = \`
    <span class="corner top-left"></span>
    <span class="corner top-right"></span>
    <span class="corner bottom-left"></span>
    <span class="corner bottom-right"></span>
  \`;
  container.appendChild(focusFrame);

  const updateFocus = () => {
    currentIndex = (currentIndex + 1) % wordElements.length;
    wordElements.forEach((el, idx) => {
      el.style.filter = idx === currentIndex ? "blur(0px)" : \`blur(\${blurAmount}px)\`;
    });

    const active = wordElements[currentIndex];
    const rect = active.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    const x = active.offsetLeft;
    const y = active.offsetTop;

    focusFrame.style.position = "absolute";
    focusFrame.style.left = x + "px";
    focusFrame.style.top = y + "px";
    focusFrame.style.width = active.offsetWidth + "px";
    focusFrame.style.height = active.offsetHeight + "px";
    focusFrame.style.opacity = 1;
  };

  updateFocus();
  setInterval(updateFocus, animationDuration + pauseDuration);
});

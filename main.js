document.addEventListener("DOMContentLoaded", () => {
  // Page loader
  const pageLoader = document.querySelector(".page-loader")
  if (pageLoader) {
    window.addEventListener("load", () => {
      pageLoader.classList.add("loaded")
      setTimeout(() => {
        pageLoader.style.display = "none"
      }, 500)
    })
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })
  }

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Scroll reveal animation
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal")

  if (scrollRevealElements.length > 0) {
    const revealOnScroll = () => {
      scrollRevealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementTop < windowHeight - 100) {
          element.classList.add("revealed")
        }
      })
    }

    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Check on initial load
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const emailInput = newsletterForm.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email) {
        // Show success message
        const formContainer = newsletterForm.parentElement
        newsletterForm.style.display = "none"

        const successMessage = document.createElement("div")
        successMessage.className = "newsletter-success fade-in"
        successMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent); margin-bottom: 1rem;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>感谢您的订阅！</h3>
          <p>我们将定期向您发送最新的科技资讯和资源。</p>
        `

        formContainer.appendChild(successMessage)

        // In a real implementation, you would send the email to your server here
        console.log("Newsletter subscription:", email)
      }
    })
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Update URL without page jump
        history.pushState(null, null, targetId)
      }
    })
  })

  // Lazy loading images
  const lazyImages = document.querySelectorAll("img[data-src]")

  if (lazyImages.length > 0 && "IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
      img.removeAttribute("data-src")
    })
  }

  // Add active class to current navigation link
  const currentPath = window.location.pathname
  const navItems = document.querySelectorAll(".nav-links a")

  navItems.forEach((item) => {
    const itemPath = item.getAttribute("href")

    if (currentPath.endsWith(itemPath) || (currentPath === "/" && itemPath === "index.html")) {
      item.classList.add("active")
    }
  })

  // Estimated reading time
  const articleContent = document.querySelector("article")
  const readTimeElement = document.querySelector(".read-time")

  if (articleContent && readTimeElement) {
    const text = articleContent.textContent
    const wordCount = text.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute

    readTimeElement.textContent = `${readingTime} 分钟阅读`
  }
})

// Progressive enhancement for search functionality
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-input")

if (searchForm && searchInput) {
  // Add clear button to search input
  const clearButton = document.createElement("button")
  clearButton.type = "button"
  clearButton.className = "search-clear"
  clearButton.innerHTML = "&times;"
  clearButton.style.display = "none"
  clearButton.style.position = "absolute"
  clearButton.style.right = "60px"
  clearButton.style.top = "50%"
  clearButton.style.transform = "translateY(-50%)"
  clearButton.style.background = "none"
  clearButton.style.border = "none"
  clearButton.style.color = "var(--text-secondary)"
  clearButton.style.fontSize = "1.5rem"
  clearButton.style.cursor = "pointer"

  searchForm.style.position = "relative"
  searchForm.appendChild(clearButton)

  // Show/hide clear button based on input
  searchInput.addEventListener("input", () => {
    clearButton.style.display = searchInput.value ? "block" : "none"
  })

  // Clear input when button is clicked
  clearButton.addEventListener("click", () => {
    searchInput.value = ""
    clearButton.style.display = "none"
    searchInput.focus()
  })

  // Add search suggestions (in a real implementation, this would fetch from your backend)
  const createSearchSuggestions = () => {
    const suggestionsContainer = document.createElement("div")
    suggestionsContainer.className = "search-suggestions"
    suggestionsContainer.style.position = "absolute"
    suggestionsContainer.style.top = "100%"
    suggestionsContainer.style.left = "0"
    suggestionsContainer.style.right = "0"
    suggestionsContainer.style.background = "var(--surface)"
    suggestionsContainer.style.borderRadius = "0 0 var(--radius) var(--radius)"
    suggestionsContainer.style.boxShadow = "var(--shadow)"
    suggestionsContainer.style.zIndex = "10"
    suggestionsContainer.style.maxHeight = "300px"
    suggestionsContainer.style.overflowY = "auto"
    suggestionsContainer.style.display = "none"

    searchForm.appendChild(suggestionsContainer)

    return suggestionsContainer
  }

  const suggestionsContainer = createSearchSuggestions()

  // Sample suggestions (in a real implementation, this would be dynamic)
  const sampleSuggestions = [
    { text: "开源阅读", url: "post1.html" },
    { text: "巨魔商店", url: "post2.html" },
    { text: "小火箭Shadowrocket", url: "post3.html" },
    { text: "虚拟定位", url: "post4.html" },
    { text: "大学资料", url: "post5.html" },
    { text: "简历模板", url: "post6.html" },
  ]

  searchInput.addEventListener("focus", () => {
    if (searchInput.value) {
      showSuggestions()
    }
  })

  searchInput.addEventListener("input", () => {
    showSuggestions()
  })

  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
      suggestionsContainer.style.display = "none"
    }
  })

  function showSuggestions() {
    const query = searchInput.value.toLowerCase().trim()

    if (!query) {
      suggestionsContainer.style.display = "none"
      return
    }

    const filteredSuggestions = sampleSuggestions.filter((suggestion) => suggestion.text.toLowerCase().includes(query))

    if (filteredSuggestions.length === 0) {
      suggestionsContainer.style.display = "none"
      return
    }

    suggestionsContainer.innerHTML = ""

    filteredSuggestions.forEach((suggestion) => {
      const item = document.createElement("a")
      item.href = suggestion.url
      item.className = "search-suggestion-item"
      item.style.display = "block"
      item.style.padding = "0.75rem 1rem"
      item.style.color = "var(--text)"
      item.style.borderBottom = "1px solid var(--surface-2)"
      item.style.transition = "background-color 0.2s ease"

      item.innerHTML = suggestion.text.replace(
        new RegExp(query, "gi"),
        (match) => `<strong style="color: var(--accent)">${match}</strong>`,
      )

      item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = "var(--surface-2)"
      })

      item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "transparent"
      })

      suggestionsContainer.appendChild(item)
    })

    suggestionsContainer.style.display = "block"
  }
}

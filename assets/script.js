// Theme detection and toggle
function setTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

// Set initial theme
setTheme();

// Listen for theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(13, 13, 13, 0.95)";
    header.style.boxShadow = "0 2px 20px var(--shadow)";
  } else {
    header.style.background = "var(--bg-primary)";
    header.style.boxShadow = "none";
  }
});

// Add entrance animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");
const mobileOverlay = document.querySelector(".mobile-overlay");
const navLinksItems = document.querySelectorAll(".nav-links a");

function toggleMobileMenu() {
  if (mobileMenu && navLinks && mobileOverlay) {
    mobileMenu.classList.toggle("active");
    navLinks.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "auto";
  }
}

function closeMobileMenu() {
  if (mobileMenu && navLinks && mobileOverlay) {
    mobileMenu.classList.remove("active");
    navLinks.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", toggleMobileMenu);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeMobileMenu);
}

// Close mobile menu when clicking on nav links
if (navLinksItems.length > 0) {
  navLinksItems.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Copy contract address functionality
const addressText = document.querySelector(".address-text");
if (addressText) {
  addressText.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(addressText.textContent);
        const originalText = addressText.textContent;
        addressText.textContent = "Copied to clipboard! ✅";
        addressText.style.color = "var(--primary-gold)";
        setTimeout(() => {
          addressText.textContent = originalText;
          addressText.style.color = "var(--text-primary)";
        }, 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = addressText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        const originalText = addressText.textContent;
        addressText.textContent = "Copied to clipboard! ✅";
        addressText.style.color = "var(--primary-gold)";
        setTimeout(() => {
          addressText.textContent = originalText;
          addressText.style.color = "var(--text-primary)";
        }, 2000);
      }
    } catch (err) {
      console.log("Copy failed, feature not supported in this browser");
      // Show visual feedback that copy attempt was made
      const originalText = addressText.textContent;
      addressText.textContent = "Select text to copy manually";
      addressText.style.color = "var(--accent-gold)";
      setTimeout(() => {
        addressText.textContent = originalText;
        addressText.style.color = "var(--text-primary)";
      }, 3000);
    }
  });

  addressText.style.cursor = "pointer";
  addressText.title = "Click to copy contract address";
}

// Function to handle the audio playback and overlay removal
function handleUserInteraction() {
  const audio = document.getElementById("sound");
  const overlay = document.getElementById("enter-overlay");
  if (audio) {
    audio
      .play()
      .then(() => {
        console.log("Audio started successfully.");
        if (overlay) {
          overlay.classList.add("hidden");
          setTimeout(() => {
            overlay.remove();
          }, 1000); // Wait for the fade-out transition
        }
      })
      .catch((e) => {
        console.log("Audio playback was blocked:", e);
        if (overlay) {
          // If audio is still blocked, hide the overlay anyway
          overlay.classList.add("hidden");
          setTimeout(() => {
            overlay.remove();
          }, 1000);
        }
      });
  } else {
    if (overlay) {
      overlay.classList.add("hidden");
      setTimeout(() => {
        overlay.remove();
      }, 1000);
    }
  }
}

// Add the event listener to the "Enter" button
document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enter-button");
  if (enterButton) {
    enterButton.addEventListener("click", handleUserInteraction);
  }
});

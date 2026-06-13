/* =========================
   THEME TOGGLE
========================= */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    }
});

/* Load Saved Theme */
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        const icon = themeToggle.querySelector("i");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
});

/* =========================
   MOBILE MENU & SCROLL
========================= */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

/* Back to Top Button */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* =========================
   SCROLL ANIMATION
========================= */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.classList.add("fade-in");
    observer.observe(section);
});

/* =========================
   ACTIVE NAV LINK
========================= */
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }
    });
});

/* =========================
   GITHUB API
========================= */
async function loadGitHubStats() {
    try {
        const response = await fetch("https://api.github.com/users/SahimSha");
        const data = await response.json();

        document.getElementById("gh-repos").innerText = data.public_repos !== undefined ? data.public_repos : '--';
        document.getElementById("gh-followers").innerText = data.followers !== undefined ? data.followers : '--';
    }
    catch (error) {
        document.getElementById("gh-repos").innerText = "Error";
        document.getElementById("gh-followers").innerText = "Error";
        console.error("Unable to load GitHub stats", error);
    }
}
loadGitHubStats();

/* =========================
   LEETCODE STATS API
========================= */
async function loadLeetCodeStats() {
    try {
        const response = await fetch("https://leetcode-stats.tashif.codes/SahimSha");
        const data = await response.json();

        if(data.status === "success") {
            document.getElementById("leetcode-stats-container").innerHTML = `
                <p><strong>Total Solved:</strong> ${data.totalSolved}</p>
                <p>
                    <strong style="color: #10B981;">Easy:</strong> ${data.easySolved} | 
                    <strong style="color: #F59E0B;">Med:</strong> ${data.mediumSolved} | 
                    <strong style="color: #EF4444;">Hard:</strong> ${data.hardSolved}
                </p>
            `;
        } else {
            document.getElementById("leetcode-stats-container").innerHTML = "<p>LeetCode profile not found</p>";
        }
    }
    catch(error) {
        document.getElementById("leetcode-stats-container").innerHTML = "<p>Unable to load LeetCode stats</p>";
        console.error(error);
    }
}
loadLeetCodeStats();

/* =========================
   CONTACT FORM
========================= */
const contactForm = document.querySelector(".contact-form");

if(contactForm){
    contactForm.addEventListener("submit", (e) => {
        // We do NOT use preventDefault() here anymore.
        // We let the form actually submit to formsubmit.co naturally!
    });
}

/* =========================
   TYPEWRITER EFFECT (NEW)
========================= */
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["a Full Stack Developer", "an Aspiring Software Engineer", "a Cybersecurity Enthusiast"];
const typingDelay = 100;    // Medium speed for typing each letter
const erasingDelay = 50;    // Speed of backspacing
const newTextDelay = 3000;  // Pause time before it starts erasing (Slowed down)
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});
// 1. Dark / light theme toggle (remembers the choice)
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (e) { /* storage may be unavailable */ }
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// 2. Mobile navigation menu
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// 3. Project filter buttons
const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const show = filter === "all" || project.dataset.category === filter;
      project.classList.toggle("hidden", !show);
    });
  });
});

// 4. Contact form validation
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [form.name, form.email, form.message];
  fields.forEach((f) => f.classList.remove("invalid"));
  statusMessage.className = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = "";

  if (!form.name.value.trim()) {
    error = "Please enter your name.";
    form.name.classList.add("invalid");
  } else if (!emailPattern.test(form.email.value.trim())) {
    error = "Please enter a valid email address.";
    form.email.classList.add("invalid");
  } else if (form.message.value.trim().length < 10) {
    error = "Your message should be at least 10 characters.";
    form.message.classList.add("invalid");
  }

  if (error) {
    statusMessage.textContent = error;
    statusMessage.classList.add("error");
    return;
  }

  statusMessage.textContent = "Thanks, " + form.name.value.trim() + "! Your message is ready to send.";
  statusMessage.classList.add("success");
  form.reset();
});

// 5. Footer year
document.getElementById("year").textContent = new Date().getFullYear();

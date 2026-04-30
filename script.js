document.documentElement.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const supportForm = document.querySelector(".message-card");

if (supportForm) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(supportForm);
    const subject = encodeURIComponent(`[Lakeview Lister] ${data.get("topic") || "Support request"}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Topic: ${data.get("topic") || ""}`,
      "",
      data.get("message") || "",
    ].join("\n"));
    window.location.href = `mailto:support@lakeviewlister.com?subject=${subject}&body=${body}`;
  });
}

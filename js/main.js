document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("section, .card, img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
});

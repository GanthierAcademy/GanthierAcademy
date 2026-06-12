document.addEventListener("DOMContentLoaded", function () {

  const elements = document.querySelectorAll("section, .card, .grid-3 img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

});

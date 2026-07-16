if (window.innerWidth > 600) {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const bg = document.querySelector("#global-bg");
    if (!bg) return;

    cards.forEach((card) => {
      const bloom = card.dataset.bloom;
      if (!bloom) return;

      // Preload bloom images; quoted url() needed for paths with @ (e.g. air@2x.jpg)
      const preload = new Image();
      preload.src = bloom;

      card.addEventListener("mouseenter", () => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;

        bg.style.backgroundImage = `url("${bloom}")`;
        bg.style.top = `${centerY - (window.innerHeight * 0.75) / 2}px`;
        bg.style.left = `${centerX - (window.innerWidth * 0.75) / 2}px`;
        bg.style.opacity = "1";
      });

      card.addEventListener("mouseleave", () => {
        bg.style.opacity = "0";
      });
    });
  });
}

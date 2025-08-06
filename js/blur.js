if (window.innerWidth > 600) {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    const bg = document.querySelector('#global-bg');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;

        bg.style.backgroundImage = `url(${card.dataset.bloom})`;
        bg.style.top = `${centerY - (window.innerHeight * 0.75) / 2}px`;
        bg.style.left = `${centerX - (window.innerWidth * 0.75) / 2}px`;
        bg.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        bg.style.opacity = '0';
      });
    });
  });
}

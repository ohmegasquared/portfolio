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


//grain texture
const grainCanvas = document.getElementById('grain-canvas');
const ctx = grainCanvas.getContext('2d');

grainCanvas.width = window.innerWidth;
grainCanvas.height = window.innerHeight;

function generateNoise(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const idata = ctx.createImageData(w, h);
  const buffer32 = new Uint32Array(idata.data.buffer);
  const len = buffer32.length;

  for (let i = 0; i < len; i++) {
    if (Math.random() < 0.5) {
      buffer32[i] = 0xff000000;
    }
  }

  ctx.putImageData(idata, 0, 0);
}

function loop() {
  generateNoise(ctx);
  requestAnimationFrame(loop);
}

loop();

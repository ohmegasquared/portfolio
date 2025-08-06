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

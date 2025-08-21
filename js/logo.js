(function initTickers(){
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.logo-ticker').forEach(ticker => {
    const track = ticker.querySelector('.logo-track');
    if (!track) return;

    // Ensure duplicated sequence (A + A) once
    const items = Array.from(track.children);
    const half = items.length / 2;
    const duplicated = half && items.slice(0, half).map(n => n.outerHTML).join('') ===
                               items.slice(half).map(n => n.outerHTML).join('');
    if (!duplicated) track.append(...items.map(n => n.cloneNode(true)));

    const base = parseFloat(getComputedStyle(ticker).getPropertyValue('--speed-ms')) || 35000;

    const build = () => {
      track.getAnimations().forEach(a => a.cancel());
      if (reduceMotion) return; // honor OS setting
      const anim = track.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
        { duration: base, iterations: Infinity, easing: 'linear' }
      );
      const SLOW = 0.35;
      ticker.onmouseenter = () => { anim.playbackRate = SLOW; };
      ticker.onmouseleave = () => { anim.playbackRate = 1;    };

      // Pause when offscreen (saves CPU)
      const io = new IntersectionObserver(([e]) => {
        if (!e) return;
        e.isIntersecting ? anim.play() : anim.pause();
      }, { root: null, threshold: 0 });
      io.observe(ticker);

      // Rebuild once after load (fonts/layout shifts)
      window.addEventListener('load', () => {
        track.getAnimations().forEach(a => a.cancel());
        initTickers(); // simple rebuild; safe because of duplication guard
      }, { once: true });
    };

    build();
  });
})();

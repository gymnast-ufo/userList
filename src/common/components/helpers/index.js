const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const isTablet = () => window.matchMedia('(max-width: 991px)').matches;
const scrollTo = (elem, duration = 300) => {
  let start = null;
  let { top } = elem.getBoundingClientRect();
  let w = window.pageYOffset;
  let V = Math.abs(duration / top);
  
  const step = time => {
    if (start === null) start = time;

    let progress = time - start;
    let r = (top < 0 ? Math.max(w - progress / V, w + top) : Math.min(w + progress / V, w + top));
    
    window.scrollTo(0, r);

    if (r != w + top) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
};

export { isMobile, isTablet, scrollTo };
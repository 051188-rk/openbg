// Simple scroll reveal utility
export function scrollReveal(selector, className = 'reveal') {
  const revealElements = document.querySelectorAll(selector);
  const revealOnScroll = () => {
    for (const el of revealElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add(className);
      }
    }
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
  return () => window.removeEventListener('scroll', revealOnScroll);
}

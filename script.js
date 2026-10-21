document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.getElementById('motion-toggle');
let motionOff = reducedMotion.matches;
try { motionOff = motionOff || localStorage.getItem('portfolio-motion') === 'off'; } catch (_) {}
const animations = new Set();
function applyMotionPreference() {
  const disabled = motionOff || reducedMotion.matches;
  document.documentElement.dataset.motion = disabled ? 'off' : 'on';
  motionButton.setAttribute('aria-pressed', String(disabled));
  motionButton.textContent = disabled ? 'Motion: off' : 'Motion: on';
  if (disabled) { animations.forEach(a => a.cancel()); animations.clear(); }
}
motionButton.hidden = false;
motionButton.addEventListener('click', () => {
  motionOff = !motionOff;
  try { localStorage.setItem('portfolio-motion', motionOff ? 'off' : 'on'); } catch (_) {}
  applyMotionPreference();
});
reducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();
// Content remains visible without JS or animation support. Animate only as it enters view.
if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (document.documentElement.dataset.motion === 'off') return;
      const siblings = [...entry.target.parentElement.children].filter(el => el.matches('.reveal'));
      const delay = Math.min(Math.max(siblings.indexOf(entry.target), 0) * 75, 225);
      const animation = entry.target.animate([
        { opacity: 0, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, delay, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .publication-card, .certification-card').forEach(el => observer.observe(el));
}
const progress = document.getElementById('reading-progress');
let framePending = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0) + ')';
  framePending = false;
}
window.addEventListener('scroll', () => {
  if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

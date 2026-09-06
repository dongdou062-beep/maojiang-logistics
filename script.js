document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');
  if (window.lucide) window.lucide.createIcons();

  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const body = document.body;

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    body.classList.toggle('menu-open', open);
    toggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}" aria-hidden="true"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', '打开菜单');
    body.classList.remove('menu-open');
    if (toggle) {
      toggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const form = document.querySelector('[data-contact-form]');
  const note = document.querySelector('[data-form-note]');
  const toast = document.querySelector('[data-toast]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    if (!name) return;
    note.textContent = '信息已记录，我们会在工作时间内与您联系。';
    note.style.color = 'var(--lime)';
    toast.textContent = `谢谢您，${name}。运输需求已收到。`;
    toast.classList.add('show');
    form.reset();
    window.setTimeout(() => toast.classList.remove('show'), 3600);
  });
});

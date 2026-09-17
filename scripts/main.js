const menuToggle = document.getElementById('menuToggle');
const siteMenu = document.getElementById('siteMenu');
if (menuToggle && siteMenu) {
  const header = menuToggle.closest('.site-header');
  const backdrop = document.createElement('button');
  backdrop.type = 'button';
  backdrop.className = 'nav-backdrop';
  backdrop.setAttribute('aria-label', 'إغلاق القائمة');
  document.body.prepend(backdrop);
  const closeMenu = () => {
    siteMenu.classList.remove('open');
    backdrop.classList.remove('open');
    header?.classList.remove('menu-open');
    document.body.classList.remove('nav-is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    siteMenu.classList.add('open');
    backdrop.classList.add('open');
    header?.classList.add('menu-open');
    document.body.classList.add('nav-is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  };
  menuToggle.addEventListener('click', () => {
    siteMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  siteMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const reveals = document.querySelectorAll('.reveal');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
}

const form = document.getElementById('leadForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const get = (key) => (data.get(key) || '').toString().trim();
    const lines = [
      'أرغب في ترتيب اجتماع تشخيص مع نهر لبرنامج تمكين الذكاء الاصطناعي.',
      '',
      `اسم الجهة: ${get('org')}`,
      `القطاع: ${get('sector')}`,
      `اسم المسؤول: ${get('name')}`,
      `المسمى الوظيفي: ${get('title') || '-'}`,
      `رقم الجوال: ${get('phone')}`,
      `البريد: ${get('email') || '-'}`,
      `عدد الموظفين: ${get('employees')}`,
      `الفئة المستهدفة: ${get('levels')}`,
      `التحدي الحالي: ${get('challenge')}`,
      `طريقة التنفيذ المفضلة: ${get('format')}`,
      `الجدول الزمني: ${get('timeline')}`,
      `ملاحظات إضافية: ${get('meeting') || '-'}`
    ];
    const url = `https://wa.me/966541356286?text=${encodeURIComponent(lines.join('\n'))}`;
    note.innerHTML = `تم تجهيز رسالة التشخيص. راجعها قبل الإرسال: <a href="${url}" target="_blank" rel="noopener">فتح واتساب</a>`;
    window.open(url, '_blank', 'noopener');
  });
}


const courseForm = document.getElementById('courseForm');
const courseNote = document.getElementById('courseFormNote');
if (courseForm) {
  courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(courseForm);
    const get = (key) => (data.get(key) || '').toString().trim();
    const lines = [
      'أرغب في التسجيل في ورشة التقرير الأخير بسعر 999 ريال.',
      '',
      `الاسم: ${get('name')}`,
      `رقم الجوال: ${get('phone')}`,
      `البريد: ${get('email') || '-'}`,
      `نوع التقرير: ${get('reportType')}`,
      `التقرير الذي يستهلك وقتي: ${get('challenge')}`,
      `مستوى الأتمتة المطلوب: ${get('automation')}`,
      `موعد البدء: ${get('timeline')}`
    ];
    const url = `https://wa.me/966541356286?text=${encodeURIComponent(lines.join('\n'))}`;
    courseNote.innerHTML = `تم تجهيز رسالة التسجيل. راجعها قبل الإرسال: <a href="${url}" target="_blank" rel="noopener">فتح واتساب</a>`;
    window.open(url, '_blank', 'noopener');
  });
}


const reportTrack = document.getElementById('reportTrack');
const reportCurrent = document.getElementById('reportSlideCurrent');
if (reportTrack && reportCurrent) {
  const slides = Array.from(reportTrack.querySelectorAll('.audit-slide'));
  const updateReportCount = () => {
    const index = Math.round(reportTrack.scrollLeft / Math.max(1, reportTrack.clientWidth)) + 1;
    reportCurrent.textContent = String(Math.min(slides.length, Math.max(1, index)));
  };
  const moveReport = (dir) => reportTrack.scrollBy({ left: dir * reportTrack.clientWidth, behavior: 'smooth' });
  document.querySelector('[data-report-prev]')?.addEventListener('click', () => moveReport(-1));
  document.querySelector('[data-report-next]')?.addEventListener('click', () => moveReport(1));
  reportTrack.addEventListener('scroll', () => window.requestAnimationFrame(updateReportCount), { passive: true });
  updateReportCount();
}

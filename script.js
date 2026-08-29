const form = document.getElementById('leadForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const summary = `طلب اجتماع تشخيص احتياج - نهر\n\nالجهة: ${data.org}\nالقطاع: ${data.sector}\nالمسؤول: ${data.name}\nالمسمى: ${data.title || '-'}\nالجوال: ${data.phone}\nالإيميل: ${data.email}\nعدد الموظفين: ${data.employees}\nالفئة المستهدفة: ${data.levels}\nالتحدي: ${data.challenge}\nطريقة التنفيذ: ${data.format}\nوقت البدء: ${data.timeline}\nوقت التواصل المناسب: ${data.meeting || '-'}`;
  note.innerHTML = `تم تجهيز ملخص الطلب. انسخه للفريق أو اربطه لاحقًا مع Google Sheets/CRM:<br><textarea readonly class="summary-box">${summary}</textarea>`;
  note.scrollIntoView({behavior:'smooth', block:'center'});
});
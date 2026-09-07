const form = document.getElementById('leadForm');
const note = document.getElementById('formNote');
const whatsappNumber = '966541356286';

function field(data, key, fallback = '-') {
  const value = (data[key] || '').trim();
  return value || fallback;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const summary = `طلب اجتماع تشخيص - نهر\n\nالجهة: ${field(data, 'org')}\nالقطاع: ${field(data, 'sector')}\nالمسؤول: ${field(data, 'name')}\nالمسمى: ${field(data, 'title')}\nالجوال: ${field(data, 'phone')}\nالإيميل: ${field(data, 'email')}\nعدد الموظفين: ${field(data, 'employees')}\nالفئة المستهدفة: ${field(data, 'levels')}\nالتحدي: ${field(data, 'challenge')}\nطريقة التنفيذ: ${field(data, 'format')}\nوقت البدء: ${field(data, 'timeline')}\nملاحظات: ${field(data, 'meeting')}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`;
  note.innerHTML = `تم تجهيز رسالة واتساب. راجعها ثم أرسلها:<br><textarea readonly class="summary-box">${summary}</textarea><br><a class="btn primary" href="${url}" target="_blank" rel="noopener">فتح الرسالة في واتساب</a>`;
  note.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const form = document.getElementById('leadForm');
const note = document.getElementById('formNote');
const whatsappNumber = '966541356286';

function val(data, key) {
  return (data[key] || '').trim() || '-';
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const summary = `طلب اجتماع تشخيص - نهر\n\nالجهة: ${val(data, 'org')}\nالقطاع: ${val(data, 'sector')}\nالمسؤول: ${val(data, 'name')}\nالجوال: ${val(data, 'phone')}\nالتحدي: ${val(data, 'challenge')}`;
    const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`;
    note.innerHTML = `<a class="whatsapp-result" href="${href}" target="_blank" rel="noopener">فتح رسالة واتساب الجاهزة</a>`;
  });
}

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  // ✅ Fayl tanlanganligini tekshirish
  if (!file) {
    status.textContent = '❌ Iltimos, fayl tanlang.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  status.textContent = '⏳ Yuklanmoqda...';

  try {
    const response = await fetch('https://oefenplus-backend-pdf-1.onrender.com/convert', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text(); // ✳️ Backenddan xabar chiqarish
      throw new Error('Serverdan javob: ' + errorText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    status.textContent = '✅ PDF tayyor! Yuklab olish boshlandi.';
  } catch (error) {
    status.textContent = '❌ Xatolik: ' + error.message;
    console.error(error);
  }
});

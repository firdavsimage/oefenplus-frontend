document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  status.textContent = 'Yuklanmoqda...';

  try {
    const response = await fetch('https://oefenplus-backend-pdf-1.onrender.com/convert', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Xatolik yuz berdi.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    status.textContent = '✅ PDF tayyor! Yuborilgan faylni yuklab oldingiz.';
  } catch (error) {
    status.textContent = '❌ Xatolik: ' + error.message;
  }
});

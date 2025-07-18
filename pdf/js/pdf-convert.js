document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const message = document.getElementById('message');
  const downloadSection = document.getElementById('downloadSection');
  const downloadLink = document.getElementById('downloadLink');

  message.textContent = '⏳ Fayllar yuklanmoqda va PDFga aylantirilmoqda...';
  downloadSection.classList.add('hidden');

  const files = fileInput.files;
  if (files.length === 0) {
    message.textContent = '❌ Iltimos, kamida bitta fayl tanlang.';
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const response = await fetch('https://oefenplus-backend-pdf.onrender.com/api/convert', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.download_url) {
      message.textContent = '✅ PDF fayl tayyor!';
      downloadLink.href = `https://oefenplus-backend-pdf.onrender.com${data.download_url}`;
      downloadSection.classList.remove('hidden');
    } else {
      message.textContent = '❌ Xatolik: ' + (data.error || 'PDF yaratilolmadi.');
    }
  } catch (error) {
    console.error(error);
    message.textContent = '❌ Server bilan bog‘lanib bo‘lmadi.';
  }
});

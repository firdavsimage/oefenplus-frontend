document.addEventListener("DOMContentLoaded", () => {
  const filesInput = document.getElementById('files');
  const fileList = document.getElementById('file-list');
  const submitBtn = document.getElementById('submit-btn');
  const message = document.getElementById('message');

  // Fayl ro‘yxatini chiqarish
  filesInput.addEventListener('change', () => {
    fileList.innerHTML = '<strong>Tanlangan fayllar:</strong><ul>';
    for (let file of filesInput.files) {
      fileList.innerHTML += `<li>${file.name}</li>`;
    }
    fileList.innerHTML += '</ul>';
  });

  // PDF yaratish tugmasi bosilganda
  submitBtn.addEventListener('click', async () => {
    const files = filesInput.files;
    const title = document.getElementById('title').value;

    if (files.length === 0) {
      message.textContent = '❗ Avval fayl tanlang!';
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }
    if (title) {
      formData.append('title', title);
    }

    message.textContent = '⏳ Yuklanmoqda...';

    try {
      const res = await fetch('https://oefenplus-backend-pdf.onrender.com/api/convert', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Server bilan muammo');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title ? title + '.pdf' : 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      message.textContent = '✅ PDF tayyor va yuklab olindi!';
    } catch (err) {
      message.textContent = '❌ Xatolik: ' + err.message;
    }
  });
});

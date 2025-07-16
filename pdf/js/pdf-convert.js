const filesInput = document.getElementById('files');
const fileList = document.getElementById('file-list');
const message = document.getElementById('message');
const uploadForm = document.getElementById('uploadForm');

filesInput.addEventListener('change', () => {
  const files = filesInput.files;
  if (files.length === 0) {
    fileList.innerHTML = '';
    return;
  }
  let list = '<ul>';
  for (let file of files) {
    list += `<li>📄 ${file.name}</li>`;
  }
  list += '</ul>';
  fileList.innerHTML = list;
});

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const files = filesInput.files;

  if (files.length === 0) {
    message.textContent = '❗ Avval fayl tanlang!';
    return;
  }

  const isOfficeType = (name) => /\.(docx|pptx|xlsx)$/i.test(name);
  const officeFiles = [...files].filter(f => isOfficeType(f.name));
  if (officeFiles.length > 1) {
    message.textContent = '❗ DOCX, PPTX yoki XLSX faqat bittadan yuklanishi mumkin.';
    return;
  }

  const formData = new FormData();
  for (let file of files) {
    formData.append('file', file);
  }

  message.textContent = '⏳ Yuklanmoqda...';

  try {
    const res = await fetch('https://oefenplus-backend-pdf.onrender.com/api/convert', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Server bilan muammo');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    message.innerHTML = '✅ PDF tayyor! <a id="download-link" href="' + url + '" download="converted.pdf" class="text-blue-600 underline ml-2">📥 Yuklab olish</a>';
  } catch (err) {
    message.textContent = '❌ Xatolik: ' + err.message;
  }
});

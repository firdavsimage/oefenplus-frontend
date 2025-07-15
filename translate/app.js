// translate/app.js
document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('https://oefenplus-backend.onrender.com/api/translate', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.downloadUrl) {
    document.getElementById('downloadLink').innerHTML = `<a href="${data.downloadUrl}" target="_blank">Yuklab olish</a>`;
  } else {
    document.getElementById('downloadLink').textContent = "Xatolik yuz berdi.";
  }
};

async function convertText() {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) return alert("Matn kiriting.");
  const res = await fetch('https://oefenplus-backend.onrender.com/api/convert-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input })
  });
  const data = await res.json();
  document.getElementById('outputText').value = data.converted || "Xatolik yuz berdi.";
}

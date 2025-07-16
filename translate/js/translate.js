
const backendURL = "https://oefenplus-backend-translete.onrender.com";

async function convertText() {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) {
    alert("Matn kiriting.");
    return;
  }
  const res = await fetch(`${backendURL}/api/convert-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input })
  });
  const data = await res.json();
  document.getElementById('outputText').value = data.converted || "Xatolik yuz berdi.";
}

document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch(`${backendURL}/api/convert-file`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.downloadUrl) {
    document.getElementById('downloadLink').innerHTML = `<a href="${backendURL}${data.downloadUrl}" target="_blank">Yuklab olish →</a>`;
  } else {
    document.getElementById('downloadLink').textContent = "Xatolik yuz berdi.";
  }
};

function copyText() {
  const output = document.getElementById('outputText');
  output.select();
  document.execCommand("copy");
  alert("Matn nusxalandi!");
}

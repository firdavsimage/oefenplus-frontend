const backendUrl = "https://oefenplus-backend-translete.onrender.com"; // backend domeningiz

async function convertText() {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) {
    alert("Matn kiriting.");
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/api/convert-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    document.getElementById('outputText').value = data.converted || "Xatolik yuz berdi.";
  } catch (err) {
    console.error("Xatolik:", err);
    alert("Tarmoqqa ulanishda muammo yuz berdi.");
  }
}

document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const res = await fetch(`${backendUrl}/api/convert-file`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.downloadUrl) {
      document.getElementById('downloadLink').innerHTML = `<a href="${data.downloadUrl}" target="_blank">Yuklab olish →</a>`;
    } else {
      document.getElementById('downloadLink').textContent = "Xatolik yuz berdi.";
    }
  } catch (err) {
    console.error("Fayl yuborishda xatolik:", err);
    alert("Server bilan ulanishda xatolik.");
  }
};

function copyText() {
  const output = document.getElementById('outputText');
  output.select();
  document.execCommand("copy");
  alert("Matn nusxalandi!");
}

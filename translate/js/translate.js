const backendURL = "https://oefenplus-backend-translete.onrender.com";

async function convertText() {
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('outputText');
  const loading = document.getElementById('loadingMsg');

  if (!input.trim()) {
    alert("Matn kiriting.");
    return;
  }

  // 🔄 Yuklanmoqda yozuvini ko‘rsatish
  loading.classList.remove("hidden");
  output.value = "";

  try {
    const res = await fetch(`${backendURL}/api/convert-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    output.value = data.converted || "Xatolik yuz berdi.";
  } catch (err) {
    output.value = "Xatolik yuz berdi.";
  } finally {
    // ⛔ Yozuvni yashirish
    loading.classList.add("hidden");
  }
}

document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const downloadDiv = document.getElementById('downloadLink');
  const loading = document.getElementById('loadingMsg');

  // 🔄 Yozuvni ko‘rsatish
  loading.classList.remove("hidden");
  downloadDiv.innerHTML = "";

  try {
    const res = await fetch(`${backendURL}/api/convert-file`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.downloadUrl) {
      downloadDiv.innerHTML = `<a href="${backendURL}${data.downloadUrl}" target="_blank">Yuklab olish →</a>`;
    } else {
      downloadDiv.textContent = "Xatolik yuz berdi.";
    }
  } catch (err) {
    downloadDiv.textContent = "Server bilan aloqa muvaffaqiyatsiz tugadi.";
  } finally {
    // ⛔ Yozuvni yashirish
    loading.classList.add("hidden");
  }
};

function copyText() {
  const output = document.getElementById('outputText');
  output.select();
  document.execCommand("copy");
  alert("Matn nusxalandi!");
}

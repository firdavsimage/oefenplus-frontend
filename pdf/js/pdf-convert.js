document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();

  const input = document.getElementById("fileInput");
  const files = input.files;

  if (!files.length) {
    alert("Iltimos, kamida bitta fayl tanlang.");
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]); // "file" nomi backendga mos
  }

  const message = document.getElementById("message");
  const downloadSection = document.getElementById("downloadSection");
  const downloadLink = document.getElementById("downloadLink");

  message.textContent = "⏳ Konvertatsiya qilinmoqda...";
  downloadSection.classList.add("hidden");

  try {
    const res = await fetch("https://oefenplus-backend-pdf.onrender.com/api/convert", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.downloadUrl) {
      downloadLink.href = "https://oefenplus-backend-pdf.onrender.com" + data.downloadUrl;
      downloadLink.textContent = "📥 PDF faylni yuklab olish";
      downloadSection.classList.remove("hidden");
      message.textContent = "✅ PDF fayl tayyor!";
    } else {
      message.textContent = "❌ Xatolik yuz berdi: " + (data.error || "noaniq xato");
    }
  } catch (err) {
    message.textContent = "❌ Server bilan ulanishda xatolik.";
  }
};

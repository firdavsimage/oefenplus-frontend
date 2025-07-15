const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const statusMsg = document.getElementById("statusMessage");
const resultSection = document.getElementById("resultSection");
const downloadLink = document.getElementById("downloadLink");

uploadBtn.addEventListener("click", async () => {
  if (fileInput.files.length === 0) {
    alert("Iltimos, hech bo‘lmaganda bitta fayl tanlang.");
    return;
  }

  statusMsg.textContent = "⏳ Yuklanmoqda...";
  statusMsg.classList.remove("hidden");
  resultSection.classList.add("hidden");

  const formData = new FormData();
  for (let i = 0; i < fileInput.files.length; i++) {
    formData.append("files", fileInput.files[i]);
  }

  try {
    const res = await fetch("https://oefenplus-backend-pdf.onrender.com/convert", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Xatolik yuz berdi");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "natija.pdf";
    resultSection.classList.remove("hidden");
    statusMsg.classList.add("hidden");
  } catch (err) {
    statusMsg.textContent = "❌ Xatolik yuz berdi. Qayta urinib ko‘ring.";
  }
});

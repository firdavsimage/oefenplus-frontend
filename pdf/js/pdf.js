document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById("fileInput");
  const files = input.files;

  if (!files.length) {
    alert("Iltimos, kamida bitta rasm tanlang.");
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]); // Ko‘p fayl bir nom bilan
  }

  const res = await fetch("https://oefenplus-backend-pdf.onrender.com/api/convert-images", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  const downloadSection = document.getElementById("downloadSection");
  const downloadLink = document.getElementById("downloadLink");

  if (data.downloadUrl) {
    downloadLink.href = "https://oefenplus-backend-pdf.onrender.com" + data.downloadUrl;
    downloadSection.classList.remove("hidden");
  } else {
    downloadLink.textContent = "Xatolik yuz berdi.";
    downloadSection.classList.remove("hidden");
  }
};

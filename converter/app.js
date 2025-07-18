const fileInput = document.getElementById("fileInput");
const compressBtn = document.getElementById("compressBtn");
const loadingDiv = document.getElementById("loading");
const resultDiv = document.getElementById("result");
const downloadLink = document.getElementById("downloadLink");

compressBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Iltimos, fayl tanlang.");
    return;
  }

  loadingDiv.classList.remove("hidden");
  resultDiv.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://oefenplus-backend-converter.onrender.com/compress", {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Siqishda xatolik yuz berdi.");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "compressed-" + file.name;
    resultDiv.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  } finally {
    loadingDiv.classList.add("hidden");
  }
});

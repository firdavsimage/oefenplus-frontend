document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch("https://oefenplus-backend-pdf.onrender.com/api/convert", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  const downloadDiv = document.getElementById("downloadLink");
  if (data.downloadUrl) {
    downloadDiv.innerHTML = `<a href="https://oefenplus-backend-pdf.onrender.com${data.downloadUrl}" target="_blank">📥 Yuklab olish (PDF)</a>`;
  } else {
    downloadDiv.textContent = "Xatolik yuz berdi.";
  }
};

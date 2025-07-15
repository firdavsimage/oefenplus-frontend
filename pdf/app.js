// pdf/app.js
document.getElementById('pdfForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch('https://oefenplus-backend.onrender.com/pdf', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    alert("PDFga aylantirishda xatolik.");
    return;
  }

  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "converted.pdf";
  link.click();
};

// converter/app.js
document.getElementById('compressForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch('https://oefenplus-backend.onrender.com/converter', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    alert("Siqishda xatolik yuz berdi.");
    return;
  }

  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "compressed-file";
  link.click();
};

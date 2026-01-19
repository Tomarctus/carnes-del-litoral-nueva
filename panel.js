const link = `${window.location.origin}/index.html`;

const publicLink = document.getElementById("publicLink");
publicLink.value = link;

document.getElementById("btnCopyLink").addEventListener("click", async () => {
  await navigator.clipboard.writeText(link);
  alert("Link copiado.");
});

const msg =
  `Carnes del Litoral — pedidos por WhatsApp\n` +
  `Entrá acá para hacer tu pedido:\n${link}`;

document.getElementById("btnCopyMsg").addEventListener("click", async () => {
  await navigator.clipboard.writeText(msg);
  alert("Mensaje copiado.");
});

// QR
const qrBox = document.getElementById("qrBox");
qrBox.innerHTML = "";
new QRCode(qrBox, {
  text: link,
  width: 220,
  height: 220,
  correctLevel: QRCode.CorrectLevel.M
});

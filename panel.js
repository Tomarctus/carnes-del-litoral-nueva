// Link público robusto (funciona aunque esté en subcarpeta, ej: /repo/)
const link = new URL("./", window.location.href).href;

const publicLink = document.getElementById("publicLink");
publicLink.value = link;

// Copiar texto con fallback (por si falla navigator.clipboard en móviles)
async function copyText(text) {
  try {
    // Clipboard API funciona mejor en HTTPS (secure context)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      alert("Copiado.");
      return;
    }
  } catch (_) {
    // seguimos al fallback
  }

  // Fallback viejo pero muy compatible
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  ta.remove();
  alert("Copiado.");
}

document.getElementById("btnCopyLink").addEventListener("click", () => {
  copyText(link);
});

const msg =
  `Carnes del Litoral — pedidos por WhatsApp\n` +
  `Entrá acá para hacer tu pedido:\n${link}`;

document.getElementById("btnCopyMsg").addEventListener("click", () => {
  copyText(msg);
});

// QR (si el CDN no cargó, al menos no rompe todo)
const qrBox = document.getElementById("qrBox");
qrBox.innerHTML = "";

if (typeof QRCode === "undefined") {
  qrBox.textContent = "No se pudo cargar el generador de QR (sin internet o CDN bloqueado).";
} else {
  new QRCode(qrBox, {
    text: link,
    width: 220,
    height: 220,
    correctLevel: QRCode.CorrectLevel.M
  });
}


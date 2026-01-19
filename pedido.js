const STORAGE_KEY = "carnes_pedido_temp";

const elVacuno = document.getElementById("vacuno");
const elCerdo  = document.getElementById("cerdo");
const elNombre = document.getElementById("nombre");
const elDir    = document.getElementById("direccion");
const elLoc    = document.getElementById("locprov");
const elObs    = document.getElementById("obs");

function onlyDigitsMax4(inputEl){
  inputEl.addEventListener("input", () => {
    const cleaned = inputEl.value.replace(/\D/g, "").slice(0,4);
    inputEl.value = cleaned;
    saveDraft();
  });
}

function saveDraft(){
  const data = {
    vacuno: elVacuno.value,
    cerdo: elCerdo.value,
    nombre: elNombre.value,
    direccion: elDir.value,
    locprov: elLoc.value,
    obs: elObs.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadDraft(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const data = JSON.parse(raw);
    elVacuno.value = data.vacuno || "";
    elCerdo.value  = data.cerdo || "";
    elNombre.value = data.nombre || "";
    elDir.value    = data.direccion || "";
    elLoc.value    = data.locprov || "";
    elObs.value    = data.obs || "";
  }catch(e){}
}

onlyDigitsMax4(elVacuno);
onlyDigitsMax4(elCerdo);

[elNombre, elDir, elLoc, elObs].forEach(el => {
  el.addEventListener("input", saveDraft);
});

loadDraft();

document.getElementById("btnContinuar").addEventListener("click", () => {
  const nombre = elNombre.value.trim();
  const direccion = elDir.value.trim();
  const locprov = elLoc.value.trim();
  const vacuno = elVacuno.value.trim() || "0";
  const cerdo = elCerdo.value.trim() || "0";
  const obs = elObs.value.trim();

  if(!nombre || !direccion || !locprov){
    alert("Completá Nombre, Dirección y Localidad+Provincia.");
    return;
  }

  // Guardar por si vuelve con NO
  saveDraft();

  const qs =
    `nombre=${encodeURIComponent(nombre)}` +
    `&direccion=${encodeURIComponent(direccion)}` +
    `&locprov=${encodeURIComponent(locprov)}` +
    `&vacuno=${encodeURIComponent(vacuno)}` +
    `&cerdo=${encodeURIComponent(cerdo)}` +
    `&obs=${encodeURIComponent(obs)}`;

  window.location.href = `resumen.html?${qs}`;
});

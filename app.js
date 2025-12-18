// app.js
const LS_KEY = "intel_validator_v1";

const elToolList = document.getElementById("toolList");
const elSearch = document.getElementById("search");
const elToolName = document.getElementById("toolName");
const elToolMeta = document.getElementById("toolMeta");
const elContent = document.getElementById("content");
const elProgressLabel = document.getElementById("progressLabel");
const elProgressFill = document.getElementById("progressFill");

const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const resetBtn = document.getElementById("resetBtn");

let state = loadState();
let activeToolKey = null;
let filterText = "";

function loadState(){
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || { claims:{} }; }
  catch { return { claims:{} }; }
}
function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}
function getClaimState(claimId){
  return state.claims[claimId] || { status:"unverified", notes:"" };
}
function setClaimState(claimId, patch){
  state.claims[claimId] = { ...getClaimState(claimId), ...patch, updatedAt: Date.now() };
  saveState();
  renderActive();
  renderToolList();
}

function calcProgress(tool){
  const claims = tool.sections.flatMap(s => s.claims);
  if (!claims.length) return { done:0, total:0, pct:0 };
  const done = claims.filter(c => getClaimState(c.id).status === "verified").length;
  const total = claims.length;
  const pct = Math.round((done/total)*100);
  return { done, total, pct };
}

function renderToolList(){
  elToolList.innerHTML = "";
  const tools = window.TOOLS
    .filter(t => t.name.toLowerCase().includes(filterText.toLowerCase()));

  tools.forEach(tool => {
    const { pct } = calcProgress(tool);
    const row = document.createElement("div");
    row.className = "toolItem" + (tool.key === activeToolKey ? " active" : "");
    row.onclick = () => { activeToolKey = tool.key; renderActive(); renderToolList(); };

    const left = document.createElement("div");
    left.innerHTML = `<div style="font-weight:700">${tool.name}</div>
                      <div class="badge">${tool.tier} · ${tool.tags.join(" · ")}</div>`;

    const right = document.createElement("div");
    right.className = "badge";
    right.textContent = `${pct}%`;

    row.appendChild(left);
    row.appendChild(right);
    elToolList.appendChild(row);
  });
}

function renderActive(){
  const tool = window.TOOLS.find(t => t.key === activeToolKey);
  if (!tool){
    elToolName.textContent = "Selecciona una herramienta";
    elToolMeta.textContent = "";
    elContent.innerHTML = `<div class="empty">Elige una herramienta a la izquierda.</div>`;
    elProgressLabel.textContent = "";
    elProgressFill.style.width = "0%";
    return;
  }

  elToolName.textContent = tool.name;
  elToolMeta.textContent = `${tool.tier} · ${tool.tags.join(" · ")}`;

  const { done, total, pct } = calcProgress(tool);
  elProgressLabel.textContent = `${done}/${total} verificados (${pct}%)`;
  elProgressFill.style.width = `${pct}%`;

  elContent.innerHTML = "";
  tool.sections.forEach(section => {
    const card = document.createElement("div");
    card.className = "card";

    const head = document.createElement("div");
    head.className = "cardTitle";
    head.innerHTML = `<h2>${section.title}</h2><div class="sectionHint">${section.hint || ""}</div>`;
    card.appendChild(head);

    const claims = section.claims || [];
    if (claims.length === 0) {
      const empty = document.createElement("div");
      empty.className = "sectionHint";
      empty.style.marginTop = "10px";
      empty.textContent = "Sin claims todavía. Añádelos en data.js (sí, manual, como todo lo importante).";
      card.appendChild(empty);
    }

    claims.forEach(claim => {
      const cs = getClaimState(claim.id);

      const wrap = document.createElement("div");
      wrap.className = "claim";

      const top = document.createElement("div");
      top.className = "claimTop";

      const text = document.createElement("div");
      text.className = "claimText";
      text.textContent = claim.text;

      const select = document.createElement("select");
      select.className = "select";
      ["unverified","needs_test","doubtful","false","verified"].forEach(v=>{
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent =
          v === "unverified" ? "Sin revisar" :
          v === "needs_test" ? "Pendiente test" :
          v === "doubtful" ? "Dudoso" :
          v === "false" ? "Falso" : "Verificado ✅";
        select.appendChild(opt);
      });
      select.value = cs.status;
      select.onchange = () => setClaimState(claim.id, { status: select.value });

      top.appendChild(text);
      top.appendChild(select);

      const notes = document.createElement("textarea");
      notes.className = "notes";
      notes.placeholder = "Notas del validador (qué viste, credenciales, edge cases, etc.)";
      notes.value = cs.notes || "";
      notes.oninput = () => setClaimState(claim.id, { notes: notes.value });

      const sources = document.createElement("div");
      sources.className = "sources";
      (claim.sources || []).forEach(s => {
        const a = document.createElement("a");
        a.href = s.url; a.target = "_blank"; a.rel = "noreferrer";
        a.textContent = s.label;
        sources.appendChild(a);
      });

      wrap.appendChild(top);
      wrap.appendChild(notes);
      wrap.appendChild(sources);

      card.appendChild(wrap);
    });

    elContent.appendChild(card);
  });
}

elSearch.addEventListener("input", (e) => {
  filterText = e.target.value || "";
  renderToolList();
});

exportBtn.onclick = () => {
  const payload = JSON.stringify(state, null, 2);
  const blob = new Blob([payload], { type:"application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "intel-validator-progress.json";
  a.click();
  URL.revokeObjectURL(url);
};

importFile.onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try{
    const txt = await file.text();
    const imported = JSON.parse(txt);
    if (!imported || typeof imported !== "object") throw new Error("JSON inválido");
    state = imported;
    saveState();
    renderToolList();
    renderActive();
  }catch(err){
    alert("No pude importar ese JSON. Humanos y formatos, ya sabes.");
  } finally {
    importFile.value = "";
  }
};

resetBtn.onclick = () => {
  localStorage.removeItem(LS_KEY);
  state = { claims:{} };
  renderToolList();
  renderActive();
};

// init
renderToolList();
renderActive();

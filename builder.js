import { nanoid, compress, loadPage, savePage,
         loadEventsData, addEvent, deleteEvent,
         loadGalleryData, addGalleryItem, deleteGalleryItem }
  from './firebase.js';
import { DEFAULT_PAGE, SECTION_TEMPLATES,
         pageState, setPageState,
         eventsCache, setEventsCache,
         galleryCache, setGalleryCache,
         renderPage, renderSection }
  from './sections.js';
import { migrateIfNeeded } from './migrate.js';

/* ══════════════════════════════════════════
   状態
   ══════════════════════════════════════════ */
export let adminMode = false;
window._builder = { adminMode:false };

const PASS = '562008';

/* ══════════════════════════════════════════
   初期化
   ══════════════════════════════════════════ */
export async function initBuilder(){
  setStatus('読み込み中…');
  try {
    await migrateIfNeeded();
    const [pageData, evs, gals] = await Promise.all([
      loadPage(), loadEventsData(), loadGalleryData()
    ]);
    setEventsCache(evs);
    setGalleryCache(gals);
    if(pageData) setPageState(pageData);
    else setPageState(JSON.parse(JSON.stringify(DEFAULT_PAGE)));
    renderAll();
    setupEditToggle();
    setStatus('');
  } catch(e){
    console.error(e);
    setStatus('読み込みエラー。リロードしてください。');
  }
}

/* ── renderAll ─────────────────────────── */
function renderAll(){
  const root = document.getElementById('pageRoot');
  if(!root) return;
  renderPage(root);
  setupGalleryDrag();
  if(adminMode){
    applyEditOverlays();
    makeContentEditable();
  }
  reinitObserver();
  setupLongPressDragSections();
}

/* ── IntersectionObserver ────────────────── */
function reinitObserver(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('on'); });
  },{threshold:0.1});
  window.obs = obs;
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
}

/* ══════════════════════════════════════════
   フローティングメニュー管理
   ══════════════════════════════════════════ */
function setupEditToggle(){
  const fmenuBtn = document.getElementById('fmenuBtn');
  const fmenuItems = document.getElementById('fmenuItems');
  if(!fmenuBtn) return;

  fmenuBtn.addEventListener('click', e=>{
    e.stopPropagation();
    fmenuItems?.classList.toggle('open');
  });
  document.addEventListener('click', e=>{
    if(!document.getElementById('fmenu')?.contains(e.target))
      fmenuItems?.classList.remove('open');
  });

  // PW モーダルのボタン
  document.getElementById('pwSubmitBtn')?.addEventListener('click', tryLogin);
  document.getElementById('pwInput')?.addEventListener('keydown', e=>{
    if(e.key==='Enter') tryLogin();
  });
  document.getElementById('pwCancelBtn')?.addEventListener('click', closePwModal);

  updateMenuItems();
}

function updateMenuItems(){
  const fi = document.getElementById('fmenuItems');
  if(!fi) return;
  fi.classList.remove('open');
  if(adminMode){
    fi.innerHTML = `
      <button class="fmenu-item" onclick="window._builder.openAddSecBS()">＋ セクション追加</button>
      <button class="fmenu-item" onclick="window._builder.cancelAdmin()">↩️ 破棄して終了</button>
      <button class="fmenu-item fmenu-save" onclick="window._builder.doSave()">💾 保存して終了</button>`;
  } else {
    fi.innerHTML = `
      <button class="fmenu-item" onclick="window._builder.openPwModal()">🔐 管理者ログイン</button>`;
  }
}

/* ── PW モーダル ─────────────────────────── */
window._builder.openPwModal = () => {
  document.getElementById('fmenuItems')?.classList.remove('open');
  const modal = document.getElementById('pwModal');
  if(!modal) return;
  document.getElementById('pwInput').value = '';
  document.getElementById('pwErr').style.display = 'none';
  modal.style.display = 'flex';
  setTimeout(()=>document.getElementById('pwInput')?.focus(), 150);
};

function closePwModal(){
  const m = document.getElementById('pwModal');
  if(m) m.style.display = 'none';
}

function tryLogin(){
  if(document.getElementById('pwInput')?.value === PASS){
    closePwModal();
    enterAdmin();
  } else {
    document.getElementById('pwErr').style.display = 'block';
  }
}

/* ── 管理者モード ON ────────────────────── */
function enterAdmin(){
  adminMode = true;
  window._builder.adminMode = true;
  document.body.classList.add('edit-mode');
  applyEditOverlays();
  makeContentEditable();
  updateMenuItems();
  showToast('編集モードを開始しました ✏️');
}

/* ── 保存して終了 ───────────────────────── */
async function exitAdmin(){
  adminMode = false;
  window._builder.adminMode = false;
  document.body.classList.remove('edit-mode');
  removeEditOverlays();
  collectEdits();
  updateMenuItems();
  try{
    setStatus('保存中…');
    await savePage(pageState);
    setStatus('');
    showToast('保存しました ✅');
  }catch(e){
    setStatus('保存エラー');
    showToast('保存失敗 ❌ : '+e.message);
  }
  renderAll();
}

/* ── 破棄して終了 ───────────────────────── */
async function cancelAdmin(){
  adminMode = false;
  window._builder.adminMode = false;
  document.body.classList.remove('edit-mode');
  removeEditOverlays();
  updateMenuItems();
  try{
    setStatus('読み込み中…');
    const data = await loadPage();
    if(data) setPageState(data);
    else setPageState(JSON.parse(JSON.stringify(DEFAULT_PAGE)));
    setStatus('');
  }catch(_){
    setStatus('');
  }
  renderAll();
  showToast('変更を破棄しました');
}

window._builder.openAddSecBS = () => openBottomSheet();
window._builder.doSave = () => exitAdmin();
window._builder.cancelAdmin = () => cancelAdmin();

/* ══════════════════════════════════════════
   contentEditable — 編集収集
   ══════════════════════════════════════════ */
function makeContentEditable(){
  document.querySelectorAll('[data-sec][data-field]').forEach(el=>{
    el.contentEditable = 'true';
    el.classList.add('ce-active');
  });
}

function collectEdits(){
  document.querySelectorAll('[data-sec][data-field]').forEach(el=>{
    el.contentEditable = 'false';
    el.classList.remove('ce-active');
    const secId = el.dataset.sec, field = el.dataset.field;
    const sec = pageState.sections.find(s=>s.id===secId);
    if(!sec) return;
    const val = el.textContent.trim();
    if(val) setNestedField(sec.data, field, val);
  });
}

function setNestedField(obj, path, val){
  const parts = path.split('.');
  let cur = obj;
  for(let i=0;i<parts.length-1;i++){
    const k = parts[i];
    if(cur[k]===undefined) cur[k] = isNaN(parts[i+1]) ? {} : [];
    cur = cur[k];
  }
  const last = parts[parts.length-1];
  if(!isNaN(last)) cur[parseInt(last,10)] = val;
  else cur[last] = val;
}

/* ══════════════════════════════════════════
   セクションオーバーレイ（↑↓✕ボタン）
   ══════════════════════════════════════════ */
function applyEditOverlays(){
  document.querySelectorAll('.sec-wrapper').forEach(wrapper=>{
    if(wrapper.querySelector('.sec-overlay')) return;
    const secId = wrapper.dataset.secId;
    const ov = document.createElement('div');
    ov.className = 'sec-overlay';
    ov.innerHTML = `
      <button class="sec-ov-btn" onclick="window._builder.moveSec('${secId}',-1)" title="上へ">↑</button>
      <button class="sec-ov-btn" onclick="window._builder.moveSec('${secId}',1)"  title="下へ">↓</button>
      <button class="sec-ov-btn danger" onclick="window._builder.removeSec('${secId}')" title="削除">✕</button>`;
    wrapper.appendChild(ov);
  });
}

function removeEditOverlays(){
  document.querySelectorAll('.sec-overlay').forEach(el=>el.remove());
}

/* ══════════════════════════════════════════
   セクション操作
   ══════════════════════════════════════════ */
window._builder.moveSec = (id, dir) => {
  const secs = pageState.sections;
  const idx = secs.findIndex(s=>s.id===id);
  if(idx<0) return;
  const swap = idx+dir;
  if(swap<0||swap>=secs.length) return;
  const tmp = secs[swap].order; secs[swap].order = secs[idx].order; secs[idx].order = tmp;
  secs.sort((a,b)=>a.order-b.order);
  renderAll();
};

window._builder.removeSec = (id) => {
  if(!confirm('このセクションを削除しますか？')) return;
  pageState.sections = pageState.sections.filter(s=>s.id!==id);
  renderAll();
};

window._builder.addSec = (type) => {
  const tmpl = SECTION_TEMPLATES[type];
  if(!tmpl) return;
  const maxOrder = Math.max(0,...pageState.sections.map(s=>s.order));
  const ns = {...JSON.parse(JSON.stringify(tmpl)), id:nanoid(), order:maxOrder+1};
  pageState.sections.push(ns);
  renderAll();
  closeBottomSheet();
  showToast('セクションを追加しました');
};

/* ══════════════════════════════════════════
   Steps 操作
   ══════════════════════════════════════════ */
window._builder.addStep = (secId) => {
  const sec = pageState.sections.find(s=>s.id===secId);
  if(!sec) return;
  sec.data.items.push({title:'新しいSTEP',desc:'説明を入力してください。'});
  rerenderSection(secId);
};

window._builder.delStep = (secId, idx) => {
  const sec = pageState.sections.find(s=>s.id===secId);
  if(!sec||sec.data.items.length<=1) return;
  sec.data.items.splice(idx,1);
  rerenderSection(secId);
};

window._builder.addParagraph = (secId) => {
  const sec = pageState.sections.find(s=>s.id===secId);
  if(!sec) return;
  sec.data.paragraphs.push('新しい段落を入力してください。');
  rerenderSection(secId);
};

/* ══════════════════════════════════════════
   Gallery 操作
   ══════════════════════════════════════════ */
window._builder.delStaticGal = (secId, cardId) => {
  const sec = pageState.sections.find(s=>s.id===secId);
  if(!sec) return;
  if(!sec.data.deletedIds) sec.data.deletedIds = [];
  sec.data.deletedIds.push(cardId);
  rerenderSection(secId);
};

window._builder.delDynGal = async (galId) => {
  if(!confirm('この画像を削除しますか？')) return;
  try{
    await deleteGalleryItem(galId);
    const idx = galleryCache.findIndex(g=>g.id===galId);
    if(idx>=0) galleryCache.splice(idx,1);
    renderAll();
  }catch(e){ showToast('削除失敗: '+e.message); }
};

window._builder.triggerGalAdd = (secId) => {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files[0]; if(!file) return;
    try{
      showToast('アップロード中…');
      const b64 = await compress(file);
      const label = prompt('ラベルを入力（省略可）','') || '';
      await addGalleryItem(b64,label);
      const gals = await loadGalleryData();
      setGalleryCache(gals);
      renderAll();
      showToast('追加しました ✅');
    }catch(e){ showToast('エラー: '+e.message); }
  };
  inp.click();
};

/* ══════════════════════════════════════════
   Events 操作
   ══════════════════════════════════════════ */
window._builder.openEvModal = (secId) => {
  const modal = document.getElementById('evModal');
  if(!modal){ createEvModal(secId); return; }
  modal.style.display = 'flex';
  modal._secId = secId;
};

window._builder.delEvent = async (id) => {
  if(!adminMode) return;
  if(!confirm('この企画を削除しますか？')) return;
  try{
    await deleteEvent(id);
    const idx = eventsCache.findIndex(e=>e.id===id);
    if(idx>=0) eventsCache.splice(idx,1);
    renderAll();
  }catch(e){ showToast('削除失敗: '+e.message); }
};

function createEvModal(secId){
  const modal = document.createElement('div');
  modal.id = 'evModal';
  modal._secId = secId;
  modal.className = 'modal-backdrop';
  modal.style.display = 'none';
  modal.innerHTML = `
<div class="modal-box">
  <div class="modal-title"><img class="modal-icon" src="sozai/S__31580216.jpg" alt="">企画を追加</div>
  <input id="evDateInp" type="date" placeholder="日付">
  <input id="evTitleInp" type="text" placeholder="企画名（必須）">
  <select id="evStatusSel">
    <option>募集中</option><option>開催予定</option><option>終了</option>
  </select>
  <div style="display:flex;gap:8px;margin-top:6px">
    <button class="btn-cancel" onclick="document.getElementById('evModal').style.display='none'">キャンセル</button>
    <button class="btn-add" onclick="window._builder._submitEv()">追加</button>
  </div>
</div>`;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

window._builder._submitEv = async () => {
  const title = document.getElementById('evTitleInp')?.value.trim();
  const date  = document.getElementById('evDateInp')?.value;
  const status= document.getElementById('evStatusSel')?.value;
  if(!title){ showToast('企画名を入力してください'); return; }
  try{
    showToast('追加中…');
    await addEvent({title,date:date||'',status:status||'募集中'});
    document.getElementById('evModal').style.display = 'none';
    const evs = await loadEventsData();
    setEventsCache(evs);
    renderAll();
    showToast('企画を追加しました ✅');
  }catch(e){ showToast('エラー: '+e.message); }
};

/* ══════════════════════════════════════════
   画像編集
   ══════════════════════════════════════════ */
window._builder.triggerImageEdit = (secId, field) => {
  if(!adminMode) return;
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files[0]; if(!file) return;
    try{
      showToast('アップロード中…');
      const b64 = await compress(file);
      const sec = pageState.sections.find(s=>s.id===secId);
      if(sec) setNestedField(sec.data, field, b64);
      rerenderSection(secId);
      showToast('画像を更新しました ✅');
    }catch(e){ showToast('エラー: '+e.message); }
  };
  inp.click();
};

/* ══════════════════════════════════════════
   ボトムシート
   ══════════════════════════════════════════ */
function openBottomSheet(){
  let bs = document.getElementById('bottomSheet');
  if(!bs){ bs = createBottomSheet(); document.body.appendChild(bs); }
  bs.classList.add('open');
}

function closeBottomSheet(){
  document.getElementById('bottomSheet')?.classList.remove('open');
}
window._builder.closeBS = closeBottomSheet;

function createBottomSheet(){
  const bs = document.createElement('div');
  bs.id = 'bottomSheet';
  bs.className = 'bottom-sheet';
  bs.innerHTML = `
<div class="bs-handle"></div>
<div class="bs-inner">
  <div class="bs-header">
    <h3 class="bs-title">ブロックを追加</h3>
    <button class="bs-close-btn" onclick="window._builder.closeBS()">✕ 閉じる</button>
  </div>
  <div class="bs-grid">
    ${[
      {type:'text',   icon:'📝', label:'テキスト'},
      {type:'image',  icon:'🖼️', label:'画像'},
      {type:'steps',  icon:'📋', label:'ステップ'},
      {type:'gallery',icon:'🎠', label:'ギャラリー'},
      {type:'after',  icon:'✅', label:'アクション'},
      {type:'template',icon:'📄',label:'テンプレ'},
      {type:'divider',icon:'〰️', label:'区切り線'}
    ].map(b=>`
    <button class="bs-block-btn" onclick="window._builder.addSec('${b.type}')">
      <span class="bs-icon">${b.icon}</span>
      <span>${b.label}</span>
    </button>`).join('')}
  </div>
</div>`;
  bs.addEventListener('click', e=>{ if(e.target===bs) closeBottomSheet(); });
  return bs;
}

/* ══════════════════════════════════════════
   ギャラリー横スクロール（マウスドラッグ）
   ══════════════════════════════════════════ */
function setupGalleryDrag(){
  document.querySelectorAll('[id^="galScroll_"]').forEach(gs=>{
    if(gs._dragSetup) return;
    gs._dragSetup = true;
    let dn=false,sx,sl;
    gs.addEventListener('mousedown',e=>{dn=true;sx=e.pageX-gs.offsetLeft;sl=gs.scrollLeft;});
    document.addEventListener('mouseup',()=>dn=false);
    gs.addEventListener('mousemove',e=>{if(!dn)return;e.preventDefault();gs.scrollLeft=sl-(e.pageX-gs.offsetLeft-sx)*1.5;});
  });
}

/* ══════════════════════════════════════════
   セクション長押しドラッグ並び替え
   ══════════════════════════════════════════ */
function setupLongPressDragSections(){
  const root = document.getElementById('pageRoot');
  if(!root||root._dragSetup) return;
  root._dragSetup = true;
  setupLongPressDrag(root,'[data-sec-id]','sec-wrapper');
}

function setupLongPressDrag(container, selector, cls){
  let timer=null, startXY=null, dragging=null, clone=null;
  const getXY = e => e.touches ? {x:e.touches[0].clientX,y:e.touches[0].clientY} : {x:e.clientX,y:e.clientY};

  const startPress = e => {
    if(!adminMode) return;
    if(timer) return;
    if(e.target.closest('button,input,select,textarea,[contenteditable="true"]')) return;
    const el = e.target.closest(selector);
    if(!el) return;
    startXY = getXY(e);
    timer = setTimeout(()=>{
      timer = null;
      if(navigator.vibrate) navigator.vibrate(30);
      doDrag(el);
    }, 500);
  };

  const maybeCancel = e => {
    if(!timer||!startXY) return;
    const p = getXY(e);
    if(Math.abs(p.x-startXY.x)>8||Math.abs(p.y-startXY.y)>8){ clearTimeout(timer); timer=null; }
  };

  const doDrag = el => {
    dragging = el;
    dragging.classList.add('dragging-orig');
    clone = dragging.cloneNode(true);
    clone.className = cls+' drag-clone';
    clone.querySelectorAll('.sec-overlay,.sec-ov-btn').forEach(n=>n.remove());
    const r = dragging.getBoundingClientRect();
    clone.style.cssText = `position:fixed;z-index:9999;width:${r.width}px;left:${r.left}px;top:${r.top}px;opacity:.85;pointer-events:none;transition:none;`;
    document.body.appendChild(clone);
  };

  let lastEv = null;
  const onMove = e => {
    lastEv = e;
    maybeCancel(e);
    if(!dragging) return;
    if(e.cancelable) e.preventDefault();
    const p = getXY(e);
    clone.style.top = (p.y - clone.offsetHeight/2)+'px';
    const under = document.elementFromPoint(p.x, p.y);
    const target = under?.closest(selector);
    if(target && target !== dragging){
      const items = [...container.querySelectorAll(selector)];
      const fi = items.indexOf(dragging), ti = items.indexOf(target);
      if(fi>=0 && ti>=0 && fi!==ti){
        const fs = pageState.sections.find(s=>s.id===dragging.dataset.secId);
        const ts = pageState.sections.find(s=>s.id===target.dataset.secId);
        if(fs&&ts){
          const tmp = fs.order; fs.order = ts.order; ts.order = tmp;
          pageState.sections.sort((a,b)=>a.order-b.order);
          if(fi<ti) container.insertBefore(dragging, target.nextSibling);
          else container.insertBefore(dragging, target);
        }
      }
    }
  };

  const endDrag = () => {
    clearTimeout(timer); timer=null; startXY=null;
    if(!dragging) return;
    dragging.classList.remove('dragging-orig');
    clone?.remove(); clone=null; dragging=null; lastEv=null;
    applyEditOverlays();
  };

  container.addEventListener('touchstart', startPress, {passive:true});
  container.addEventListener('mousedown',  startPress);
  container.addEventListener('touchmove',  onMove, {passive:false});
  container.addEventListener('mousemove',  onMove);
  container.addEventListener('touchend',   endDrag);
  container.addEventListener('mouseup',    endDrag);
}

/* ══════════════════════════════════════════
   セクション単体再描画
   ══════════════════════════════════════════ */
function rerenderSection(secId){
  const old = document.querySelector(`[data-sec-id="${secId}"]`);
  const sec = pageState.sections.find(s=>s.id===secId);
  if(!old||!sec) return;
  const neo = renderSection(sec);
  if(!neo) return;
  old.replaceWith(neo);
  if(adminMode){
    const ov = document.createElement('div');
    ov.className = 'sec-overlay';
    ov.innerHTML = `
      <button class="sec-ov-btn" onclick="window._builder.moveSec('${secId}',-1)">↑</button>
      <button class="sec-ov-btn" onclick="window._builder.moveSec('${secId}',1)">↓</button>
      <button class="sec-ov-btn danger" onclick="window._builder.removeSec('${secId}')">✕</button>`;
    neo.appendChild(ov);
    neo.querySelectorAll('[data-sec][data-field]').forEach(el=>{
      el.contentEditable = 'true'; el.classList.add('ce-active');
    });
  }
  neo.querySelectorAll('.rv').forEach(el=>window.obs?.observe(el));
}

/* ══════════════════════════════════════════
   UI ユーティリティ
   ══════════════════════════════════════════ */
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2500);
}

function setStatus(msg){
  const el = document.getElementById('statusMsg');
  if(el) el.textContent = msg;
}

window._builder.adminMode = false;

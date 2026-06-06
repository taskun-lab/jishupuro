import { loadPage, loadSettings, savePage } from './firebase.js';
import { DEFAULT_PAGE } from './sections.js';

export async function migrateIfNeeded(){
  const existing = await loadPage();
  if(existing) return; // already migrated

  // Build initial page from DEFAULT_PAGE + any saved settings/page data
  const page = JSON.parse(JSON.stringify(DEFAULT_PAGE));
  const settings = await loadSettings();
  if(!settings) { await savePage(page); return; }

  // Merge saved text overrides into sections
  const S = settings;
  page.sections.forEach(sec=>{
    if(sec.type==='hero' && S.heroSub) sec.data.subtitle = S.heroSub;
    if(sec.id==='whatis'){
      if(S.w1) sec.data.paragraphs[0]=S.w1;
      if(S.w2) sec.data.paragraphs[1]=S.w2;
      if(S.w3) sec.data.paragraphs[2]=S.w3;
    }
    if(sec.id==='steps' && S.steps?.length) sec.data.items=S.steps;
    if(sec.id==='gallery'){
      if(S.deletedGalCards?.length) sec.data.deletedIds=S.deletedGalCards;
      // restore static label overrides
      const labelMap={gl1:'h0',gl2:'h1',gl3:'h2',gl4:'h3',gl5:'h4',gl6:'h5',gl7:'h6',gl8:'h7',gl9:'h8'};
      Object.entries(labelMap).forEach(([key,cardId])=>{
        if(S[key]){
          const item=sec.data.staticItems.find(i=>i.id===cardId);
          if(item) item.label=S[key];
        }
      });
    }
    if(sec.id==='events'){
      if(S.st0) sec.data.title=S.st0;
    }
    if(sec.type==='text' && sec.id==='whatis' && S.st1) sec.data.title=S.st1;
    if(sec.id==='steps' && S.st2) sec.data.title=S.st2;
    if(sec.id==='gallery' && S.st3) sec.data.title=S.st3;
    if(sec.id==='after' && S.st4) sec.data.title=S.st4;
    if(sec.id==='template' && S.st5) sec.data.title=S.st5;
    if(sec.id==='after'){
      if(S.a1t) sec.data.items[0].title=S.a1t;
      if(S.a1b) sec.data.items[0].body=S.a1b;
      if(S.a1c) sec.data.items[0].caution=S.a1c;
      if(S.a2t) sec.data.items[1].title=S.a2t;
      if(S.a2b) sec.data.items[1].body=S.a2b;
      if(S.a3t) sec.data.items[2].title=S.a3t;
      if(S.a3b) sec.data.items[2].body=S.a3b;
    }
    if(sec.id==='template' && S.tplText) sec.data.text=S.tplText;
    if(sec.id==='footer'){
      if(S.ftTitle) sec.data.title=S.ftTitle;
      if(S.ftSub)   sec.data.sub=S.ftSub;
    }
  });

  // Images
  const tanuki = page.sections.find(s=>s.id==='tanuki');
  if(tanuki && S.tanukiImgUrl) tanuki.data.src=S.tanukiImgUrl;
  const events = page.sections.find(s=>s.id==='events');
  if(events && S.bulletinPhotoUrl){
    events.data.showBulletinPhoto=true;
    events.data.bulletinPhotoUrl=S.bulletinPhotoUrl;
  }

  await savePage(page);
}

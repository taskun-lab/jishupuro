/* ══════════════════════════════════════════════
   DEFAULT PAGE — 現在のページをデータ化
   ══════════════════════════════════════════════ */
export const DEFAULT_PAGE = {
  id:'main',
  theme:{
    primaryColor:'#5cb85c', accentColor:'#ffd54f',
    bgColor:'#e8f5e9', textColor:'#2c1810',
    font:'yomogi', dotPattern:true
  },
  sections:[
    { id:'hero', type:'hero', order:0, visible:true,
      bg:{type:'gradient',value:'linear-gradient(180deg,#87ceeb 0%,#b3d9f5 26%,#ddc9a0 56%,#85c151 80%,#4a9626 100%)'},
      stamps:[],
      data:{
        logoSrc:'sozai/「じしゅきかくの森」タイトルロゴver2.jpg',
        subtitle:'🎪 誰でも簡単に始められる自主企画！',
        showArrow:true, showWave:true
      }
    },
    { id:'tanuki', type:'image', order:1, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{src:'sozai/S__31580207.jpg', alt:'楽しい企画を待ってるだなも！',
            maxWidth:'600px', rounded:true, editable:true, link:null,
            wrapClass:'tanuki'}
    },
    { id:'events', type:'events', order:2, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{title:'今後の企画', showBulletinPhoto:false, bulletinPhotoUrl:null}
    },
    { id:'whatis', type:'text', order:3, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{
        title:'自主プロってなあに？',
        paragraphs:[
          'ピースボートセンターとうきょう（ピーセン）では、誰でも自分で企画を発案・開催できる仕組みを作りました🌿',
          '「やってみたい！」と思ったら、スタッフに大きく頼らなくても自分たちで時間と場所を作って実行できます。',
          '「カンボジアに行ってみた話」「ゲーム大会」「ものづくりワークショップ」…なんでもOK！'
        ]
      }
    },
    { id:'fruit1', type:'image', order:4, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{src:'sozai/S__31580217.jpg', alt:'', maxWidth:'340px',
            centered:true, rounded:false, blendMode:'multiply', link:null,
            wrapClass:'fruit-row'}
    },
    { id:'steps', type:'steps', order:5, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{
        title:'申請の流れ',
        items:[
          {title:'企画内容を確認する',desc:'誰でも参加できる内容で、ボラスタ規約7条に触れないものにしよう。'},
          {title:'申請シートを記入する',desc:'企画日・開始〜終了時間・企画名・PA申請の有無・代表者氏名を書いてね。'},
          {title:'スタッフに直接手渡す',desc:'記入できたら <strong>そ～り</strong> か <strong>マイカブ</strong> に直接渡してね📝'},
          {title:'内容確認・打ち合わせ',desc:'スタッフが企画内容の確認と、会場の使い方（設営・PA）をレクチャーするよ。'},
          {title:'掲示板 &amp; LINE でお知らせ',desc:'受付完了！スタッフが掲示板掲載と公式LINEへのお知らせ配信を準備するよ🌟'}
        ]
      }
    },
    { id:'divider1', type:'divider', order:6, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{topColor:'var(--bg)',bottomColor:'#e0f2f1',
            path:'M0,30 C300,60 600,0 900,30 C1050,45 1150,10 1200,30 L1200,60 L0,60 Z',
            h:60}
    },
    { id:'gallery', type:'gallery', order:7, visible:true,
      bg:{type:'gradient',value:'linear-gradient(160deg,#e0f2f1 0%,#f9fbe7 100%)'},
      stamps:[],
      data:{
        title:'こんな企画が生まれたよ！',
        staticItems:[
          {id:'h0',src:'sozai/過去の企画サムネ/S__31580220.jpg',label:'関東ラーメン博物館'},
          {id:'h1',src:'sozai/過去の企画サムネ/S__31580222.jpg',label:'Sumとそ～り SELF おかえりなさい企画'},
          {id:'h2',src:'sozai/過去の企画サムネ/S__31580223.jpg',label:'ヴィパッサナー瞑想体験記'},
          {id:'h3',src:'sozai/過去の企画サムネ/S__31580224.jpg',label:'動物占いとは？'},
          {id:'h4',src:'sozai/過去の企画サムネ/S__31580225.jpg',label:'リゾバのイロハ'},
          {id:'h5',src:'sozai/過去の企画サムネ/S__31580226.jpg',label:'MBTI診断（16性格）ってなぁに？'},
          {id:'h6',src:'sozai/過去の企画サムネ/S__31580227.jpg',label:'麻生昊汰の 馬場×ノミになる話 Vol.2'},
          {id:'h7',src:'sozai/過去の企画サムネ/S__31580228.jpg',label:"Let's play ビブリオバトル"},
          {id:'h8',src:'sozai/過去の企画サムネ/S__31580229.jpg',label:'ヒッチハイクと車中泊旅による 日本一周体験談'}
        ],
        deletedIds:[]
      }
    },
    { id:'divider2', type:'divider', order:8, visible:true,
      bg:{type:'color',value:'#e0f2f1'},
      stamps:[],
      data:{topColor:'#e0f2f1',bottomColor:'var(--bg)',
            path:'M0,30 C200,0 500,60 800,30 C1000,10 1150,50 1200,30 L1200,60 L0,60 Z',
            h:60}
    },
    { id:'after', type:'after', order:9, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{
        title:'申請が通ったら',
        items:[
          {icon:'📌',title:'掲示板に企画名を掲載',
           body:'申請書通りの企画名が掲示板に載るよ。',
           caution:'⚠️ 国旗・特定の人種・宗教などが特定されるデザインは使えません'},
          {icon:'📲',title:'公式LINEでお知らせ配信',
           body:'下のテンプレを使って内容を作成 → スタッフチェック後に配信されるよ。',
           caution:null},
          {icon:'🏃',title:'当日：開始30分前に来場',
           body:'会場の設営・準備のため、企画開始の30分前にはピーセンに来てね🌿',
           caution:null}
        ]
      }
    },
    { id:'fruit2', type:'image', order:10, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{src:'sozai/S__31580217.jpg', alt:'', maxWidth:'340px',
            centered:true, rounded:false, blendMode:'multiply', link:null,
            wrapClass:'fruit-row'}
    },
    { id:'template', type:'template', order:11, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{
        title:'LINE告知テンプレ',
        hint:'↓ このテンプレをコピーして使ってね！',
        text:'【自主企画のお知らせ🍃】\n自己紹介文章（80文字以内）\n\n★イベント名\n～こちらに入力～\n\n内容：（50文字以内）\n\n日付：\n時間：\n会場：とうきょうピーセン\n最後にみんなに向けて一言！'
      }
    },
    { id:'divider3', type:'divider', order:12, visible:true,
      bg:{type:'color',value:''},
      stamps:[],
      data:{topColor:'var(--bg)',bottomColor:'#2e7d32',
            path:'M0,35 C300,0 600,70 900,35 C1050,15 1150,55 1200,35 L1200,70 L0,70 Z',
            h:70}
    },
    { id:'footer', type:'footer', order:13, visible:true,
      bg:{type:'color',value:'#2e7d32'},
      stamps:[],
      data:{
        title:'とうきょうピーセン 自主プロ係',
        sub:'ご不明な点はスタッフまでお声がけください🌿'
      }
    }
  ]
};

/* デフォルト新規セクションのテンプレ */
export const SECTION_TEMPLATES = {
  text:{
    type:'text', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{title:'新しいセクション',paragraphs:['テキストを入力してください。']}
  },
  image:{
    type:'image', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{src:'',alt:'',maxWidth:'100%',rounded:true,link:null,editable:true}
  },
  steps:{
    type:'steps', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{title:'ステップ',items:[{title:'STEP 1',desc:'説明を入力'}]}
  },
  gallery:{
    type:'gallery', visible:true,
    bg:{type:'gradient',value:'linear-gradient(160deg,#e0f2f1 0%,#f9fbe7 100%)'},
    stamps:[],
    data:{title:'ギャラリー',staticItems:[],deletedIds:[]}
  },
  after:{
    type:'after', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{title:'アクションリスト',items:[
      {icon:'📌',title:'タイトル',body:'内容を入力',caution:null}
    ]}
  },
  template:{
    type:'template', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{title:'コピーテンプレ',hint:'コピーして使ってね',text:'テキストを入力'}
  },
  divider:{
    type:'divider', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{topColor:'var(--bg)',bottomColor:'#e0f2f1',
          path:'M0,30 C300,60 600,0 900,30 C1050,45 1150,10 1200,30 L1200,60 L0,60 Z',h:60}
  },
  embed:{
    type:'embed', visible:true, bg:{type:'color',value:''},stamps:[],
    data:{url:'',title:''}
  }
};

/* ══════════════════════════════════════════════
   ページ描画
   ══════════════════════════════════════════════ */
export let pageState = null;
export let eventsCache = [];
export let galleryCache = [];

export function setPageState(p){ pageState=p; }
export function setEventsCache(e){ eventsCache=e; }
export function setGalleryCache(g){ galleryCache=g; }

export function renderPage(container){
  if(!pageState) return;
  const sorted=[...pageState.sections].sort((a,b)=>a.order-b.order);
  container.innerHTML='';
  sorted.filter(s=>s.visible).forEach(sec=>{
    const el=renderSection(sec);
    if(el) container.appendChild(el);
  });
}

export function renderSection(sec){
  const fn={
    hero:renderHero, image:renderImage, text:renderText,
    steps:renderSteps, gallery:renderGallery, events:renderEvents,
    template:renderTemplate, divider:renderDivider,
    after:renderAfter, footer:renderFooter, embed:renderEmbed
  }[sec.type];
  if(!fn) return null;
  const wrapper=document.createElement('div');
  wrapper.className='sec-wrapper';
  wrapper.dataset.secId=sec.id;
  wrapper.dataset.secType=sec.type;
  applyBg(wrapper, sec.bg, sec.type);
  wrapper.innerHTML=fn(sec);
  setupSectionInteractivity(wrapper, sec);
  window.obs?.observe(wrapper);
  return wrapper;
}

function applyBg(el, bg, type){
  if(!bg||!bg.value) return;
  if(bg.type==='color') el.style.background=bg.value;
  else if(bg.type==='gradient') el.style.background=bg.value;
  else if(bg.type==='image') el.style.cssText+=
    `;background:url('${bg.value}') center/cover no-repeat;`;
}

/* ── HERO ── */
function renderHero(sec){
  const d=sec.data;
  return `
<header class="hero" style="background:${sec.bg.value}">
  <img class="hero-tree ht-l"  src="sozai/S__31580219.jpg" alt="" style="mix-blend-mode:multiply">
  <img class="hero-tree ht-r"  src="sozai/S__31580214.jpg" alt="">
  <img class="hero-tree ht-r2" src="sozai/S__31580218.jpg" alt="" style="mix-blend-mode:multiply">
  <img class="hero-logo img-ed-wrap" id="heroLogo" src="${esc(d.logoSrc)}" alt="あつまれ じしゅきかくの森"
       onclick="window._builder?.triggerImageEdit('${sec.id}','logoSrc')">
  <p class="hero-sub" data-sec="${sec.id}" data-field="subtitle">${d.subtitle}</p>
  ${d.showArrow?'<div class="hero-arrow">↓</div>':''}
  ${d.showWave?`<div class="hero-wave"><svg viewBox="0 0 1200 70" preserveAspectRatio="none">
    <path d="M0,35 C200,70 400,0 600,35 C800,70 1000,0 1200,35 L1200,70 L0,70 Z" fill="var(--bg)"/>
  </svg></div>`:''}
</header>`;
}

/* ── IMAGE ── */
function renderImage(sec){
  const d=sec.data;
  const isEditable=d.editable;
  const wrapStyle=`max-width:${d.maxWidth||'100%'};margin:0 auto;position:relative;`;
  const imgStyle=`${d.blendMode?`mix-blend-mode:${d.blendMode};`:''}${d.rounded?'border-radius:var(--r);box-shadow:var(--sh);':''}`;
  const wrapCls=d.wrapClass||'';
  let inner;
  if(d.src){
    inner=`<img src="${esc(d.src)}" alt="${esc(d.alt||'')}" style="${imgStyle};width:100%"
      ${isEditable?`class="img-ed-wrap" onclick="window._builder?.triggerImageEdit('${sec.id}','src')"`:''}>`;
  } else {
    inner=`<div class="img-placeholder${isEditable?' img-ed-wrap':''}" style="${imgStyle}"
      ${isEditable?`onclick="window._builder?.triggerImageEdit('${sec.id}','src')"`:''}>
      <span>🖼</span>タップして画像を選択
    </div>`;
  }
  const linked=d.link?`<a href="${esc(d.link)}" target="_blank" rel="noopener">${inner}</a>`:inner;
  const linkBtn=`<button class="link-edit-btn" onclick="event.stopPropagation();window._builder?.editLink('${sec.id}')">${d.link?'🔗 リンクあり':'🔗 リンクなし'}</button>`;
  return `<div class="${wrapCls} rv" style="${wrapStyle}">${linked}${linkBtn}</div>`;
}

/* ── TEXT ── */
function renderText(sec){
  const d=sec.data;
  return `
<section class="sec">
  <h2 class="sec-title rv">
    <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
    <span data-sec="${sec.id}" data-field="title">${d.title}</span>
  </h2>
  <div class="what-card rv">
    ${(d.paragraphs||[]).map((p,i)=>`<p data-sec="${sec.id}" data-field="paragraphs.${i}">${p}</p>`).join('')}
    ${isAdmin()?`<button class="para-add-btn" onclick="window._builder?.addParagraph('${sec.id}')">＋ 段落を追加</button>`:''}
  </div>
</section>`;
}

/* ── STEPS ── */
function renderSteps(sec){
  const d=sec.data;
  const items=(d.items||[]).map((s,i)=>`
    ${i>0?'<div class="step-line"></div>':''}
    <div class="step-card rv" data-step-idx="${i}">
      <div class="step-num"><span class="step-s">STEP</span><span class="step-n">${i+1}</span></div>
      <div style="flex:1;min-width:0">
        <div class="step-title" data-sec="${sec.id}" data-field="items.${i}.title">${s.title}</div>
        <div class="step-desc"  data-sec="${sec.id}" data-field="items.${i}.desc">${s.desc}</div>
      </div>
      <button class="step-del-btn" onclick="window._builder?.delStep('${sec.id}',${i})">✕</button>
    </div>`).join('');
  return `
<section class="sec">
  <h2 class="sec-title rv">
    <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
    <span data-sec="${sec.id}" data-field="title">${d.title}</span>
  </h2>
  <div class="steps">${items}</div>
  <button class="step-add-btn" onclick="window._builder?.addStep('${sec.id}')">＋ ステップを追加</button>
</section>`;
}

/* ── GALLERY ── */
function renderGallery(sec){
  const d=sec.data;
  const deleted=new Set(d.deletedIds||[]);
  const staticCards=(d.staticItems||[])
    .filter(i=>!deleted.has(i.id))
    .map(i=>{
      const imgEl=`<img src="${esc(i.src)}" alt="">`;
      const linked=i.link?`<a href="${esc(i.link)}" target="_blank" rel="noopener">${imgEl}</a>`:imgEl;
      return `
      <div class="gal-card" data-card-id="${i.id}">
        <button class="gal-del" onclick="window._builder?.delStaticGal('${sec.id}','${i.id}')">✕</button>
        <button class="gal-link-btn${i.link?' has-link':''}" onclick="window._builder?.editGalLink('${sec.id}','${i.id}',false)">🔗</button>
        ${linked}
        <div class="gal-label">${i.label}</div>
      </div>`;}).join('');
  const dynCards=galleryCache.map(g=>{
      const imgEl=`<img src="${esc(g.url)}" alt="${esc(g.label||'')}">`;
      const linked=g.link?`<a href="${esc(g.link)}" target="_blank" rel="noopener">${imgEl}</a>`:imgEl;
      return `
      <div class="gal-card" data-gal-id="${g.id}">
        <button class="gal-del" onclick="window._builder?.delDynGal('${g.id}')">✕</button>
        <button class="gal-link-btn${g.link?' has-link':''}" onclick="window._builder?.editGalLink('${sec.id}','${g.id}',true)">🔗</button>
        ${linked}
        <div class="gal-label">${esc(g.label||'')}</div>
      </div>`;}).join('');
  const cardW = d.cardWidth || 212;
  const cardH = Math.round(cardW * 0.594);
  return `
<div class="gal-bg" style="background:${sec.bg.value};--gal-card-w:${cardW}px;--gal-card-h:${cardH}px">
  <div class="gal-head rv">
    <h2 class="sec-title">
      <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
      <span data-sec="${sec.id}" data-field="title">${d.title}</span>
    </h2>
  </div>
  <div class="gal-scroll" id="galScroll_${sec.id}">
    <div class="gal-track" id="galTrack_${sec.id}">
      ${staticCards}${dynCards}
      <div class="gal-card gal-add-card" onclick="window._builder?.triggerGalAdd('${sec.id}')">
        <div class="gal-add-inner">＋</div>
        <div class="gal-label">画像を追加</div>
      </div>
    </div>
  </div>
</div>`;
}

/* ── EVENTS ── */
function renderEvents(sec){
  const d=sec.data;
  const SC={'募集中':'#5cb85c','開催予定':'#ff9800','終了':'#9e9e9e'};
  let boardInner='';
  if(!eventsCache.length){
    boardInner='<p class="board-msg">企画を準備中です 🌿</p>';
  } else {
    boardInner=eventsCache.map(e=>`
      <div class="ev-row" data-ev-id="${e.id}">
        <div class="ev-top">
          <span class="ev-pin">📌</span>
          <div class="ev-date">${esc(e.date)}</div>
          <div class="ev-status" style="background:${SC[e.status]||'#9e9e9e'}">${esc(e.status)}</div>
          <button class="ev-del-btn" onclick="window._builder?.delEvent('${e.id}')">✕</button>
        </div>
        <div class="ev-title">${esc(e.title)}</div>
      </div>`).join('');
  }
  const bulletin=d.showBulletinPhoto&&d.bulletinPhotoUrl?`
    <div class="b-photo-wrap" id="bPhotoWrap_${sec.id}" style="margin-top:12px">
      <div class="img-ed-wrap" onclick="window._builder?.triggerImageEdit('${sec.id}','bulletinPhotoUrl')">
        <img src="${esc(d.bulletinPhotoUrl)}" alt="掲示板の写真" style="width:100%;border-radius:var(--r);box-shadow:var(--sh)">
      </div>
      <p style="text-align:center;font-size:.8rem;color:var(--text-s);margin-top:6px">📌 実際の掲示板</p>
    </div>`:'';
  return `
<section class="sec rv">
  <h2 class="sec-title">
    <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
    <span data-sec="${sec.id}" data-field="title">${d.title}</span>
  </h2>
  <div class="cork-board" id="eventBoard_${sec.id}">${boardInner}
    <button class="board-add-btn" onclick="window._builder?.openEvModal('${sec.id}')">＋ 企画を追加</button>
  </div>
  ${bulletin}
  <button class="bphoto-add-btn" id="bPhotoAddBtn_${sec.id}"
    onclick="window._builder?.triggerImageEdit('${sec.id}','bulletinPhotoUrl')"
    ${d.showBulletinPhoto?'style="display:none"':''}>📷 掲示板写真をアップロード</button>
</section>`;
}

/* ── AFTER ── */
function renderAfter(sec){
  const d=sec.data;
  const items=(d.items||[]).map((item,i)=>`
    <div class="after-card rv d${Math.min(i+1,5)}">
      <span class="aico" data-sec="${sec.id}" data-field="items.${i}.icon">${item.icon}</span>
      <div>
        <span class="atitle" data-sec="${sec.id}" data-field="items.${i}.title">${item.title}</span>
        <span data-sec="${sec.id}" data-field="items.${i}.body">${item.body}</span>
        ${item.caution?`<div class="caution" data-sec="${sec.id}" data-field="items.${i}.caution">${item.caution}</div>`:''}
      </div>
    </div>`).join('');
  return `
<section class="sec">
  <h2 class="sec-title rv">
    <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
    <span data-sec="${sec.id}" data-field="title">${d.title}</span>
  </h2>
  <div class="after-list">${items}</div>
</section>`;
}

/* ── TEMPLATE ── */
function renderTemplate(sec){
  const d=sec.data;
  return `
<section class="sec rv">
  <h2 class="sec-title">
    <img class="sec-icon" src="sozai/S__31580216.jpg" alt="">
    <span data-sec="${sec.id}" data-field="title">${d.title}</span>
  </h2>
  <div class="tpl-outer">
    <p class="tpl-hint">${esc(d.hint||'')}</p>
    <div class="tpl-text" data-sec="${sec.id}" data-field="text">${esc(d.text||'')}</div>
    <button class="copy-btn" id="copyBtn_${sec.id}" onclick="window._doCopy('${sec.id}')">
      <span>📋</span><span>ワンタップでコピー</span>
    </button>
  </div>
</section>`;
}

/* ── DIVIDER ── */
function renderDivider(sec){
  const d=sec.data;
  const bg=sec.bg.value||d.topColor||'var(--bg)';
  return `<svg class="wv" viewBox="0 0 1200 ${d.h||60}" preserveAspectRatio="none"
    style="background:${bg}">
  <path d="${d.path}" fill="${d.bottomColor||'var(--bg)'}"/>
</svg>`;
}

/* ── FOOTER ── */
function renderFooter(sec){
  const d=sec.data;
  return `
<footer>
  <div class="footer-trees">
    <img src="sozai/S__31580219.jpg" alt=""><img src="sozai/S__31580218.jpg" alt=""><img src="sozai/S__31580214.jpg" alt="">
  </div>
  <div class="footer-title" data-sec="${sec.id}" data-field="title">${d.title}</div>
  <div data-sec="${sec.id}" data-field="sub" style="opacity:.78;font-size:.82rem;margin-top:4px">${d.sub}</div>
</footer>`;
}

/* ── インタラクティビティ（ギャラリースクロール等） ── */
function setupSectionInteractivity(wrapper, sec){
  if(sec.type==='gallery'){
    const gs=wrapper.querySelector(`#galScroll_${sec.id}`);
    if(!gs) return;
    let dn=false,sx,sl;
    gs.addEventListener('mousedown',e=>{dn=true;sx=e.pageX-gs.offsetLeft;sl=gs.scrollLeft;});
    document.addEventListener('mouseup',()=>dn=false);
    gs.addEventListener('mousemove',e=>{if(!dn)return;e.preventDefault();gs.scrollLeft=sl-(e.pageX-gs.offsetLeft-sx)*1.5;});
  }
}

/* ── EMBED ── */
function toEmbedUrl(url){
  try{
    const u=new URL(url);
    const host=u.hostname.replace('www.','');
    /* YouTube */
    if(host==='youtube.com'&&u.pathname==='/watch'){
      const v=u.searchParams.get('v');
      if(v) return `https://www.youtube.com/embed/${v}`;
    }
    if(host==='youtu.be'){
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if(host==='youtube.com'&&u.pathname.startsWith('/embed/')) return url;
    /* Vimeo */
    if(host==='vimeo.com') return `https://player.vimeo.com/video${u.pathname}`;
    /* Google Slides */
    if(host==='docs.google.com'&&u.pathname.includes('/presentation/')){
      return url.replace(/\/(edit|pub|present)(#.*)?$/,'/embed');
    }
  }catch(e){}
  return url;
}

function renderEmbed(sec){
  const d=sec.data;
  const editBtn=`<button class="embed-edit-btn" onclick="event.stopPropagation();window._builder?.editEmbedUrl('${sec.id}')">▶ URLを変更</button>`;
  if(!d.url){
    return `<div class="embed-wrap rv">
      <div class="embed-placeholder${isAdmin()?' embed-ed':''}" onclick="window._builder?.editEmbedUrl('${sec.id}')">
        <span>▶</span>動画のURLを入力
      </div>
    </div>`;
  }
  const embedUrl=toEmbedUrl(d.url);
  return `<div class="embed-wrap rv">
    ${d.title?`<p class="embed-title" data-sec="${sec.id}" data-field="title">${esc(d.title)}</p>`:''}
    <div class="embed-aspect">
      <iframe src="${esc(embedUrl)}" frameborder="0" allowfullscreen
        allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture">
      </iframe>
    </div>
    ${editBtn}
  </div>`;
}

/* ── Helpers ── */
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function isAdmin(){ return window._builder?.adminMode||false; }

/* コピーボタン */
window._doCopy = id => {
  const el=document.querySelector(`[data-sec="${id}"][data-field="text"]`);
  if(!el) return;
  const text=el.innerText;
  const btn=document.getElementById(`copyBtn_${id}`);
  const ok=()=>{
    btn.classList.add('copied');
    btn.innerHTML='<span>✅</span><span>コピーしました！</span>';
    setTimeout(()=>{btn.classList.remove('copied');btn.innerHTML='<span>📋</span><span>ワンタップでコピー</span>';},2600);
  };
  if(navigator.clipboard) navigator.clipboard.writeText(text).then(ok).catch(()=>{lc();ok();});
  else{lc();ok();}
  function lc(){const r=document.createRange();r.selectNode(el);const s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();}
};

import { initializeApp, getApps }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc,
         doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const cfg = {
  apiKey:"AIzaSyD7tSKKaGkkul4QPRez4dbZm2vqq3yMK1s",
  authDomain:"jishupuro.firebaseapp.com",
  projectId:"jishupuro",
  storageBucket:"jishupuro.firebasestorage.app",
  messagingSenderId:"924133934118",
  appId:"1:924133934118:web:0b671fe7c7534cc6f8d2e7"
};

const app = getApps().length === 0 ? initializeApp(cfg) : getApps()[0];
export const db = getFirestore(app);

export function nanoid(n=8){
  return Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map(b=>'0123456789abcdefghijklmnopqrstuvwxyz'[b%36]).join('');
}

export async function compress(file, maxW=800, q=0.78){
  return new Promise(resolve=>{
    const img=new Image(), url=URL.createObjectURL(file);
    img.onload=()=>{
      const ratio=Math.min(maxW/img.width,1);
      const c=document.createElement('canvas');
      c.width=img.width*ratio; c.height=img.height*ratio;
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg',q));
    };
    img.src=url;
  });
}

/* ── Pages ── */
export async function loadPage(){
  const snap=await getDoc(doc(db,'pages','main'));
  return snap.exists()?snap.data():null;
}
export async function savePage(data){
  await setDoc(doc(db,'pages','main'),{...data,updatedAt:serverTimestamp()});
}

/* ── Legacy settings ── */
export async function loadSettings(){
  const snap=await getDoc(doc(db,'settings','page'));
  return snap.exists()?snap.data():null;
}
export async function saveSettings(data){
  await setDoc(doc(db,'settings','page'),data,{merge:true});
}

/* ── Events ── */
export async function loadEventsData(){
  const snap=await getDocs(collection(db,'events'));
  const evs=[];
  snap.forEach(d=>evs.push({id:d.id,...d.data()}));
  evs.sort((a,b)=>(a.createdAt?.seconds||0)-(b.createdAt?.seconds||0));
  return evs;
}
export async function addEvent(data){
  return addDoc(collection(db,'events'),{...data,createdAt:serverTimestamp()});
}
export async function deleteEvent(id){
  await deleteDoc(doc(db,'events',id));
}

/* ── Gallery ── */
export async function loadGalleryData(){
  const snap=await getDocs(collection(db,'gallery'));
  const items=[];
  snap.forEach(d=>items.push({id:d.id,...d.data()}));
  return items;
}
export async function addGalleryItem(url,label){
  return addDoc(collection(db,'gallery'),{url,label,createdAt:serverTimestamp()});
}
export async function deleteGalleryItem(id){
  await deleteDoc(doc(db,'gallery',id));
}

/* ── Assets (stamps) ── */
export async function loadAssets(){
  const snap=await getDocs(collection(db,'assets'));
  const items=[];
  snap.forEach(d=>items.push({id:d.id,...d.data()}));
  return items;
}
export async function addAsset(data){
  return addDoc(collection(db,'assets'),{...data,createdAt:serverTimestamp()});
}
export async function deleteAsset(id){
  await deleteDoc(doc(db,'assets',id));
}

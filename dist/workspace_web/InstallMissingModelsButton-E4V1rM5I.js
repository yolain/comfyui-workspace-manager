import{r as o,j as e,h as C,P as k}from"./input.js";import{a4 as x,ag as b,f as I,T as v,H as y,g as S,Y as F,am as E,W as A,aq as D,e as z,B as H,a5 as L,a6 as T,aJ as P,F as R,ad as G}from"./App-k1qTZ14_.js";import{G as O,i as W}from"./ModelManagerTopbar-CicmjGSu.js";import{C as q,G as N}from"./chunk-JARCRF6W-w-BwqrKS.js";import{I as U}from"./chunk-7D6N5TE5-xWYr0u7t.js";import{S as B}from"./chunk-3RSXBRAN-9CIVtvH2.js";import{g as K}from"./civitUtils-TM6yZwvj.js";import"/scripts/api.js";const Y="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png",$="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/gtxrcmtsvpjjevozblfa";function J({model:l,selectedModelDeps:c,setSelectedModelDeps:n,foldersList:d,setFoldersList:h}){var m,t,a,g,_;const[s,u]=o.useState(),p=(a=(t=(m=x.graph.extra)==null?void 0:m[b])==null?void 0:t.deps)==null?void 0:a.models;o.useEffect(()=>{(async()=>{var f;if(p){const M=p[l.received_value];if((f=p[l.received_value])!=null&&f.downloadUrl){const w=await E.models.where({fileHash:M.fileHash}).toArray();w[0]?u({existingModel:w[0].fileName}):u(M)}}})()},[]);const j=c.map(i=>i.filename);function r(i){return i.existingModel!=null}return e.jsx(O,{p:3,shadow:"md",borderWidth:"1px",children:e.jsxs(I,{align:"start",children:[e.jsx(v,{children:l.class_type}),e.jsx(y,{ml:3,children:e.jsx(v,{color:"red.400",children:l.received_value})}),s&&r(s)&&e.jsxs(v,{children:["This model is already installed as"," ",e.jsx(v,{as:"span",color:"blue.400",fontWeight:600,children:s.existingModel})]}),s&&!r(s)&&s.fileFolder&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{children:[e.jsx(q,{size:"sm",isChecked:j.includes(s.filename),onChange:i=>{i.target.checked?n([...c,p[l.received_value]]):n(c.filter(f=>f.filename!==s.filename))}},s.filename),e.jsx(S,{label:s.infoUrl,children:e.jsx(C,{size:"sm",onClick:i=>{i.stopPropagation(),window.open(s.infoUrl??"","_blank")},leftIcon:e.jsx(U,{width:5,src:(g=s.downloadUrl)!=null&&g.includes("huggingface")?Y:$}),rightIcon:e.jsx(F,{size:20}),children:s.filename})})]}),e.jsxs(I,{children:[e.jsx(v,{width:"fit-content",children:"Install path:"}),((_=d[s.fileFolder])==null?void 0:_.length)&&e.jsx(B,{value:d[s.fileFolder].at(0),onChange:i=>{const f={...d},M=f[s.fileFolder].filter(w=>w!==i.target.value);f[s.fileFolder]=[i.target.value,...M],h(f)},children:d[s.fileFolder].map(i=>e.jsx("option",{value:i,children:i},i))})]})]}),!s&&e.jsx(C,{colorScheme:"blue",mt:5,iconSpacing:1,leftIcon:e.jsx(F,{size:20}),size:"sm",onClick:()=>{window.open(`https://civitai.com/search/models?sortBy=models_v7&query=${l.received_value}`,"_blank")},children:"Search in CivitAI"})]})})}function V({onClose:l,missingModels:c}){o.useEffect(()=>(x.canvasEl.addEventListener("click",l),()=>{x.canvasEl.removeEventListener("click",l)}),[]);const[n,d]=o.useState([]),[h,s]=o.useState({}),{setRoute:u}=o.useContext(A),p=o.useCallback(async()=>{const t=await D();t&&s(t)},[]),j=z();o.useEffect(()=>{p()},[]);const r=480,m=()=>{n.forEach(t=>{let a=t.downloadUrl;if(!a||!t.fileFolder||!h[t.fileFolder][0]){j({title:"Error",description:a?"Model install folder path is missing":"Download URL is missing",status:"error",duration:4e3,isClosable:!0});return}if(a.includes("civitai")){const g=K();g&&(a+=`?token=${g}`)}W({file_hash:t.fileHash??void 0,filename:t.name,save_path:h[t.fileFolder][0],url:a,force_filename:!0})}),j({title:"Installing...Please open Install Models modal or python terminal to view progress.",description:n.map(t=>t.filename).join(", "),status:"info",duration:4e3,isClosable:!0}),u("installModels")};return e.jsx(k,{children:e.jsx(H,{style:{width:r},children:e.jsxs(L,{width:r,height:"100vh",p:4,gap:2,position:"fixed",top:0,left:0,shadow:"xl",zIndex:T,overflowY:"auto",children:[e.jsx(P,{children:e.jsx(R,{justifyContent:"space-between",alignContent:"center",children:e.jsx(G,{size:"md",mr:2,children:"Missing Models"})})}),e.jsxs(C,{width:"fit-content",colorScheme:"teal",size:"sm",onClick:m,children:["Install Selected (",n.length,")"]}),e.jsx(N,{templateColumns:"1",gap:1,marginTop:2,width:"100%",children:c.map(t=>e.jsx(J,{model:t,setSelectedModelDeps:d,selectedModelDeps:n,foldersList:h,setFoldersList:s},t.received_value))})]})})})}function le({}){const[l,c]=o.useState(!1),[n,d]=o.useState([]);return o.useEffect(()=>{const h=x.queuePrompt;x.queuePrompt=async function(){var s,u;try{await h.apply(this,arguments)}finally{if(!((u=(s=x.graph.extra)==null?void 0:s[b])==null?void 0:u.deps))return;const j=x.lastNodeErrors??{};d(Object.values(j).flatMap(r=>{var m,t;return(t=(m=r==null?void 0:r.errors)==null?void 0:m.filter(a=>(a==null?void 0:a.type)==="value_not_in_list"))==null?void 0:t.map(a=>{const{input_name:g,received_value:_}=a.extra_info;return{class_type:r.class_type,input_name:g,received_value:_}})}))}}},[]),n.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs(C,{size:"sm","aria-label":"missing models",px:2,onClick:()=>c(!0),colorScheme:"teal",children:["Install Missing (",n.length,")"]}),l&&e.jsx(V,{onClose:()=>c(!1),missingModels:n})]})}export{le as default};
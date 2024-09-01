import{P as w,J as I,l as p,o as i,f as V,w as g,a as e,b as U,g as S,k as r,p as d,c,m as v,F as f,s as q,t as C,K as P,x as D,y as E}from"./app-DWnWl7Uq.js";import{_ as F,P as M}from"./Panel-CKx3QKRw.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-DC2suE5z.js";const l=u=>(D("data-v-a0167a25"),u=u(),E(),u),B={class:"container mx-auto p-4"},G=l(()=>e("h1",{class:"text-2xl font-bold mb-4"},"Post your recipe",-1)),L={class:"mb-4"},O=l(()=>e("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),T={class:"mb-4"},N=l(()=>e("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Description",-1)),z={class:"mb-4"},K=l(()=>e("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Instructions",-1)),R={class:"mb-4"},A=l(()=>e("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),J=["onUpdate:modelValue"],Q=["onUpdate:modelValue"],j=["onUpdate:modelValue"],H=["value"],W=["onClick"],X={class:"mb-4"},Y=l(()=>e("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),Z=l(()=>e("button",{type:"submit",class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-lg"},"Submit",-1)),ee={__name:"Create",setup(u){window.Pusher=w,window.Echo=new I({broadcaster:"pusher",key:"9ed8ddbfeadd466bd1a2",cluster:"us2",encrypted:!0,forceTLS:!0});const m=p(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)","Large","Medium","Small"]),_=p(["1/4","1/2","1/3","1","2","3"]),t=p({title:"",description:"",instruction:"",image_url:null,ingredients:[{name:"",quantity:_.value[0],unit:m.value[0]}]}),h=a=>{t.value.image_url=a.target.files[0]},y=()=>{t.value.ingredients.push({name:"",quantity:_.value[0],unit:m.value[0]})},x=a=>{t.value.ingredients.splice(a,1)},k=async()=>{const a=new FormData;a.append("title",t.value.title),a.append("description",t.value.description),a.append("instruction",t.value.instruction),t.value.image_url&&a.append("image_url",t.value.image_url),t.value.ingredients.forEach((o,s)=>{a.append(`ingredients[${s}][name]`,o.name),a.append(`ingredients[${s}][quantity]`,o.quantity),a.append(`ingredients[${s}][unit]`,o.unit)});try{q.post("/recipes",a)}catch(o){console.error("Error getting socket_id:",o)}};return(a,o)=>(i(),V(F,null,{default:g(()=>[e("div",B,[U(M,null,{default:g(()=>[G,e("form",{onSubmit:S(k,["prevent"])},[e("div",L,[O,r(e("input",{type:"text",id:"title","onUpdate:modelValue":o[0]||(o[0]=s=>t.value.title=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[d,t.value.title]])]),e("div",T,[N,r(e("textarea",{id:"description","onUpdate:modelValue":o[1]||(o[1]=s=>t.value.description=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[d,t.value.description]])]),e("div",z,[K,r(e("textarea",{id:"instruction","onUpdate:modelValue":o[2]||(o[2]=s=>t.value.instruction=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[d,t.value.instruction]])]),e("div",R,[A,(i(!0),c(f,null,v(t.value.ingredients,(s,b)=>(i(),c("div",{key:b,class:"flex items-center mb-2"},[r(e("input",{type:"text","onUpdate:modelValue":n=>s.name=n,placeholder:"Ingredient",class:"mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm"},null,8,J),[[d,s.name]]),r(e("input",{type:"text","onUpdate:modelValue":n=>s.quantity=n,placeholder:"e.g., 1 3/4",class:"mr-4 ml-4 p-2 pr-4 pl-6 rounded-md border-gray-300 shadow-sm"},null,8,Q),[[d,s.quantity]]),r(e("select",{"onUpdate:modelValue":n=>s.unit=n,class:"mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select"},[(i(!0),c(f,null,v(m.value,n=>(i(),c("option",{key:n,value:n},C(n),9,H))),128))],8,j),[[P,s.unit]]),e("button",{type:"button",onClick:n=>x(b),class:"text-red-500"},"Remove",8,W)]))),128)),e("button",{type:"button",onClick:y,class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-lg"},"Add Ingredient")]),e("div",X,[Y,e("input",{type:"file",id:"image",onChange:h,class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,32)]),Z],32)]),_:1})])]),_:1}))}},ne=$(ee,[["__scopeId","data-v-a0167a25"]]);export{ne as default};

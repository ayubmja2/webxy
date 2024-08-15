import{P as k,I,k as p,o as d,c as V,w as g,b as e,a as U,e as q,i,m as r,f as c,l as h,F as v,q as S,t as C,J as P,s as D,x as E}from"./app-CrjKwwG5.js";import{_ as F,P as M}from"./Panel-Bkwnt1yR.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-BpJIYqTZ.js";const n=u=>(D("data-v-81de6b89"),u=u(),E(),u),B={class:"container mx-auto p-4"},L=n(()=>e("h1",{class:"text-2xl font-bold mb-4"},"Post your recipe",-1)),T={class:"mb-4"},N=n(()=>e("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),z={class:"mb-4"},G=n(()=>e("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Description",-1)),O={class:"mb-4"},R=n(()=>e("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Instructions",-1)),A={class:"mb-4"},J=n(()=>e("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),K=["onUpdate:modelValue"],Q=["onUpdate:modelValue"],j=["onUpdate:modelValue"],H=["value"],W=["onClick"],X={class:"mb-4"},Y=n(()=>e("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),Z=n(()=>e("button",{type:"submit",class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Submit",-1)),ee={__name:"Create",setup(u){window.Pusher=k,window.Echo=new I({broadcaster:"pusher",key:"9ed8ddbfeadd466bd1a2",cluster:"us2",encrypted:!0,forceTLS:!0});const m=p(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)","Large","Medium","Small"]),_=p(["1/4","1/2","1/3","1","2","3"]),t=p({title:"",description:"",instruction:"",image_url:null,ingredients:[{name:"",quantity:_.value[0],unit:m.value[0]}]}),f=o=>{t.value.image_url=o.target.files[0]},y=()=>{t.value.ingredients.push({name:"",quantity:_.value[0],unit:m.value[0]})},x=o=>{t.value.ingredients.splice(o,1)},w=async()=>{const o=new FormData;o.append("title",t.value.title),o.append("description",t.value.description),o.append("instruction",t.value.instruction),t.value.image_url&&o.append("image_url",t.value.image_url),t.value.ingredients.forEach((a,s)=>{o.append(`ingredients[${s}][name]`,a.name),o.append(`ingredients[${s}][quantity]`,a.quantity),o.append(`ingredients[${s}][unit]`,a.unit)});try{S.post("/recipes",o)}catch(a){console.error("Error getting socket_id:",a)}};return(o,a)=>(d(),V(F,null,{default:g(()=>[e("div",B,[U(M,null,{default:g(()=>[L,e("form",{onSubmit:q(w,["prevent"])},[e("div",T,[N,i(e("input",{type:"text",id:"title","onUpdate:modelValue":a[0]||(a[0]=s=>t.value.title=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[r,t.value.title]])]),e("div",z,[G,i(e("textarea",{id:"description","onUpdate:modelValue":a[1]||(a[1]=s=>t.value.description=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[r,t.value.description]])]),e("div",O,[R,i(e("textarea",{id:"instruction","onUpdate:modelValue":a[2]||(a[2]=s=>t.value.instruction=s),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[r,t.value.instruction]])]),e("div",A,[J,(d(!0),c(v,null,h(t.value.ingredients,(s,b)=>(d(),c("div",{key:b,class:"flex items-center mb-2"},[i(e("input",{type:"text","onUpdate:modelValue":l=>s.name=l,placeholder:"Ingredient",class:"mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm"},null,8,K),[[r,s.name]]),i(e("input",{type:"text","onUpdate:modelValue":l=>s.quantity=l,placeholder:"e.g., 1 3/4",class:"mr-4 ml-4 p-2 pr-4 pl-6 rounded-md border-gray-300 shadow-sm"},null,8,Q),[[r,s.quantity]]),i(e("select",{"onUpdate:modelValue":l=>s.unit=l,class:"mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select"},[(d(!0),c(v,null,h(m.value,l=>(d(),c("option",{key:l,value:l},C(l),9,H))),128))],8,j),[[P,s.unit]]),e("button",{type:"button",onClick:l=>x(b),class:"text-red-500"},"Remove",8,W)]))),128)),e("button",{type:"button",onClick:y,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Add Ingredient")]),e("div",X,[Y,e("input",{type:"file",id:"image",onChange:f,class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,32)]),Z],32)]),_:1})])]),_:1}))}},le=$(ee,[["__scopeId","data-v-81de6b89"]]);export{le as default};

import{P as V,L as S,l as _,o as d,f as U,w as c,a as e,b as g,g as q,k as r,p as i,c as m,m as y,F as v,s as C,t as P,B,x as D,y as E}from"./app-BHc7oQ3Z.js";import{_ as F,P as b}from"./Panel-ThR72wXX.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-auOOAkA6.js";const n=u=>(D("data-v-2dfe1691"),u=u(),E(),u),M={class:"p-4"},$=n(()=>e("h1",{class:"text-2xl font-bold mb-6"},"Share your recipe",-1)),z={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"},G=n(()=>e("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),O=n(()=>e("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Description",-1)),T=n(()=>e("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Instructions",-1)),N={class:"mb-4"},R=n(()=>e("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),j={class:"mb-4 space-y-4"},A=n(()=>e("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),K=["onUpdate:modelValue"],Q=["onUpdate:modelValue"],H=["onUpdate:modelValue"],J=["value"],W=["onClick","disabled"],X=n(()=>e("button",{type:"submit",class:"mt-4 bg-darkOrange text-mintGreen p-3 px-4 rounded-2xl col-span-2 w-3/4 justify-self-center"},"Submit",-1)),Y={__name:"Create",setup(u){window.Pusher=V,window.Echo=new S({broadcaster:"pusher",key:"9ed8ddbfeadd466bd1a2",cluster:"us2",encrypted:!0,forceTLS:!0});const p=_(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)","Large","Medium","Small"]),f=_(["1/4","1/2","1/3","1","2","3"]),t=_({title:"",description:"",instruction:"",image_url:null,ingredients:[{name:"",quantity:f.value[0],unit:p.value[0]}]}),x=a=>{t.value.image_url=a.target.files[0]},w=()=>{t.value.ingredients.push({name:"",quantity:f.value[0],unit:p.value[0]})},k=a=>{t.value.ingredients.splice(a,1)},I=async()=>{const a=new FormData;a.append("title",t.value.title),a.append("description",t.value.description),a.append("instruction",t.value.instruction),t.value.image_url&&a.append("image_url",t.value.image_url),t.value.ingredients.forEach((l,s)=>{a.append(`ingredients[${s}][name]`,l.name),a.append(`ingredients[${s}][quantity]`,l.quantity),a.append(`ingredients[${s}][unit]`,l.unit)});try{C.post("/recipes",a)}catch(l){console.error("Error getting socket_id:",l)}};return(a,l)=>(d(),U(F,null,{default:c(()=>[e("div",M,[g(b,null,{default:c(()=>[$,e("form",{onSubmit:q(I,["prevent"])},[e("div",z,[g(b,{class:"space-y-4"},{default:c(()=>[G,r(e("input",{type:"text",id:"title","onUpdate:modelValue":l[0]||(l[0]=s=>t.value.title=s),class:"mt-1 p-2 block w-full rounded-xl border-gray-300 shadow-sm"},null,512),[[i,t.value.title]]),O,r(e("textarea",{id:"description","onUpdate:modelValue":l[1]||(l[1]=s=>t.value.description=s),class:"mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"},null,512),[[i,t.value.description]]),T,r(e("textarea",{id:"instruction","onUpdate:modelValue":l[2]||(l[2]=s=>t.value.instruction=s),class:"mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"},null,512),[[i,t.value.instruction]]),e("div",N,[R,e("input",{type:"file",id:"image",onChange:x,class:"mt-1 p-2 block w-full rounded-xl border-gray-300 shadow-sm"},null,32)])]),_:1}),g(b,null,{default:c(()=>[e("div",j,[A,(d(!0),m(v,null,y(t.value.ingredients,(s,h)=>(d(),m("div",{key:h,class:"flex flex-wrap items-center mb-2 space-y-2 md:space-y-0"},[r(e("input",{type:"text","onUpdate:modelValue":o=>s.name=o,placeholder:"Ingredient",class:"block w-full md:w-1/4 p-2 flex-1 rounded-xl border-gray-300 shadow-sm mr-2"},null,8,K),[[i,s.name]]),r(e("input",{type:"text","onUpdate:modelValue":o=>s.quantity=o,placeholder:"e.g., 1 3/4",class:"block w-full md:w-1/5 p-2 rounded-xl border-gray-300 shadow-sm mr-4"},null,8,Q),[[i,s.quantity]]),r(e("select",{"onUpdate:modelValue":o=>s.unit=o,class:"block w-full md:w-1/4 p-2 rounded-xl border-gray-300 shadow-sm mr-2"},[(d(!0),m(v,null,y(p.value,o=>(d(),m("option",{key:o,value:o},P(o),9,J))),128))],8,H),[[B,s.unit]]),e("button",{type:"button",onClick:o=>k(h),class:"text-red-500 ml-2",disabled:t.value.ingredients.length===1},"Remove",8,W)]))),128)),e("button",{type:"button",onClick:w,class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-lg"},"Add Ingredient")])]),_:1}),X])],32)]),_:1})])]),_:1}))}},ae=L(Y,[["__scopeId","data-v-2dfe1691"]]);export{ae as default};

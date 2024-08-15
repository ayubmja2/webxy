import{Q as R,k as p,o as n,c as P,w as V,b as o,a as T,e as B,i as c,m as _,f as r,l as f,F as g,t as h,g as Q,q as y,J as q,s as z,x as G}from"./app-BH1315As.js";import{_ as L,P as O}from"./Panel-C9nSVQ9T.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-5skrhnF2.js";const u=v=>(z("data-v-5dc41d31"),v=v(),G(),v),J={class:"container mx-auto p-4"},K=u(()=>o("h1",{class:"text-2xl font-bold mb-4"},"Edit your recipe",-1)),j={class:"mb-4"},W=u(()=>o("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),X={class:"mb-4"},Y=u(()=>o("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Recipe Description",-1)),Z={class:"mb-4"},ee=u(()=>o("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Recipe Instruction",-1)),te={class:"mb-4"},oe=u(()=>o("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),se=["onUpdate:modelValue"],ae=["onUpdate:modelValue"],le=["value"],ne=["onUpdate:modelValue"],ie=["value"],re=["onClick"],ue={key:0,class:"text-red-500 text-sm mt-2"},de={class:"mb-4"},ce=u(()=>o("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),me=u(()=>o("button",{type:"submit",class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Submit",-1)),pe={__name:"Edit",setup(v){const{props:I}=R(),d=p(I.recipe||{}),x=p(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)"]),k=p(["1/4","1/2","1/8","1/16","1","2","3","4","5"]);function U(e){let t=1,m=0,l=0,b=e;do{let w=Math.floor(b),M=t;t=w*t+m,m=M,b=1/(b-w)}while(Math.abs(e-t/l)>e*1e-6);return`${t}/${l}`}function C(e){const[s,t]=e.split("/").map(Number);return t?s/t:parseFloat(e)}function E(e){const s=parseFloat(e);return!isNaN(s)&&s%1!==0?U(s):e}const a=p({title:d.value.title||"",description:d.value.description||"",instruction:d.value.instruction||"",image_url:null,ingredients:(d.value.ingredients||[]).map(e=>({name:e.name,quantity:E(e.pivot.quantity),unit:e.pivot.unit}))}),i=p(""),F=()=>{a.value.ingredients.push({name:"",quantity:k.value[0],unit:x.value[0]}),i.value=""},$=e=>{a.value.ingredients.length>1?a.value.ingredients.splice(e,1):i.value="At least one ingredient is required."},S=e=>{a.value.image_url=e.target.files[0]},D=()=>{let e=!0;return i.value="",a.value.ingredients.length<1&&(i.value="At least one ingredient is required.",e=!1),a.value.ingredients.forEach(s=>{(!s.name||!s.quantity||!s.unit)&&(i.value="All ingredient fields are required.",e=!1)}),e},N=()=>{if(!D())return;const e=new FormData;e.append("title",a.value.title),e.append("description",a.value.description),e.append("instruction",a.value.instruction),a.value.image_url&&e.append("image_url",a.value.image_url),e.append("_method","PATCH"),a.value.ingredients.forEach((s,t)=>{e.append(`ingredients[${t}][name]`,s.name),e.append(`ingredients[${t}][quantity]`,s.quantity),e.append(`ingredients[${t}][unit]`,s.unit)}),y.post(`/recipes/${d.value.id}`,e)},A=()=>{confirm("Are you sure you want to delete this recipe")&&y.delete(`/recipes/${d.value.id}`,{onSuccess:()=>{y.visit("/recipes")},onError:e=>{console.log("Recipe deletion failed",e)}})};return(e,s)=>(n(),P(L,null,{default:V(()=>[o("div",J,[T(O,null,{default:V(()=>[K,o("form",{onSubmit:B(N,["prevent"])},[o("div",j,[W,c(o("input",{type:"text",id:"title","onUpdate:modelValue":s[0]||(s[0]=t=>a.value.title=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,a.value.title]])]),o("div",X,[Y,c(o("textarea",{id:"description","onUpdate:modelValue":s[1]||(s[1]=t=>a.value.description=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,a.value.description]])]),o("div",Z,[ee,c(o("textarea",{id:"instruction","onUpdate:modelValue":s[2]||(s[2]=t=>a.value.instruction=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,a.value.instruction]])]),o("div",te,[oe,(n(!0),r(g,null,f(a.value.ingredients,(t,m)=>(n(),r("div",{key:m,class:"flex items-center mb-2"},[c(o("input",{type:"text","onUpdate:modelValue":l=>t.name=l,placeholder:"Ingredient",class:"mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm"},null,8,se),[[_,t.name]]),c(o("select",{"onUpdate:modelValue":l=>t.quantity=l,class:"mr-4 ml-4 p-2 pr-4 pl-6 rounded-md border-gray-300 shadow-sm quantity-select"},[(n(!0),r(g,null,f(k.value,l=>(n(),r("option",{key:l,value:C(l)},h(l),9,le))),128))],8,ae),[[q,t.quantity]]),c(o("select",{"onUpdate:modelValue":l=>t.unit=l,class:"mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select"},[(n(!0),r(g,null,f(x.value,l=>(n(),r("option",{key:l,value:l},h(l),9,ie))),128))],8,ne),[[q,t.unit]]),o("button",{type:"button",onClick:l=>$(m),class:"text-red-500"},"Remove",8,re)]))),128)),o("button",{type:"button",onClick:F,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Add Ingredient "),i.value?(n(),r("div",ue,h(i.value),1)):Q("",!0)]),o("div",de,[ce,o("input",{type:"file",id:"image",onChange:S,class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,32)]),me,o("button",{type:"button",onClick:A,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Delete")],32)]),_:1})])]),_:1}))}},ge=H(pe,[["__scopeId","data-v-5dc41d31"]]);export{ge as default};

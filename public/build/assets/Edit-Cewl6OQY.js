import{Q as N,k as p,o as n,c as R,w as V,b as t,a as P,e as B,i as c,m as _,f as r,l as f,F as g,t as h,g as T,q as y,J as q,s as Q,x as z}from"./app-BfLpdFZA.js";import{_ as G,P as L}from"./Panel-CmznCs23.js";import{_ as O}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-CIUf4kgw.js";const d=v=>(Q("data-v-83cdd20d"),v=v(),z(),v),H={class:"container mx-auto p-4"},J=d(()=>t("h1",{class:"text-2xl font-bold mb-4"},"Edit your recipe",-1)),K={class:"mb-4"},j=d(()=>t("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),W={class:"mb-4"},X=d(()=>t("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Recipe Description",-1)),Y={class:"mb-4"},Z=d(()=>t("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Recipe Instruction",-1)),ee={class:"mb-4"},te=d(()=>t("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),oe=["onUpdate:modelValue"],se=["onUpdate:modelValue"],ae=["value"],le=["onUpdate:modelValue"],ne=["value"],ie=["onClick"],re={key:0,class:"text-red-500 text-sm mt-2"},de={class:"mb-4"},ue=d(()=>t("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),ce=d(()=>t("button",{type:"submit",class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Submit",-1)),me={__name:"Edit",setup(v){const{props:I}=N(),u=p(I.recipe||{}),x=p(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)"]),k=p(["1/4","1/2","1/8","1/16","1","2","3","4","5"]);function U(e){let o=1,m=0,l=0,b=e;do{let w=Math.floor(b),M=o;o=w*o+m,m=M,b=1/(b-w)}while(Math.abs(e-o/l)>e*1e-6);return`${o}/${l}`}function C(e){const a=parseFloat(e);return!isNaN(a)&&a%1!==0?U(a):e}const s=p({title:u.value.title||"",description:u.value.description||"",instruction:u.value.instruction||"",image_url:null,ingredients:(u.value.ingredients||[]).map(e=>({name:e.name,quantity:C(e.pivot.quantity),unit:e.pivot.unit}))}),i=p(""),E=()=>{s.value.ingredients.push({name:"",quantity:k.value[0],unit:x.value[0]}),i.value=""},$=e=>{s.value.ingredients.length>1?s.value.ingredients.splice(e,1):i.value="At least one ingredient is required."},F=e=>{s.value.image_url=e.target.files[0]},S=()=>{let e=!0;return i.value="",s.value.ingredients.length<1&&(i.value="At least one ingredient is required.",e=!1),s.value.ingredients.forEach(a=>{(!a.name||!a.quantity||!a.unit)&&(i.value="All ingredient fields are required.",e=!1)}),e},A=()=>{if(!S())return;const e=new FormData;e.append("title",s.value.title),e.append("description",s.value.description),e.append("instruction",s.value.instruction),s.value.image_url&&e.append("image_url",s.value.image_url),e.append("_method","PATCH"),s.value.ingredients.forEach((a,o)=>{e.append(`ingredients[${o}][name]`,a.name),e.append(`ingredients[${o}][quantity]`,a.quantity),e.append(`ingredients[${o}][unit]`,a.unit)}),y.post(`/recipes/${u.value.id}`,e)},D=()=>{confirm("Are you sure you want to delete this recipe")&&y.delete(`/recipes/${u.value.id}`,{onSuccess:()=>{y.visit("/recipes")},onError:e=>{console.log("Recipe deletion failed",e)}})};return(e,a)=>(n(),R(G,null,{default:V(()=>[t("div",H,[P(L,null,{default:V(()=>[J,t("form",{onSubmit:B(A,["prevent"])},[t("div",K,[j,c(t("input",{type:"text",id:"title","onUpdate:modelValue":a[0]||(a[0]=o=>s.value.title=o),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,s.value.title]])]),t("div",W,[X,c(t("textarea",{id:"description","onUpdate:modelValue":a[1]||(a[1]=o=>s.value.description=o),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,s.value.description]])]),t("div",Y,[Z,c(t("textarea",{id:"instruction","onUpdate:modelValue":a[2]||(a[2]=o=>s.value.instruction=o),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[_,s.value.instruction]])]),t("div",ee,[te,(n(!0),r(g,null,f(s.value.ingredients,(o,m)=>(n(),r("div",{key:m,class:"flex items-center mb-2"},[c(t("input",{type:"text","onUpdate:modelValue":l=>o.name=l,placeholder:"Ingredient",class:"mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm"},null,8,oe),[[_,o.name]]),c(t("select",{"onUpdate:modelValue":l=>o.quantity=l,class:"mr-4 ml-4 p-2 pr-4 pl-6 rounded-md border-gray-300 shadow-sm quantity-select"},[(n(!0),r(g,null,f(k.value,l=>(n(),r("option",{key:l,value:l},h(l),9,ae))),128))],8,se),[[q,o.quantity]]),c(t("select",{"onUpdate:modelValue":l=>o.unit=l,class:"mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select"},[(n(!0),r(g,null,f(x.value,l=>(n(),r("option",{key:l,value:l},h(l),9,ne))),128))],8,le),[[q,o.unit]]),t("button",{type:"button",onClick:l=>$(m),class:"text-red-500"},"Remove",8,ie)]))),128)),t("button",{type:"button",onClick:E,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Add Ingredient "),i.value?(n(),r("div",re,h(i.value),1)):T("",!0)]),t("div",de,[ue,t("input",{type:"file",id:"image",onChange:F,class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,32)]),ce,t("button",{type:"button",onClick:D,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Delete")],32)]),_:1})])]),_:1}))}},fe=O(me,[["__scopeId","data-v-83cdd20d"]]);export{fe as default};

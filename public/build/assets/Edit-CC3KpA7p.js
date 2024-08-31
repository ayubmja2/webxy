import{Q as A,k as f,o as p,c as R,w as k,b as o,a as T,e as B,i as g,m as b,f as _,l as w,F as $,t as q,g as G,q as y,J as O,s as Q,x as z}from"./app-D3smY0wd.js";import{_ as L}from"./AuthenticatedLayout-kgJndhos.js";import{P as H}from"./Panel-CHeHEeyC.js";import{_ as J}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-GAHcZ-Dm.js";const u=v=>(Q("data-v-49cdf7e8"),v=v(),z(),v),K={class:"container mx-auto p-4"},j=u(()=>o("h1",{class:"text-2xl font-bold mb-4"},"Edit your recipe",-1)),W={class:"mb-4"},X=u(()=>o("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Recipe Name",-1)),Y={class:"mb-4"},Z=u(()=>o("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Recipe Description",-1)),ee={class:"mb-4"},te=u(()=>o("label",{for:"instruction",class:"block text-sm font-medium text-gray-700"},"Recipe Instruction",-1)),se={class:"mb-4"},oe=u(()=>o("label",{class:"block text-sm font-medium text-gray-700"},"Ingredients",-1)),ne=["onUpdate:modelValue"],ae=["value"],le=["onUpdate:modelValue"],ie=["value"],re=["onClick"],ue={key:0,class:"text-red-500 text-sm mt-2"},de={class:"mb-4"},ce=u(()=>o("label",{for:"image",class:"block text-sm font-medium text-gray-700"},"Image",-1)),pe=u(()=>o("button",{type:"submit",class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-lg"},"Submit",-1)),me={__name:"Edit",setup(v){const{props:I}=A(),d=f(I.recipe||{}),x=f(["Gram (g)","Kilogram (kg)","Ounce (oz)","Pound (lb)","Teaspoon (tsp)","Tablespoon (tbsp)","Cup (c)","Fluid Ounce (fl oz)","Pint (pt)","Quart (qt)","Gallon (gal)","Milliliter (ml)","Liter (l)"]),V=f(["1/4","1/2","1/8","1/16","1","2","3","4","5","6"]);function F(e){if(!e||e%1===0)return e.toString();const s=1e-6;let t=1,l=0,n=0,m=1,h=e;do{let r=Math.floor(h),c=t;t=r*t+l,l=c,c=n,n=r*n+m,m=c,h=1/(h-r)}while(Math.abs(e-t/n)>e*s);if(t%n===0)return`${t/n}`;{const r=Math.floor(t/n),c=t%n;return r===0?`${t}/${n}`:c===0?`${r}`:`${r} ${c}/${n}`}}function S(e){typeof e!="string"&&(e=e.toString());let s=e.split(" "),t=0,l=e;s.length>1&&(t=parseFloat(s[0]),l=s[1]);const[n,m]=l.split("/").map(Number);return m?t+n/m:parseFloat(e)}function C(e){if(typeof e=="string"&&e.includes(" "))return e;const s=parseFloat(e);return!isNaN(s)&&s%1!==0?F(s):e}const a=f({title:d.value.title||"",description:d.value.description||"",instruction:d.value.instruction||"",image_url:null,ingredients:(d.value.ingredients||[]).map(e=>({name:e.name,quantity:e.pivot.quantity,unit:e.pivot.unit}))}),i=f(""),E=()=>{a.value.ingredients.push({name:"",quantity:V.value[0],unit:x.value[0]}),i.value=""},P=e=>{a.value.ingredients.length>1?a.value.ingredients.splice(e,1):i.value="At least one ingredient is required."},U=e=>{a.value.image_url=e.target.files[0]},D=()=>{let e=!0;return i.value="",a.value.ingredients.length<1&&(i.value="At least one ingredient is required.",e=!1),a.value.ingredients.forEach(s=>{(!s.name||!s.quantity||!s.unit)&&(i.value="All ingredient fields are required.",e=!1)}),e},M=()=>{if(!D())return;const e=new FormData;e.append("title",a.value.title),e.append("description",a.value.description),e.append("instruction",a.value.instruction),a.value.image_url&&e.append("image_url",a.value.image_url),e.append("_method","PATCH"),a.value.ingredients.forEach((s,t)=>{e.append(`ingredients[${t}][name]`,s.name),e.append(`ingredients[${t}][quantity]`,S(s.quantity)),e.append(`ingredients[${t}][unit]`,s.unit)}),y.post(`/recipes/${d.value.id}`,e)},N=()=>{confirm("Are you sure you want to delete this recipe")&&y.delete(`/recipes/${d.value.id}`,{onSuccess:()=>{y.visit("/recipes")},onError:e=>{console.log("Recipe deletion failed",e)}})};return(e,s)=>(p(),R(L,null,{default:k(()=>[o("div",K,[T(H,null,{default:k(()=>[j,o("form",{onSubmit:B(M,["prevent"])},[o("div",W,[X,g(o("input",{type:"text",id:"title","onUpdate:modelValue":s[0]||(s[0]=t=>a.value.title=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[b,a.value.title]])]),o("div",Y,[Z,g(o("textarea",{id:"description","onUpdate:modelValue":s[1]||(s[1]=t=>a.value.description=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[b,a.value.description]])]),o("div",ee,[te,g(o("textarea",{id:"instruction","onUpdate:modelValue":s[2]||(s[2]=t=>a.value.instruction=t),class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,512),[[b,a.value.instruction]])]),o("div",se,[oe,(p(!0),_($,null,w(a.value.ingredients,(t,l)=>(p(),_("div",{key:l,class:"flex items-center mb-2"},[g(o("input",{type:"text","onUpdate:modelValue":n=>t.name=n,placeholder:"Ingredient",class:"mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm"},null,8,ne),[[b,t.name]]),o("input",{type:"text",value:C(t.quantity),placeholder:"e.g., 1 1/2",class:"mr-4 p-2 rounded-md border-gray-300 shadow-sm"},null,8,ae),g(o("select",{"onUpdate:modelValue":n=>t.unit=n,class:"mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select"},[(p(!0),_($,null,w(x.value,n=>(p(),_("option",{key:n,value:n},q(n),9,ie))),128))],8,le),[[O,t.unit]]),o("button",{type:"button",onClick:n=>P(l),class:"text-red-500"},"Remove",8,re)]))),128)),o("button",{type:"button",onClick:E,class:"bg-blue-500 text-white py-2 px-4 rounded-lg"},"Add Ingredient "),i.value?(p(),_("div",ue,q(i.value),1)):G("",!0)]),o("div",de,[ce,o("input",{type:"file",id:"image",onChange:U,class:"mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"},null,32)]),pe,o("button",{type:"button",onClick:N,class:"bg-red-700 text-mintGreen py-2 px-4 rounded-lg"},"Delete")],32)]),_:1})])]),_:1}))}},he=J(me,[["__scopeId","data-v-49cdf7e8"]]);export{he as default};

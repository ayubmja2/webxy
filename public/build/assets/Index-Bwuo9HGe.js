import{l as p,x as $,y as j,f as E,w as d,o as i,a as t,d as n,g as y,e as g,t as h,c as u,m as k,F as b,k as M,z as L,p as U,h as z,s as G}from"./app-lU8TWT0b.js";import{_ as J,P as D}from"./Panel-BiDUElB3.js";import{_ as B}from"./RecipeCard-DsPsRBik.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-CCfLUJ2G.js";const q={class:"mx-5 mt-20"},A={class:"grid grid-cols-3 gap-2"},H={class:"flex flex-col space-y-4"},K={class:"flex flex-col text-center font-medium text-2xl text-mintGreen space-y-4 mx-auto"},Q={class:"container"},Y={class:"flex flex-col"},Z={class:"grid grid-rows-1"},ee={class:"grid grid-cols-3"},ae={class:"col-start-2 font-medium text-center"},se={class:"grid grid-cols-2 gap-4 mt-4"},te=["onDrop"],le=["onClick"],oe={class:"container"},re=["value"],ne={class:"flex justify-evenly"},de={key:0,class:"mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1"},ie=["onDragstart"],ue={key:1},ce={__name:"Index",setup(pe){const O=p("Friday"),l=p(O),w=p([]),f=p(null),m=p(""),x=p([]),_=p(null),c=()=>[{mealType:"Breakfast",recipes:[]},{mealType:"Lunch",recipes:[]},{mealType:"Snack",recipes:[]},{mealType:"Dinner",recipes:[]}],o=p({Sunday:c(),Monday:c(),Tuesday:c(),Wednesday:c(),Thursday:c(),Friday:c(),Saturday:c()});$(async()=>{const a=localStorage.getItem("selectedDay");a&&(l.value=a);try{const e=await axios.get("/meal-plans");e.data&&(o.value={...o.value,...e.data.reduce((r,s)=>(r[s.day]=JSON.parse(s.meals)||[...c],r),{})})}catch(e){console.log("Failed to load meal Plans:",e)}});const v=a=>{l.value=a,o.value={...o.value},localStorage.setItem("selectedDay",a)},R=a=>{_.value=a},I=a=>{a.preventDefault()},N=async a=>{if(a.recipes||(a.recipes=[]),_.value){a.recipes=[...a.recipes,_.value],_.value=null,o.value[l.value]=[...o.value[l.value]];try{await axios.post("/meal-plans",{day:l.value,meals:o.value[l.value]})}catch(e){console.error("Failed to save meal plan:",e)}}},P=(a,e)=>{if(a.recipes){a.recipes=a.recipes.slice(),a.recipes.splice(e,1),o.value={...o.value};try{axios.post("/meal-plans",{day:l.value,meals:o.value[l.value]})}catch(r){console.error("Failed to save meal plan after deletion:",r)}}},V=async()=>{try{await axios.delete("/meal-plans",{data:{day:l.value}}),o.value[l.value].forEach(a=>{a.recipes=[]}),console.log("Meal plan deleted successfully")}catch(a){console.error("Failed to delete meal plan:",a)}};$(async()=>{try{const a=await axios.get("/categories");w.value=a.data}catch(a){console.log("Failed to load categories:",a)}});const W=async()=>{if(f.value)try{const a=await axios.post("/recipes/search",{category_id:f.value,search:m.value});m.value?x.value=a.data:x.value=[]}catch(a){console.log("Failed to search recipes:",a)}},T=a=>{G.get(`/recipes/${a}`)};return(a,e)=>{const r=j("Button");return i(),E(J,null,{default:d(()=>[t("div",q,[t("div",A,[n(D,{class:"h-lvh"},{default:d(()=>[t("div",H,[t("div",K,[n(r,{onClick:e[0]||(e[0]=y(s=>v("Sunday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[9]||(e[9]=[g("Sunday")])),_:1}),n(r,{onClick:e[1]||(e[1]=y(s=>v("Monday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[10]||(e[10]=[g("Monday")])),_:1}),n(r,{onClick:e[2]||(e[2]=y(s=>v("Tuesday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[11]||(e[11]=[g("Tuesday")])),_:1}),n(r,{onClick:e[3]||(e[3]=y(s=>v("Wednesday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[12]||(e[12]=[g("Wednesday")])),_:1}),n(r,{onClick:e[4]||(e[4]=y(s=>v("Thursday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[13]||(e[13]=[g("Thursday")])),_:1}),n(r,{onClick:e[5]||(e[5]=y(s=>v("Friday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[14]||(e[14]=[g("Friday")])),_:1}),n(r,{onClick:e[6]||(e[6]=y(s=>v("Saturday"),["prevent"])),class:"p-2 px-20 bg-darkOrange/90 rounded-2xl"},{default:d(()=>e[15]||(e[15]=[g("Saturday")])),_:1})])])]),_:1}),n(D,null,{default:d(()=>[t("div",Q,[t("div",Y,[t("div",Z,[t("div",ee,[t("div",ae,h(l.value),1),t("div",{class:"col-start-3 justify-self-end space-x-4"},[t("i",{onClick:V,class:"fa-solid fa-trash my-auto text-red-600 text-lg"})])])]),t("div",se,[(i(!0),u(b,null,k(o.value[l.value],(s,C)=>(i(),u("div",{key:C,class:"border p-4 rounded-lg bg-gray-100",onDragover:I,onDrop:F=>N(s)},[t("h3",null,h(s.mealType),1),(i(!0),u(b,null,k(s.recipes,(F,S)=>(i(),u("div",{key:S,class:"relative mt-4"},[n(B,{class:"my-recipe",recipe:F,navigateToRecipe:T,showBookmark:!1,compact:!0,showFooter:!1},null,8,["recipe"]),t("button",{class:"absolute top-0 right-0 text-red-700 bg-transparent px-2 py-1",onClick:ve=>P(s,S)}," X ",8,le)]))),128))],40,te))),128))])])])]),_:1}),n(D,null,{default:d(()=>[t("div",oe,[M(t("select",{"onUpdate:modelValue":e[7]||(e[7]=s=>f.value=s),class:"w-full p-2 rounded border text-black"},[e[16]||(e[16]=t("option",{disabled:"",value:null},"Select a Category",-1)),(i(!0),u(b,null,k(w.value,s=>(i(),u("option",{key:s.id,value:s.id},h(s.title),9,re))),128))],512),[[L,f.value]]),M(t("input",{type:"text","onUpdate:modelValue":e[8]||(e[8]=s=>m.value=s),onInput:W,placeholder:"Search Recipes",class:"w-full p-2 mt-4 rounded border"},null,544),[[U,m.value]]),t("div",ne,[x.value.length>0?(i(),u("ul",de,[(i(!0),u(b,null,k(x.value,s=>(i(),u("li",{key:s.id,class:"p-2 mb-2 flex flex-col",draggable:"true",onDragstart:C=>R(s)},[n(B,{class:"my-recipe",recipe:s,navigateToRecipe:T,showBookmark:!1,compact:!0,showFooter:!1},null,8,["recipe"])],40,ie))),128))])):f.value!==""?(i(),u("p",ue,"No recipes found")):z("",!0)])])]),_:1})])])]),_:1})}}},_e=X(ce,[["__scopeId","data-v-2669e8b4"]]);export{_e as default};

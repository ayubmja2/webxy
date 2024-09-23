import{Q as j,l as n,z as L,D as M,o,f as w,w as _,q as G,a as s,b as h,n as I,e as Q,c as i,t as V,h as f,m as S,F as k,g as A,k as B,p as H,B as J,u as C,i as T,s as u,x as K,y as W}from"./app-CsnupR3F.js";import{_ as X,P as U}from"./Panel-R7w_ChzV.js";import{_ as Y}from"./RecipeCard-YjTHwMH7.js";import{_ as Z}from"./UserCard-LtFlQO2g.js";import{_ as ee}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-DmblA1aX.js";const c=b=>(K("data-v-47eda79d"),b=b(),W(),b),se={class:"w-full p-4 grid grid-cols-1 md:grid-cols-4 gap-4"},te={class:"col-span-1 md:col-span-2 h-full overflow-y-auto"},ae={class:"sticky top-0 z-10 flex justify-center space-x-4 mb-4"},re={key:0,class:"ml-2 bg-darkOrange text-mintGreen rounded-full px-2"},le={key:0,class:"bg-red-200 p-4 mb-4 rounded-lg"},oe=c(()=>s("p",null,"No recipes found. Maybe you should upload one!",-1)),ue=[oe],ne={key:1,class:"bg-red-200 p-4 mb-4 rounded-lg"},ce=c(()=>s("p",null,"No users found.",-1)),ie=[ce],de={key:4},pe={class:"md:block row-start-1 col-span-1 rounded-lg"},ve={class:"container bg-green-200 rounded-lg md:mb-8 p-4 row-start-1 md:m-auto"},_e=c(()=>s("h2",{class:"max-md:hidden text-lg font-bold mb-4 text-center"},"Search",-1)),fe={class:"container text-center"},ge=c(()=>s("option",{value:"recipes"},"Recipes",-1)),me=c(()=>s("option",{value:"users"},"Users",-1)),he=[ge,me],xe=c(()=>s("button",{type:"submit",class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-lg md:w-full"},"Search",-1)),be={class:"hidden md:block row-start-2 bg-green-200 p-4 rounded-lg text-center"},ye=c(()=>s("h2",{class:"text-lg font-bold mb-4"},"Collections",-1)),we=["onClick"],Se={class:"flex justify-center"},ke={class:"flex space-x-4 ml-2 mt-4"},Ce=c(()=>s("li",null,"About",-1)),Te=c(()=>s("li",null,"Career",-1)),Ue=c(()=>s("li",null,"Terms of service",-1)),Fe={__name:"Index",setup(b){const{props:x}=j(),v=n([]),O=n(0),d=n(!1),g=n(!1),P=n(x.categories),r=n(x.recipes),l=n(x.users),m=n(x.query||""),a=n("recipes"),y=n(x.showFollowing),F=async()=>{try{const e=await G.get("/api/notifications/unread");v.value=e.data}catch(e){console.log(e)}},R=async()=>{try{await G.post("/api/notifications/read"),v.value=[],N("following"),O.value=0}catch(e){console.log(e)}};L(()=>{F(),Echo.private("recipes").listen("RecipeUploaded",e=>{F()}).notification(e=>{v.value.push(e),v.value=[...v.value]})});const q=()=>{r.value.next_page_url?u.get(r.value.next_page_url,{},{preserveScroll:!0,preserveState:!0,onSuccess:e=>{r.value.data=r.value.data.concat(e.props.recipes.data),r.value.next_page_url=e.props.recipes.next_page_url,history.replaceState(null,"","/recipes")}}):a.value==="users"&&l.value.next_page_url&&u.get(l.value.next_page_url,{},{preserveScroll:!0,preserveState:!0,onSuccess:e=>{l.value.data=l.value.data.concat(e.props.users.data),l.value.next_page_url=e.props.users.next_page_url,history.replaceState(null,"","/profile")}})},N=e=>{const p=e==="following"?"/recipes?filter=following":"/recipes";u.get(p,{},{preserveScroll:!0,preserveState:!0,onSuccess:t=>{r.value=t.props.recipes,y.value=t.props.showFollowing}})};M(a,async()=>{m.value="",a.value==="recipes"?await u.visit("/recipes",{preserveScroll:!0,preserveState:!0,onSuccess:e=>{r.value=e.props.recipes,l.value={data:[]},d.value=!1}}):a.value==="users"&&await u.visit("/recipes",{preserveScroll:!0,preserveState:!0,onSuccess:e=>{l.value=e.props.users,r.value={data:[]},d.value=!1}})});const $=async()=>{d.value=!1,g.value=!0,m.value.trim()===""?a.value==="recipes"?await u.visit("/recipes",{preserveScroll:!0,preserveState:!0,onSuccess:e=>{r.value=e.props.recipes,l.value={data:[]},d.value=!1,g.value=!1}}):a.value==="users"&&await u.visit("/recipes",{preserveScroll:!0,preserveState:!0,onSuccess:e=>{l.value=e.props.users,r.value={data:[]},d.value=!1,g.value=!1}}):await u.get("/search",{query:m.value,type:a.value},{preserveState:!0,preserveScroll:!0,onSuccess:e=>{a.value==="recipes"?(r.value=e.props.recipes,l.value={data:[]}):a.value==="users"&&(l.value=e.props.users,r.value={data:[]}),g.value=!1,d.value=!0}})};M(m,e=>{e.trim()===""&&$()});const z=e=>{u.get(`/recipes/${e}`)},D=e=>{u.get(`/profile/${e}`)},E=e=>{u.get(`/categories/${e}`)};return(e,p)=>(o(),w(X,null,{default:_(()=>[s("div",se,[s("div",te,[s("div",ae,[h(U,{class:"container py-3 text-center space-x-8"},{default:_(()=>[s("button",{onClick:p[0]||(p[0]=t=>N("all")),class:I([y.value?"bg-gray-300":"bg-darkOrange text-mintGreen","p-2 px-4 rounded-lg"])},"Explore",2),s("button",{onClick:R,class:I([y.value?"bg-darkOrange text-mintGreen":"bg-gray-300","p-2 px-4 rounded-lg"])},[Q("Following "),v.value.length>0?(o(),i("span",re,V(v.value.length),1)):f("",!0)],2)]),_:1})]),h(U,null,{default:_(()=>[r.value.data.length===0&&a.value==="recipes"&&d.value&&!g.value?(o(),i("div",le,ue)):f("",!0),l.value.data.length===0&&a.value==="users"&&d.value&&!g.value?(o(),i("div",ne,ie)):f("",!0),a.value==="recipes"?(o(!0),i(k,{key:2},S(r.value.data,t=>(o(),w(Y,{key:t.id,recipe:t,navigateToRecipe:z},null,8,["recipe"]))),128)):f("",!0),a.value==="users"?(o(!0),i(k,{key:3},S(l.value.data,t=>(o(),w(Z,{key:t.id,user:t,navigateToUserProfile:D,class:"mb-6"},null,8,["user"]))),128)):f("",!0),a.value==="recipes"?(o(),i("div",de,[r.value.next_page_url?(o(),i("button",{key:0,onClick:q,class:"bg-blue-500 text-mintGreen py-2 px-4 rounded-lg mt-4 w-full"}," Load More ")):f("",!0)])):f("",!0)]),_:1})]),s("div",pe,[h(U,null,{default:_(()=>[s("div",ve,[_e,s("div",fe,[s("form",{onSubmit:A($,["prevent"]),class:"max-md:space-x-4"},[B(s("input",{type:"text","onUpdate:modelValue":p[1]||(p[1]=t=>m.value=t),class:"p-2 md:w-full rounded-lg mb-2 max-md:text-center",placeholder:"Search for recipe or user"},null,512),[[H,m.value]]),B(s("select",{"onUpdate:modelValue":p[2]||(p[2]=t=>a.value=t),class:"p-2 md:w-full rounded-lg mb-2 max-md:text-center"},he,512),[[J,a.value]]),xe],32)])]),s("div",be,[ye,(o(!0),i(k,null,S(P.value,t=>(o(),i("div",{key:t.id,class:"mb-2"},[s("button",{class:"bg-darkOrange text-mintGreen py-2 px-4 rounded-xl w-3/4 mb-4",onClick:Ne=>E(t.id)},V(t.title),9,we)]))),128))])]),_:1}),s("div",Se,[s("ul",ke,[h(C(T),{href:e.route("about")},{default:_(()=>[Ce]),_:1},8,["href"]),h(C(T),{href:e.route("career")},{default:_(()=>[Te]),_:1},8,["href"]),h(C(T),{href:e.route("terms")},{default:_(()=>[Ue]),_:1},8,["href"])])])])])]),_:1}))}},Oe=ee(Fe,[["__scopeId","data-v-47eda79d"]]);export{Oe as default};

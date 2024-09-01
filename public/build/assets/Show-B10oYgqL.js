import{Q as le,l as i,o as r,f as O,w as u,q as g,a as e,u as c,c as l,h as n,e as ne,b as d,n as w,t as b,k as L,p as M,F,m as P,A as ie,x as de,y as ce,s as z}from"./app-DWnWl7Uq.js";import{_ as ue,P as m}from"./Panel-CKx3QKRw.js";import me from"./DeleteUserForm-DceyqWbH.js";import fe from"./UpdatePasswordForm-BMODGtkr.js";import ge from"./UpdateProfileInformationForm-BSzNOFTX.js";import{_ as pe}from"./RecipeCard-CbZux5Lx.js";import{_ as Y}from"./UserCard-Bj0Glp75.js";import{_ as ve}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-DC2suE5z.js";import"./TextInput-MzNs2_ZU.js";import"./PrimaryButton-CE8Zc45E.js";const p=v=>(de("data-v-89e4584d"),v=v(),ce(),v),he={class:"relative"},we=["src"],_e={class:"absolute bottom-0 left-0 right-0 flex items-center justify-center mt-4"},xe={class:"relative"},ye=["src"],be={key:0,class:"absolute top-0 right-0 m-4"},ke=p(()=>e("i",{class:"fa-solid fa-gear fa-2x"},null,-1)),Ce=[ke],Oe={key:0,class:"absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20"},Fe={class:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"},Pe={class:"px-10"},$e={class:"mx-auto mt-4"},Se={class:"container mx-auto"},Ae={class:"flex justify-evenly items-center"},Be={key:0},Ge={key:1},Ie={key:2},Ue={key:0,class:"mt-4"},Ee=p(()=>e("div",{class:"text-center font-medium text-2xl mb-6"},[e("h1",null,"Profile")],-1)),Te={class:"mt-8"},De={class:"grid grid-cols-2 gap-4"},Re={class:"font-medium text-center"},Ve=p(()=>e("hr",{class:"border-darkOrange mt-4 mb-4"},null,-1)),je={key:1},Ne={key:0,class:"fixed z-10 inset-0 overflow-y-auto"},Le={class:"flex items-center justify-center min-h-screen"},Me={class:"bg-white p-6 rounded-center min-h-screen"},ze=p(()=>e("h2",{class:"text-xl mb-4"},"Edit Bio",-1)),Ye={class:"container mx-auto"},Ke={class:"flex justify-evenly mb-4"},qe={class:"container mx-auto w-3/4 overflow-hidden overflow-y-scroll"},Qe={key:0,class:"grid grid-cols-1 overflow-hidden overflow-y-scroll"},Xe={class:"h-96 mb-5"},He={key:1,class:"grid grid-cols-1 overflow-hidden overflow-y-scroll"},Je={key:1,class:"mt-4"},We={class:"text-center font-medium text-2xl mb-6"},Ze={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden overflow-y-scroll"},et={key:2,class:"grid grid-cols-2 p-2 mt-3 gap-4"},tt={class:"mb-3"},ot=p(()=>e("div",{class:"text-center font-medium text-2xl"},[e("h1",null,"Allergies")],-1)),st={class:"flex flex-col space-y-4 p-6 mx-auto"},at={class:"container mx-auto row-start-2 row-span-2"},rt=p(()=>e("div",{class:"text-center font-medium text-2xl"},[e("h1",null,"Your Food Allergies")],-1)),lt={class:"p-7 h-28 overflow-hidden overflow-x-scroll"},nt={class:"grid grid-rows-1 grid-flow-col gap-3 justify-items-center space-x-1"},it=["onClick"],dt={class:"container row-span-2"},ct={class:"grid grid-cols-1 h-96 font-medium text-2xl"},ut=p(()=>e("div",{class:"text-center"},[e("h3",null,"Account Stats")],-1)),mt={class:"container mt-2"},ft={class:"font-normal text-xl"},gt={key:3,class:"mt-2"},pt=p(()=>e("div",{class:"text-center mb-5 font-medium text-2xl"},[e("h1",null,"Account Settings")],-1)),vt={class:"grid grid-cols-3 gap-4 px-8 pb-8"},ht={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},wt={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},_t={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},xt={__name:"Show",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup(v){const{props:a}=le(),K=i(a.recipes||[]),B=i(a.user.cover_image_url||"/images/placeholders/default-cover.png"),G=i(a.user.profile_image_url||"/images/placeholders/default-profile.png"),I=i(null),U=i(null),$=i(!1),f=i("public-profile"),S=i(!1),k=i(a.user.bio||""),E=i(a.followers||[]),A=i(a.followersCount||0),q=i(a.recipeCount||0),T=i(a.following||[]),_=i("following"),Q=()=>{S.value=!0},D=()=>{S.value=!1},X=async()=>{try{await g.post("/profile/update-bio",{bio:k.value}),a.user.bio=k.value,D()}catch{alert("Failed to update bio.")}},H=async()=>{try{const t=await g.get(`/profile/${a.user.id}/followers`);E.value=t.data.followers}catch{console.log("Error fetching followers:")}},J=async()=>{try{const t=await g.get(`/profile/${a.user.id}/following`);T.value=t.data.following}catch{console.log("Error fetching following:")}};H(),J();const W=()=>{$.value=!$.value},Z=t=>{const o=t.target.files[0];if(o){const s=new FileReader;s.onload=y=>{B.value=y.target.result},s.readAsDataURL(o)}I.value=o,R("cover_image",I.value)},ee=t=>{const o=t.target.files[0];if(o){const s=new FileReader;s.onload=y=>{G.value=y.target.result},s.readAsDataURL(o)}U.value=o,R("profile_image",U.value)},R=async(t,o)=>{const s=new FormData;s.append(t,o);try{await g.post("/profile/update",s,{headers:{"Content-Type":"multipart/form-data"}})}catch{alert("Failed to update profile.")}},C=async t=>{f.value=t},V=t=>{_.value=t},x=i(""),h=i(a.user.allergens||[]),j=async()=>{if(!x.value.trim())return;const t=x.value.trim().toLowerCase();if(!h.value.includes(t))try{const o=await g.post("/profile/update-allergens",{allergens:[...h.value,t]});h.value=o.data.allergens,x.value=""}catch{alert("Failed to update allergens.")}},te=async t=>{try{const o=await g.post("/profile/update-allergens",{allergens:h.value.filter(s=>s!==t)});h.value=o.data.allergens}catch{alert("Failed to delete allergy.")}},oe=async()=>{try{(await g.post(`/profile/${a.user.name}/follow`)).status===200&&(a.isFollowing=!0,A.value+=1)}catch(t){console.log("Error following user",t)}},se=async()=>{try{(await g.post(`/profile/${a.user.name}/unfollow`)).status===200&&(a.isFollowing=!1,A.value-=1)}catch(t){console.log("Error unfollowing user:",t)}},ae=async t=>{try{await g.post(`/recipes/${t.id}/bookmark`),t.is_bookmarked=!t.is_bookmarked}catch(o){console.log("Error bookmarking recipe:",o)}},re=t=>{z.get(`/recipes/${t}`)},N=t=>{z.get(`/profile/${t}`)};return(t,o)=>(r(),O(ue,null,{default:u(()=>[e("div",he,[e("img",{src:B.value,alt:"cover art",class:"w-full h-60 object-cover"},null,8,we),e("div",_e,[e("div",xe,[e("img",{src:G.value,alt:"profile image",class:"w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer"},null,8,ye),c(a).isOwnProfile?(r(),l("input",{key:0,type:"file",onChange:ee,accept:"image/*",class:"absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full"},null,32)):n("",!0)])]),c(a).isOwnProfile?(r(),l("div",be,[e("button",{onClick:W,class:"text-mintGreen hover:text-blue-600"},Ce),$.value?(r(),l("div",Oe,[e("label",Fe,[e("input",{type:"file",onChange:Z,accept:"image/*",class:"hidden"},null,32),ne(" Upload Cover Art ")])])):n("",!0)])):n("",!0)]),e("div",Pe,[e("div",$e,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",Se,[e("ul",Ae,[e("li",null,[e("button",{onClick:o[0]||(o[0]=s=>C("public-profile")),class:w([{"text-mintGreen":f.value==="public-profile"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Profile ",2)]),c(a).isOwnProfile?n("",!0):(r(),l("li",Be,[e("button",{onClick:o[1]||(o[1]=s=>C("recipes")),class:w([{"text-mintGreen":f.value==="recipes"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Recipes ",2)])),c(a).isOwnProfile?(r(),l("li",Ge,[c(a).isOwnProfile?(r(),l("button",{key:0,onClick:o[2]||(o[2]=s=>C("account-info")),class:w([{"text-mintGreen":f.value==="account-info"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Account Info ",2)):n("",!0)])):n("",!0),c(a).isOwnProfile?(r(),l("li",Ie,[c(a).isOwnProfile?(r(),l("button",{key:0,onClick:o[3]||(o[3]=s=>C("settings")),class:w([{"text-mintGreen":f.value==="settings"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Settings ",2)):n("",!0)])):n("",!0)])])]),_:1})]),f.value==="public-profile"?(r(),l("div",Ue,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[Ee,e("div",Te,[e("div",De,[e("div",null,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[e("div",Re,[e("p",null,b(c(a).user.bio||"No bio available"),1)])]),_:1}),Ve,c(a).isOwnProfile?(r(),l("button",{key:0,onClick:Q,class:"bg-darkOrange text-mintGreen p-2 rounded mt-2"},"Edit Bio ")):n("",!0),c(a).auth.user.id!==c(a).user.id?(r(),l("div",je,[c(a).isFollowing?(r(),l("button",{key:1,onClick:se,class:"bg-red-500 text-mintGreen p-2 rounded"}," Unfollow ")):(r(),l("button",{key:0,onClick:oe,class:"bg-blue-500 text-mintGreen p-2 rounded"},"Follow "))])):n("",!0)]),S.value?(r(),l("div",Ne,[e("div",Le,[e("div",Me,[ze,L(e("textarea",{"onUpdate:modelValue":o[4]||(o[4]=s=>k.value=s),class:"w-full p-2 border rounded mb-4",rows:"4"},null,512),[[M,k.value]]),e("button",{onClick:X,class:"bg-green-500 text-mintGreen p-2 rounded"},"Save "),e("button",{onClick:D,class:"bg-red-500 text-mintGreen p-2 rounded"}," Cancel ")])])])):n("",!0),e("div",null,[e("div",Ye,[d(m,{class:"rounded-lg shadow-xl transform transition-transform space-y-1 mx-auto"},{default:u(()=>[e("ul",Ke,[e("li",null,[e("button",{onClick:o[5]||(o[5]=s=>V("followers")),class:w([{"text-mintGreen":_.value==="followers"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Followers ",2)]),e("li",null,[e("button",{onClick:o[6]||(o[6]=s=>V("following")),class:w([{"text-mintGreen":_.value==="following"},"bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Following ",2)])]),e("div",qe,[_.value==="followers"?(r(),l("ul",Qe,[e("li",Xe,[(r(!0),l(F,null,P(E.value,s=>(r(),O(Y,{user:s,key:s.id,navigateToUserProfile:N,class:"mb-2"},null,8,["user"]))),128))])])):n("",!0),_.value==="following"?(r(),l("ul",He,[e("li",null,[(r(!0),l(F,null,P(T.value,s=>(r(),O(Y,{user:s,key:s.id,navigateToUserProfile:N,class:"mb-2"},null,8,["user"]))),128))])])):n("",!0)])]),_:1})])])])])]),_:1})])):n("",!0),f.value==="recipes"?(r(),l("div",Je,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[e("div",We,[e("h1",null,b(c(a).user.name)+"'s Recipes",1)]),e("div",Ze,[(r(!0),l(F,null,P(K.value,s=>(r(),O(pe,{key:s.id,recipe:s,onToggleBookmark:ae,navigateToRecipe:re,class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},null,8,["recipe"]))),128))])]),_:1})])):n("",!0),f.value==="account-info"&&c(a).isOwnProfile?(r(),l("div",et,[e("div",null,[e("div",tt,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 w-3/4 mx-auto"},{default:u(()=>[ot,e("div",st,[L(e("input",{type:"text","onUpdate:modelValue":o[7]||(o[7]=s=>x.value=s),onKeyup:ie(j,["enter"]),placeholder:"wheat, soy, eggs",class:"rounded-xl"},null,544),[[M,x.value]]),e("button",{onClick:j,class:"bg-gradient-to-b from-darkOrange to-darkOrange p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-mediump-2 rounded-xl"}," Save ")])]),_:1})]),e("div",at,[d(m,{class:"p-6 rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[rt,e("div",lt,[e("ul",nt,[(r(!0),l(F,null,P(h.value,s=>(r(),l("li",{key:s,class:"relative font-medium bg-darkOrange text-mintGreen rounded-xl p-3 px-7 min-w-[120px] text-center shadow-md"},[e("span",null,b(s.charAt(0).toUpperCase()+s.slice(1)),1),e("button",{onClick:y=>te(s),class:"absolute top-1 right-1 text-red-600 font-bold"},"X ",8,it)]))),128))])])]),_:1})])]),e("div",dt,[d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",ct,[e("div",null,[ut,e("div",mt,[d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",ft,[e("p",null,"You have created "+b(q.value)+" recipes so far way to go !",1),e("p",null,"You have "+b(A.value)+" followers !",1)])]),_:1})])])])]),_:1})])])):n("",!0),f.value==="settings"&&c(a).isOwnProfile?(r(),l("div",gt,[d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[pt,e("div",vt,[d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",ht,[d(ge,{"must-verify-email":v.mustVerifyEmail,status:v.status},null,8,["must-verify-email","status"])])]),_:1}),d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",wt,[d(fe)])]),_:1}),d(m,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",_t,[d(me)])]),_:1})])]),_:1})])):n("",!0)])]),_:1}))}},Gt=ve(xt,[["__scopeId","data-v-89e4584d"]]);export{Gt as default};

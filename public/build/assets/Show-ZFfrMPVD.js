import{Q as re,k as i,o as l,c as F,w as u,p as g,b as e,u as c,f as r,g as n,d as ne,a as d,n as w,t as y,i as L,m as M,F as P,l as $,z as ie,s as de,x as ce,q as Y}from"./app-WnZSyuya.js";import{_ as ue,P as f}from"./Panel-JXVhjyCg.js";import fe from"./DeleteUserForm-UPS9oFGO.js";import me from"./UpdatePasswordForm-BbLv_3NU.js";import ge from"./UpdateProfileInformationForm-CuodG27X.js";import{_ as pe}from"./RecipeCard-DMBq7ics.js";import{_ as K}from"./UserCard-D5C-vf7h.js";import{_ as he}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ApplicationLogo-DKno-ieh.js";import"./TextInput-B94BGJm6.js";import"./PrimaryButton-CvBTShZ5.js";const p=h=>(de("data-v-510bdda1"),h=h(),ce(),h),ve={class:"relative"},we=["src"],_e={class:"absolute bottom-0 left-0 right-0 flex items-center justify-center mt-4"},xe={class:"relative"},be=["src"],ye={key:0,class:"absolute top-0 right-0 m-4"},ke=p(()=>e("i",{class:"fa-solid fa-gear fa-2x"},null,-1)),Ce=[ke],Fe={key:0,class:"absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20"},Pe={class:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"},$e={class:"px-10"},Se={class:"mx-auto mt-4"},Ae={class:"container mx-auto"},Be={class:"flex justify-evenly items-center"},Ie={key:0},Ue={key:1},Ee={key:2},Oe={key:0,class:"mt-4"},Te=p(()=>e("div",{class:"text-center font-medium text-2xl mb-6"},[e("h1",null,"Profile")],-1)),De={class:"mt-8"},Re={class:"grid grid-cols-2 gap-4"},Ve={class:"font-medium text-center"},je=p(()=>e("hr",{class:"border-orange-400 mt-4"},null,-1)),Ne={key:1},ze={key:0,class:"fixed z-10 inset-0 overflow-y-auto"},Le={class:"flex items-center justify-center min-h-screen"},Me={class:"bg-white p-6 rounded-center min-h-screen"},Ye=p(()=>e("h2",{class:"text-xl mb-4"},"Edit Bio",-1)),Ke={class:"container mx-auto"},qe={class:"flex justify-evenly mb-4"},Qe={class:"container mx-auto w-3/4 overflow-hidden overflow-y-scroll"},Xe={key:0,class:"grid grid-cols-1 overflow-hidden overflow-y-scroll"},Ge={class:"h-96 mb-5"},He={key:1,class:"grid grid-cols-1 overflow-hidden overflow-y-scroll"},Je={key:1,class:"mt-4"},We={class:"text-center font-medium text-2xl mb-6"},Ze={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden overflow-y-scroll"},et={key:2,class:"grid grid-cols-2 p-2 mt-3 gap-4"},tt={class:"mb-3"},ot=p(()=>e("div",{class:"text-center font-medium text-2xl"},[e("h1",null,"Allergies")],-1)),st={class:"flex flex-col space-y-4 p-6 mx-auto"},at={class:"container mx-auto row-start-2 row-span-2"},lt=p(()=>e("div",{class:"text-center font-medium text-2xl"},[e("h1",null,"Your Food Allergies")],-1)),rt={class:"p-7 h-28 overflow-hidden overflow-x-scroll"},nt={class:"grid grid-rows-1 grid-flow-col gap-3 justify-items-center space-x-1"},it=["onClick"],dt={class:"container row-span-2"},ct={class:"grid grid-cols-1 h-96 font-medium text-2xl"},ut=p(()=>e("div",{class:"text-center"},[e("h3",null,"Account Stats")],-1)),ft={class:"container mt-2"},mt={class:"font-normal text-xl"},gt={key:3,class:"mt-2"},pt=p(()=>e("div",{class:"text-center mb-5 font-medium text-2xl"},[e("h1",null,"Account Settings")],-1)),ht={class:"grid grid-cols-3 gap-4 px-8 pb-8"},vt={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},wt={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},_t={class:"p-4 sm:p-8 bg-white shadow sm:rounded-lg"},xt={__name:"Show",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup(h){const{props:a}=re(),q=i(a.recipes||[]),I=i(a.user.cover_image_url||"/images/placeholders/default-cover.png"),U=i(a.user.profile_image_url||"/images/placeholders/default-profile.png"),E=i(null),O=i(null),S=i(!1),m=i("public-profile"),A=i(!1),k=i(a.user.bio||""),T=i(a.followers||[]),B=i(a.followersCount||0),Q=i(a.recipeCount||0),D=i(a.following||[]),_=i("following"),X=()=>{A.value=!0},R=()=>{A.value=!1},G=async()=>{try{await g.post("/profile/update-bio",{bio:k.value}),a.user.bio=k.value,R()}catch{alert("Failed to update bio.")}},H=async()=>{try{const t=await g.get(`/profile/${a.user.id}/followers`);T.value=t.data.followers}catch{console.log("Error fetching followers:")}},J=async()=>{try{const t=await g.get(`/profile/${a.user.id}/following`);D.value=t.data.following}catch{console.log("Error fetching following:")}};H(),J();const W=()=>{S.value=!S.value},Z=t=>{const o=t.target.files[0];if(o){const s=new FileReader;s.onload=b=>{I.value=b.target.result},s.readAsDataURL(o)}E.value=o,V("cover_image",E.value)},ee=t=>{const o=t.target.files[0];if(o){const s=new FileReader;s.onload=b=>{U.value=b.target.result},s.readAsDataURL(o)}O.value=o,V("profile_image",O.value)},V=async(t,o)=>{const s=new FormData;s.append(t,o);try{await g.post("/profile/update",s,{headers:{"Content-Type":"multipart/form-data"}})}catch{alert("Failed to update profile.")}},C=async t=>{m.value=t},j=t=>{_.value=t},x=i(""),v=i(a.user.allergens||[]),N=async()=>{if(!x.value.trim())return;const t=x.value.trim().toLowerCase();if(!v.value.includes(t))try{const o=await g.post("/profile/update-allergens",{allergens:[...v.value,t]});v.value=o.data.allergens,x.value=""}catch{alert("Failed to update allergens.")}},te=async t=>{try{const o=await g.post("/profile/update-allergens",{allergens:v.value.filter(s=>s!==t)});v.value=o.data.allergens}catch{alert("Failed to delete allergy.")}},oe=async()=>{try{(await g.post(`/profile/${a.user.name}/follow`)).status===200&&(a.isFollowing=!0,B.value+=1)}catch(t){console.log("Error following user",t)}},se=async()=>{try{(await g.post(`/profile/${a.user.name}/unfollow`)).status===200&&(a.isFollowing=!1,B.value-=1)}catch(t){console.log("Error unfollowing user:",t)}},ae=async t=>{try{await g.post(`/recipes/${t.id}/bookmark`),t.is_bookmarked=!t.is_bookmarked}catch(o){console.log("Error bookmarking recipe:",o)}},le=t=>{Y.get(`/recipes/${t}`)},z=t=>{Y.get(`/profile/${t}`)};return(t,o)=>(l(),F(ue,null,{default:u(()=>[e("div",ve,[e("img",{src:I.value,alt:"cover art",class:"w-full h-60 object-cover"},null,8,we),e("div",_e,[e("div",xe,[e("img",{src:U.value,alt:"profile image",class:"w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer"},null,8,be),c(a).isOwnProfile?(l(),r("input",{key:0,type:"file",onChange:ee,accept:"image/*",class:"absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full"},null,32)):n("",!0)])]),c(a).isOwnProfile?(l(),r("div",ye,[e("button",{onClick:W,class:"text-white hover:text-blue-600"},Ce),S.value?(l(),r("div",Fe,[e("label",Pe,[e("input",{type:"file",onChange:Z,accept:"image/*",class:"hidden"},null,32),ne(" Upload Cover Art ")])])):n("",!0)])):n("",!0)]),e("div",$e,[e("div",Se,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",Ae,[e("ul",Be,[e("li",null,[e("button",{onClick:o[0]||(o[0]=s=>C("public-profile")),class:w([{"text-white":m.value==="public-profile"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Profile ",2)]),c(a).isOwnProfile?n("",!0):(l(),r("li",Ie,[e("button",{onClick:o[1]||(o[1]=s=>C("recipes")),class:w([{"text-white":m.value==="recipes"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Recipes ",2)])),c(a).isOwnProfile?(l(),r("li",Ue,[c(a).isOwnProfile?(l(),r("button",{key:0,onClick:o[2]||(o[2]=s=>C("account-info")),class:w([{"text-white":m.value==="account-info"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Account Info ",2)):n("",!0)])):n("",!0),c(a).isOwnProfile?(l(),r("li",Ee,[c(a).isOwnProfile?(l(),r("button",{key:0,onClick:o[3]||(o[3]=s=>C("settings")),class:w([{"text-white":m.value==="settings"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Settings ",2)):n("",!0)])):n("",!0)])])]),_:1})]),m.value==="public-profile"?(l(),r("div",Oe,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[Te,e("div",De,[e("div",Re,[e("div",null,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[e("div",Ve,[e("p",null,y(c(a).user.bio||"No bio available"),1)])]),_:1}),je,c(a).isOwnProfile?(l(),r("button",{key:0,onClick:X,class:"bg-orange-400 text-white p-2 rounded mt-2"},"Edit Bio ")):n("",!0),c(a).auth.user.id!==c(a).user.id?(l(),r("div",Ne,[c(a).isFollowing?(l(),r("button",{key:1,onClick:se,class:"bg-red-500 text-white p-2 rounded"}," Unfollow ")):(l(),r("button",{key:0,onClick:oe,class:"bg-blue-500 text-white p-2 rounded"},"Follow "))])):n("",!0)]),A.value?(l(),r("div",ze,[e("div",Le,[e("div",Me,[Ye,L(e("textarea",{"onUpdate:modelValue":o[4]||(o[4]=s=>k.value=s),class:"w-full p-2 border rounded mb-4",rows:"4"},null,512),[[M,k.value]]),e("button",{onClick:G,class:"bg-green-500 text-white p-2 rounded"},"Save "),e("button",{onClick:R,class:"bg-red-500 text-white p-2 rounded"}," Cancel ")])])])):n("",!0),e("div",null,[e("div",Ke,[d(f,{class:"rounded-lg shadow-xl transform transition-transform space-y-1 mx-auto"},{default:u(()=>[e("ul",qe,[e("li",null,[e("button",{onClick:o[5]||(o[5]=s=>j("followers")),class:w([{"text-white":_.value==="followers"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Followers ",2)]),e("li",null,[e("button",{onClick:o[6]||(o[6]=s=>j("following")),class:w([{"text-white":_.value==="following"},"bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium"])}," Following ",2)])]),e("div",Qe,[_.value==="followers"?(l(),r("ul",Xe,[e("li",Ge,[(l(!0),r(P,null,$(T.value,s=>(l(),F(K,{user:s,key:s.id,navigateToUserProfile:z,class:"mb-2"},null,8,["user"]))),128))])])):n("",!0),_.value==="following"?(l(),r("ul",He,[e("li",null,[(l(!0),r(P,null,$(D.value,s=>(l(),F(K,{user:s,key:s.id,navigateToUserProfile:z,class:"mb-2"},null,8,["user"]))),128))])])):n("",!0)])]),_:1})])])])])]),_:1})])):n("",!0),m.value==="recipes"?(l(),r("div",Je,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},{default:u(()=>[e("div",We,[e("h1",null,y(c(a).user.name)+"'s Recipes",1)]),e("div",Ze,[(l(!0),r(P,null,$(q.value,s=>(l(),F(pe,{key:s.id,recipe:s,onToggleBookmark:ae,navigateToRecipe:le,class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"},null,8,["recipe"]))),128))])]),_:1})])):n("",!0),m.value==="account-info"&&c(a).isOwnProfile?(l(),r("div",et,[e("div",null,[e("div",tt,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform space-y-2 w-3/4 mx-auto"},{default:u(()=>[ot,e("div",st,[L(e("input",{type:"text","onUpdate:modelValue":o[7]||(o[7]=s=>x.value=s),onKeyup:ie(N,["enter"]),placeholder:"wheat, soy, eggs",class:"rounded-xl"},null,544),[[M,x.value]]),e("button",{onClick:N,class:"bg-gradient-to-b from-orange-400 to-orange-400 p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-mediump-2 rounded-xl"}," Save ")])]),_:1})]),e("div",at,[d(f,{class:"p-6 rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[lt,e("div",rt,[e("ul",nt,[(l(!0),r(P,null,$(v.value,s=>(l(),r("li",{key:s,class:"relative font-medium bg-orange-400 rounded-xl p-3 px-7 min-w-[120px] text-center shadow-md"},[e("span",null,y(s.charAt(0).toUpperCase()+s.slice(1)),1),e("button",{onClick:b=>te(s),class:"absolute top-1 right-1 text-red-600 font-bold"},"X ",8,it)]))),128))])])]),_:1})])]),e("div",dt,[d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",ct,[e("div",null,[ut,e("div",ft,[d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",mt,[e("p",null,"You have created "+y(Q.value)+" recipes so far way to go !",1),e("p",null,"You have "+y(B.value)+" followers !",1)])]),_:1})])])])]),_:1})])])):n("",!0),m.value==="settings"&&c(a).isOwnProfile?(l(),r("div",gt,[d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[pt,e("div",ht,[d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",vt,[d(ge,{"must-verify-email":h.mustVerifyEmail,status:h.status},null,8,["must-verify-email","status"])])]),_:1}),d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",wt,[d(me)])]),_:1}),d(f,{class:"rounded-lg shadow-xl transform transition-transform"},{default:u(()=>[e("div",_t,[d(fe)])]),_:1})])]),_:1})])):n("",!0)])]),_:1}))}},Ut=he(xt,[["__scopeId","data-v-510bdda1"]]);export{Ut as default};

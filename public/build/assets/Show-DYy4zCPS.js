import{l as p,Q as _,z as b,o as g,c as E,a as m,g as P,x,y as L}from"./app-DWnWl7Uq.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";var w="https://js.stripe.com/v3",I=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,f="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",R=function(){for(var e=document.querySelectorAll('script[src^="'.concat(w,'"]')),t=0;t<e.length;t++){var n=e[t];if(I.test(n.src))return n}return null},v=function(e){var t="",n=document.createElement("script");n.src="".concat(w).concat(t);var r=document.head||document.body;if(!r)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return r.appendChild(n),n},M=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"4.2.0",startTime:t})},l=null,u=null,d=null,X=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},B=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},C=function(e){return l!==null?l:(l=new Promise(function(t,n){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe&&e&&console.warn(f),window.Stripe){t(window.Stripe);return}try{var r=R();if(r&&e)console.warn(f);else if(!r)r=v(e);else if(r&&d!==null&&u!==null){var i;r.removeEventListener("load",d),r.removeEventListener("error",u),(i=r.parentNode)===null||i===void 0||i.removeChild(r),r=v(e)}d=B(t,n),u=X(n),r.addEventListener("load",d),r.addEventListener("error",u)}catch(a){n(a);return}}),l.catch(function(t){return l=null,Promise.reject(t)}))},G=function(e,t,n){if(e===null)return null;var r=e.apply(void 0,t);return M(r,n),r},c,S=!1,h=function(){return c||(c=C(null).catch(function(e){return c=null,Promise.reject(e)}),c)};Promise.resolve().then(function(){return h()}).catch(function(o){S||console.warn(o)});var T=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];S=!0;var r=Date.now();return h().then(function(i){return G(i,t,r)})};const y=o=>(x("data-v-b3bd5c9f"),o=o(),L(),o),V={class:"flex items-center justify-center min-h-screen bg-gray-100"},W={class:"bg-white p-6 rounded-lg shadow-lg w-full max-w-md"},q=y(()=>m("div",{id:"payment-element"},null,-1)),z=y(()=>m("button",{id:"submit",type:"submit",class:"btn-primary w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"}," Pay $20.00 ",-1)),A=[q,z],k={__name:"Show",setup(o){const e=p(null),t=p(null),{props:n}=_();let r=n.clientSecret;b(async()=>{if(e.value=await T("pk_test_51PltAKRuXXbuzMDVLBZ4kfiaXWnGbdvXcRDMGrueJO9ScolrKMr2QMf9C4gph1Hg8V56x2qoEkYHY6ZvazbrHcj000NUeRR6n9"),!e.value){console.error("Stripe failed to initialize.");return}const a={theme:"flat",variables:{colorPrimaryText:"#262626"}};t.value=e.value.elements({clientSecret:r,appearance:a}),t.value.create("payment").mount("#payment-element")});async function i(){const{paymentIntent:a,error:s}=await e.value.confirmPayment({elements:t.value,confirmParams:{return_url:window.location.origin+"/payment-success"}});s?(console.error("Payment failed:",s.message),alert("Payment failed: "+s.message)):await axios.post("/process-checkout",{payment_intent_id:a.id})}return(a,s)=>(g(),E("div",V,[m("div",W,[m("form",{id:"payment-form",onSubmit:P(i,["prevent"])},A,32)])]))}},U=j(k,[["__scopeId","data-v-b3bd5c9f"]]);export{U as default};

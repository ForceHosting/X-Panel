"use strict";(self.webpackChunk_minimal_minimal_kit_react=self.webpackChunk_minimal_minimal_kit_react||[]).push([[443],{58434:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(47313);function a(){var e=(0,n.useRef)(!0);return(0,n.useEffect)((function(){return function(){e.current=!1}}),[]),e}},44443:function(e,t,r){r.r(t),r.d(t,{default:function(){return T}});var n=r(4942),a=r(33972),i=r(29466),o=r(17592),s=r(73428),l=r(61113),c=r(90891),d=r(70178),u=r(35898),m=r(57829),p=r(61689),f=r(99881),h=r(48175),v=r(54285),x=r(67250),g=r(71361),Z=r(49079),j=r(3484),b=r(74165),w=r(1413),y=r(15861),C=r(29439),S=r(28089),A=r(47313),M=r(97890),k=r(75627),E=r(1432),I=r(41727),z=r(47131),L=r(51406),P=r(58434),R=r(42593),_=r(94290),W=r(85077),N=r(23532),H=r(46417);function B(){var e=(0,M.s0)(),t=(0,P.Z)(),r=(0,A.useState)(!1),n=(0,C.Z)(r,2),a=n[0],o=n[1],s=S.Ry().shape({email:S.Z_().email("Email must be a valid email address").required("Email is required"),password:S.Z_().required("Password is required")}),l=(0,k.cI)({resolver:(0,E.X)(s),defaultValues:{email:"example@forcehost.net",password:"YourPassword",remember:!0}}),d=l.reset,m=l.setError,p=l.handleSubmit,v=l.formState,x=v.errors,g=v.isSubmitting,Z=function(){var r=(0,y.Z)((0,b.Z)().mark((function r(n){var a,i;return(0,b.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,W.Z.post(N.VU,{email:n.email,password:n.password});case 3:a=r.sent,console.log(a.status),200===a.status?(i=a.data.user,localStorage.setItem("token",i),e("/app")):(d(),t.current&&m("afterSubmit",(0,w.Z)((0,w.Z)({},a),{},{message:a.data.msg}))),r.next=13;break;case 8:r.prev=8,r.t0=r.catch(0),console.error(r.t0),d(),t.current&&m("afterSubmit",(0,w.Z)((0,w.Z)({},r.t0),{},{message:r.t0.message}));case 13:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}();return(0,H.jsxs)(_.RV,{methods:l,onSubmit:p(Z),children:[(0,H.jsxs)(u.Z,{spacing:3,children:[!!x.afterSubmit&&(0,H.jsx)(f.Z,{severity:"error",children:x.afterSubmit.message}),(0,H.jsx)(_.au,{name:"email",label:"Email address"}),(0,H.jsx)(_.au,{name:"password",label:"Password",type:a?"text":"password",InputProps:{endAdornment:(0,H.jsx)(I.Z,{position:"end",children:(0,H.jsx)(z.Z,{onClick:function(){return o(!a)},edge:"end",children:(0,H.jsx)(R.Z,{icon:a?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),(0,H.jsxs)(u.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",sx:{my:2},children:[(0,H.jsx)(_.jb,{name:"remember",label:"Remember me"}),(0,H.jsx)(c.Z,{component:i.rU,variant:"subtitle2",to:h.EE.resetPassword,children:"Forgot password?"})]}),(0,H.jsx)(L.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:g,children:"Login"}),(0,H.jsx)(L.Z,{fullWidth:!0,size:"large",variant:"contained",sx:{color:"white",my:2},children:(0,H.jsx)("a",{sx:{textDecoration:"none",color:"white"},href:"/api/auth",children:"Login With Discord"})})]})}var D=(0,o.ZP)("div")((function(e){var t=e.theme;return(0,n.Z)({},t.breakpoints.up("md"),{display:"flex"})})),V=(0,o.ZP)("header")((function(e){var t=e.theme;return(0,n.Z)({top:0,zIndex:9,lineHeight:0,width:"100%",display:"flex",alignItems:"center",position:"absolute",padding:t.spacing(3),justifyContent:"space-between"},t.breakpoints.up("md"),{alignItems:"flex-start",padding:t.spacing(7,5,0,7)})})),U=(0,o.ZP)(s.Z)((function(e){return{width:"100%",maxWidth:464,display:"flex",flexDirection:"column",justifyContent:"center",margin:e.theme.spacing(2,0,2,2)}})),F=(0,o.ZP)("div")((function(e){return{maxWidth:480,margin:"auto",minHeight:"100vh",display:"flex",justifyContent:"center",flexDirection:"column",padding:e.theme.spacing(12,0)}})),O=new Audio("https://github.com/catocodedev/site/raw/main/assets/Meow.wav"),q=function(){O.play()};function T(){var e=(0,v.Z)().method,t=(0,x.Z)("up","sm"),r=(0,x.Z)("up","md");return(0,H.jsx)(g.Z,{title:"Login",children:(0,H.jsxs)(D,{children:[(0,H.jsxs)(V,{children:[(0,H.jsx)(Z.Z,{}),t&&(0,H.jsxs)(l.Z,{variant:"body2",sx:{mt:{md:-2}},children:["Don\u2019t have an account? ","",(0,H.jsx)(c.Z,{variant:"subtitle2",component:i.rU,to:h.EE.register,children:"Get started"})]})]}),r&&(0,H.jsxs)(U,{children:[(0,H.jsx)(l.Z,{variant:"h3",sx:{px:5,mt:10,mb:5},children:"Hi, Welcome Back"}),(0,H.jsx)(j.Z,{visibleByDefault:!0,disabledEffect:!0,src:"/assets/illustrations/illustration_login.png",alt:"login"})]}),(0,H.jsx)(d.Z,{maxWidth:"sm",children:(0,H.jsxs)(F,{children:[(0,H.jsxs)(u.Z,{direction:"row",alignItems:"center",sx:{mb:5},children:[(0,H.jsxs)(m.Z,{sx:{flexGrow:1},children:[(0,H.jsx)(l.Z,{variant:"h4",gutterBottom:!0,children:"Sign in to Force Host"}),(0,H.jsx)(l.Z,{sx:{color:"text.secondary"},children:"Enter your details below."})]}),(0,H.jsx)(p.Z,{title:(0,a.I)(e),placement:"right",children:(0,H.jsx)(H.Fragment,{children:(0,H.jsx)(j.Z,{onClick:q,disabledEffect:!0,src:"https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_".concat(e,".png"),sx:{width:32,height:32}})})})]}),(0,H.jsx)(f.Z,{severity:"info",sx:{mb:3},children:"By logging in, you agree to our ToS and Privacy Policy"}),(0,H.jsx)(B,{}),!t&&(0,H.jsxs)(l.Z,{variant:"body2",align:"center",sx:{mt:3},children:["Don\u2019t have an account?"," ",(0,H.jsx)(c.Z,{variant:"subtitle2",component:i.rU,to:h.EE.register,children:"Get started"})]})]})})]})})}},23532:function(e,t,r){r.d(t,{Bj:function(){return s},Lt:function(){return l},Ow:function(){return o},VU:function(){return a},Vg:function(){return n},X0:function(){return i}});var n="/api/auth/getData",a="/api/auth/login",i="/api/auth/register",o="/api/server/create",s="/api/server/getServers",l="/api/server/remove"},99881:function(e,t,r){r.d(t,{Z:function(){return L}});var n=r(4942),a=r(63366),i=r(87462),o=r(47313),s=r(83061),l=r(21921),c=r(17551),d=r(17592),u=r(77342),m=r(91615),p=r(82295),f=r(32298);function h(e){return(0,f.Z)("MuiAlert",e)}var v,x=(0,r(77430).Z)("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),g=r(47131),Z=r(54750),j=r(46417),b=(0,Z.Z)((0,j.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),w=(0,Z.Z)((0,j.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),y=(0,Z.Z)((0,j.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),C=(0,Z.Z)((0,j.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),S=r(91251),A=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],M=(0,d.ZP)(p.Z,{name:"MuiAlert",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,t[r.variant],t["".concat(r.variant).concat((0,m.Z)(r.color||r.severity))]]}})((function(e){var t=e.theme,r=e.ownerState,a="light"===t.palette.mode?c._j:c.$n,o="light"===t.palette.mode?c.$n:c._j,s=r.color||r.severity;return(0,i.Z)({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&"standard"===r.variant&&(0,n.Z)({color:t.vars?t.vars.palette.Alert["".concat(s,"Color")]:a(t.palette[s].light,.6),backgroundColor:t.vars?t.vars.palette.Alert["".concat(s,"StandardBg")]:o(t.palette[s].light,.9)},"& .".concat(x.icon),t.vars?{color:t.vars.palette.Alert["".concat(s,"IconColor")]}:{color:"dark"===t.palette.mode?t.palette[s].main:t.palette[s].light}),s&&"outlined"===r.variant&&(0,n.Z)({color:t.vars?t.vars.palette.Alert["".concat(s,"Color")]:a(t.palette[s].light,.6),border:"1px solid ".concat((t.vars||t).palette[s].light)},"& .".concat(x.icon),t.vars?{color:t.vars.palette.Alert["".concat(s,"IconColor")]}:{color:"dark"===t.palette.mode?t.palette[s].main:t.palette[s].light}),s&&"filled"===r.variant&&(0,i.Z)({fontWeight:t.typography.fontWeightMedium},t.vars?{color:t.vars.palette.Alert["".concat(s,"FilledColor")],backgroundColor:t.vars.palette.Alert["".concat(s,"FilledBg")]}:{backgroundColor:"dark"===t.palette.mode?t.palette[s].dark:t.palette[s].main,color:t.palette.getContrastText("dark"===t.palette.mode?t.palette[s].dark:t.palette[s].main)}))})),k=(0,d.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:function(e,t){return t.icon}})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),E=(0,d.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:function(e,t){return t.message}})({padding:"8px 0",minWidth:0,overflow:"auto"}),I=(0,d.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:function(e,t){return t.action}})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),z={success:(0,j.jsx)(b,{fontSize:"inherit"}),warning:(0,j.jsx)(w,{fontSize:"inherit"}),error:(0,j.jsx)(y,{fontSize:"inherit"}),info:(0,j.jsx)(C,{fontSize:"inherit"})},L=o.forwardRef((function(e,t){var r=(0,u.Z)({props:e,name:"MuiAlert"}),n=r.action,o=r.children,c=r.className,d=r.closeText,p=void 0===d?"Close":d,f=r.color,x=r.icon,Z=r.iconMapping,b=void 0===Z?z:Z,w=r.onClose,y=r.role,C=void 0===y?"alert":y,L=r.severity,P=void 0===L?"success":L,R=r.variant,_=void 0===R?"standard":R,W=(0,a.Z)(r,A),N=(0,i.Z)({},r,{color:f,severity:P,variant:_}),H=function(e){var t=e.variant,r=e.color,n=e.severity,a=e.classes,i={root:["root","".concat(t).concat((0,m.Z)(r||n)),"".concat(t)],icon:["icon"],message:["message"],action:["action"]};return(0,l.Z)(i,h,a)}(N);return(0,j.jsxs)(M,(0,i.Z)({role:C,elevation:0,ownerState:N,className:(0,s.Z)(H.root,c),ref:t},W,{children:[!1!==x?(0,j.jsx)(k,{ownerState:N,className:H.icon,children:x||b[P]||z[P]}):null,(0,j.jsx)(E,{ownerState:N,className:H.message,children:o}),null!=n?(0,j.jsx)(I,{ownerState:N,className:H.action,children:n}):null,null==n&&w?(0,j.jsx)(I,{ownerState:N,className:H.action,children:(0,j.jsx)(g.Z,{size:"small","aria-label":p,title:p,color:"inherit",onClick:w,children:v||(v=(0,j.jsx)(S.Z,{fontSize:"small"}))})}):null]}))}))},73428:function(e,t,r){r.d(t,{Z:function(){return v}});var n=r(87462),a=r(63366),i=r(47313),o=r(83061),s=r(21921),l=r(17592),c=r(77342),d=r(82295),u=r(32298);function m(e){return(0,u.Z)("MuiCard",e)}(0,r(77430).Z)("MuiCard",["root"]);var p=r(46417),f=["className","raised"],h=(0,l.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),v=i.forwardRef((function(e,t){var r=(0,c.Z)({props:e,name:"MuiCard"}),i=r.className,l=r.raised,d=void 0!==l&&l,u=(0,a.Z)(r,f),v=(0,n.Z)({},r,{raised:d}),x=function(e){var t=e.classes;return(0,s.Z)({root:["root"]},m,t)}(v);return(0,p.jsx)(h,(0,n.Z)({className:(0,o.Z)(x.root,i),elevation:d?8:void 0,ref:t,ownerState:v},u))}))},33972:function(e,t,r){r.d(t,{I:function(){return o}});var n=r(66797),a=r(26675);function i(e){return function(e){return e.charAt(0).toUpperCase()+e.substr(1)}(e.toLowerCase())}function o(e,t){return void 0===t&&(t={}),(0,a.B)(e,(0,n.pi)({delimiter:" ",transform:i},t))}}}]);
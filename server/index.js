const _0x259e68=_0x28f7;(function(_0xf54c5b,_0x20a243){const _0x20e7bf=_0x28f7,_0x53fc54=_0xf54c5b();while(!![]){try{const _0x161ebd=parseInt(_0x20e7bf(0xbd))/0x1*(-parseInt(_0x20e7bf(0xbb))/0x2)+parseInt(_0x20e7bf(0x87))/0x3*(parseInt(_0x20e7bf(0xc0))/0x4)+-parseInt(_0x20e7bf(0xad))/0x5*(parseInt(_0x20e7bf(0x83))/0x6)+parseInt(_0x20e7bf(0xc1))/0x7*(-parseInt(_0x20e7bf(0xb9))/0x8)+-parseInt(_0x20e7bf(0xb0))/0x9+-parseInt(_0x20e7bf(0xc6))/0xa+-parseInt(_0x20e7bf(0x92))/0xb*(-parseInt(_0x20e7bf(0x91))/0xc);if(_0x161ebd===_0x20a243)break;else _0x53fc54['push'](_0x53fc54['shift']());}catch(_0x5ae546){_0x53fc54['push'](_0x53fc54['shift']());}}}(_0x67b5,0x6947b));const express=require(_0x259e68(0xaa)),cors=require('cors'),mongoose=require(_0x259e68(0x9a)),authRoutes=require(_0x259e68(0xa4)),serverRoutes=require(_0x259e68(0x80)),ticketRoutes=require('./routes/tickets'),paymentRoutes=require(_0x259e68(0xc5)),webhostingRoutes=require(_0x259e68(0x8f)),productRoutes=require('./routes/products'),licenseRoutes=require(_0x259e68(0x8a)),devRoutes=require('./routes/dev'),app=express(),{sessionSecrets,corsOrigin,licenseKey}=require(_0x259e68(0xc8)),session=require('express-session'),socket=require('socket.io');require(_0x259e68(0x9c))['config']();var cookieParser=require('cookie-parser');const fetch=require(_0x259e68(0x9b)),{getLicense}=require(_0x259e68(0xab)),passport=require(_0x259e68(0xae));require('./strategies/discord');const path=require(_0x259e68(0x84));var MemoryStore=session[_0x259e68(0xac)];function _0x28f7(_0x1ae6f5,_0x653321){const _0x67b508=_0x67b5();return _0x28f7=function(_0x28f7a2,_0x3e0d2a){_0x28f7a2=_0x28f7a2-0x7b;let _0xcecad6=_0x67b508[_0x28f7a2];return _0xcecad6;},_0x28f7(_0x1ae6f5,_0x653321);}app[_0x259e68(0x7d)](cookieParser()),app[_0x259e68(0x7d)](cors()),app[_0x259e68(0x7d)](express[_0x259e68(0x85)]()),app['use'](session({'secret':sessionSecrets,'resave':!![],'saveUninitialized':![],'name':_0x259e68(0xb3),'store':new MemoryStore(),'cookie':{'expires':0xf4240}})),app[_0x259e68(0x7d)](passport['initialize']()),app[_0x259e68(0x7d)](passport[_0x259e68(0x97)]());process[_0x259e68(0xa2)][_0x259e68(0xa6)]==='production'?mongoose[_0x259e68(0x95)](process[_0x259e68(0xa2)][_0x259e68(0x8d)],{'useNewUrlParser':!![],'useUnifiedTopology':!![],'auth':{'username':process[_0x259e68(0xa2)]['MONGO_USER'],'password':process['env'][_0x259e68(0xba)],'atuhdb':process[_0x259e68(0xa2)][_0x259e68(0xb2)]}})[_0x259e68(0x8b)](()=>{const _0x44b81a=_0x259e68;console[_0x44b81a(0xa8)](_0x44b81a(0xaf));})[_0x259e68(0xc3)](_0xe76a04=>{const _0x26c162=_0x259e68;console[_0x26c162(0xa8)](_0xe76a04[_0x26c162(0x81)]);}):mongoose['connect'](process[_0x259e68(0xa2)][_0x259e68(0x8d)],{'useNewUrlParser':!![],'useUnifiedTopology':!![]})[_0x259e68(0x8b)](()=>{const _0x5e6b1a=_0x259e68;console[_0x5e6b1a(0xa8)](_0x5e6b1a(0xaf));})[_0x259e68(0xc3)](_0x4cf56e=>{const _0x1688b9=_0x259e68;console[_0x1688b9(0xa8)](_0x4cf56e[_0x1688b9(0x81)]);});app[_0x259e68(0x7d)](express[_0x259e68(0x98)](path[_0x259e68(0xb6)](__dirname,_0x259e68(0x86)))),app[_0x259e68(0x7d)](_0x259e68(0xc7),licenseRoutes),((async()=>{const _0x5eb035=_0x259e68,_0x204ddc=await getLicense(licenseKey);_0x204ddc===!![]?(console[_0x5eb035(0xa8)]('License\x20Key\x20Valid'),app[_0x5eb035(0x7d)](_0x5eb035(0x8c),authRoutes),app[_0x5eb035(0x7d)]('/api/server',serverRoutes),app[_0x5eb035(0x7d)](_0x5eb035(0x93),ticketRoutes),app['use'](_0x5eb035(0x7b),paymentRoutes),app['use'](_0x5eb035(0xb7),webhostingRoutes),app[_0x5eb035(0x7d)](_0x5eb035(0xa7),devRoutes),app[_0x5eb035(0x88)]('*',(_0x481964,_0x574192)=>{const _0x5eca5b=_0x5eb035;_0x574192['sendFile'](path['join'](__dirname,_0x5eca5b(0xc2)));})):(console['log'](_0x5eb035(0xa5)),app[_0x5eb035(0x7d)]((_0x1d77d0,_0x11031f,_0x3dd6f6)=>{const _0x20ba0b=_0x5eb035;_0x11031f[_0x20ba0b(0x7c)](0x194)[_0x20ba0b(0x7e)](_0x20ba0b(0x9f));}));})());const server=app[_0x259e68(0xb4)](process[_0x259e68(0xa2)][_0x259e68(0x82)],()=>console['log'](_0x259e68(0xb1)+process[_0x259e68(0xa2)][_0x259e68(0x82)])),io=socket(server,{'cors':{'origin':corsOrigin,'credentials':!![]}});global['onlineUsers']=new Map(),global['openTickets']=new Map(),io['on']('connection',_0x10a555=>{const _0x18a94c=_0x259e68;global['chatSocket']=_0x10a555,_0x10a555['on'](_0x18a94c(0x9e),(_0x4750ee,_0x11492b)=>{onlineUsers['set'](_0x4750ee,_0x11492b),_0x10a555['join'](_0x11492b);}),_0x10a555['on'](_0x18a94c(0x99),_0x57c0e=>{const _0x2389e7=_0x18a94c,_0x39cad8=onlineUsers[_0x2389e7(0x88)](_0x57c0e['to']);_0x39cad8&&_0x10a555['to'](_0x39cad8)[_0x2389e7(0xb5)]('bannedUser',{'msg':_0x2389e7(0xbc),'from':_0x2389e7(0xa1)});}),_0x10a555['on'](_0x18a94c(0x9d),_0x7278bc=>{const _0x34b893=_0x18a94c;console[_0x34b893(0xa8)](_0x7278bc),_0x10a555['to'](_0x7278bc[_0x34b893(0xa9)])[_0x34b893(0xb5)](_0x34b893(0xa0),{'msg':_0x7278bc[_0x34b893(0xa3)],'user':_0x7278bc[_0x34b893(0x90)]});});}),setTimeout(()=>{setInterval(()=>{(async function(){const _0x1e34d8=_0x28f7,_0x298803=require(_0x1e34d8(0xb8)),_0x5c7f5b=await _0x298803[_0x1e34d8(0x96)]();_0x5c7f5b[_0x1e34d8(0x94)](_0x5b23f7=>{(async function(){const _0xd57120=_0x28f7;Math[_0xd57120(0x89)](Date['now']()/0x3e8)>=_0x5b23f7[_0xd57120(0xc4)]&&await _0x298803[_0xd57120(0xbf)]({'_id':_0x5b23f7['_id']},{'nextPurchaseTime':Math[_0xd57120(0x89)](Date[_0xd57120(0x8e)]()/0x3e8)+0x278d00});}());});}());},0xa);},0x14),setTimeout(()=>{setInterval(()=>{(async function(){const _0x1aa6c2=_0x28f7,_0x5a0039=require(_0x1aa6c2(0x7f)),_0x3e9ffa=await _0x5a0039[_0x1aa6c2(0x96)]();_0x3e9ffa[_0x1aa6c2(0x94)](_0x4da3ec=>{(async function(){const _0x253616=_0x28f7;Math[_0x253616(0x89)](Date[_0x253616(0x8e)]()/0x3e8)>=_0x4da3ec[_0x253616(0xbe)]&&await _0x5a0039['deleteOne']({'_id':_0x4da3ec['_id']});}());});}());},0xa);},0x14);function _0x67b5(){const _0x5015c3=['express','./functions','MemoryStore','5zbGbOk','passport','DB\x20Connetion\x20Successfull','553842vNPdcb','Server\x20started\x20on\x20','MONGO_DB','X-Panel_INFO','listen','emit','join','/api/webhosting','./models/subscriptions','700472DgKUyO','MONGO_PWD','20tAMZMD','You\x27ve\x20been\x20banned.','55001mDFXUr','expires','updateOne','356424VhSlzR','14zWiMnf','site/index.html','catch','nextPurchaseTime','./routes/payments','2602340VIGeAG','/api/licensing','./config.json','/api/payments','status','use','send','./models/verifyCodes','./routes/servers','message','PORT','3327708pMsQkq','path','json','site','3BFuTtE','get','floor','./routes/licensing','then','/api/auth','MONGOURL','now','./routes/webhosting','fromUser','12OmPCjq','21380029PPppwQ','/api/ticket','forEach','connect','find','session','static','banUser','mongoose','node-fetch','dotenv','send-ticket-msg','add-user','It\x20seems\x20this\x20application\x20is\x20not\x20licensed.\x20Please\x20contact\x20support.','msg-recieve','System','env','msg','./routes/auth','License\x20key\x20failed\x20to\x20authenticate.\x20','ENVIRONMENT','/api/dev','log','ticket'];_0x67b5=function(){return _0x5015c3;};return _0x67b5();}
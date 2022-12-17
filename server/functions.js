const fetch = require('node-fetch');

(function(_0x3516ee,_0x482981){const _0x5730f1=_0x49f4,_0x245664=_0x3516ee();while(!![]){try{const _0x3717ee=-parseInt(_0x5730f1(0x103))/0x1+-parseInt(_0x5730f1(0x109))/0x2+parseInt(_0x5730f1(0xfb))/0x3*(-parseInt(_0x5730f1(0x102))/0x4)+-parseInt(_0x5730f1(0xf9))/0x5*(-parseInt(_0x5730f1(0x10b))/0x6)+parseInt(_0x5730f1(0x106))/0x7+-parseInt(_0x5730f1(0x10a))/0x8+parseInt(_0x5730f1(0x104))/0x9;if(_0x3717ee===_0x482981)break;else _0x245664['push'](_0x245664['shift']());}catch(_0x7596a8){_0x245664['push'](_0x245664['shift']());}}}(_0x44b0,0xcac11));function _0x49f4(_0x3569a2,_0x22591f){const _0x44b085=_0x44b0();return _0x49f4=function(_0x49f468,_0x47ab6b){_0x49f468=_0x49f468-0xf8;let _0x4ab2b8=_0x44b085[_0x49f468];return _0x4ab2b8;},_0x49f4(_0x3569a2,_0x22591f);}function _0x1bd6(){const _0x24b830=_0x49f4,_0x277763=[_0x24b830(0xf8),_0x24b830(0x108),_0x24b830(0xff),'82385qfbFSM',_0x24b830(0x107),'getLicense','get',_0x24b830(0xfd),'https://api.my.forcehost.net/api/licensing/get','Bearer\x20','application/json',_0x24b830(0x100),_0x24b830(0x105),_0x24b830(0xfa),_0x24b830(0xfe)];return _0x1bd6=function(){return _0x277763;},_0x1bd6();}function _0x5ce4(_0x57f1a8,_0x54bfd2){const _0x405ecc=_0x1bd6();return _0x5ce4=function(_0x1977a5,_0x53cdb2){_0x1977a5=_0x1977a5-0x14a;let _0x427cc9=_0x405ecc[_0x1977a5];return _0x427cc9;},_0x5ce4(_0x57f1a8,_0x54bfd2);}const _0x1f9088=_0x5ce4;(function(_0x14a66d,_0x5766ed){const _0x2a07d0=_0x49f4,_0x45d7b9=_0x5ce4,_0x430a01=_0x14a66d();while(!![]){try{const _0x18c428=parseInt(_0x45d7b9(0x152))/0x1+-parseInt(_0x45d7b9(0x14e))/0x2+parseInt(_0x45d7b9(0x150))/0x3+parseInt(_0x45d7b9(0x14f))/0x4+-parseInt(_0x45d7b9(0x155))/0x5*(parseInt(_0x45d7b9(0x154))/0x6)+-parseInt(_0x45d7b9(0x14a))/0x7+-parseInt(_0x45d7b9(0x153))/0x8;if(_0x18c428===_0x5766ed)break;else _0x430a01[_0x2a07d0(0xfc)](_0x430a01[_0x2a07d0(0x101)]());}catch(_0x5e7185){_0x430a01[_0x2a07d0(0xfc)](_0x430a01[_0x2a07d0(0x101)]());}}}(_0x1bd6,0x33c7c),module[_0x1f9088(0x151)][_0x1f9088(0x157)]=async function getLicense(_0x37cd76){const _0xa7b5f5=_0x49f4,_0x5474d5=_0x1f9088,_0x2c85b2=await fetch(_0x5474d5(0x14b),{'method':_0x5474d5(0x158),'headers':{'Accept':_0x5474d5(0x14d),'Content-Type':_0x5474d5(0x14d),'Authorization':_0x5474d5(0x14c)+_0x37cd76}}),_0x519f83=await _0x2c85b2[_0x5474d5(0x156)]();if(!_0x519f83)return![];return _0x519f83[_0xa7b5f5(0x10c)];});function _0x44b0(){const _0x42f83b=['json','893392MlXMQh','3224648ZznwkA','429776MJJJut','2396454lMuxbn','licenseValid','281349gZNHdM','15fHUZia','1164921xtClzV','3FpFcuG','push','16842nbxsqQ','exports','138DeOhwj','373422RmgNtL','shift','4250024QuLcEo','839267IjBkzm','22671648doMaFG','888792xwxRvW','4767007pzzhDR'];_0x44b0=function(){return _0x42f83b;};return _0x44b0();}

module.exports.verifyToken = function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.status(403).send();
  }
}

module.exports.makeid = function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789234565434567876543201256793028048736503845';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};

module.exports.makeWebUser = function makeWebUser(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
};

module.exports.getIP = async function getIP() {
  const {ip} = await fetch('https://api.ipify.org?format=json', { method: 'GET' })
      .then(res => res.json())
      .catch(error => console.error(error));
  return ip
}

const nodemailer = require("nodemailer");
const {emailPassword} = require('./config.json')
module.exports.sendWelcome = async function sendWelcome(to){
  let transporter = nodemailer.createTransport({
    host: "fideua.srv.govello.net",
    port: 587,
    secure: false,
    auth: {
      user: "no-reply@forcehost.net",
      pass: emailPassword
    }
  });

  let info = await transporter.sendMail({
    from: '"Force Host" <no-reply@forcehost.net>',
    to: to,
    subject: "Welcome To Force Host",
    html: `<table
    class="body-wrap"
    bgcolor="#f6f6f6"
    style="
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      font-size: 14px;
      margin: 0px;
      width: 100%;
      background-color: transparent;
    "
  >
    <tbody>
      <tr
        style="
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          font-size: 14px;
          margin: 0px;
        "
      >
        <td
          valign="top"
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            margin: 0px;
            vertical-align: top;
          "
        ></td>
        <td
          class="container"
          width="600"
          valign="top"
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            display: block;
            max-width: 600px;
            clear: both;
            margin: 0px auto;
            vertical-align: top;
          "
        >
          <div
            class="content"
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              max-width: 600px;
              display: block;
              margin: 0px auto;
              padding: 20px;
            "
          >
            <table
              class="main"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              itemprop="action"
              itemscope=""
              itemtype="http://schema.org/ConfirmAction"
              style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                box-sizing: border-box;
                font-size: 14px;
                border-radius: 7px;
                margin: 0px;
                border: none;
              "
            >
              <tbody>
                <tr
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0px;
                  "
                >
                  <td
                    class="content-wrap"
                    valign="top"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      vertical-align: top;
                      margin: 0px;
                      padding: 30px;
                      border-radius: 7px;
                      background-color: rgb(255, 255, 255);
                      box-shadow: rgba(18, 38, 63, 0.03) 0px 0.75rem 1.5rem;
                    "
                  >
                    <meta
                      itemprop="name"
                      content="Welcome!"
                      style="
                        font-family: 'Helvetica Neue', Helvetica, Arial,
                          sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        margin: 0px;
                      "
                    />
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: 'Helvetica Neue', Helvetica, Arial,
                          sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        margin: 0px;
                      "
                    >
                      <tbody>
                        <tr
                          style="
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            Thank you for registering with <b>Force Host</b>
                          </td>
                        </tr>
                        <tr
                          style="
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            Our system showed this as your email address. If you
                            did not intend to sign up with us, please contact
                            support at support@forcehost.net. If you did intend to
                            sign up with us, welcome to the club! You can recive
                            important updates through email now!
                          </td>
                        </tr>
                        <tr
                          style="
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            <b>Force Host</b>
                            <p>Hosting Tomorrow for The Worlds Today</p>
                          </td>
                        </tr>
                        <tr
                          style="
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px;
                              text-align: center;
                            "
                          >
                            © 2022 Force Host
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  });
}

module.exports.sendSuspension = async function sendSuspension(to, reason){
  let transporter = nodemailer.createTransport({
    host: "fideua.srv.govello.net",
    port: 587,
    secure: false,
    auth: {
      user: "no-reply@forcehost.net",
      pass: emailPassword
    }
  });

  let info = await transporter.sendMail({
    from: '"Force Host" <no-reply@forcehost.net>',
    to: to,
    subject: "Account Suspended",
    html: `<table
    class="body-wrap"
    style="
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      font-size: 14px;
      width: 100%;
      margin: 0px;
    "
  >
    <tbody>
      <tr
        style="
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          font-size: 14px;
          margin: 0px;
        "
      >
        <td
          valign="top"
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            vertical-align: top;
            margin: 0px;
          "
        ></td>
        <td
          class="container"
          width="600"
          valign="top"
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            vertical-align: top;
            display: block;
            max-width: 600px;
            clear: both;
            margin: 0px auto;
          "
        >
          <div
            class="content"
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              max-width: 600px;
              display: block;
              margin: 0px auto;
              padding: 20px;
            "
          >
            <table
              class="main"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                box-sizing: border-box;
                font-size: 14px;
                border-radius: 7px;
                margin: 0px;
                box-shadow: rgba(18, 38, 63, 0.03) 0px 0.75rem 1.5rem;
              "
            >
              <tbody>
                <tr
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0px;
                  "
                >
                  <td
                    class="alert alert-warning"
                    align="center"
                    valign="top"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 16px;
                      vertical-align: top;
                      color: rgb(255, 255, 255);
                      font-weight: 500;
                      text-align: center;
                      border-radius: 3px 3px 0px 0px;
                      background-color: rgb(216, 14, 14);
                      margin: 0px;
                      padding: 20px;
                    "
                  >
                    Account Suspended
                  </td>
                </tr>
                <tr
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0px;
                  "
                >
                  <td
                    class="content-wrap"
                    valign="top"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      vertical-align: top;
                      margin: 0px;
                      padding: 20px;
                    "
                  >
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: 'Helvetica Neue', Helvetica, Arial,
                          sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        margin: 0px;
                      "
                    >
                      <tbody>
                        <tr
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            Your account was suspended! 
                          </td>
                        </tr>
                        <tr
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            It seems your account was suspended. The reason for the suspension provided was: <b>${reason}</b>. Think this was a mistake? Open a ticket or email us at support@forcehost.net.
                          </td>
                        </tr>
                        <tr
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            Thanks for choosing <b>Force Host</b>
                          </td>
                        </tr>
                        <tr
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px 0px 20px;
                            "
                          >
                            <b>Force Host</b>
                            <p>Reports & Abuse Team</p>
                            <p>Hosting Tomorrow for The Worlds Today</p>
                          </td>
                        </tr>
                        <tr
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            margin: 0px;
                          "
                        >
                          <td
                            class="content-block"
                            valign="top"
                            style="
                              text-align: center;
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              vertical-align: top;
                              margin: 0px;
                              padding: 0px;
                            "
                          >
                            © 2022 Force Host
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
   `,
  });
}
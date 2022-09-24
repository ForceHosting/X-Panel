const fetch = require('node-fetch');



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
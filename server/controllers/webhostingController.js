const Web = require('../models/webhostingModel')
const { makeid, makeWebUser } = require('../functions');
const { newWebUser, sendErrorCode } = require("../bot");
const fetch = require('node-fetch');


module.exports.createWeb = async(req, res, next) => {
    try{
        const { domain, userEmail, userId, username } = req.body;
        const hasHostingAlready = Web.findOne({ 'accountHolder': userId }).count
        if(hasHostingAlready >= 1){
            return res.json({status: false, msg: `You can't have more than one webhosting account.`})
        }
        const findIfDomainExists = Web.findOne({ 'planDomain': domain }).count
        if(findIfDomainExists > 0){
            const newErrorCode = makeid(5)
            sendErrorCode(newErrorCode, 'Domain already exists in system')
            return res.json({status: false, msg: `An error occured with the code of: ${newErrorCode}`});
        }else{
            const randomUsername = makeWebUser(15);
            const newRandomPass = makeid(15)
            var newRandomPassBuffer = Buffer.from(newRandomPass);
            var encryptedPass = newRandomPassBuffer.toString('base64');
            const webData = await fetch(`https://web.forcehost.net:2222/CMD_API_ACCOUNT_USER?action=create&add=Submit&username=${randomUsername}&email=${userEmail}&passwd=${newRandomPass}&passwd2=${newRandomPass}&domain=${domain}&package=free&ip=181.214.41.250&notify=yes`, {
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Basic YOURAUTH`
      },
    });
    const data = await webData.text()
    console.log(data)
    const regex = 'error=0'
    console.log(data.includes(regex))
    if(data.includes(regex) === true){
        Web.create({
            panelUser: randomUsername,
            panelPwd: encryptedPass,
            planType: 'Free',
            planDomain: domain,
            accountHolder: userId,
        })
        newWebUser(username, domain)
        return res.json({status: true})
    }else{
        return res.json({status: false, msg: 'The account did not get made correctly. Try again or contact support.'})
    }
        }

    }catch(ex){
        next(ex);
    }
}

module.exports.getWeb = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log(userId)
        const webData = Web.findOne({ 'accountHolder': userId})
        console.log(webData.panelUser)
        return res.json(webData)
    }catch(ex){
        next(ex)
    }
}
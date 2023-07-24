const catodb = require('catodb')

const db = new catodb('localhost:4020', 'CatoDB_Master')

exports.fetch = async function (query) {
    new Promise((resolve, reject) => {
        try {
            db.fetch(query)
            .then((data) => {
                data = JSON.parse(data[0]);
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }
   })
};
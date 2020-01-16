const crypto = require('crypto')


function decryptUserId(hash){

    const algorithm = 'aes-192-cbc'
    const password = 'ButtonGameHash Password';
    const key = crypto.scryptSync(password, 'salt', 24)
    const iv = Buffer.alloc(16, 0) // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    let decrypted = decipher.update(hash, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    decrypted = decrypted.replace(/"/g,'')

    return decrypted
}

module.exports = { 
    decryptUserId,
 }
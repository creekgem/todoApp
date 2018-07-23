const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

let data = {
    id: 5
}

let token = jwt.sign(data, '123');
let sign = jwt.verify(token, '123')

console.log(sign);



// let msg = 'I am waseem';

// let hash = SHA256(msg).toString();
// console.log(`Message: ${msg}\nHash: ${hash}`);


// let data = {
//     id: 4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// token.data.id = 11;

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// console.log('token', token);
// console.log('resultHash', resultHash);

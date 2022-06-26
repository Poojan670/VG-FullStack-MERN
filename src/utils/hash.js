const bcrypt = require('bcrypt')

async function run(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

async function check(reqPassword, dbPassword) {
    const validPassword = await bcrypt.compare(reqPassword, dbPassword)
    return validPassword
}

exports.hashedPassword = run;
exports.validPassword = check;
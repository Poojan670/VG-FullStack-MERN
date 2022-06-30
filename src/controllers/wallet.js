const { validate, Wallet } = require('../models/wallet')
const { User } = require('../models/users')
const _ = require('lodash')

module.exports = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('User not found')

    const wallet = new Wallet({
        pay_type: req.body.pay_type,
        amount: req.body.amount,
        remarks: req.body.remarks,
        user: user
    })
    wallet.save()
    await user.updateOne({ walletAmount: walletAmount + wallet.amount })
    res.status(201).json(wallet)

}
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const { default: mongoose } = require('mongoose')
const { User } = require('../src/models/users')
const { Game } = require('../src/models/games')
const { Developer } = require('../src/models/developer')
const { Category } = require('../src/models/category')
const { UserDetails } = require('../src/models/userDetails')
const { Wallet } = require('../src/models/wallet')

const userParent = {
    name: 'users',
    icon: 'User',
}
const gameParent = {
    name: 'games',
    icon: 'Video',
}

AdminJS.registerAdapter(AdminJSMongoose)
const adminJs = new AdminJS({
    databases: [mongoose],
    rootPath: '/admin',
    resources: [
        {
            resource: User, options: {
                parent: userParent, properties: {
                    password: {
                        isVisible: { list: false, filter: false, show: true, edit: false },
                    }
                }
            }
        },
        { resource: UserDetails, options: { parent: userParent } },
        { resource: Wallet, options: { parent: userParent } },
        { resource: Developer, options: { parent: userParent } },
        { resource: Category, options: { parent: gameParent } },
        { resource: Game, options: { parent: gameParent } },
    ]
})

module.exports = function (app) {
    const router = AdminJSExpress.buildRouter(adminJs)
    app.use(adminJs.options.rootPath, router)

}


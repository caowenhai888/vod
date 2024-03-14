const Datastore = require('nedb-promises')
interface db {
    filename:string,
    autoload: boolean
}
let db: any = {};
db.users = new Datastore({ filename: './users.db', autoload: true })
db.projects = new Datastore({ filename: './projects.db', autoload: true })
export default db;
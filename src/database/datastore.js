import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { setting_path } from './config'

const adapter = new FileSync(setting_path)
const db = Datastore(adapter)
    // db.set('type', 'setting').write()

export default db
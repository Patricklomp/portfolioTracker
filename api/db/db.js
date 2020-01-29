import Asset from "../models/asset"
import User from "../models/user"
const assets = [
        new Asset(1,"TSLA", 100, 10)
]

const userinfo = new User("Patrick", 21, "Software dev")

export default {assets, userinfo}
import app from "./server.js"  //102 //error 51:00 revcontr
import mongodb from "mongodb"
import dotenv from "dotenv"
import makersDAO from "./dao/makersDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.MAKERS_DB_URI,
    // {
    //     //poolSize: 50,
    //     wtimeout:2500,
    //     //useNewUrlParse: true
    // } 
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
//initial reference to restaurant collection database
.then(async client => {   
    await makersDAO.injectDB(client)
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
})
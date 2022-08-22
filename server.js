import express from "express"
import cors from "cors"
import makers from "./api/makers.route.js"

const app = express()

app.use(cors())
app.use(express.json())
 
app.use("/api/v1/makers", makers)
app.use("*", (req, res)=> res.status(404).json({ error:"notfound"}))
//app.use(express.static(path.join(__dirname, "fronend/build")))
console.log("server line 13 error")
export default app


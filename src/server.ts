import express from "express"

import { CONFIG } from "./config"
import { router } from "./routes"
import { routeNotFound } from "./middlewares/routeNotFound"

const app = express()
const port = CONFIG.port

app.use(express.json())

app.use(router)

app.use(routeNotFound)

app.listen(3000, () => console.log(`Server is runnig on port: [${port}]`))
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configViewEngine = (app) => {
    app.set('views', path.join(__dirname, '../views')) // đảm bảo đúng thư mục
    app.set('view engine', 'ejs')

    // Static files nếu có:
    app.use(express.static(path.join(__dirname, '../public')))
}

export default configViewEngine

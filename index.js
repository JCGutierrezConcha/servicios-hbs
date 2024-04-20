import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'
import { services } from './data/services.data.js'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.get('/services', (req, res) => {
    res.render('services', { services: services })
})

app.get('/services/:service', (req, res) => {
    const service = req.params.service
    const serviceData = services.find((item => item.url === `/services/${service}`))

    if (!serviceData) {
        return res.status(404).render('404', { title: "No se encuentra el servicio" })
    }
    res.render('service', { service: serviceData })
})

app.get('*', (req, res) => {
    return res.status(404).render('404', { title: "No se encuentra la página" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
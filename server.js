const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/data/monumentos', (req, res) => {
    fs.readFile(path.join(__dirname, 'da_cultura_ocio_monumentos-4326.geojson'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al cargar el archivo GeoJSON" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

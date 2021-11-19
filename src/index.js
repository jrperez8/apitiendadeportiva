const express = require('express');
const app = express();

const cors = require ('cors');

app.set('port', process.env.PORT || 6500);
// Middlewares
app.use(express.json());
app.use(cors());
// Rutas o endpoints
app.use(require('./routes/products'));

app.listen(app.get('port'), ()=>{
    console.log(`Server is running in http://localhost:${app.get('port')}`);
});
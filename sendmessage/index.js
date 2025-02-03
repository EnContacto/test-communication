const express = require("express");  // Importar Express
const bodyParser = require("body-parser");  // Importar body-parser
const cors = require("cors");  // Importar CORS
const messageRoutes = require("./routes/messageRoutes");  // Importar rutas de mensajes

const app = express();  // Crear la aplicación Express
const PORT = process.env.PORT || 3003;  // Definir el puerto (tomado de variables de entorno)

app.use(cors());  // Habilitar CORS
app.use(bodyParser.json());  // Habilitar JSON en las peticiones

// Cargar rutas de mensajes
app.use("/", messageRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`sendmessage service running on port ${PORT}`);
});

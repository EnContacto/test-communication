const AWS = require("aws-sdk");
const messageService = require("../services/messageService");

// Configurar conexión a AWS DynamoDB (entorno real)
AWS.config.update({
  region: "us-east-1" // Asegúrate de que sea la región correcta en AWS
});

const dynamoDB = new AWS.DynamoDB();

// Verificar si la tabla Messages existe en AWS
const ensureTableExists = async () => {
  try {
    await dynamoDB.describeTable({ TableName: "Messages" }).promise();
    console.log("La tabla Messages ya existe en AWS DynamoDB.");
  } catch (error) {
    if (error.code === "ResourceNotFoundException") {
      console.error("La tabla Messages no existe en AWS. Debes crearla manualmente en la consola de AWS.");
    } else {
      console.error("Error al verificar la tabla Messages en AWS DynamoDB:", error);
    }
  }
};

// Verificar la existencia de la tabla en AWS al iniciar
ensureTableExists();

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message, timestamp } = req.body;
    if (!sender || !receiver || !message || !timestamp) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newMessage = await messageService.createMessage({ sender, receiver, message, timestamp });

    res.status(201).json({ message: "Mensaje guardado correctamente", messageId: newMessage.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
};

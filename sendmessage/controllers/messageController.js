const messageService = require("../services/messageService");

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

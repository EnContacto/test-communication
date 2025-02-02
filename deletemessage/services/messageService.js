const { dynamoDB } = require("../config/awsConfig");
const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

exports.deleteMessage = async (messageId) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      messageId: { S: messageId }
    }
  };

  try {
    await dynamoDB.send(new DeleteItemCommand(params));
    return { success: true, message: "Mensaje eliminado" };
  } catch (error) {
    console.error("Error eliminando mensaje: ", error);
    throw new Error("No se pudo eliminar el mensaje");
  }
};
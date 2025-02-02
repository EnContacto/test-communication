const { dynamoDB } = require("../config/awsConfig");
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

exports.sendMessage = async (message) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      messageId: { S: new Date().toISOString() },
      senderId: { S: message.senderId },
      receiverId: { S: message.receiverId },
      messageText: { S: message.messageText },
      timestamp: { S: message.timestamp }
    }
  };
  
  try {
    await dynamoDB.send(new PutItemCommand(params));
    return { success: true, message: "Mensaje enviado" };
  } catch (error) {
    console.error("Fatal error: ", error);
    throw new Error("The message could´nt be sent");
  }
};
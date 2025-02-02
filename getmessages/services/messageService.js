const { dynamoDB } = require("../config/awsConfig");
const { QueryCommand } = require("@aws-sdk/client-dynamodb");

exports.getMessages = async (receiverId) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: "receiverId-index",
    KeyConditionExpression: "receiverId = :r",
    ExpressionAttributeValues: {
      ":r": { S: receiverId }
    }
  };

  try {
    const data = await dynamoDB.send(new QueryCommand(params));
    return data.Items.map(item => ({
      messageId: item.messageId.S,
      senderId: item.senderId.S,
      receiverId: item.receiverId.S,
      messageText: item.messageText.S,
      timestamp: item.timestamp.S
    }));
  } catch (error) {
    console.error("Fatal error: ", error);
    throw new Error("Cannot get messages");
  }
};

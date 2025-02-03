const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.createMessage = async (messageData) => {
    const messageId = uuidv4();
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Item: {
            messageId: { S: messageId },
            sender: { S: messageData.sender },
            receiver: { S: messageData.receiver },
            message: { S: messageData.message },
            timestamp: { S: messageData.timestamp }
        }
    };

    await dynamoDB.send(new PutItemCommand(params));
    return { id: messageId };
};

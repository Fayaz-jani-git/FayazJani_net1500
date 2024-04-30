import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({ region: "us-east-2" });

export const handler = async (event) => {
    try {
        const queueUrl = "https://sqs.us-east-2.amazonaws.com/767397794649/FayazJani-net1500-queue";

        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10, // Maximum number of messages to retrieve
            WaitTimeSeconds: 10, // Wait time for long polling (optional)
        };

         const data = await sqs.send(new ReceiveMessageCommand(params));
        const messages = data.Messages || [];

        if (messages.length === 0) {
            console.log("No messages found in the queue.");
            return;
        }

        messages.forEach((message) => {
            console.log("Received message:", message.Body);
            // You can process the message further here
        });
        console.log("Message retrieval done");
        return {
            statusCode: 200,
            body: "Messages received successfully!",
        };
    } catch (error) {
        console.error("Error receiving messages:", error);
        return {
            statusCode: 500,
            body: "Error receiving messages from SQS.",
        };
    }
};
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({ region: "us-east-2" });
const url = "https://gdsapi.cnbc.com/market-mover/groupMover/SP500/CHANGE_PCT/BOTH/12.json?source=SAVED&delayed=false&partnerId=2";

export const handler = async (event) => {
  try {
    const res = await fetch(url);
    console.info("status", res.status);
    const msg = await res.json();
    const bigmoverList = []
    const tops = msg.rankedSymbolList[0].rankedSymbols;
    for (var i = 0; i < tops.length; i++) {
      console.log(tops[i])
      const data = {
        
        ticker: tops[i].cnbcSymbol,
        symbolDesc: tops[i].symbolDesc,
        priceChange: tops[i].symbolData.changePct,
        datetime: tops[i].symbolData.lastTime
      };
      bigmoverList.push(data);
    }
    console.log("big mover list");
    console.log(bigmoverList);
    const params = {
      QueueUrl: "Enter your Queue url.",
      MessageBody: JSON.stringify(bigmoverList),
    };
    const sent = await sqsClient.send(new SendMessageCommand(params));
    console.log("Message sent successfully!")

    return {
      statusCode: 200,
      body: "Message sent successfully!",
    };
  }
  catch (error) {
    console.error("Error sending message:", error);
    return {
      statusCode: 500,
      body: "Error sending message to SQS.",
    };
  }
};
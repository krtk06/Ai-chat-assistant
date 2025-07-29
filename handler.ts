import { APIGatewayProxyHandler } from "aws-lambda";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env['API KEY'] });

export const handler: APIGatewayProxyHandler = async (event) => {
  const baseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: baseHeaders,
      body: ""
    };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');
    const { messages, systemPrompt } = body;
    if (!Array.isArray(messages) || typeof systemPrompt !== 'string') {
      return {
        statusCode: 400,
        headers: { ...baseHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid request body" })
      };
    }
   
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages 
      ]
    });

    const aiMessage = gptResponse.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: aiMessage })
    };
  } catch (error) {
    console.error("Error in handler:", error);

    return {
      statusCode: 500,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
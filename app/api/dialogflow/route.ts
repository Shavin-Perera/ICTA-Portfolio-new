// app/api/dialogflow/route.ts
import { NextResponse } from "next/server";
import dialogflow from "@google-cloud/dialogflow";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message?.toString();
    const sessionId = body?.sessionId?.toString();
    const projectId = process.env.DIALOGFLOW_PROJECT_ID;
    const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    console.log("Project ID:", projectId);
    console.log("Google Key File:", keyFilename);
    console.log("Received message:", message);
    console.log("Received sessionId:", sessionId);

    // Validate environment variables and input
    if (!projectId) {
      return NextResponse.json(
        { error: "DIALOGFLOW_PROJECT_ID is missing in environment variables" },
        { status: 500 }
      );
    }
    if (!keyFilename) {
      return NextResponse.json(
        { error: "GOOGLE_APPLICATION_CREDENTIALS is missing in environment variables" },
        { status: 500 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "Message is missing from request body" },
        { status: 400 }
      );
    }
    if (!sessionId) {
      return NextResponse.json(
        { error: "SessionId is missing from request body" },
        { status: 400 }
      );
    }

    // Initialize Dialogflow client
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename,
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return NextResponse.json({
      reply: result?.fulfillmentText || "I didn't understand that.",
    });
  } catch (error: any) {
    console.error("Dialogflow API error:", error);
    return NextResponse.json(
      { error: error.message || "Dialogflow error" },
      { status: 500 }
    );
  }
}

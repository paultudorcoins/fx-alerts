import { NextRequest } from "next/server";

export const runtime = "edge";                      // still an Edge Function

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Create a ReadableStream the Response will pipe to the client
  const stream = new ReadableStream({
    start(controller) {
      const ws = new WebSocket(
        `wss://ws.finnhub.io?token=${process.env.FINNHUB_KEY}`
      );

      ws.addEventListener("open", () => {
        ws.send(
          JSON.stringify({ type: "subscribe", symbol: "OANDA:EUR_USD" })
        );
      });

      ws.addEventListener("message", (event) => {
        controller.enqueue(encoder.encode(`data: ${event.data}\n\n`));
      });

      const cleanup = () => {
        ws.close();
        controller.close();
      };

      ws.addEventListener("close", cleanup);
      ws.addEventListener("error", cleanup);

      // If the client closes the HTTP connection, abort the WS
      req.signal.addEventListener("abort", cleanup);
    },
  });

  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  return new Response(stream, { headers });
}

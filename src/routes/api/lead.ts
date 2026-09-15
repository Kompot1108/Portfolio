import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/lead")({
  POST: async ({ request }) => {
    try {
      // Parse the incoming request (form data or JSON)
      const data = await request.json();
      const { name, contact, message } = data;

      // Extract secure environment variables securely on the server
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        return new Response(JSON.stringify({ error: "Telegram config missing" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Format the message
      const text = `New Lead from Portfolio!\nName: ${name}\nContact: ${contact}\nMessage: ${message || "No message"}`;

      // Send to Telegram Bot API
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to Telegram");
      }

      return new Response(JSON.stringify({ success: true, message: "Lead sent successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error: any) {
      console.error("API /lead error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
});

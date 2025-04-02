import { type APIRoute } from "astro";

export const get: APIRoute = async ({ params, request }) => {
    
    return new Response(
      JSON.stringify({
        message: "Endpoint de ganado funcionando"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };
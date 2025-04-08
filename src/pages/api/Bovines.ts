import { type APIRoute } from "astro";
import { db } from "../../lib/db/db";


  export const GET: APIRoute = async () => {
    try {
      const result = await db.execute('SELECT * FROM Bovines ORDER BY Bovines_id DESC');
      
      return new Response(
        JSON.stringify({
          success: true,
          data: result.rows
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: (error as Error).message
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  };
  
  
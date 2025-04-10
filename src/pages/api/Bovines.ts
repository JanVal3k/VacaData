import { type APIRoute } from "astro";
import { db } from "../../lib/db/db";
import { bovines } from "../../lib/db/schema"; 
import { desc } from "drizzle-orm";


  export const GET: APIRoute = async () => {
    try {
      const result = await db.select().from(bovines).orderBy(desc(bovines.Bovines_id));
      
      return new Response(
        JSON.stringify({
          success: true,
          data: result
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
  
  
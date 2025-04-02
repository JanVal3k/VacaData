import { type APIRoute } from "astro";
import { db } from "../../../lib/db";


  export const get: APIRoute = async () => {
    try {
      const result = await db.execute('SELECT * FROM bovines ORDER BY id DESC');
      
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
  
  // POST - Registrar un nuevo bovino
  export const post: APIRoute = async ({ request }) => {
    try {
      // Obtener los datos del cuerpo de la petición
      const body = await request.json();
      
      // Validar que los campos requeridos estén presentes
      if (!body.tag_number || !body.breed || !body.birth_date) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Se requieren los campos: tag_number, breed y birth_date"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      // Insertar el nuevo bovino en la base de datos
      const result = await db.execute({
        sql: `
          INSERT INTO bovines (
            tag_number, breed, birth_date, gender, weight, 
            mother_id, father_id, purchase_date, purchase_price, 
            status, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          body.tag_number, 
          body.breed, 
          body.birth_date,
          body.gender || null,
          body.weight || null,
          body.mother_id || null,
          body.father_id || null,
          body.purchase_date || null,
          body.purchase_price || null,
          body.status || 'active',
          body.notes || null
        ]
      });
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Bovino registrado exitosamente",
          id: result.lastInsertRowid
        }),
        {
          status: 201,
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
  
  // PUT - Actualizar un bovino existente
  export const put: APIRoute = async ({ request }) => {
    try {
      const body = await request.json();
      
      // Verificar que el ID esté presente
      if (!body.id) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Se requiere el ID del bovino"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      // Construir la consulta SQL dinámicamente basada en los campos presentes
      let sql = 'UPDATE bovines SET ';
      const updates = [];
      const args = [];
      
      // Añadir cada campo presente a la consulta
      if (body.tag_number !== undefined) {
        updates.push('tag_number = ?');
        args.push(body.tag_number);
      }
      if (body.breed !== undefined) {
        updates.push('breed = ?');
        args.push(body.breed);
      }
      if (body.birth_date !== undefined) {
        updates.push('birth_date = ?');
        args.push(body.birth_date);
      }
      if (body.gender !== undefined) {
        updates.push('gender = ?');
        args.push(body.gender);
      }
      if (body.weight !== undefined) {
        updates.push('weight = ?');
        args.push(body.weight);
      }
      if (body.mother_id !== undefined) {
        updates.push('mother_id = ?');
        args.push(body.mother_id);
      }
      if (body.father_id !== undefined) {
        updates.push('father_id = ?');
        args.push(body.father_id);
      }
      if (body.purchase_date !== undefined) {
        updates.push('purchase_date = ?');
        args.push(body.purchase_date);
      }
      if (body.purchase_price !== undefined) {
        updates.push('purchase_price = ?');
        args.push(body.purchase_price);
      }
      if (body.status !== undefined) {
        updates.push('status = ?');
        args.push(body.status);
      }
      if (body.notes !== undefined) {
        updates.push('notes = ?');
        args.push(body.notes);
      }
      
      // Si no hay campos para actualizar
      if (updates.length === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "No se proporcionaron campos para actualizar"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      // Completar la consulta SQL
      sql += updates.join(', ') + ' WHERE id = ?';
      args.push(body.id);
      
      // Ejecutar la actualización
      const result = await db.execute({
        sql,
        args
      });
      
      // Verificar si se actualizó algún registro
      if (result.rowsAffected === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "No se encontró ningún bovino con ese ID"
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Bovino actualizado exitosamente"
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
  
  // DELETE - Eliminar un bovino
  export const del: APIRoute = async ({ request }) => {
    try {
      const body = await request.json();
      
      // Verificar que el ID esté presente
      if (!body.id) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Se requiere el ID del bovino"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      // Ejecutar la eliminación
      const result = await db.execute({
        sql: 'DELETE FROM bovines WHERE id = ?',
        args: [body.id]
      });
      
      // Verificar si se eliminó algún registro
      if (result.rowsAffected === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "No se encontró ningún bovino con ese ID"
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Bovino eliminado exitosamente"
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
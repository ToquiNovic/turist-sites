import type { APIRoute } from 'astro';
import { promises as fs } from 'fs'
import { status } from "@touristSites";

// Define los datos de 'label' que deseas devolver
var label = status

export const POST: APIRoute = async ({ request }) => {
  try {
     // Extraer el nuevo valor del campo 'label' del cuerpo de la solicitud
     const data = await request.json();
     const newStatus = data.status;
 
     // Ruta al archivo JSON local
     const filePath = 'tourist-sites.json';

     console.log(filePath);
     
 
     // Leer el contenido del archivo JSON
     const fileContent = await fs.readFile(filePath, 'utf8');
     const jsonData = JSON.parse(fileContent);
 
     // Actualizar el campo 'label' con el nuevo valor recibido
     jsonData.status = newStatus;
 
     // Escribir los cambios de nuevo al archivo JSON
     await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
 
     // Responder con el nuevo valor del campo 'label'
     return new Response(JSON.stringify({status: newStatus }), {
       status: 200,
       headers: {
         'Content-Type': 'application/json',
       },
     });
  } catch (error) {
     console.error('Error al actualizar el estado:', error);
     return new Response(JSON.stringify({ message: 'Error al actualizar el estado' }), {
       status: 500,
       headers: {
         'Content-Type': 'application/json',
       },
     });
  }
 };

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
     JSON.stringify({
       status: label
     })
  );
 }
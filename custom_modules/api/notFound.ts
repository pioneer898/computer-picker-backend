import { ApiEndpoint } from "./ApiEndpoint";

export async function notFound(request:any,response:any,next:any,endpointObj:ApiEndpoint){
  return response.status(401).json({message:'Endpoint Method Not Defined'});
}
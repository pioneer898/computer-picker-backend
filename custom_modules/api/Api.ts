import { ApiCollection } from "./ApiCollection";
import { ApiEndpoint } from "./ApiEndpoint";

export class Api{
  version:string = 'v1.0';
  endpoints:ApiEndpoint[] = [];
  collection?:ApiCollection = undefined;

  constructor(providedOpts={}){
    Object.assign(this,providedOpts);
  }
}
// import { METHODS } from "http";
import { Express } from 'express';
import { Api } from './Api';
import { ApiEndpoint } from "./ApiEndpoint";

export class ApiCollection{
  apis:Api[] = [];
  resources = {};
  supportedMethods = ['get','put','delete','post'];

  constructor(providedOpts={}){
      Object.assign(this,providedOpts);
  }
  addApi(api:Api){
    this.apis.push(api);
  }
  run(app:Express){
    let t = this;
    t.apis.forEach((api)=>{
      api.endpoints.forEach((endpoint:ApiEndpoint)=>{
        t.supportedMethods.forEach((method)=>{
          (app as any)[method](endpoint.paths,endpoint.authFunctions[method]);
          (app as any)[method](endpoint.paths,async function(req:any,res:any,next:any){
            endpoint.actionFunctions[method](req,res,next);
          });
        });
      });
    });
  }
}
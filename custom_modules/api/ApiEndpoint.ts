import { anonymousAuth } from "./auths/anonymousAuth";
import { notFound } from "./notFound";

export class ApiEndpoint{
  paths:string[];
  defaultAuth:Function;
  authFunctions: {
    [key:string]: Function
  } = {
    get: Function,
    put: Function,
    delete: Function,
    post: Function
  }
  
  actionFunctions: {
    [key:string]: Function
  } = {
    get: Function,
    put: Function,
    delete: Function,
    post: Function
  }
  constructor(requiredOpts:{
    paths:string[],
    defaultAuth: Function
  } = {
    paths: [],
    defaultAuth: anonymousAuth
  },auths={},actions={}){
    this.paths = requiredOpts.paths;
    // Default Auths
    this.defaultAuth = requiredOpts.defaultAuth
    this.authFunctions.get = this.defaultAuth;
    this.authFunctions.put = this.defaultAuth;
    this.authFunctions.delete = this.defaultAuth;
    this.authFunctions.post = this.defaultAuth;
    // Default Actions
    this.actionFunctions.get = notFound;
    this.actionFunctions.put = notFound;
    this.actionFunctions.delete = notFound;
    this.actionFunctions.post = notFound;

    Object.assign(this.authFunctions,auths);
    Object.assign(this.actionFunctions,actions);
    
    if(this.paths.length === 0){
      console.error('Missing Endpoint Paths');
      process.exit()
    }
  }
}
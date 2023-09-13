export class Configuration{
  public:string = '';
  
  constructor(providedOpts={}){
    Object.assign(this,providedOpts);
  }
  validAccessCode(accessCode:string){
    if(!accessCode || accessCode == ''){
      return false;
    }
    return false;
  }
  
}
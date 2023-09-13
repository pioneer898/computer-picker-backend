const fs = require('fs').promises;
import { Api } from './api/Api';
import { ApiEndpoint } from './api/ApiEndpoint';
import { anonymousAuth } from './api/auths/anonymousAuth'
import { PickerConfiguration } from './models/PickerConfiguration';
import { MongoCrud } from './mongo/MongoCrud';


export class ConfigurationApi extends Api{
  constructor(providedOpts={}){
    super(providedOpts);
    let t = this;


    // Endpoints
    t.endpoints.push(
      new ApiEndpoint({
        paths: [`/api/${t.version}/configuration`],
        defaultAuth: anonymousAuth
      },
      {},
      {
        get: async function(req:any,res:any,next:any){
          let accessCode:string = req.query.accessCode;
          let mc = new MongoCrud();
          let config = await mc.loadConfigurationByAccessCode(accessCode);
          if(config){
            res.status(200).json({
              accessCodeIsValid: true,
              pickerConfiguration: t.prepConfiguration(config)
            });
          } else {
            res.status(200).json({
              accessCodeIsValid: false,
              pickerConfiguration: null
            });
          }
        },
        post: async function(req:any,res:any,next:any){
          let accessCode:string = req.body.accessCode;
          let pickerConfiguration:PickerConfiguration = req.body.pickerConfiguration;
          let mc = new MongoCrud();
          let config = await mc.saveConfigurationByAccessCode(accessCode,pickerConfiguration);
          if(config){
            res.status(200).json({
              success: true
            });
          } else {
            res.status(200).json({
              success: false
            });
          }
        }
      })
    );
  }

  // Methods
  prepConfiguration(configuration:PickerConfiguration):PickerConfiguration{
    configuration.components.forEach((e)=>{
      if(e.options.filter(o=>o.selected === true).length === 0){
        e.options[0].selected = true;
      }
    });
    return configuration;
  }
}
const fs = require('fs').promises;
import { Api } from './api/Api';
import { ApiEndpoint } from './api/ApiEndpoint';
import { anonymousAuth } from './api/auths/anonymousAuth';
import { MongoCrud } from './mongo/MongoCrud';


export class ImageApi extends Api{
  constructor(providedOpts={}){
    super(providedOpts);
    let t = this;

    t.endpoints.push(
      new ApiEndpoint({
        // Base
        paths: [`/images/`],
        defaultAuth: anonymousAuth
      },
      {
        // Auth Overrides
      },
      {
        // Action Overrides
        get: async function(req:any,res:any,next:any){
          let imageId:string = req.query.imageId;
          let mc = new MongoCrud();
          let image = await mc.loadImageByImageId(imageId);
          if(image){
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 Day
            res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
            res.setHeader('Content-Type', `images/${image.fileType}`);
            res.status(200).send(Buffer.from(image.image, 'base64'));
          } else {
            res.status(404).send();
          }
        },
      })
    );
  }

}
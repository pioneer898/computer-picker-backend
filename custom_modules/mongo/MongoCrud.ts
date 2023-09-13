import { PickerConfiguration } from "../models/PickerConfiguration";

const { MongoClient } = require('mongodb');
const clientConfig = require((typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'development')?'../../env.dev':'../../env.prod');

const client = new MongoClient(`mongodb://${clientConfig.mongoUser}:${clientConfig.mongoPassword}@${clientConfig.mongoDomain}:${clientConfig.mongoPort}/?authMechanism=DEFAULT`);

export class MongoCrud{
  query: string = '';

  constructor(providedOpts={}){
    Object.assign(this,providedOpts);
  }
  async connect(){
    await client.connect();
  }
  async loadConfigurationByAccessCode(accessCode:string){
    const result = await client.db(clientConfig.mongoDatabase).collection('configurations').findOne({accessCode:accessCode});
    return result;
  }
  async saveConfigurationByAccessCode(accessCode:string,pickerConfiguration:PickerConfiguration){
    const result = await client.db(clientConfig.mongoDatabase).collection('configurations').updateOne({accessCode:accessCode},{$set:{components:pickerConfiguration.components}});
    return result;
  }
  async loadImageByImageId(imageId:string){
    const result = await client.db(clientConfig.mongoDatabase).collection('images').findOne({imageId:imageId});
    return result;
  }
}
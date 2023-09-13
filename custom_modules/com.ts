// module.exports = {
//   hasProp: function(object,propertyName){
//     return Object.prototype.hasOwnProperty.call(object,propertyName);
//   },
//   waitMilliseconds: async function(ms){
//     return new Promise((resolve) => {
//       setTimeout(function(){ resolve(); }, ms);
//     });
//   },
//   leftPad: function(str:string,char:string,len:number){
//     let pad = char.repeat(len);
//     let paddedString = pad+str;
//     return paddedString.substring(paddedString.length-len,paddedString.length);
//   },
//   uuidv4: function(){
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   },
//   makeId(length:number,keyspace='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
//     let result = '';
//     for (let i=0;i<length;i++){
//       result += keyspace.charAt(Math.floor(Math.random()*keyspace.length));
//     }
//     return result;
//   }
// }
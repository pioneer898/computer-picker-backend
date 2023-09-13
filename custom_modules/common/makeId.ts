export function makeId(length:number,keyspace='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
  let result = '';
  for (let i=0;i<length;i++){
    result += keyspace.charAt(Math.floor(Math.random()*keyspace.length));
  }
  return result;
}
function Map(model,source){
  var res={};
  for(let key in model){
    if(key!="_id"||key!="__v"){
      res[key]=source[key];
    }
  }

   return res;
}

export function Mapper(model,source){
  return Map(model,source);
}

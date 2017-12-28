export function QueryFilters (filters,context){

  var request = JSON.parse(JSON.stringify(filters));
  var result = {};

  var data = request.split(',');

  for (var i in data){

    var propertyName  = data[i].split(':')[0];
    var value = data[i].split(':')[1];
    if(value.indexOf('/')>-1){
      var item = value.replace('/','').replace('/','');
      console.log(item);
      result[propertyName] = new RegExp(item,"i");
    }
    else{
        result[propertyName] = value;
    }

  }

  result["Context"] = context;
  console.log(result);
  return result;
};

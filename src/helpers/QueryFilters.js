export function QueryFilters (filters,context){

  var request = JSON.parse(JSON.stringify(filters));
  var result = {};

  var data = request.split(',');

  console.log(request);

  for (var i in data){

    var propertyName  = data[i].split(':')[0];
    var value = data[i].split(':')[1];
    console.log(value.indexOf('/'));
    if(value.indexOf('/')===0){
      var item = value.replace('/','').replace('/','');
      console.log('hey');
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
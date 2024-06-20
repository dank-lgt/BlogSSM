function getParamByKey(key){
    //example : ?id=1&name=lisi
    var params = location.search;
    params = params.substring(1);//去除前面的”？“
    var pararmArr = params.split("&");
    if(pararmArr != null && pararmArr.length > 0){
        for(var i = 0;i < pararmArr.length ;i++){
            var item = pararmArr[i];// ex: id =1
            var itemArr = item.split("=");
            if(itemArr.length == 2 &&itemArr[0] == key){
                return itemArr[1]; //返回value
            }
        }
    }
    return null;
}
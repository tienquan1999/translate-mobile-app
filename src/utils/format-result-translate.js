
module.exports = (result) => {
    if(Array.isArray(result._array)){
        result.data = result._array[0];
        delete result._array;
        result.data.mean = JSON.parse(result.data.mean);
        result.data.mean = Object.keys(result.data.mean).map(function(key) {
            return {...result.data.mean[key]};
        });
        result.type = "offline";
    }else{
        result = result[0];
        result.type = "online";
    }
    return result;
}
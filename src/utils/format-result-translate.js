
module.exports = (result) => {
    if(Array.isArray(result._array)){
        result.data = result._array[0];
        delete result._array;
        result.data.mean = JSON.parse(result.data.mean);
        result.data.mean = Object.keys(result.data.mean).map(function(key) {
            return {...result.data.mean[key]};
        });
        result.data.mean.splice(result.data.mean.length - 1, 1);
        result.data.mean = result.data.mean.map(e => {
            let count = e.count;
            let values = [];
            let key = "item";
            for(let i=1; i<2; i++){
                if(e[key + i].tag = "m"){
                    let examples = [];
                    let j=i+1;
                    for(j; j<count; j++){
                        if((e[key+j].tag === "e" && e[key+(j+1)].tag === "em") 
                        || (e[key+j].tag === "id" && e[key+(j+1)].tag === "im")
                        || (e[key+j].tag === "ei" && e[key+(j+1)].tag === "eim")){
                            examples.push({
                                mean: e[key+(j+1)].txt,
                                word: e[key+j].txt
                            })
                        } else if(e[key + j].tag === "m"){
                            break;
                        }
                    }
                    values.push({
                        mean: e[key + i].txt,
                        examples
                    })
                    i=j-1;
                }
            }
            return {
                count,
                values,
                type: e.type
            }
        })
        result.type = "offline";
    }else{
        result.type = "online";
    }
    return result;
}
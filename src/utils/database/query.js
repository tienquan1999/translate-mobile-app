


function findOne({db, query, params}){
    return new Promise((resolve, reject) => {
      console.log("oke");
        db.transaction(
            tx => {
              console.log("ok")
              tx.executeSql(query, params, (_, { rows }) =>
                {
                  console.log("here");
                  resolve(JSON.stringify(rows))
                }
              );
            }, 
            (e) => {
              console.log(e)
            },
            () => {
              console.log("done")
            }
          );
    })
}


module.exports = {
    findOne
}



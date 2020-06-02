


function findOne({db, query, params}){
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
              tx.executeSql(query, params, (_, { rows }) =>
                resolve(JSON.stringify(rows))
              );
            }
          );
    })
}


module.exports = {
    findOne
}



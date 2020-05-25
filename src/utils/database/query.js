


function findOne({db, query, params}){
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if(err){
                reject(err);
            }
            db.close();
            resolve(row);
        });
    })
}


module.exports = {
    findOne
}



let {translate} = require("../../utils/controller");




async function test(){
    try{
        let enWord = "What";
        let viWord = "Tinh cam";
        let en_viResult = await translate({from: "en", to: "vi", word: enWord});
        let vi_enResult = await translate({from: "vi", to: "en", word: viWord})
        console.log(`vi_en of ${viWord}: `, vi_enResult);
        console.log(`en_vi of ${enWord}: `, en_viResult);
    }
    catch(e){
        console.error(e);
    }
}

test();
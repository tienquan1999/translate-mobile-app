let {translate} = require("../../utils/controller");


async function test(){
    try{
        let enWord = "What";
        let viWord = "Tinh cam";
        let enText = "Remember to configure the OAuth consent screen with information about your application.";
        // let en_viResult = await translate({from: "en", to: "vi", word: enWord});
        // let vi_enResult = await translate({from: "vi", to: "en", word: viWord})
        let result = await translate({from: "en", to: "vi", word: enText})
        // console.log(`vi_en of ${viWord}: `, vi_enResult);
        // console.log(`en_vi of ${enWord}: `, en_viResult);
        console.log(result);
    }
    catch(e){
        console.error(e);
    }
}

test();
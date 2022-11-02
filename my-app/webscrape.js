const cheerio = require('cheerio');
const axios = require('axios');

//const url = 'https://goerli.etherscan.io/token/0xf2edf1c091f683e3fb452497d9a98a49cba84666#code';
const url = 'https://goerli.etherscan.io/token/0x4aeceb6486d25d5015bf8f8323914a36204ed4b7#code'
let lines=0;
axios.get(url).then((response)=>{
    let $ = cheerio.load(response.data);
    const page = response.data;
    let t;
    let f=0;
    for(let i=0; i<page.length-6; i++){
        if(f==0){
            if(page.substr(i,6)=='pragma'){
                t=i;
                f=1;
            }
        }else {
            if(page.substr(i, 6)=='</pre>'){
                f=i;
                break;
            }
        }
        
    }
    const code = (page.substr(t, f-t));
    //console.log(page.substr(t, f-t));
    //let lines=0;
    for(let i=0; i<code.length;  i++){
        if(code[i]=='\n'){
            lines+=1;
        }
    }
    
}).catch((err)=>{
    console.log(err)
})
//export default lines;
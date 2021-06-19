  // const add=(req)=>{
    // console.log(req)
    // }

    // add('hi')

    // function one(callback){
    //     setTimeout(() => {
    //        console.log('one') 
    //        callback('1')
    //     }, 2000);

    // }
    // function two(callback){
    //     setTimeout(() => {
    //        console.log('two') 
    //        callback('2')
    //     }, 2000);

    // }

    // one((dig1)=>{
    //     console.log(dig1)
    //     two((dig2)=>{
    //      console.log(dig2)
    //     })

    // })

    //promise
    function pr(status){
        return new Promise((resolve,reject)=>{
        if (status='SUCCESS')
        {
         setTimeout(() => {
             resolve('SUCCESS')
         }, 2000);
        }
        else
        {
            setTimeout(() => {
                resolve('FAIL')
            }, 2000);
        }
        });
    }

    pr('SUCCESS').then((res)=>{
        console.log("rt:"+res)
    })

    var text1 = "abcdefgh";
var text2 = "cde";

console.log(text1.substring(0, text1.indexOf(text2)));
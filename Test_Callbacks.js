// function callbackimp(res)
// {
//     console.log(res)

// }

// function businessLogic(a,b,callback)
// {
//     setTimeout(() => {
        
//         callback(a+b)
//     }, 2000);

// }

// businessLogic(1,2,callbackimp)

// businessLogic(1,2,(res)=>console.log(res))


function a(callback)
{
    setTimeout(() => {
        console.log('In A');
        callback("Executed A")
    }, 1000);
}

function b(callback)
{
    setTimeout(() => {
        console.log('In B');
        callback("Executed B")
    }, 500);
}

function c(callback)
{
    setTimeout(() => {
        console.log('In C');
        callback("Executed C")
    }, 2000);
}

// a((res=>{console.log(res)}))
// b((res=>{console.log(res)}))
// c((res=>{console.log(res)}))

 a((res)=>
 {
     console.log(res)
     b((res)=>
     {
         console.log(res)
         c((res)=>
         {
             console.log(res)
         })
     })
 })



test()


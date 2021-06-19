function a()
{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('In A');
        resolve("Executed A")
    }, 2000);
});
}

function b()
{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('In B');
        resolve("Executed B")
    }, 500);
});
}

function c()
{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('In C');
        resolve("Executed C")
    }, 1000);
});
}

async function test()
{
    await a();
    await b();
    await c();
    console.log('end')
}
//test()

async function test1()
{
    await test();
    console.log("done")
}

test1()




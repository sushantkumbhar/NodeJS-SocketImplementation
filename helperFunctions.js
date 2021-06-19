function getStandardResponse(meta,data){
    return {
        meta: meta,
        data : data
     }
}

function getMeta(statusCode,message){
  return{
    statusCode: statusCode,
    message: message
  }
}

function getDataPaymentConfirmation(orderId){
    return{
        orderId: orderId
    }
  }


//console.log(JSON.stringify(getMeta(1,'2')))
//console.log(JSON.stringify(getStandardResponse(getMeta(1,'2'),getDataPaymentConfirmation('2'))))


module.exports={
    getStandardResponse:getStandardResponse,
    getMeta:getMeta,
    getDataPaymentConfirmation:getDataPaymentConfirmation
}
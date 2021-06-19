
    const jwt = require('jsonwebtoken');
    const jwksClient = require('jwks-rsa');

    //https://github.com/auth0/node-jwks-rsa
    const client = jwksClient({
    jwksUri: "",//Pass JWKS URL Here
    cache:true,
    rateLimit: true,
    jwksRequestsPerMinute: 2
    });
    //The getKey is a function that the jsonwebtoken library will call with a header, 
    //and a callback to tell it that we failed, or successfully loaded up the signing key.
    function getKey (header, callback){
        //console.log(header);
        client.getSigningKey(header.kid, function(err, key) {
        if (err) {
            console.log("Public Key Not found")
            callback(err);
            return;
        }
        else
        {    
          const signingKey = key.getPublicKey();
          //console.log("signingKey-:"+signingKey)
          callback(null, signingKey);
        }
    });
    };

    async function verifyAuth0Token (token) {
    return new Promise((resolve, reject) => {
        //We receive a token to verify, a getKey callback and then we provide //
        //our algorithm, and a callback to deal with the returned error or decoded token
        jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) 
         {
            resolve('FAIL');
            console.log("Error in VerifyAuth0 Token:"+err)
            return;
         }
         else
         {
            console.log("SUCCESS")
            //console.log(decoded)
            resolve('SUCCESS');
         }
        });
        
    });
    
    };
    //var jwtToken=''

    //const data= verifyAuth0Token(jwtToken);
    //console.log("End")

    module.exports={
        verifyAuth0Token:verifyAuth0Token
    }
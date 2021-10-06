const fs = require("fs");
const rsa = require("node-rsa");
const crypto = require("crypto");
//const bcrypt = require("bcryptjs");

const saltFist = crypto.randomBytes(20).toString("hex");
const saltLast = crypto.randomBytes(20).toString("hex");

const generatePair = () => {
    let key = new rsa().generateKeyPair();
    let publicKey = key.exportKey("public");
    let privateKey = key.exportKey("private");

    fs.openSync("./cert/public.pem", "w");
    fs.writeFileSync("./cert/public.pem", publicKey, "utf8");

    fs.openSync("./cert/private.pem", "w");
    fs.writeFileSync("./cert/private.pem", privateKey, "utf8")

}

const generateCertificate = (message) => {
    let publicKey = new rsa();
    let privateKey = new rsa();

    let public = fs.readFileSync("./cert/jayz.pem", publicKey, "utf8");
    let private = fs.readFileSync("./cert/jayz.pem", privateKey, "utf8")

    publicKey.importKey(public);
    privateKey.importKey(private);

    const encrypted = privateKey.encryptPrivate(message, 'base64');

    return encrypted;
}

const checkValidity = (licence) => {
    let publicKey = new rsa();
    let privateKey = new rsa();

    let public = fs.readFileSync("./cert/public.pem", publicKey, "utf8");
    let private = fs.readFileSync("./cert/private.pem", privateKey, "utf8")

    publicKey.importKey(public);
    privateKey.importKey(private);
    

    const decrypted = publicKey.decryptPublic(licence, "utf8");
    //return decrypted;
    const message = "philodi";
    if(message == decrypted){
        return true;
    }else{
        return false;
    }
}

//console.log(checkValidity("YCvqH4+SQEmmaTQxdhH/qS4EbhWtWVna2W9ubUJ9EHkAZDLBiV3EfUtpClyGoYioZQTNpmH7nOIEH0svORtBZZ+8vwcS57vS1CxJ8yoeBgmWuyQ7vrUs0awKKphBEe67BLItKijySJD0pH8Wudxy2eWpau6Vy0W0Tvj3lbP40Ml9KKty4KFQNcKfAgSK5IRTjdiK8dUZtJxa9eXK/qbfhwfGd3sektdQsHlcODYFsVaYYy8mKoxLk5kDGM0FlLVjNATISWCJsJ6zpeeY/JQx8H8A+0Dc3H+eSLkXFjZBri2r8UoxrW0QUAa10BwN0OdWRnBvzVAp+h3IC2+FxeLvgw=="));

//console.log(generateCertificate("philodi"));

generatePair();
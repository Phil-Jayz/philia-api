const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const rsa = require("node-rsa");

exports.generatePair = (userId) => {
  let key = new rsa({ b: 512 }).generateKeyPair();
  key.setOptions({ encryptionScheme: "pkcs1" });
  let publicKey = key.exportKey("public");
  let privateKey = key.exportKey("private");
  
  generateUserPath(userId, publicKey, privateKey);
  
};

exports.generateCertificate = (userId, message) => {
  let publicKey = new rsa({ b: 512 });
  let privateKey = new rsa({ b: 512 });

  let keyPublic = fs.readFileSync(
    path.join(__dirname, "../public/users/" + userId + "/cert/", "public.pem")
  );
  let keyPrivate = fs.readFileSync(
    path.join(__dirname, "../public/users/" + userId + "/cert/", "private.pem")
  );

  publicKey.importKey(keyPublic);
  privateKey.importKey(keyPrivate);

  const encrypted = privateKey.encryptPrivate(message, "base64");

  return encrypted;
};

exports.checkValidity = (userId, licence) => {
  let publicKey = new rsa({ b: 512 });
  let privateKey = new rsa({ b: 512 });

  let keyPublic = fs.readFileSync(
    path.join(__dirname, "../public/users/" + userId + "/cert/", "public.pem")
  );
  let keyPrivate = fs.readFileSync(
    path.join(__dirname, "../public/users/" + userId + "/cert/", "private.pem")
  );

  publicKey.importKey(keyPublic);
  privateKey.importKey(keyPrivate);

  const decrypted = publicKey.decryptPublic(licence, "utf8");
  return decrypted;
};

exports.axiosTest = () => {
  axios({
		url: "users",
		method: "get",
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
}

const generateUserPath = (userId, publicRsa, privateRsa) => {
  try {
    fse
      .outputFile("public/users/" + userId + "/cert/public.pem", publicRsa)
      .then(() => {
        fse
          .outputFile(
            "public/users/" + userId + "/cert/private.pem",
            privateRsa
          )
          .then(() => {
            return true;
          })
          .catch((err) => {
            return false;
          });
      })
      .catch((err) => {
        return false;
      });
  } catch (error) {
    return false;
  }
};

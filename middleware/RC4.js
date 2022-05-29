const spawn = require("child_process").spawn;

class RC4Middleware {
  async encrypt(req, res, next) {
    let plainDataToEncrypt = req?.body?.password || req?.body?.content;
    var process = spawn("python", [
      "./rc4.py",
      "encrypt",
      plainDataToEncrypt,
      "KEY",
    ]);
    process.stdout.on("data", function (data) {
      let resultArr = JSON.parse(data.toString());
      resultArr = resultArr.reduce((result, item) => {
        return result + String.fromCharCode(item);
      }, "");
      if (resultArr) {
        delete req?.body?.password;
        delete req?.body?.content;
        req.body.encryptedData = resultArr;
        next();
      }
    });
  }
  async decrypt(req, res, next) {
    let { dataEncryptedArr } = res.locals;
    let resultSocket = [];
    dataEncryptedArr = dataEncryptedArr?.map((dataEncrypted, index) => {
      let cipherText = dataEncrypted?.content;
      let asciiArr = cipherText
        ?.split("")
        ?.map((item, index) => cipherText.charCodeAt(index));
      var process = spawn("python", [
        "./rc4.py",
        "decrypt",
        JSON.stringify(asciiArr),
        "KEY",
      ]);
      process.stdout.on("data", function (data) {
        let decryptedData = data.toString()?.replace("\r\n", "");
        dataEncrypted.content = decryptedData;
        resultSocket.push(dataEncrypted);
        if (++index === dataEncryptedArr?.length) {
          if (dataEncryptedArr?.length === 1) {
            resultSocket = resultSocket[0];
          }
          res.json({
            status: "success",
            data: resultSocket,
          });
        }
      });
    });
  }
}

module.exports = new RC4Middleware();

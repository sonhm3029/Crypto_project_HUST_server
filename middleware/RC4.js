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
    let { dataEncrypted } = res.locals;
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
      let decyptedData = data.toString()?.replace("\r\n", "");

      dataEncrypted.content = decyptedData;
      res.json({
        status: "success",
        data: dataEncrypted,
      });
    });
  }
  test(req, res, next) {
    req.body.id = 10;
    next();
  }
}

module.exports = new RC4Middleware();

const spawn = require("child_process").spawn;

class RC4Controller {
  async encrypt(req, res, next) {
    var process = spawn("python", [
      "./rc4.py",
      "encrypt",
      "Hoang Minh Son",
      "KEY",
    ]);
    process.stdout.on("data", function (data) {
      let resultArr = JSON.parse(data.toString());
      resultArr = resultArr.reduce((result, item) => {
        return result + String.fromCharCode(item);
      }, "");
      res.json({
        data: resultArr,
      });
    });
  }
  async decrypt(req, res, next) {
    console.log(res.locals.data)
    let testKey = "®]ÒÄíFw!~ÀĜ";
    let asciiArr = testKey
      .split("")
      .map((item, index) => testKey.charCodeAt(index));
    var process = spawn("python", [
      "./rc4.py",
      "decrypt",
      JSON.stringify(asciiArr),
      "KEY",
    ]);
    process.stdout.on("data", function (data) {
      let result = data.toString()?.replace("\r\n", "");
      if(result) {
          res.json({
              status:"success",
              data:result
          })
      }
    });
  }
}

module.exports = new RC4Controller;

const fse = require("fs-extra");
const net = require("net");
const uuid = require("uuid");
const Handlebars = require("handlebars");
const fileContent = fse.readFileSync("./sample.service").toString();
const template = Handlebars.compile(fileContent);

const getNetworkIP = () => {
  return new Promise((resolve, reject) => {
    var socket = net.createConnection(80, "www.google.com");
    socket.on("connect", function () {
      resolve(socket.address().address);

      socket.end();
    });
    socket.on("error", function (e) {
      reject(e);
    });
  });
};

(async () => {
  const contents = template({
    nodeId: uuid.v4(),
    ipAddress: await getNetworkIP(),
  });
  fse.writeFileSync("consul.service", contents);
  fse.removeSync("/etc/systemd/system/consul.service");
  fse.moveSync("consul.service", "/etc/systemd/system/consul.service");
})();

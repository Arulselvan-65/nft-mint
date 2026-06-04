const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const baseURI = "https://ipfs.io/ipfs/bafkreibckfqyifkptko6azgni6ioaxrlbdmc5koa4q2g4qffec523qykyi";

module.exports = buildModule("DevBadgeModule", (m) => {
  const contract = m.contract("DevBadge", [baseURI]);

  return { contract };
});

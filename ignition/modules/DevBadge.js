const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DevBadgeModule", (m) => {

  const contract = m.contract("DevBadge");

  return { contract };
});

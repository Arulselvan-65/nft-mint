const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DevBadgeModule", (m) => {

  const lock = m.contract("DevBadge", []);

  return { lock };
});

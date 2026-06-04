const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const baseURI = "ipfs://bafkreiebck6ll7zehk4tqrthxl4eiq4tmkaxm7mpuvsfjrespxvw5vicpi";

module.exports = buildModule("DevBadgeModule", (m) => {
  const contract = m.contract("DevBadge", [baseURI]);

  return { contract };
});

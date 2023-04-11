const { getactivitesInfo } = require("../services/activites");
const { obtainAccessToken } = require("../config/token");

const getactivites = async (req, res) => {
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  const activities = await getactivitesInfo(accessToken);
  res.status(200).json({ message: "ok", status: 200, data: activities });
};

module.exports = { getactivites };

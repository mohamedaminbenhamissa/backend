const { obtainAccessToken } = require('../config/token');
const Formation = require('../models/formation_model');

// Import the getFormationInfo function from the service file
const { getFormationInfo } = require('../services/formation');

// Define a variable to store the formations data
let formationsData;

// Define an async function to fetch the formations data and save it to the database if necessary
async function fetchFormationsData() {
  // Obtain an access token
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  // Call the getFormationInfo function to fetch the formations data
  const formationsData = await getFormationInfo(accessToken);

  await Promise.all(
    formationsData.map(async (formationData) => {
      await Formation.findOneAndUpdate(
        { idFormation: formationData.idFormation },
        { $set: { ...formationData, lastUpdated: Date.now() } },
        { upsert: true }
      );
    })
  );
}

// Call the fetchFormationsData function once to fetch and save the formations data
fetchFormationsData();

const getFormations = async (req, res) => {
  try {
    // Fetch the formations from the database and sort by lastUpdated field in descending order
    const formations = await Formation.find().sort({ lastUpdated: -1 });

    res.json({
      message: 'ok',
      status: 200,
      data: formations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
      error: error.message
    });
  }
};

module.exports = { getFormations };

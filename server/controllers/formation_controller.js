const { obtainAccessToken } = require('../config/token');
const Formation = require('../models/formation_model');

// Import the getFormationInfo function from the service file
const { getFormationInfo } = require('../services/formation');

// Define a variable to store the formations data
let formationsData;

// Define an async function to fetch the formations data and save it to the database if necessary

// async function fetchFormationsData() {
//   // Obtain an access token
//   const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
//   if (expire_in === 0) {
//     accessToken = refreshToken;
//   }

//   // Call the getFormationInfo function to fetch the formations data
//   formationsData = await getFormationInfo(accessToken);

//   // Check if each formation already exists in the database, and save it if not
//   await Promise.all(
//     formationsData.map(async (formationData) => {
//       const formation = await Formation.findOne({ idFormation: formationData.idFormation });
//       if (!formation) {
//         await new Formation(formationData).save();
//       }
//     })
//   );
// }
async function fetchFormationsData() {
  // Obtain an access token
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  // Call the getFormationInfo function to fetch the formations data
  const formationsData = await getFormationInfo(accessToken);

  // Loop through the formations data and update or save each formation to the database
  // await Promise.all(
  //   formationsData.map(async (formationData) => {
  //     // Find the existing formation in the database
  //     let formation = await Formation.findOne({ idFormation: formationData.idFormation });

  //     // If the formation already exists, update it with the new data
  //     if (formation) {
  //       formation.idFormation = formationData.idFormation;
  //       formation.nomFormation = formationData.nomFormation;
  //       formation.uniqid = formationData.uniqid;
  //       formation.modules_count = formationData.modules_count;
  //       formation.non_admin_users_count = formationData.non_admin_users_count;
   
  //       await formation.save();
  //     }
  //     // Otherwise, save the new formation to the database
  //     else {
  //       formation = new Formation(formationData);
  //       await formation.save();
  //     }
  //   })
  // );
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

// Define the getFormations function to return the formations from the database
// const getFormations = async (req, res) => {
//   try {
//     // Fetch the formations from the database
//     const formations = await Formation.find();

//     res.json({
//       message: 'ok',
//       status: 200,
//       data: formations
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'Internal server error',
//       status: 500,
//       error: error.message
//     });
//   }
// };
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

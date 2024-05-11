const cron = require("node-cron");
const axios = require("axios");

const backendUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5555/";

const cronSchedule = "*/14 * * * *";

const callApi = async () => {
  try {
    const response = await axios.get(backendUrl);
    console.log("API call successful:", response.data);
  } catch (error) {
    console.log("Error calling API:", error.message);
  }
};

const cronJob = cron.schedule(cronSchedule, () => {
  console.log("Server Restarting");
  callApi();
});

module.exports = { cronJob };
// const job = new cron.CronJob("*/14 * * * *", () => {
//   console.log("Restarting Server");

//   axios
//     .get(backendUrl)
//     .then((response) => console.log("Server Restarted"))
//     .catch((err) => console.log(err));
// });

// module.exports = {
//   job,
// };

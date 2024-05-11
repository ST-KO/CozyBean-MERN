const cron = require("cron");
const axios = require("axios");

const backendUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5555/";

const job = new cron.CronJob("*/14 * * * *", () => {
  console.log("Restarting Server");

  axios
    .get(backendUrl)
    .then((response) => console.log("Server Restarted"))
    .catch((err) => console.log(err));
});

module.exports = {
  job,
};

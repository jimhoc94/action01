const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput("owner", { required: true });
    core.info(`Hello, ${owner}!`);

    axios
      .get("https://randomuser.me/api/?results=1")
      .then(function (response) {
        // handle success
        const first = response.data.results[0].first;
        const title = response.data.results[0].title;
        core.info(`Hello, ${title} ${first}!`);
      })
      .catch(function (error) {
        // handle error
        core.error(error);
      })
      .finally(function () {
        // always executed
      });
    /*
    var request = new Request("https://randomuser.me/api/?results=10", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    fetch(request)
      .then((response) => response.json())
      .then((responseJson) => {
        core.info(responseJson);
      })
      .catch((error) => {
        core.error(error);
      });
      */
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();

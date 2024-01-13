const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
var fs = require("fs");

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
        let first = response.data.results[0].name.first;
        let last = response.data.results[0].name.last;
        let title = response.data.results[0].name.title;
        let data = response.data.results[0];
        core.info(`Hello, ${title} ${first}!`);
        let dir = "./src/user";

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        let fileName = dir + "/" + first + "_" + last + ".json";
        core.info(`Writting, ${fileName}`);
        fs.writeFileSync(fileName, JSON.stringify(data, 2));
        //core.info(JSON.stringify(data));
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

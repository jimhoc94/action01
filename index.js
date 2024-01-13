const core = require("@actions/core");
const github = require("@actions/github");

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput("owner", { required: true });
    core.info(`Hello, ${owner}!`);

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
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();

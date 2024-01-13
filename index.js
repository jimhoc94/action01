const core = require("@actions/core");
const github = require("@actions/github");

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput("owner", { required: true });
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();

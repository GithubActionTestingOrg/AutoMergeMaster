const core = require("@actions/core");
const github = require('@actions/github');
const token = core.getInput('token');

function pullRequests() {
    const repoOwner: string = github.context.repo.owner
    const repo: string = github.context.repo.repo
    let client = github.getOctokit(core.getInput('token'));
    let resp = client.rest.pulls.list({
        owner: repoOwner,
        repo: repo,
    }).catch((e: any) => {
        core.setFailed(e.message);
    });

    console.log(resp);

    return resp;
    // const sortedPrByDate = pr.sort((a: any, b: any) => {
    //     return Date.parse(a) > Date.parse(b);
    // });

    // console.log('pr', pr);

    // console.log('sortedPrByDate', sortedPrByDate);

    // return sortedPrByDate
}

async function main() {
    try {
        const test = await pullRequests()
        console.log(test);
    } catch (error: any) {
        core.setFailed(error.message)
    }
};

main();
import * as core from '@actions/core'
const github = require('@actions/github');

const token: string = core.getInput('token')
const repoOwner: string = github.context.repo.owner
const repo: string = github.context.repo.repo
const date = Date.now();

function pullRequests(repoOwner: string, repo: string) {
    let pr = new github.GitHub(token)
    console.log(github)
    let resp = pr.pulls.list({
        owner: repoOwner,
        repo: repo,
    })
    console.log(pr);
    const sortedPrByDate = pr.sort((a: any, b: any) => {
        return Date.parse(a) > Date.parse(b);
    });

    console.log('pr', pr);

    console.log('sortedPrByDate', sortedPrByDate);

    return resp
}

pullRequests(repoOwner, repo);
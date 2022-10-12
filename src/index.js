"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require('@actions/github');
const token = core.getInput('token');
const repoOwner = github.context.repo.owner;
const repo = github.context.repo.repo;
const date = Date.now();
function pullRequests(repoOwner, repo) {
    let pr = new github.GitHub(token);
    console.log(github);
    let resp = pr.pulls.list({
        owner: repoOwner,
        repo: repo,
    });
    console.log(pr);
    const sortedPrByDate = [];
    return resp;
}
pullRequests(repoOwner, repo);

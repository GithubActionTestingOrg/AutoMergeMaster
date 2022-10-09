import * as core from '@actions/core'
import * as github from '@actions/github'
const { Octokit } = require("@octokit/rest");

const token: string = core.getInput('token')
const labels: string[] = JSON.parse(core.getInput('labels'))
const skipSec: Number = parseInt(core.getInput('skip_hour')) * 60 * 60
const repoOwner: string = github.context.repo.owner
const repo: string = github.context.repo.repo

function pullRequests(repoOwner:string, repo:string ):Promise<Octokit.Response<Octokit.PullsListResponse>> {
    let pr = new github.GitHub(token)
    let resp = pr.pulls.list({
        owner: repoOwner,
        repo: repo,
    }).catch(
        e => {
            console.log(e.message)
        }
    ) as Promise<Octokit.Response<Octokit.PullsListResponse>>
        console.log(pr)
    return resp
}

function filterTime(pull: Octokit.PullsListResponseItem,target: number):boolean{
    const createdAt = Date.parse(pull.created_at)
    const gapSec = Math.round((target - createdAt) / 1000)
    if ( gapSec > skipSec ) {
        return true
    }
    return false
}

pullRequests(repoOwner, repo);
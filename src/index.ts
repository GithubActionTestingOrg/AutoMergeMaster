import * as core from '@actions/core'
import * as github from '@actions/github'

const token: string = core.getInput('token')
const repoOwner: string = github.context.repo.owner
const repo: string = github.context.repo.repo

function pullRequests(repoOwner:string, repo:string ) {
    let pr = new github.GitHub(token)
    console.log(github)
    let resp = pr.pulls.list({
        owner: repoOwner,
        repo: repo,
    }).catch(
        (e: any) => {
            console.log(e.message)
        }
    )
    console.log(resp)
    return resp
}

pullRequests(repoOwner, repo);
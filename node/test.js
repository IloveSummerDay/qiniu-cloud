import express from 'express';
import { Octokit } from "octokit";

const owner = "CoherentLabs"
const repo = "GameUIComponents"

const router = express.Router();

const octokit = new Octokit({
    // auth: 'YOUR_TOKEN'
})


router.get('/stars', async (req, res) => {

    const info = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/forks', async (req, res) => {
    const info = await octokit.request('GET /repos/{owner}/{repo}/forks', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/subscribers', async (req, res) => {
    const info = await octokit.request('GET /repos/{owner}/{repo}/subscribers', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/pulls', async (req, res) => {
    const info = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/user-info', async (req, res) => {
    const info = await octokit.request('GET /users/{username}', {
        username : "ohmyzsh",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/followers', async (req, res) => {
    const info = await octokit.request('GET /user/followers', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/following', async (req, res) => {
    const info = await octokit.request('GET /user/following', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})

router.get('/social-accounts', async (req, res) => {
    const info = await octokit.request('GET /users/{username}/social_accounts', {
        username: 'IloveSummerDay',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    })
    res.json(info)
})


export default router;

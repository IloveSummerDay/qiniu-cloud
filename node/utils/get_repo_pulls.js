import { RawDataGetter } from '../handlers/RawDataGetter.js'

export const get_repo_pulls = async (user_name, repo_name) => {
    const data_getter = new RawDataGetter()
    const pulls = await data_getter.getRepoAllPulls(user_name, repo_name)

    let prs = 0
    let closed_prs = 0
    let merged_prs = 0

    for (const pull of pulls) {
        if (pull.user.login !== user_name) continue

        prs += 1
        if (pull.state == 'closed' && !pull.merged_at) closed_prs += 1
        if (pull.state == 'closed' && pull.merged_at) merged_prs += 1
    }

    return { prs, closed_prs, merged_prs }
}

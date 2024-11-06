import { RawDataGetter } from '../handlers/RawDataGetter.js'
import { get_repo_contribution_value } from './get_repo_contribution_value.js'
import { get_repo_importance_value } from './get_repo_importance_value.js'

export const get_talent_value = async (login_name, followers) => {
    const data_getter = new RawDataGetter()
    const repo_list = await data_getter.getRepoList(login_name)

    console.log('========================')
    console.log('get_talent_value.js - start calculating', repo_list.length)

    const repo_importance_value = await get_repo_importance_value(repo_list)
    const repo_contribution_value = await get_repo_contribution_value(login_name, repo_list)

    const weight_followers = 0.6
    const followers_value = weight_followers * followers

    const talent_value = followers_value + repo_importance_value + repo_contribution_value

    console.log('get_talent_value.js - end output', talent_value)
    console.log('========================\n')

    return talent_value
}

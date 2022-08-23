import { RequestState } from './RequestState'
import { User } from './User'

export interface CampaignState {
    getCampaigns: RequestState,
    getContractors: RequestState,
    contractors: User[]
}
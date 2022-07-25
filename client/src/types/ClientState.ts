import { Client } from './Client'
import { RequestState } from './RequestState'

export interface ClientState {
    getClients: RequestState
    clients: Client[]
    addClient: RequestState,
    deleteClient: RequestState,
    updateClient: RequestState
}
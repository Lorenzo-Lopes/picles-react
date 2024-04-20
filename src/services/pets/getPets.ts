import { GetPetsRequest, GetPetsResponse } from '../../interfaces/pet'
import httpClient from '../api/httpClient'

export async function getPets(params?: GetPetsRequest):Promise<GetPetsResponse>{
    

    try{
      
        const response =await httpClient.get('/pet', {params})
        console.log(response)
        return response.data

    }catch(error){
        console.log('error ao buscar pets',error)
        throw error

    }
}
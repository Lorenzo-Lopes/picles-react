import { useQuery } from "@tanstack/react-query"
import { GetPetsRequest, GetPetsResponse } from "../interfaces/pet"
import { getPets } from "../services/pets/getPets"

interface IUseList{
    data?: GetPetsResponse
    isLoading: boolean
}

export function UsePetList(urlParams:GetPetsRequest): IUseList{

    const { data, isLoading } = useQuery({
        queryKey: ["get-pets", urlParams],
        queryFn: () => getPets(urlParams),
        // scaleTime:1*60*1000,
    })
    return {data,isLoading}
}
export interface IPet{
    id:string
    name:string
    type:string
    gender:string
    size:string
    bio:string
    photo:string
}

export type GetPetsRequest = Partial<Pick<IPet,'type'|'size'|'gender'>>&{
    page?:number

}

export type GetPetsResponse={
    items:IPet[]
    totalPages:number
    currentPage:number
}
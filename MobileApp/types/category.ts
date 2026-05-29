export interface Category {
    _id: string
    name: string,
    slug: string
}

export interface GetCtgRes {
    data: Category[]
    status: number;
    message: string;
    success: boolean
}
export interface HeroBaner {
    _id: string
    image: string
}
export interface GetHeroBannersRes {
    data: HeroBaner[];
    message: string;
    status: number;
    success: boolean;
}
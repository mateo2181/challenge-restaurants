import { AxiosResponseHeaders } from "axios";
import { Restaurant } from "./restaurant";

export type ApiError = {
    message: string;
    status: number;
    code: string;
}

export type RestaurantList = {
    restaurantList: Array<Restaurant>;
    total: number;
}

export type ApiResponse<T> = {
    data: T,
    headers: AxiosResponseHeaders,
    status: number
}

export type ApiGetRestaurantsParams = {
    page: number;
    limit: number;
}

export type ApiPostComment = {
    comment: string;
    rating: number;
}

export type ApiPostRestaurant = {
    name: string;
    address: string;
    description: string;
}
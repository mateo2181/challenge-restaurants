import { AxiosResponseHeaders } from "axios";
import { Restaurant } from "./restaurant";
import { Maybe } from "./helpers";

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

type LatLng = {
    lat: number;
    lng: number;
}

export type ApiPostRestaurant = {
    image: Maybe<any>;
    name: string;
    address: string;
    description: string;
    latlng: LatLng;
}
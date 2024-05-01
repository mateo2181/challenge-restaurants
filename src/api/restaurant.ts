import { client, clientWithAuth } from "@/api/client";
import { ApiError, ApiGetRestaurantsParams, ApiPostComment, ApiResponse, RestaurantList } from "@/types/api";
import { RestaurantDetail } from "@/types/restaurant";

const apiGetRestaurants = ({ limit, page }: ApiGetRestaurantsParams): Promise<RestaurantList | Error> => {
    return client.get<RestaurantList>(`/restaurant/list?limit=${limit}&page=${page}`)
        .then(res => res.data)
        .catch(err => {
            throw new Error((err.response?.data as ApiError).message)
        });
}

const apiGetRestaurantDetail = (id: string): Promise<RestaurantDetail | Error> => {
    return client.get<RestaurantDetail>(`/restaurant/detail/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw new Error((err.response?.data as ApiError).message)
        });
}

const apiPostReview = (id: string, form: ApiPostComment): Promise<string | Error> => {
    return clientWithAuth.post(`/restaurant/${id}/comment`, form)
        .then(res => res.data)
        .catch(err => {
            throw new Error((err.response?.data as ApiError).message)
        });
}

export {
    apiGetRestaurants,
    apiGetRestaurantDetail,
    apiPostReview
}
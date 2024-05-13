import { client, clientWithAuth } from "@/api/client";
import { ApiError, ApiGetRestaurantsParams, ApiPostComment, ApiPostRestaurant, RestaurantList } from "@/types/api";
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

const apiPostRestaurant = (form: ApiPostRestaurant): Promise<string | Error> => {
    const dataForm = new FormData();
    dataForm.append('image', form.image || '');
    dataForm.append('name', form.name);
    dataForm.append('description', form.description);
    dataForm.append('address', form.address);
    dataForm.append('latlng[lat]', form.latlng.lat.toString());
    dataForm.append('latlng[lng]', form.latlng.lng.toString());

    return clientWithAuth.post(`/restaurant/create`, dataForm)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            throw new Error((err.response?.data as ApiError).message)
        });
}

export {
    apiGetRestaurants,
    apiGetRestaurantDetail,
    apiPostReview,
    apiPostRestaurant
}

export type Coordinates = {
    lat: number;
    lng: number;
}

export type Restaurant = {
    _id: string;
    address: string;
    avgRating: number;
    image: string;
    latlng: Coordinates,
    name: string;
    owner: string;
    reviews: Array<any>;
    createdAt: string;
    updatedAt: string;

}

type UserReview = {
    name: string;
}

export type Review = {
    _id: string;
    comment: string;
    rating: number;
    owner: UserReview;
    data: string;
}

export type RestaurantDetail = Restaurant & {
    description: string;
    reviews: Array<Review>;
    avgRating: number;

}

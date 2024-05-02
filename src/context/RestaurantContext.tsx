"use client";

import { createContext, useContext, useState } from "react";
import { apiGetRestaurantDetail, apiGetRestaurants, apiPostRestaurant, apiPostReview } from "@/api/restaurant";
import { ApiGetRestaurantsParams, ApiPostComment, ApiPostRestaurant, RestaurantList } from "@/types/api";
import { Maybe } from "@/types/helpers";
import { Restaurant, RestaurantDetail } from "@/types/restaurant";

type RestaurantContext = {
    restaurants: Array<Restaurant>;
    error: Maybe<string>;
    getRestaurants: (params: ApiGetRestaurantsParams) => Promise<Array<Restaurant>>;
    getRestaurantDetail: (id: string) => Promise<RestaurantDetail | Error>;
    loading: boolean;
    isPostingComment: boolean;
    errorPostingComment: Maybe<string>;
    postReview: (id: string, form: ApiPostComment) => Promise<string | Error>;
    isCreatingRestaurant: boolean;
    errorCreatingRestaurant: Maybe<string>;
    createRestaurant: (form: ApiPostRestaurant) => Promise<string | Error>;
};

const RestaurantContext = createContext<Maybe<RestaurantContext>>(null);

export function RestaurantsProvider({ children }: { children: React.ReactNode }) {

    const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
    const [error, setError] = useState<Maybe<string>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
    const [errorPostingComment, setErrorPostingComment] = useState<Maybe<string>>(null);
    const [isCreatingRestaurant, setIsCreatingRestaurant] = useState<boolean>(false);
    const [errorCreatingRestaurant, setErrorCreatingRestaurant] = useState<Maybe<string>>(null);


    const getRestaurants = async ({ limit, page }: ApiGetRestaurantsParams) => {
        try {
            setLoading(true);
            const data = await apiGetRestaurants({ limit, page }) as RestaurantList;
            setRestaurants([...data.restaurantList]);
            return data.restaurantList;
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // The api call to get the details is returned to the page instead of store it on the context. 
    const getRestaurantDetail = async (id: string) => {
        try {
            setLoading(true);
            const data = await apiGetRestaurantDetail(id);
            return data;
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const postReview = async (id: string, form: ApiPostComment) => {
        setErrorPostingComment(null);
        try {
            setIsPostingComment(true);
            const data = await apiPostReview(id, form);
            return data;
        } catch (err) {
            const message = (err as Error).message;
            setErrorPostingComment(message);
            throw err;
        } finally {
            setIsPostingComment(false);
        }
    }

    const createRestaurant = async (form: ApiPostRestaurant) => {
        setErrorCreatingRestaurant(null);
        try {
            setIsCreatingRestaurant(true);
            const data = await apiPostRestaurant(form);
            return data;
        } catch (err) {
            const message = (err as Error).message;
            setErrorCreatingRestaurant(message);
            throw err;
        } finally {
            setIsCreatingRestaurant(false);
        }
    }

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            error,
            loading,
            getRestaurants,
            getRestaurantDetail,
            isPostingComment,
            errorPostingComment,
            postReview,
            isCreatingRestaurant,
            errorCreatingRestaurant,
            createRestaurant,
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}

export function useRestaurantContext() {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error("RestaurantContext has to be used within <RestaurantContext.Provider>");
    }

    return context;
}
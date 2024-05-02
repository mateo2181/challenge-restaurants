"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRestaurantContext } from '@/context/RestaurantContext';
import { MapProvider } from "@/providers/map-provider";
import { Loading, Map } from '@/app/components/UI';
import RestaurantCard from '@/app//components/restaurants/RestaurantCard';
import { ApiGetRestaurantsParams } from '@/types/api';
import { Restaurant } from '@/types/restaurant';
import { Maybe } from '@/types/helpers';

export default function Restaurants() {

    const router = useRouter();

    const [queryParams, setQueryParams] = useState<ApiGetRestaurantsParams>({
        page: 1,
        limit: 10
    });

    const [activeRestaurant, setActiveRestaurant] = useState<Maybe<Restaurant>>(null);
    const { getRestaurants, restaurants, loading } = useRestaurantContext();
    const [windowHeight, setWindowHeight] = useState(0);

    const refsArray = useRef<Array<null | HTMLDivElement>>([]);
    const containerRef = useRef<null | HTMLDivElement>(null);

    let activeRestaurantRef = 0;

    useEffect(() => {
        getRestaurants({ ...queryParams });
    }, [queryParams]);

    useEffect(() => {
        setWindowHeight((window.innerHeight > 400) ? (window.innerHeight) : 400);
    }, []);

    const markRestaurantAsActive = (restaurant: Restaurant, index: number) => {
        setActiveRestaurant(restaurant);
        const activeR = refsArray.current[index] as HTMLDivElement;
        activeR.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    };

    const centerElement = (restaurant: Restaurant, index: number) => {
        if (restaurant._id === activeRestaurant?._id) {
            router.push(`/restaurants/${restaurant._id}/detail`);
        } else {
            markRestaurantAsActive(restaurant, index);
        }

    };


    if (loading) {
        return (
            <div className='mt-10 flex justify-center'>
                <Loading size='40px' color='black' />
            </div>
        )
    }

    return (
        <div className='relative' style={{ height: `${windowHeight - 120}px` }}>
            <div className='w-full rounded-xl relative' style={{ height: `${windowHeight - 300}px` }}>
                <MapProvider>
                    <Map restaurants={restaurants} activeRestaurant={activeRestaurant} />
                </MapProvider>
            </div>
            <div className='absolute bottom-0 w-full end-0 z-50'>
                <div ref={containerRef}
                    // onScroll={containerScroll}
                    className='z-10 flex relative w-full gap-16 snap-x snap-proximity overflow-x-auto pb-5 scroll-smooth'
                // className='absolute top-0 z-50'
                >
                    {restaurants.map((restaurant, index) => (
                        <div className={`snap-center shrink-0 w-[300px] rounded-xl overflow-hidden cursor-pointer
                                     ${activeRestaurant?._id === restaurant._id && 'shadow-lg'}`}
                            onClick={e => centerElement(restaurant, index)}
                            ref={ref => { refsArray.current[index] = ref; }}
                            key={restaurant._id}>
                            <RestaurantCard
                                className='h-full aspect-[3/4] relative flex flex-col justify-end'>
                                {activeRestaurant?._id !== restaurant._id &&
                                    <div className='absolute inset-0 bg-slate-700 opacity-50 z-20'></div>
                                }
                                <div className='absolute inset-0'>
                                    <RestaurantCard.Image src={restaurant.image} alt={restaurant.name} />
                                </div>
                                <RestaurantCard.Info className={`w-full z-10 transition-all duration-500 ${activeRestaurant?._id === restaurant._id ? 'bg-white text-black pt-4' : 'text-white'}`}>
                                    <div className='flex flex-col gap-1 p-3'>
                                        <h3 className='text-2xl font-semibold'>{restaurant.name}</h3>
                                        <p className='text-lg'>{restaurant.address}</p>
                                    </div>
                                </RestaurantCard.Info>
                            </RestaurantCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

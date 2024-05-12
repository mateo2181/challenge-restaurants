import React from 'react';
import { render, screen } from "@testing-library/react";
import RestaurantCard from '@/app/components/restaurants/RestaurantCard';
import { Restaurant } from '@/types/restaurant';

describe('Tests Restarurant Card Component', () => {
    const restaurantMock: Restaurant = {
        "_id": "662d077304f201b602cb60c0",
        "name": "Tailor",
        "owner": "662cf3faa36b47a482529e4d",
        "address": "Plaza Puerta del Sol, Madrid",
        "latlng": {
            "lat": 40.416729,
            "lng": -3.703339
        },
        "image": "https://res.cloudinary.com/tailor-hub/image/upload/v1714227059/Tailor_hub_technical_review/1714227058963%20Restaurant1.jpg.jpg",
        "reviews": [],
        "createdAt": "2024-04-27T14:10:59.537Z",
        "updatedAt": "2024-04-27T14:10:59.537Z",
        "avgRating": 0
    };

    it('should render the name and address of the restaurant', () => {
        render(
            <RestaurantCard>
                <RestaurantCard.Info className={`w-full z-10`}>
                    <div className='flex flex-col gap-1 p-3'>
                        <h3 className='text-2xl font-semibold'>{restaurantMock.name}</h3>
                        <p className='text-lg'>{restaurantMock.address}</p>
                    </div>
                </RestaurantCard.Info>
            </RestaurantCard>
        );

        expect(screen.getByRole('heading')).toHaveTextContent(restaurantMock.name);
        expect(screen.getByRole('paragraph')).toHaveTextContent(restaurantMock.address);

    })
})
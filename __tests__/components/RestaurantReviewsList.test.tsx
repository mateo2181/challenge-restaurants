import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import RestaurantReviewsList from '@/app/components/restaurants/detail/RestaurantReviewsList';
import { Review } from '@/types/restaurant';

beforeEach(() => {
    window.SVGElement.prototype.getBBox = () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })
})

afterEach(() => {
    delete window.SVGElement.prototype.getBBox
})

describe('Tests Restarurants Reviews List Component', () => {
    const commentsMock: Review[] = [
        {
            "owner": {
                "name": "mateo2181"
            },
            "rating": 3,
            "comment": "Comida muy buena. Ricas hamburguesas.",
            "_id": "665",
            "date": "2024-05-01T08:05:07.218Z"
        },
        {
            "owner": {
                "name": "Puche"
            },
            "rating": 4,
            "comment": "Volvería sin lugar a dudas.",
            "_id": "663",
            "date": "2024-05-06T03:30:40.259Z"
        }
    ];

    it('should render a message when there is no comments', async () => {
        render(<RestaurantReviewsList comments={[]} />);

        expect(screen.getByText("El restaurante aún no tiene comentarios")).toBeInTheDocument();
    })

    it('should render name and comments of the users', async () => {
        render(<RestaurantReviewsList comments={commentsMock} />);

        const list = await screen.findByRole("list");

        expect(list).toHaveTextContent(commentsMock[0].comment)
    })
})
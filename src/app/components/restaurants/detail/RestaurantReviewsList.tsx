import React from 'react';
import { Rating as ReactRating, Star } from '@smastrom/react-rating';
import { Review } from '@/types/restaurant';

type Props = {
    comments: Array<Review>;
};

export default function RestaurantReviewsList({ comments }: Props) {

    if (comments.length === 0) {
        return (
            <p className='text-2xl text-black'>El restaurante aún no tiene comentarios</p>
        )
    }

    return (
        <ul role='list' className='flex flex-col gap-8 divide-y divide-primary'>
            {comments.map(c => (
                <li className='relative flex flex-col lg:flex-row gap-6 pt-8' key={c._id}>
                    <div className='lg:w-1/4 text-3xl font-semibold'>{c.owner.name}</div>
                    <div className='lg:w-3/4'>
                        <span className='absolute top-4 lg:top-8 right-4'>
                            <ReactRating
                                itemStyles={{ itemShapes: Star, activeFillColor: '#264BEB', itemStrokeWidth: 2, inactiveStrokeColor: '#000' }}
                                style={{ maxWidth: 120 }}
                                value={c.rating}
                                readOnly
                            />
                        </span>
                        <p className='lg:pt-8 text-2xl'>{c.comment}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRestaurantContext } from '@/context/RestaurantContext';
import { CustomButton, CustomInput, Loading } from '@/app/components/UI';
import { Rating as ReactRating, Star } from '@smastrom/react-rating';
import { RestaurantDetail as RestaurantDetailType } from '@/types/restaurant';
import { Maybe } from '@/types/helpers';
import RestaurantReviewsList from '@/app/components/restaurants/detail/RestaurantReviewsList';

type Props = {
    params: {
        id: string;
    };
};

export default function RestaurantDetail({ params }: Props) {

    const router = useRouter();

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [restaurant, setRestaurant] = useState<Maybe<RestaurantDetailType>>(null);

    const { loading, error, getRestaurantDetail, isPostingComment, errorPostingComment, postReview } = useRestaurantContext();

    const fetchData = useCallback(async () => {
        try {
            const data = await getRestaurantDetail(params.id);
            setRestaurant(data as RestaurantDetailType);
        } catch(err) {
        }
    }, [params.id])

    useEffect(() => {
        fetchData();
    }, []);

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        postReview(params.id, {comment, rating})
        .then(() => {
            fetchData();
            setRating(0);
            setComment('');
        })
        .catch(() => {})
    };


    if (!restaurant && loading) {
        return (
            <div className='mt-10 flex justify-center'>
                <Loading size='40px' color='black' />
            </div>
        )
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <>
            {restaurant &&
                <div className="pb-12 min-h-dvh">
                    <div className='w-full h-[500px] relative rounded-xl overflow-hidden'>
                        <Image
                            className='w-full h-full'
                            src={restaurant.image}
                            alt={restaurant.name}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            priority
                            style={{objectFit: 'cover'}}
                        />
                        <div className='absolute inset-0 bg-slate-900 opacity-40 z-10'></div>
                        <div className='px-4 z-20 absolute inset-0 h-full w-full flex flex-col gap-10 justify-center items-center'>
                            <h1 className='text-white font-semibold'>{restaurant.name}</h1>
                            <p className='text-white text-xl'>{restaurant.address}</p>
                        </div>
                    </div>
                    <div className='max-w-7xl mx-auto mt-16'>
                        <div className='w-full flex flex-col lg:flex-row gap-12'>
                            <div className='flex-grow flex flex-col gap-16'>
                                <section>
                                    <p className='text-2xl leading-8'>{restaurant.description}</p>
                                </section>
                                <section>
                                    <RestaurantReviewsList comments={restaurant.reviews} />
                                </section>
                            </div>
                            <form
                                className='w-full flex flex-col justify-between flex-shrink-0 lg:w-[400px] h-[400px] p-5 border border-black rounded-xl'
                                onSubmit={submitComment}>
                                <div>
                                    <ReactRating
                                        itemStyles={{ itemShapes: Star, activeFillColor: '#264BEB', itemStrokeWidth: 2, inactiveStrokeColor: '#000' }}
                                        style={{ maxWidth: 120 }}
                                        value={rating}
                                        onChange={setRating}
                                    />
                                    <textarea className='pt-4 text-lg w-full text-md border-none focus:outline-none'
                                        name='comment'
                                        placeholder='Escribe tu comentario sobre el restaurante'
                                        rows={6}
                                        value={comment}
                                        onChange={e => setComment(e.currentTarget.value)}>
                                    </textarea>
                                </div>
                                <div>
                                    {errorPostingComment &&
                                        <div className='text-error'>{errorPostingComment}</div>
                                    }
                                    <button disabled={!comment || isPostingComment} className='self-start mt-4 flex gap-2 items-center text-lg text-black px-6 py-3 border border-black rounded-2xl enabled:hover:text-white enabled:hover:bg-black transition-all duration-300 ' type='submit'>
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

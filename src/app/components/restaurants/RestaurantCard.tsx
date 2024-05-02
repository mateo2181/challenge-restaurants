import React from 'react'
import Image, { ImageProps } from 'next/image';

type CardProps = {
    children: React.ReactNode
};

type Props = CardProps & React.InputHTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> };

export default function RestaurantCard({ children, ...rest }: Props) {
    return (
        <div {...rest}>{children}</div>
    )
}

type CardImageProps = {
    src: string;
    alt: string;
};

RestaurantCard.Image = function CardImage({ src, alt, ...rest }: CardImageProps & ImageProps) {
    return (
        <div className='w-full h-full relative'> 
            <Image
                className='w-full h-full'
                src={src}
                width={0}
                height={0}
                alt={alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                {...rest}
            />
        </div>
    )
};

RestaurantCard.Info = function CardInfo({ children, ...rest }: Props) {
    return <div {...rest}>{children}</div>;
};

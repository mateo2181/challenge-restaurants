import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgLogoBlue from '@/assets/img_logo_blue.svg';

export default function CreateRestaurantSuccess() {
    return (
        <section className='flex flex-col gap-12 items-center justify-center max-w-6xl mx-auto min-h-[calc(100vh-148px)]'>
            <Image src={ImgLogoBlue} width={50} height={0} alt="Logo" />
            <h1 className='text-xl lg:text-2xl text-primary font-semibold'>Restaurante guardado</h1>
            <Link className='items-center text-lg text-black px-6 py-3 border border-black rounded-2xl font-semibold hover:text-white hover:bg-black transition-all duration-300' href="/restaurants">Ver restaurante</Link>
            <Image src={ImgLogoBlue} width={50} height={0} alt="Logo" />
        </section>
    )
}

"use client";

import Image from "next/image";
import Link from 'next/link';
import ImgWelcome from '@/assets/img_welcome.svg';
import ImgLogo from '@/assets/img_logo_black.svg';
import { WelcomeLayout } from '@/app/components/UI';

export default function Page() {

  return (
    <WelcomeLayout
      renderImage={<Image src={ImgWelcome} priority className="rounded-xl w-full h-full object-cover" alt="Welcome to Tailor" />}
    >
      <div className='w-full rounded-xl bg-[#F1F1F0] p-6'>
        <div className='flex flex-col gap-12'>
          <h1>
            <Image src={ImgLogo} alt="Tailor Logo" priority />
          </h1>
          <p className="text-[28px] leading-[34px] xl:text-4xl text-black">
            Hola, <br />
            Bienvenido a la prueba de Tailor hub, en ella has de añadir
            los restaurantes favoritos donde te gustaría ir en tu onboarding.
          </p>
          <div>
            <Link href="login" className="text-lg xl:text-2xl font-semibold text-black px-6 py-3 border border-base rounded-lg hover:bg-base hover:text-[#F1F1F0] transition-all duration-300">Entrar</Link>
            {/* <button className='text-white px-6 py-2 border border-white rounded-lg hover:text-primary hover:bg-white transition-all duration-300' type="submit">Entrar</button> */}
          </div>
        </div>
      </div>
    </WelcomeLayout>
  );
}

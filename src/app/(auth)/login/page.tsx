"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { UserCredentials } from '@/types/user';
import ImgLogin from '@/assets/img_login.svg';
import ImgLogo from '@/assets/img_logo.svg';
import { CustomInput, CustomButton, WelcomeLayout } from '@/app/components/UI';

export default function Login() {

    const router = useRouter();

    const { login, errorLogin, loading, user } = useAuthContext();
    const [formData, setFormData] = useState<UserCredentials>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData)
            .then(user => {
                console.log({ "Login OK": user });
                router.push('/restaurants');
            })
            .catch(err => { });
    };

    return (
        <WelcomeLayout
            renderImage={
                <Image
                    src={ImgLogin}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-xl w-full h-full object-cover"
                    alt="Imagen de inicio de sesión"
                />
            }
        >
            <div className='w-full rounded-xl bg-primary p-6'>
                <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-6'>
                        <h1 className='mb-4'>
                            <Image src={ImgLogo} alt="Tailor Logo" priority />
                        </h1>
                        <p className="text-white">
                            ¿No tienes cuenta? <Link href="register" className="text-white font-semibold hover:underline ml-1 whitespace-nowrap">Registrate</Link>
                        </p>
                        <div>
                            <CustomInput type="email" name="email" label="Email" value={formData.email} onChange={handleChange} placeholder="Email" />
                        </div>
                        <div>
                            <CustomInput type="password" name="password" label="Contraseña" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </div>
                        {errorLogin &&
                            <div className='text-error'>{errorLogin}</div>
                        }
                        <div>
                            <CustomButton loading={loading} disabled={loading} type="submit">
                                Entrar
                            </CustomButton>
                        </div>
                    </div>
                </form>
            </div>
        </WelcomeLayout>
    );
};

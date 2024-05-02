"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuthContext } from '@/context/AuthContext';
import { NewUserCredentials } from '@/types/user';
import ImgRegister from '@/assets/img_signup.svg';
import ImgLogo from '@/assets/img_logo.svg';
import { CustomInput, CustomButton, WelcomeLayout } from '@/app/components/UI';

export default function Register() {

  const router = useRouter();

  const [page, setPage] = useState<1 | 2>(1);

  const { signup, errorSignUp, loading } = useAuthContext();
  const [formData, setFormData] = useState<NewUserCredentials>({
    name: '',
    email: '',
    password: '',
  });

  const formInvalid = !formData.email || !formData.name || formData.password.length < 8;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextPage = () => {
    setPage(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData)
      .then(() => {
        router.push('/login');
      })
      .catch(() => { });
  };

  return (
    <WelcomeLayout
      renderImage={
        <Image src={ImgRegister}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl w-full h-full object-cover"
          alt="Imagen de registro"
        />
      }
    >
      <div className='w-full rounded-xl bg-primary p-6'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6'>
            <h1 className='mb-4'>
              <Image src={ImgLogo} alt="Tailor Logo" priority />
            </h1>
            <p className="text-white mb-4">
              Si ya tienes una cuenta puedes<Link href="login" className="text-white font-semibold hover:underline ml-1 whitespace-nowrap">Iniciar sesión</Link>
            </p>
            {page === 1 ?
              /* Step 1 */
              <>
                <div>
                  <CustomInput type="email" name="email" label="Email" value={formData.email} onChange={handleChange} placeholder="Añade tu email" />
                </div>
                <div>
                  <CustomInput type="text" name="name" label="Nombre de usuario" value={formData.name} onChange={handleChange} placeholder="Añade tu nombre" />
                </div>
              </>
              :
              /* Step 2 */
              <>
                <div className='mb-4'>
                  <CustomButton onClick={() => setPage(1)}>
                    <IoArrowBackOutline className='w-8 h-8' />
                  </CustomButton>
                </div>
                <div>
                  <CustomInput type="password" name="password" label="Crea una nueva contraseña" value={formData.password} onChange={handleChange} placeholder="Password" />
                  <p className='text-white text-sm pt-2'> * Debe contener al menos 8 caracteres</p>
                </div>
              </>
            }
            {errorSignUp &&
              <div className='text-error'>{errorSignUp}</div>
            }
            <div>
              {page === 1 ?
                <CustomButton key="nextPageButton" onClick={nextPage} disabled={!formData.email || !formData.name} type="button">
                  Siguiente
                </CustomButton>
                :
                <CustomButton key="submitButton" loading={loading} disabled={loading || formInvalid} type="submit">
                  Finalizar
                </CustomButton>
              }
            </div>
          </div>
        </form>
      </div>
    </WelcomeLayout>
  );
}

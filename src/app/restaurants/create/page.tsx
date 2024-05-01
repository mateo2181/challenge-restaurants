"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import ImgLogoBlue from '@/assets/img_logo_blue.svg';
import { CustomButton, CustomInput, Loading } from '@/app/components/UI';
import { ApiPostRestaurant } from '@/types/api';
import { IoCloudUploadOutline } from 'react-icons/io5';



export default function CreateRestaurant() {

    const [formData, setFormData] = useState<ApiPostRestaurant>({
        name: '',
        address: '',
        description: ''
    });
    const [file, setFile] = useState<string | null>(null);

    const fileRef = useRef(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length !== 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        } else {
            setFile(null);
        }
    };

    const openFileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFile(null);
    };

    return (
        <section className='flex flex-col items-center justify-center max-w-6xl mx-auto'>
            <Image src={ImgLogoBlue} width={100} height={0} alt="Logo" />
            <form className='w-full flex flex-col lg:flex-row gap-12 mt-12'>
                <div className='w-full order-2 lg:order-1 lg:w-[500px]'>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="upload-file" className="flex flex-col items-center justify-center w-full aspect-square border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                            {!file
                                ?
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <IoCloudUploadOutline />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-medium"> Haga click para añadir una imagen </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Formatos: JPEG, PNG or JPG</p>
                                </div>
                                :
                                <div className="w-full h-full relative group">
                                    <Image src={file} className='w-full h-full object-contain group-hover:opacity-80 trasition-all duration-300' width={0} height={0} alt="Vista previa imagen restaurante" />
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <button type='button' onClick={openFileInput} className='px-6 py-3 border-2 border-white rounded-xl text-white font-semibold group-hover:bg-slate-100 group-hover:text-black group-hover:bg-opacity-80 trasition-all duration-300'> Eliminar </button>
                                    </div>
                                </div>
                            }
                            <input ref={fileRef} id="upload-file" type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
                        </label>
                    </div>
                </div>
                <div className='flex order-1 lg:order-2 flex-col gap-6 flex-grow'>
                    <div>
                        <CustomInput inputStyle='black' type='text' label='Nombre del restaurante:' name='name' placeholder='Nombre' value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <CustomInput inputStyle='black' type='text' label="Dirección del restaurante:" name='address' placeholder='Dirección' value={formData.address} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-black font-semibold text-lg block mb-2' htmlFor="description">Descripción del restaurante:</label>
                        <textarea className='border border-black rounded-3xl px-6 py-6 w-full text-lg' rows={8} name="description" placeholder='Escribe información acerca del restaurante' defaultValue={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button className='self-start flex gap-2 items-center text-lg text-black px-6 py-3 border border-black rounded-2xl enabled:hover:text-white enabled:hover:bg-black transition-all duration-300 ' type='submit'>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

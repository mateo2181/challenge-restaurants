"use client";

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import ImgLogo from '@/assets/img_logo_black.svg';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useAuthContext } from '@/context/AuthContext';

export default function Navbar() {

	const router = useRouter();

	const { user, logout } = useAuthContext();
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const handleLogout = () => {
		logout()
			.then(() => {
				router.push('/login');
			});
	};

	if (!isClient) {
		return (
			<div></div>
		)
	}



	return (
		<header className='p-6'>
			<nav className='flex gap-2 items-center justify-between'>
				<div className='flex gap-4 md:gap-12 items-center'>
					<h1>
						<Image width={200} height={0} src={ImgLogo} alt="Tailor Logo" priority />
					</h1>
					<ul>
						<Link className='md:text-lg hover:text-primary' href="/restaurants">Restaurants</Link>
					</ul>
				</div>
				<div>
					{!user ?
						<Link className='p-2 md:text-lg hover:text-primary font-semibold px-6 py-3 rounded-xl border border-black' href="/login">Iniciar sesión</Link>
						:
						<Menu as="div" className="z-50 relative inline-block text-left">
							{({ open }) => (
								<>
									<div>
										<Menu.Button className="inline-flex w-full items-center justify-center md:text-lg py-2 font-semibold hover:text-primary focus:outline-none">
											{user?.name}
											{open ?
												<GoArrowUp className="ml-1 h-5 w-5 text-black hover:text-primary" aria-hidden="true" />
												:
												<GoArrowDown className="ml-1 h-5 w-5 text-black hover:text-primary" aria-hidden="true" />
											}
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="px-4 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 bg-primary rounded-tl-xl rounded-b-xl focus:outline-none">
											<div className="py-4 flex flex-col gap-2 text-white">
												<Menu.Item>
													<Link className='p-2 text-lg hover:text-primary hover:bg-white' href="/">Panel de control</Link>
												</Menu.Item>
												<Menu.Item>
													<Link className='p-2 text-lg hover:text-primary hover:bg-white' href="/restaurants/create">Añadir restaurante</Link>
												</Menu.Item>
											</div>
											<div className="text-white border-t border-white py-4 px-2">
												<Menu.Item>
													<button onClick={handleLogout} className='w-full px-4 py-2 border border-white rounded-xl font-semibold hover:text-primary hover:bg-white'> Cerrar sesión </button>
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</>
							)}
						</Menu>
					}
				</div>
			</nav>
		</header>
	)
}

"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";


export default function isAuth(Component: React.FC) {
	return function IsAuth(props: any) {
		const { isUserAuthenticated } = useAuthContext();


		useEffect(() => {
			if (!isUserAuthenticated) {
				return redirect("/login");
			}
		}, [isUserAuthenticated]);

		return <Component {...props} />;
	};
}

import Image from 'next/image'
import React, { SVGProps } from 'react'

type TSVGElementProps = SVGProps<SVGSVGElement>

type LayoutProps = {
    renderImage: any;
    children: React.ReactNode
}

export default function WelcomeLayout({ renderImage, children }: LayoutProps) {
    return (
        <div className="grid grid-flow-row lg:grid-cols-2 items-center lg:gap-6 px-6">
            <div className="w-full h-full order-2 lg:order-1 flex items-end py-6">
                {children}
            </div>
            <div className="lg:h-screen order-1 lg:order-2 lg:min-h-full py-6">
                {renderImage}
            </div>
        </div>
    )
}

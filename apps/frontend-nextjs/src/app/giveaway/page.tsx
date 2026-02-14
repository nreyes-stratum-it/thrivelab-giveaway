import React from 'react'
import Image from 'next/image'
import {FaShieldAlt, FaUserMd, FaAward} from 'react-icons/fa'
import GiveawayForm from "@/features/giveaway/components/form/GiveawayForm"

const trustBadges = [
    {icon: FaShieldAlt, text: "FDA Approved Facilities"},
    {icon: FaUserMd, text: "Board Certified Physicians"},
    {icon: FaAward, text: "1000+ Successful Treatments"},
]

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2 relative bg-olive-700">
                <div className="sticky top-0 h-screen">
                    <Image
                        src="/images/stem-cell-hero.avif"
                        alt="Advanced stem cell treatment"
                        fill
                        className="object-cover"
                        priority
                    />

                    <div
                        className="absolute inset-0 bg-gradient-to-br from-black via-olive-900/50 to-transparent"/>

                    <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                        <h1 className="font-serif text-5xl xl:text-6xl mb-6 leading-tight ">
                            Revolutionary<br/>
                            Stem Cell<br/>
                            Therapy
                        </h1>
                        <p className="text-xl opacity-90 max-w-md " >
                            Join thousands who have transformed their lives with cutting-edge regenerative medicine.
                        </p>

                        <div className="mt-12 space-y-4">
                            {trustBadges.map((badge, index) => {
                                const Icon = badge.icon
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 animate-fadeIn"
                                        style={{animationDelay: `${0.4 + index * 0.1}s`}}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                            <Icon className="w-5 h-5"/>
                                        </div>
                                        <span className="text-lg">{badge.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-olive-25">
                <div className="w-full max-w-md">
                    <GiveawayForm/>
                </div>
            </div>
        </div>
    )
}

export default Page
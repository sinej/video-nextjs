'use client'

import React from "react";
import ClientOnly from "@/app/components/clientOnly";
import { useGeneralStore } from "@/app/stores/general";
import AuthOverlay from "@/app/components/authOverlay";
import EditProfileOverlay from "@/app/components/profile/editProfileOverlay";

const AllOverlay = () => {
    let { isLoginOpen, isEditProfileOpen } = useGeneralStore()

    return (
        <>
            <ClientOnly>
                {isLoginOpen ? <AuthOverlay/> : null}
                {isEditProfileOpen ? <EditProfileOverlay /> : null}
            </ClientOnly>
        </>
    )
}

export default AllOverlay;
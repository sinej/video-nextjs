'use client'

import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
import { useGeneralStore } from "@/app/stores/general";
import AuthOverlay from "@/app/components/AuthOverlay";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";

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
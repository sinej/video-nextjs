import { create } from "zustand";

import { persist, devtools, createJSONStorage } from "zustand/middleware";
import {GeneralStore} from "@/app/types/general.type";
import UseGetRandomUsers from "@/app/components/hooks/useGetRandomUsers";

export const useGeneralStore = create<GeneralStore>()(
    devtools(
        persist(
            (set) => ({
                isLoginOpen: false,
                isEditProfileOpen: false,
                randomUsers: [],

                setIsLoginOpen: (val: boolean) => set({ isLoginOpen: val }),
                setIsEditProfileOpen: (val: boolean) => set({ isEditProfileOpen: val }),
                setRandomUsers: async () => {
                    const result = await UseGetRandomUsers()
                    set({ randomUsers: result })
                },
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)
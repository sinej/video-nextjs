import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import UseGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";
import {Profile} from "@/app/types/general.type";

interface ProfileStore {
    currentProfile: Profile | null;
    setCurrentProfile: (userId: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
    devtools(
        persist(
            (set) => ({
                currentProfile: null,

                setCurrentProfile: async (userId: string) => {
                    const result = await UseGetProfileByUserId(userId)
                    set({ currentProfile: result });
                },
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)
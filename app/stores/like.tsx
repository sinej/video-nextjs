import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import {Like} from "@/app/types/type";
import UseGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";

interface LikeStore {
    likesByPost: Like[];
    setLikesByPost: (postId: string) => void;
}

export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            (set) => ({
                likesByPost: [],

                setLikesByPost: async (postId: string) => {
                    const result = await UseGetLikesByPostId(postId)
                    set({ likesByPost: result });
                },
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)
import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Post, PostWithProfile } from '../types';
import UseGetAllPosts from '../hooks/useGetAllPosts';
import UseGetPostsByUserId from '../hooks/useGetPostsByUserId';
import UseGetPostById from '../hooks/useGetPostById';
  
interface PostStore {
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    setAllPosts: () => void;
    setPostsByUser: (userId: string) => void;
    setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()( 
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postsByUser: [],
                postById: null,

                setAllPosts: async () => {
                    const result = await UseGetAllPosts()
                    set({ allPosts: result });
                },
                setPostsByUser: async (userId: string) => {
                    const result = await UseGetPostsByUserId(userId)
                    set({ postsByUser: result });
                },
                setPostById: async (postId: string) => {
                    const result = await UseGetPostById(postId)
                    set({ postById: result })
                },
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)

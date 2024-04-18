import { database, Query, storage } from "@/libs/AppWriteClient"
import UseDeleteComment from "./useDeleteComment";
import UseDeleteLike from "./useDeleteLike";
import UseGetCommentsByPostId from "./useGetCommentsByPostId";
import UseGetLikesByPostId from "./useGetLikesByPostId";

const UseDeletePostById = async (postId: string, currentImage: string) => {
    try {
        const likes = await UseGetLikesByPostId(postId)
        likes.forEach(async like => { await UseDeleteLike(like?.id) })
        
        const comments = await UseGetCommentsByPostId(postId)
        comments.forEach(async comment => { await UseDeleteComment(comment?.id) })

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            postId
        );
        await storage.deleteFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), currentImage);
    } catch (error) {
        throw error
    }
}

export default UseDeletePostById
import {database, ID, storage} from "@/libs/appWriteClient";
import UseGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import UseDeleteLike from "@/app/hooks/useDeleteLike";
import UseGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import UseDeleteComment from "@/app/hooks/useDeleteComment";

const UseDeletePostById = async (postId: string, currentImage: string) => {
    try {
        const likes = await UseGetLikesByPostId(postId)
        likes.forEach(async like => { await UseDeleteLike(like?.id)})

        const comments = await UseGetCommentsByPostId(postId)
        comments.forEach(async comment => { await UseDeleteComment(comment?.id)})

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
            postId
        )

        await storage.deleteFile(
            String(process.env.NEXT_PUBLIC_BUCKET_ID),
            currentImage
        )

    } catch (error) {
        throw error
    }

}
export default UseDeletePostById;
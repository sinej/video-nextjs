import {database, ID, storage} from "@/libs/appWriteClient";

const UseDeleteLike = async (id: string) => {
    try {
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
            id
        )

    } catch (error) {
        throw error
    }

}
export default UseDeleteLike;
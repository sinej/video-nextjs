import {RandomUsers} from "@/app/types/type";

export interface GeneralStore {
    isLoginOpen: boolean,
    isEditProfileOpen: boolean,
    randomUsers: RandomUsers[],
    setIsLoginOpen: (val: boolean) => void,
    setIsEditProfileOpen: (val: boolean) => void,
    setRandomUsers: () => void,
}

export interface Profile {
    id: string;
    user_id: string;
    name: string;
    image: string;
    bio: string;
}

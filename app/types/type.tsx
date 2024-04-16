import React from "react";


export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}
export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text:string;
    create_at: string;
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    tags: Object[];
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface UploadError {
    type: string;
    message: string;
}

// COMPONENT TYPES
export interface PostMainCompTypes {
    post: PostWithProfile;
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile;
}


// LAYOUT INCLUDE TYPES
export interface MenuItemsTypes {
    iconString: string;
    colorString: string;
    icons: React.ReactElement;
}

export interface FollowItemCompTypes {
    user: RandomUsers;
}


import React from "react";


export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

// COMPONENT TYPES
export interface PostMainCompType {
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


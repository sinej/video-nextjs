import React from "react";


export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface ShowErrorObject {
    type: string;
    message: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}
export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}
export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text:string;
    created_at: string;
}
export interface CommentsWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text:string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
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
export interface CommentsHeaderCompTypes {
    params: { userId: string; postId: string };
    post: PostWithProfile;
}

export interface CommentsCompTypes {
    params: { userId: string; postId: string };
    post: PostWithProfile;
}

export interface SingleCommentsCompTypes {
    params: { userId: string; postId: string };
    comment: CommentsWithProfile;
}

export interface PostMainCompTypes {
    post: PostWithProfile;
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile;
}

export interface PostPageTypes {
    params: {
        userId: string;
        postId: string;
    };
}

export interface PostUserComTypes {
    post: Post;
}

export interface ProfilePageTypes {
    params: { id: string; };
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

export interface FormTextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    error: string;
    onUpdate: (newValue: string) => void;
}

export interface FormTextareaCompTypes {
    name: string;
    id: string;
    cols: number;
    rows: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    maxLength: number;
    className: string;
}



import { Timestamp } from 'firebase/firestore';

export interface Message {
    id: string;
    text: string;
    uid: string;
    displayName: string;
    photoURL: string;
    createdAt: Timestamp;
    roomId: string;
    imageUrl?: string;
    isEdited?: boolean;
    lastEditedAt?: Timestamp;
}

export interface Room {
    id: string;
    name: string;
    color: string;
    bg: string;
    border?: string; // Optional because private rooms might not have it defined exactly the same way in all contexts, but good to have
}

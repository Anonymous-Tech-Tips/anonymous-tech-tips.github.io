import { Room } from './types';

export const PUBLIC_ROOMS: Room[] = [
    { id: 'general', name: 'General', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { id: 'gaming', name: 'Gaming', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'tech', name: 'Tech', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'offtopic', name: 'Off-Topic', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' }
];

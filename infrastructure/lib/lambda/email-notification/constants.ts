
export const COLORS = {
    olive50: '#f6f7f4',
    olive100: '#e8ebe3',
    olive200: '#d1d7c7',
    olive300: '#b3bca3',
    olive400: '#96a181',
    olive500: '#7a8764',
    olive600: '#5d6b4c',
    olive700: '#48533b',
    olive800: '#3a4330',
    olive900: '#31382a',
    background: '#fcfcfa',
} as const;

export interface GiveawayEntryCreatedEvent {
    eventType: 'GiveawayEntryCreated';
    entryId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    instagramHandle?: string;
    painArea?: string;
    painAreaOther?: string;
    reasons?: string[];
    interestLevel?: number;
    occurredAt: string;
}
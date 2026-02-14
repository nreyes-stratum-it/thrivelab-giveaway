import {CompleteFormData} from "@/features/giveaway/types";

export const PAIN_AREAS = ['Knee', 'Shoulder', 'Back', 'Other'] as const;

export const WHY_NOT_YET_REASONS = [
    "I don't know who I can trust",
    'The cost of treatment',
    "I'm still learning more about it",
] as const;

export const INTEREST_LEVELS = [
    "Yes, I'd like to explore treatment options",
    'Possibly, depending on financing',
    "I'm only interested if I win the giveaway",
] as const;


export const INITIAL_FORM_DATA: CompleteFormData = {
    firstName: '',
    lastName: '',
    instagramHandle: '',
    email: '',
    phoneNumber: '',
    painArea: '' as typeof PAIN_AREAS[number],
    painAreaOther: '',
    reasons: [] as typeof WHY_NOT_YET_REASONS[number][],
    interestLevel: '' as typeof INTEREST_LEVELS[number],
};
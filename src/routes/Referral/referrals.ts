import { db } from '$lib/firebase';
import {
    collection,
    getDocs,
    where,
    query,
    deleteDoc,
    setDoc,
    doc,
} from 'firebase/firestore';
import type { Timestamp } from "firebase/firestore";

import { push } from 'svelte-spa-router';

export interface ReferralUser {
    userID: string;
    username?: string;
    referrerID?: string;
    createdAt: Timestamp;
}

const referralsCollection = collection(db, 'playground/Referral System/Referrals');

import Referrer from './Referrer.svelte';
import NewReferral from './NewReferral.svelte';

export const referralRoutes = {
    '/referral': Referrer,
    '/referral/:userID': Referrer,
    '/newReferral': NewReferral,
    '/newReferral/:referrerID': NewReferral,
};

export async function getReferralUserByID(userID: string): Promise<ReferralUser> {
    const q = query(referralsCollection, where('userID', '==', userID));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        return querySnapshot.docs[0].data() as ReferralUser;
    } else {
        throw new Error('User not found');
    }
}

export async function getReferredUsers(userID: string): Promise<ReferralUser[]> {
    const q = query(referralsCollection, where('referrerID', '==', userID));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        return querySnapshot.docs.map((doc) => doc.data() as ReferralUser);
    }
    return [];
}


export async function createReferralUser(user: ReferralUser) {
    const docRef = doc(referralsCollection);
    await setDoc(docRef, user);
    return docRef;
}

export async function deleteReferralUser(user: ReferralUser) {
    const q = query(referralsCollection, where('userID', '==', user.userID));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        await deleteDoc(querySnapshot.docs[0].ref);
        push('/');
    }
}
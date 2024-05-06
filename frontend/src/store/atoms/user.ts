import { atom } from "recoil";

interface User {
    name: string;
    username: string;
    email: string;
    _id: string;
    credits: number;
}

export const userAtom = atom<User>({
    key: 'userAtom',
    default: {
        name: '',
        username: '',
        email: '',
        _id: '',
        credits: 0
    }
});

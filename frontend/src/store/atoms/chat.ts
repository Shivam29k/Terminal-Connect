import { atom } from "recoil";

interface Chat {
    sender: string;
    message: string;
}

export const chatAtom = atom<Chat[]>({
    key: 'chatAtom',
    default: [
        {
            sender: '',
            message: '',
        }
    ]
});
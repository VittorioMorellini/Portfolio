import {atom, selector} from 'recoil'

export const titleAtom = atom<string>({
    key: 'titleAtom',
    default: ''
});
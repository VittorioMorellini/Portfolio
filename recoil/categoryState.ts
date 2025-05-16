import { atom, selector} from 'recoil'
import { Category } from '../types/category'

export const categoriesAtom = atom<Category[]>({
    key: 'categoriesAtom',
    default: []
});



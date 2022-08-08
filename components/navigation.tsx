import { Box, Button } from '@mui/material';
import Link from 'next/link';
//import styles from '../styles/navigation.module.css'
import { OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Category } from '../types/category';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '../recoil/categoryState';
import { titleAtom } from '../recoil/title';
import { useRouter } from 'next/router'

interface NavigationProps {
}

function Navigation(props: NavigationProps) {
    const [categories,] = useRecoilState<Category[]>(categoriesAtom)
    const [,setTitle] = useRecoilState<string>(titleAtom);
    const router = useRouter();

    // const handlerItem = (e: React.MouseEvent<HTMLButtonElement>) => (category: Category) => {
    //     console.log('category',category);
    //     setTitle(category.title);
    //     router.push(category.url)
    // }
    console.log('client categories', categories)
    return (
        <Box>
            <div style={{maxWidth: '165px'}}>
                <OutlinedInput startAdornment={<SearchIcon />} />
            </div>
            <ul className='list-disc pl-5'>
                {categories?.map((category, index, categories) => (
                    <li className="mt-4">
                        <Button variant="outlined" className="pl-4 w-32" onClick={() => {    
                            setTitle(category.title);
                            router.push(category.url)
                        }}>{category.description}
                        </Button>
                    </li>
                ))}            
            </ul>
        </Box>  
    )
}
  
export default Navigation;
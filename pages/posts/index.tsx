import Image from 'next/image'
import Link from 'next/link'
import { PostAddSharp } from '@mui/icons-material'
import { Post } from '../../types/post'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useQuery } from 'react-query'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

//Page example con React-query client side
function PostIndex() {
    const [searchValue, setSearchValue] = useState("");
    const debounedSearchValue = useDebounce(searchValue, 300);

    const searchPosts = async (value: string) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        return await res.json();
    }

    const { isLoading, isError, isSuccess, data } = useQuery(
      ["searchPosts", debounedSearchValue],
      () => searchPosts(debounedSearchValue),
      {
        enabled: debounedSearchValue.length > 0
      }
    );
  
    const renderResult = () => {
        if (isLoading) {
            return <div className="search-message">Loading...</div>;
        }
        if (isError) {
            return <div className="search-message">Something went wrong</div>;
        }
        if (isSuccess) {
            return ( 
            <div>
              <div className='flex flex-row justify-center'>
                <List className='pl-4'>
                    {data?.map((post: Post, index: number) => (
                      <ListItem key={post.id} >
                        <ListItemAvatar>
                          <Link href={`/posts/${post.id}`} passHref>
                            <a>
                              <Avatar>
                                <PostAddSharp />
                              </Avatar>
                            </a>
                          </Link>
                        </ListItemAvatar> 
                        <ListItemText primary={post.title} />
                      </ListItem>
                      )
                    )}
                </List>
            </div>
          </div>
          )
        }
        return <></>;
    };
  
    return (
      <div className="text-center">
        <h1>Search Your Post</h1>
        <input
          className='border-solid border-2'
          type="text"
          onChange={({ target: { value } }) => setSearchValue(value)}
          value={searchValue}
        />
        {renderResult()}
      </div>
    );    
    
}

// This is for search server side
// export async function getServerSideProps(context: any) {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const results: Post[] = await res.json();

//   return {
//     props: {
//       posts: results
//     }
//   }
// }

export default PostIndex
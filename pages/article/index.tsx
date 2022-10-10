import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Container } from "../../components/container";
import { Post } from "../../types/post";
import { ArticleSharp, Delete } from '@mui/icons-material'
import { server } from "../../config/config";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { useRef, useState } from "react";
import Confirm from "../../utils/ui/confirm";
import { Article } from "../../types/article";
import { useDebounce } from "usehooks-ts";

interface ArticleProps {
  articles: Article[];
}

export default function Index({articles}: ArticleProps) {
    const router = useRouter();
    const { addToast } = useToasts()
    //for confirm delete
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");
    const debounedSearchValue = useDebounce(searchValue, 300);
    
    // handler to assign the function on the confirm method
    const confirmDelete = (id: string | number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
        onConfirm.current = () => executeDelete(id);
    }

    //Function that execute fisically the Delete Operation
    const executeDelete = (id: string | number) => {
        console.log({id})
        fetch(server + `/api/blog/${id}`, {
            method: 'DELETE',
            //body: Json
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            addToast("Successfully deleted", {
              appearance: 'info',
              autoDismiss: true,
            })  
            router.push('/blog');
            setOpen(false);
        })
        .catch(err => {
          addToast(err, {
            appearance: 'error',
            autoDismiss: true,
          })          
          setOpen(false);
        })
    }
    
    const editArticle = (id: number) => router.push('/article/' + id);
    
    //Initialize the message that does not change in its lifetime
    message.current = "Confermi cancellazione del post?"
    //console.log({posts})
    return (
        <div className="flex flex-col">
          <Container>
            <div className="flex flex-row items-center mb-4">
                <div className="text-center w-full">
                  <h1 className="text-3xl font-black text-center">All Articles</h1>
                  <input
                      className='border-solid border border-slate-300 rounded-2xl px-2'
                      type="text"
                      placeholder="Filter your search"
                      onChange={({ target: { value } }) => setSearchValue(value)}
                      value={searchValue}
                  />
                </div>
            </div>
            {/*YYYY-MM-DDTHH:mm:ss.sssZ  post.Date.toString() */}
          </Container>
          <div>
            <Container>
              <div className='bg-blue-200 text-center'>
                {articles && articles.length > 0 && articles?.map((article: Article, index: number) => {
                    //To manage the timezone in formatting date
                    //const date = new Date()
                    return <ListItem key={index} className="px-5">
                    <ListItemText>
                      {article.Content ? article.Content?.substring(0, 100) + '...' : ''}
                    </ListItemText>
                    {/* <ListItemButton onClick={(e: React.MouseEvent<HTMLDivElement>) => editArticle(article.Id)} className="justify-end">
                        <ArticleSharp />
                    </ListItemButton>  */}
                  </ListItem>
                })}
              </div>
            </Container>
          </div>
          <Confirm
              open={open}
              onCancel={onCancel}
              onConfirm={onConfirm.current!}
              message={message.current}
          />
        </div>  
    );
}

export async function getServerSideProps(context: any) {
  console.log('Sono in server side props')
  
  const res = await fetch(server + '/api/article')
  console.log('I have res', res)
  const results: Article[] = await res.json();
  console.log('I have articles ', results)

  return {
    props: {
      articles: results ? results : []
    }
  }
}

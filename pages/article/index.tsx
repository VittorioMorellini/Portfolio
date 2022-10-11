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
    //for confirm delete
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");
    const debounedSearchValue = useDebounce(searchValue, 300);
        
    const viewArticle = (id: number) => router.push('/article/' + id);    
    //Initialize the message that does not change in its lifetime
    console.log({articles})
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
                        {article.summary ? article.summary?.substring(0, 100) + '...' : ''}
                      </ListItemText>
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

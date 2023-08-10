import { Avatar, Button, Divider, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Container } from "../../components/container";
import { server } from "../../config/config";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Confirm from "../../utils/ui/confirm";
import { Article } from "../../types/article";
import { useDebounce } from "usehooks-ts";
import { IndexPageRef } from "types/types";
import PageTransition from "@/components/pageTransition";

interface ArticleProps {
  articles: Article[],
  ref: IndexPageRef
}
export default function Index({articles, ref}: ArticleProps) {
    const router = useRouter();
    //for confirm delete
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");
    const debounedSearchValue = useDebounce(searchValue, 300);
        
    const viewArticle = (id: string) => (event: React.MouseEvent<HTMLLIElement>) => {
      router.push('/article/' + id);    
    }

    const handleFilterPost = (key: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      switch (key) {
        case '':
          //Filter all
          break;

        default:
          //filter all
      }
    }

    //Initialize the message that does not change in its lifetime
    console.log({articles})
    return (
      <PageTransition ref={ref}>
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
          <Divider className="border-1"/>
          <div className='flex-auto text-center mt-4 gap-4'>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterPost('')}>All Articles</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterPost('react')}>React.js</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterPost('next')}>Next.js</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterPost('dotnet')}>dotnet</Button>
          </div>
          <div>
            <Container>
              <div className='bg-blue-200 text-center mt-4'>
                {articles && articles.length > 0 && articles?.map((article: Article, index: number) => {
                    //To manage the timezone in formatting date
                    return <ListItem key={index} className="px-5" onClick={viewArticle(article._id)} role="button">
                      <ListItemAvatar>
                        <Avatar alt="Call center" src="/images/Callcenter.webp" />
                      </ListItemAvatar>                      
                      <ListItemText>
                        {article.name ? article.name?.substring(0, 100) + '...' : ''}
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
      </PageTransition>    
    );
}

export async function getServerSideProps(context: any) {
  //console.log('Sono in server side props')
  
  const res = await fetch(server + '/api/article')
  //console.log('I have res', res)
  const results: Article[] = await res.json();
  //console.log('I have articles ', results)

  return {
    props: {
      articles: results ? results : []
    }
  }
}

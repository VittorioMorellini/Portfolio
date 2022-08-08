import React from "react";
import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { Box, Checkbox, FormControlLabel, Paper, Theme  } from "@mui/material";
import Link from "next/link";
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image'

export default function Todo() {
    const router = useRouter();
    const todoID = typeof router.query?.id === "string" ? router.query.id : "";
    
    //Query the data after the prefetch server side
    const { isSuccess, data: todo, isLoading, isError } = useQuery(
        ["getTodo", todoID],
        () => fetchTodo(todoID),
        {
            enabled: todoID.length > 0
        }
    );

    if (isSuccess) {
        return (
            <Paper elevation={2} className="w-full">
                <div className="flex flex-row">
                    <div className="w-1/3 left-0">
                        <Link href="/todos">
                            <a><h2>Back to list</h2></a>
                        </Link>
                    </div>
                    <Box className="w-1/3 flex flex-col text-center justify-center" sx={{color: (theme: Theme) => theme.palette.primary.main}}>
                        <div><h1>TODO {todo.id}</h1></div>
                        <div>
                            <h3>
                                {todo.title}
                            </h3>
                        </div>
                        <div>
                            <FormControlLabel
                                label="Completed"
                                control={<Checkbox checked={todo.completed} />}
                            />
                        </div>
                    </Box>
                    <Box className="w-1/3">
                        <Image
                            className="rounded-full"
                            loader={ImageLoader}
                            unoptimized
                            src='/images/image_todo_item.jpg'
                            alt='Todo'
                            width="400px"
                            height="400px"
                        />
                    </Box>
                </div>
            </Paper>
        );
    }

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return (
        <div className="text-center">
            We couldn&apos;t find your todo{" "}
            <span role="img" aria-label="sad">
            😢
            </span>
        </div>
        );
    }
    return <></>;
}

// Fetch with axios
const fetchTodo = (id: string): Promise<any> => axios.get(`https://jsonplaceholder.typicode.com/todos/${id}/`).then(({ data }) => data);

export async function getStaticPaths() {
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos")

    return  {
        paths: data.map((todo: any) => {
            return {params: {id: String(todo.id)} };
        }),
        fallback: false
    }
}


//Server side rendering
export async function getStaticProps(context: any) {
    const id = context.params?.id as string;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["getTodo", id], 
      () => fetchTodo(id)
    );  
  
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};
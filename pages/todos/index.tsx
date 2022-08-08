import { Todo } from "../../types/todo";
import { IconButton, Tooltip } from "@mui/material";
import { LocalActivity } from '@mui/icons-material'
import axios from "axios";
import Link from "next/link";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface TodoProps {
    todos: Todo[];
}

function TodoIndex({todos}: TodoProps) {
    return (
      <div>
        <div className="grid-cols-4 gap-x-4">
            {todos.map((todo, index) => (
                <div key={todo.id} className="text-center text-2xl border border-black p-8 bg-blue-200" >
                    <span>Id: {todo.id} </span>
                    <Tooltip title="Open the detail">
                        <Link href={`/todos/${todo.id}`} passHref>
                            <IconButton size="medium">
                                <FormatListBulletedIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>
            )
            )}
        </div>
      </div>
    )
}
  
export async function getStaticProps(context: any) {    
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
  
    return {
        props: {
            todos: data
        }
    }
}
  
export default TodoIndex
  
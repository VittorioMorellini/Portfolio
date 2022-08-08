import { Meme } from "../../types/meme";
import Image from 'next/image'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { LocalActivity } from '@mui/icons-material'
import axios from "axios";
import ImageLoader from "../../utils/imageLoader";

interface MemeProps {
    memes: Meme[];
}

function MemeIndex({memes}: MemeProps) {
    return (
        <div className="bg-gray-100">
            <Table className="table-fixed text-center pl-2">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-2xl">Id</TableCell>
                        <TableCell className="text-2xl">Name (Box Nr.)</TableCell>
                        <TableCell className="text-2xl">Avatar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {memes?.map((meme, index) => (
                    <TableRow key={meme.id} >
                        <TableCell>{meme.id}</TableCell>
                        <TableCell>
                            {meme.name} ({meme.box_count})
                        </TableCell>
                        <TableCell>
                            <Image
                                loader={ImageLoader}
                                src={meme.url}
                                alt={meme.name}
                                width="250px"
                                height="150px"
                                layout="responsive"
                                unoptimized                                
                            />                            
                        </TableCell>
                    </TableRow>
                )
                )}
                </TableBody>
            </Table>
        </div>
    )
}
  
export async function getServerSideProps(context: any) {    
    const { data } = await axios.get('https://api.imgflip.com/get_memes')
    
    console.log('data', data.data)
    console.log('data 2', JSON.stringify(data.data))
    return {
        props: {
            memes: data && data.data ? data.data.memes : []
        }
    }
}
  
export default MemeIndex
  
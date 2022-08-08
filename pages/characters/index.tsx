import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Character, GetCharacterResults } from '../../types/types'
import ImageLoader from '../../utils/imageLoader'
import EditIcon from '@mui/icons-material/Edit'
interface CharacterProps {
  characters: Character[]
}

function CharacterIndex<NextPage>({characters}: CharacterProps) {
  const router = useRouter();

  return (
    <div>
      <Table className="table-fixed text-center pl-2">
        <TableHead>
          <TableRow>
            <TableCell>View</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character, index) => (
              <TableRow key={character.id}>
                  <TableCell>
                      <Tooltip title="View character">
                        <IconButton onClick={() => router.push(`/characters/${character.id}`)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                  </TableCell>         
                  <TableCell>   
                    <Avatar>
                      <Image
                        loader={ImageLoader}
                        unoptimized
                        src={character.image}
                        alt={character.name}
                        width="50px"
                        height="50px"
                      />
                    </Avatar>
                  </TableCell>         
                  <TableCell>{character.name}</TableCell>
              </TableRow>
            )
        )}
        </TableBody>
      </Table>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  //const res = await fetch('/data/category.json')
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json()

  return {
    props: {
      characters: results
    }
  }
}

export default CharacterIndex

import Image from 'next/image'
import Link from 'next/link'
import { Person } from '../../types/person'
import { PersonSharp } from '@mui/icons-material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar } from '@mui/material'

interface PeopleProps {
  persons: Person[]
}

function PeopleIndex({persons}: PeopleProps) {
  return (
    <div className='text-center'>
      <div className='bg-gray-100'>
        <List>       
          {persons.map((person, index) => (
            <ListItem key={person.id} className="px-5"
              secondaryAction={
                <Link href={`/people/${person.id}`}>
                  <a className="hover:text-blue-400">{person.name}</a>
                </Link>
              }>
              <ListItemAvatar>
                <Avatar>
                  <PersonSharp />
                </Avatar>
              </ListItemAvatar>              
              <ListItemText primary={person.name} secondary={person.gender} />
            </ListItem>
          )
          )}
        </List>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // let results: Person[] = []
  // console.log('start server side')
  // fetch('http://localhost:3000/api/people')
  //                   .then(res => res.json())
  //                   .then(data => {
  //                     console.log('persons', JSON.stringify(data))
  //                     results = data
  //                   })
  //                   .catch((err) => console.log(err))
  const res = await fetch('http://localhost:3000/api/people')
  const results: Person[] = await res.json();

  return {
    props: {
      persons: results
    }
  }
}

export default PeopleIndex

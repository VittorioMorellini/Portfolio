import { Box, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Person } from '../../types/person'
//import useSWR from 'swr'

interface PersonProp {
    person: Person;
}

function PeopleDetail({person}: PersonProp) {
    const router = useRouter()
    console.log('id', router.query.id)
    
    //per ora non uso SWR, questo è chiaramente lato client
    //   const { data, error } = useSWR(
    //     () => query.id && `/api/people/${query.id}`,
    //     fetcher
    //   )
    
    console.log('I am in detail page people')

    return (
        <div className='flex relative'>
            <div className="float-left w-1/3">
                <Link href="/people" passHref>
                    <a className='text-black hover:text-blue-500'>Back</a>
                </Link>
            </div>
            <div className="flex flex-col items-center w-1/3">
                <div className="text-center mb-4">
                    <h3>Detail of: {person.name}</h3>
                </div>
                <div>
                    <TextField
                        label="Name" 
                        variant="filled"
                        margin='none'
                        value={person.name} 
                    />                
                </div>
                <div>
                    <TextField
                        label="Height" 
                        variant="filled"
                        margin='normal'
                        value={person.height} 
                    />
                </div>
                <div>
                    <TextField
                        label="Mass" 
                        variant="filled"
                        margin='normal'
                        value={person.mass} 
                    />
                </div>
                <div>
                    <TextField
                        label="Hair color" 
                        variant="filled"
                        margin='normal'
                        value={person.hair_color} 
                    />
                </div>
                <div>
                    <TextField
                        label="Eye color" 
                        variant="filled"
                        margin='normal'
                        value={person.eye_color} 
                    />
                </div>
                <div>
                    <TextField
                        label="Skin color" 
                        variant="filled"
                        margin='normal'
                        value={person.skin_color} 
                    />
                </div>
                <div>
                    <TextField
                        label="Gender" 
                        variant="filled"
                        margin='normal'
                        value={person.gender} 
                    />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {

    console.log('I am in server side props loading SSR')
    const res = await fetch(`http://localhost:3000/api/people/${context.query.id}`)
    const results: Person = await res.json();
  
    return {
      props: {
        person: results
      }
    }
}

export default PeopleDetail;
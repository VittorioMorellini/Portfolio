import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Pokemon, PokemonSpecie } from '../../types/pokemon'
import { Box } from '@mui/material'
import Link from 'next/link'
import PokemonsSearchResult from '../../components/pokemonSearchResult'
import searchPokemons from "../../utils/searchPokemons";

//Example of Server side loading data
function PokemonIndex() {
    const [searchValue, setSearchValue] = useState<string>("");
    const debounedSearchValue = useDebounce(searchValue, 300);

    const { isLoading, isError, isSuccess, data } = useQuery(
        ["searchPokemons", debounedSearchValue],
        () => searchPokemons(debounedSearchValue),
        {
            enabled: debounedSearchValue.length > 0
        }
    );

    const renderResult = () => {
        if (isLoading) {
            return <Box>Loading...</Box>;
        }
        if (isError) {
            return <div>Something went wrong</div>;
        }
        if (isSuccess) {
            return <PokemonsSearchResult pokemons={data} />;
        }
        return <></>;
    }
        
    return (
        <div className="flex flex-col items-center bg-blue-200 rounded-t">
            <h1>Search Your Pokemon</h1>
            <input
                className='border-solid border border-slate-300'
                type="text"
                onChange={({ target: { value } }) => setSearchValue(value)}
                value={searchValue}
            />
            {renderResult()}
        </div>
    )
}
          
//This is for search query server side
export async function getServerSideProps(context: any) {
    const queryClient = new QueryClient();
    const data = await queryClient.prefetchQuery("searchPokemons", () => searchPokemons(''));    
    //let result = data;
    console.log('data', data)
    return {
        props: {
            //pokemons: data !== undefined ? data : ["vittoPokemon"]
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default PokemonIndex;
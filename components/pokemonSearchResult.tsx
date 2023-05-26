import { Box } from "@mui/material";
import Link from "next/link";

function PokemonsSearchResult({ pokemons }: { pokemons: string[] }) {
    return pokemons.length > 0 ? (
        <Box className="grid grid-cols-2 mt-4 gap-2" sx={{width: '300px'}}>
        {pokemons.map((pokemon) => (
            <Link href={`/pokemons/${pokemon}`} key={pokemon}>
                <div className="flex text-center p-2 border-2 border-black font-extrabold 
                    rounded-2xl items-center capitalize bg-blue-100">
                    {pokemon}
                </div>
            </Link>
        ))}
        </Box>
    ) : (
        <Box>No pokemons found</Box>
    );
};

export default PokemonsSearchResult;
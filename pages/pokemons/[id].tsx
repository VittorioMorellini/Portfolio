import React from "react";
import axios from "axios";
import PokemonCard from "../../components/pokemonCard";
import { Ability } from "../../types/pokemon";


interface PokemonProps {
    pokemon: any;
}

export default function Pokemon({pokemon}: PokemonProps) {

    return (
        <div>
            <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites?.other?.["official-artwork"]?.front_default ? pokemon.sprites?.other?.["official-artwork"]?.front_default : ""}
                weight={pokemon.weight}
                xp={pokemon.base_experience}
                abilities={pokemon.abilities?.map((item: Ability) => item.ability.name)}
            />
        </div>
    );
}

//Server side rendering with axios
export async function getServerSideProps(context: any) {
    const id = context.params?.id as string;
    console.log('axios id', id)
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    
    //const res = data.results;
    console.log('results data', data)
    return {
        props: {
            pokemon: data !== undefined ? data : {}
        }
    };
}
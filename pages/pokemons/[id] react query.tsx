import React from "react";
import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import PokemonCard from "../../components/pokemonCard";
import Link from "next/link";
import styles from '../../styles/pokemon.module.css'
import { Ability } from "../../types/pokemon";

// Fetch with axios
const fetchPokemon = (id: string): Promise<any> =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

interface PokemonProps {
    //pokemon: Pokemon;
}

export default function Pokemon() {
    const router = useRouter();
    const pokemonID = typeof router.query?.id === "string" ? router.query.id : "";

    //Query the data after the prefetch server side
    const { isSuccess, data: pokemon, isLoading, isError } = useQuery(
        ["getPokemon", pokemonID],
        () => fetchPokemon(pokemonID),
        {
            enabled: pokemonID.length > 0
        }
    );

    if (isSuccess) {
        return (
        <div className={styles.container}>
            <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites?.other?.["official-artwork"]?.front_default}
                weight={pokemon.weight}
                xp={pokemon.base_experience}
                abilities={pokemon.abilities?.map((item: Ability) => item.ability.name)}
            />
        </div>
        );
    }

    if (isLoading) {
        return <div className={styles.center}>Loading...</div>;
    }

    if (isError) {
        return (
        <div className={styles.center}>
            We couldn&apos;t find your pokemon{" "}
            <span role="img" aria-label="sad">
            😢
            </span>
        </div>
        );
    }

    return <></>;
}

//Server side rendering
export async function getServerSideProps(context: any) {
    const id = context.params?.id as string;
    const queryClient = new QueryClient();
  
    const data = await queryClient.prefetchQuery(["getPokemon", id], 
      () => fetchPokemon(id)
    );  
  
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
            //pokemon: data
        }
    };
  };
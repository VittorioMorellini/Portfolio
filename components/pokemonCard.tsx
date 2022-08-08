import Link from 'next/link';

interface PokemonCardProps {
    name: string;
    image: string;
    weight: number;
    xp: number;
    abilities: string[];
}
  
function PokemonCard({
    name,
    image,
    weight,
    abilities,
    xp
}: PokemonCardProps) {
    return (
      <div className='flex relative'>
        <div className="w-1/5">
            <Link href="/pokemons">
                <a className='hover:text-blue-400'><h3>Back</h3></a>
            </Link>
        </div>
        <div className="w-4/5">
          <h1 className='capitalize'>{name}</h1>
          <img src={image} alt={name} width="100px" />
          <div className="grid grid-cols-2 bg-slate-200 bor</der-2 border-solid border-white text-left capitalize items-center">
            <p className="block text-black font-extrabold text-sm ml-4 uppercase justify-start">XP</p>
            <div>{xp}</div>
          </div>
          <div className="grid grid-cols-2 bg-red-100 border-2 border-solid border-white text-left capitalize items-center">
            <p className="block text-black font-extrabold text-sm ml-4 uppercase justify-start">Weight</p>
            <div>{weight / 10} kg</div>
          </div>
          <div className="grid grid-cols-2 bg-red-100 border-2 border-solid border-white text-left capitalize items-center">
            <p className="block text-black font-extrabold text-sm ml-4 uppercase justify-start">Abilities</p>
            <ul>
              {abilities?.map((ability) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>    
    );
}
  
export default PokemonCard;
  
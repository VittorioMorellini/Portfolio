import Image from 'next/image';
import Link from 'next/link';
import ImageLoader from 'utils/function';

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
            <Link href="/pokemons" className='hover:text-blue-400'><h3>Back</h3>
            </Link>
        </div>
        <div className="w-4/5">
          <h1 className='capitalize'>{name}</h1>
          <Image loader={ImageLoader} src={image} alt={name} width={100} height={80}/>
          <div className="grid grid-cols-2 bg-blue-100 bor</der-2 border-solid border-white text-left capitalize items-center">
            <p className="block text-black font-extrabold text-sm ml-4 uppercase justify-start">XP</p>
            <div>{xp}</div>
          </div>
          <div className="grid grid-cols-2 bg-blue-200 border-2 border-solid border-white text-left capitalize items-center">
            <p className="block text-black font-extrabold text-sm ml-4 uppercase justify-start">Weight</p>
            <div>{weight / 10} kg</div>
          </div>
          <div className="grid grid-cols-2 bg-blue-200 border-2 border-solid border-white text-left capitalize items-center">
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
  
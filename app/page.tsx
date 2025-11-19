import Link from 'next/link';

export default async function HomePage() {
  const res = await fetch('http://localhost:3000/data/data.json');
  const data = await res.json();
  
  return (
    <div className="p-8">
      <h1>Liste des animaux</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {data.animals.map(animal => {
          const owner = data.owners.find(o => o.owner_id === animal.owner_id);
          
          return (
            <Link 
              key={animal.animal_id}
              href={`animal/${animal.animal_id}`}
              className="bg-white p-4 rounded shadow"
            >
              <h2>{animal.name}</h2>
              <p>{animal.breed}</p>
              <p>Proprio: {owner.first_name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
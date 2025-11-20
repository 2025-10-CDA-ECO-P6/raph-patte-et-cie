import Link from 'next/link';

export default async function HomePage() {
  const res = await fetch('http://localhost:3000/data/data.json');
  const data = await res.json();

  return (
    <div className='container'>
      <Link href={"/animal/1"}>Lien vers un détail d'Animal</Link>
      <section>
        <div className='gradient'>
          <h1>Hello, Doctor!</h1>
          <div className='stats'>
            <div className='stat'>
              🐾 24 animaux suivis
            </div>
            <div className='stat'>
              📅 8 Visites cette semaine
            </div>
            <div className='stat'>
              💉 5 Vaccins à faire
            </div>
            <div className='stat'>
              ⚠️ 2 Rappels urgents
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
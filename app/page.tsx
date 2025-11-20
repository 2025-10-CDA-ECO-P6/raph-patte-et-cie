import Link from 'next/link';

export default async function HomePage() {
  const res = await fetch('http://localhost:3000/data/data.json');
  const data = await res.json();

  return (
    <div className='container'>
      <Link href={"/animal/1"}>Lien vers un détail d'Animal</Link>
      <section>
        <div className='gradient inside-card'>
          <h1>Hello, Doctor!</h1>
          <div className='stats'>
            <div className='stat'>
              <span>🐾</span><strong>24</strong> animaux suivis
            </div>
            <div className='stat'>
              <span>📅</span><strong>8</strong> Visites cette semaine
            </div>
            <div className='stat'>
              <span>💉</span><strong>5</strong> Vaccins à faire
            </div>
            <div className='stat'>
              <strong>⚠️ 2</strong>
              <p>Rappels urgents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
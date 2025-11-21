import { defineSpecies, getVetDashboardData, getRelativeDay, formatTime,getVaccineStatus  } from '@/services/animalService.js';
import Link from 'next/link';

export default async function HomePage() {

  const data = await getVetDashboardData(1);

  console.log(data)

  return (
    <div id='home' className='container'>
      <Link href={"/animal/1"}>Lien vers un détail d'Animal</Link>
      <section>
        <h1>Hello, Doctor!</h1>
        <div className='gradient-blue inside-card'>
          <div className='stats'>
            <div className='stat'>
              <strong>🐾 {data?.stats.totalAnimals}</strong>
              <p>Animaux suivis</p>
            </div>
            <div className='stat'>
              <strong>📅 {data?.stats.upcomingVisitsCount}</strong>
              <p>Visites cette semaine</p>
            </div>
            <div className='stat'>
              <strong>💉 {data?.stats.upcomingVaccinesCount}</strong>
              <p>Vaccins à faire</p> 
            </div>
            <div className='stat'>
              <strong>⚠️ {data?.stats.upcomingVisitsCount}</strong> 
              <p>Rappels urgents</p>
            </div>
          </div>
        </div>
      </section>
      <section className="upcoming-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">📅</span>
            Prochains rendez-vous
            <span className="section-badge gradient-blue">{data?.stats.upcomingVisitsCount}</span>
          </h2>
          <a href="/appointments" className="blue-link">Voir tout →</a>
        </div>

        {data?.upcomingVisits.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Aucun rendez-vous à venir</p>
          </div>
        ) : (
          <div className="visit-list">
            {data?.upcomingVisits.map(visit => (
              <div key={visit.visit_id} className="relative list-card-item animate-card border-left gradient-grey">

                <div className="section-info">
                  <div className="animal-avatar">
                    {defineSpecies(visit.animal.species)}
                  </div>
                  <div>
                    <h3 className="animal-name">{visit.animal.name}</h3>
                    <p className="animal-details">
                      {visit.animal.breed} • {visit.owner.first_name} {visit.owner.last_name}
                    </p>
                  </div>
                </div>
                  
                  <div className="badges badge-mini">
                    <span className="badge badge-white">
                      🩺 {visit.reason}
                    </span>
                    <span className="badge badge-white">
                      ⚖️ {visit.animal.weight}kg
                    </span>
                  </div>

                <div className="badges badge-mini absolute">
                  <span className="badge border color-blue">
                    {formatTime(visit.visit_date)} {getRelativeDay(visit.visit_date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="upcoming-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">💉</span>
            Rappels vaccins
            <span className="section-badge gradient-blue">{data?.allVaccinesWithStatus.length}</span>
          </h2>
        </div>

        <div className="visit-list">
          {data?.allVaccinesWithStatus.map(vaccine => {
            const status = getVaccineStatus(vaccine.reminder_date);
            
            return (
              <div 
                key={vaccine.vaccine_id} 
                className={`relative list-card-item animate-card border-left border-${status.status} bg-${status.status}`}
              >
                <div className="section-info">
                  <div className="animal-avatar">
                    {defineSpecies(vaccine.animal.species)}
                  </div>
                  <div className="vaccine-info">
                    <h3 className="animal-name">{vaccine.animal.name}</h3>
                    <p className="vaccine-name">{vaccine.vaccine_name}</p>
                    <p className="vaccine-reminder">
                      Rappel prévu le {new Date(vaccine.reminder_date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="badges badge-mini absolute">
                  <span className={`badge badge-${status.status}`}>
                    {status.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
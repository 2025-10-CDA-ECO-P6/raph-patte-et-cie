import { getAnimalById, defineSpecies, calculateAge } from '@/services/animalService.js';
import Link from 'next/link';

export default async function AnimalDetail({ params }) {
    const { id } = await params;
    const animalId = parseInt(id);

    const data = await getAnimalById(animalId);

    if (!data) return <div>Aucun animal trouvé.</div>;

    return (
        <div id="animal-detail" className="container">
            <Link href={"/"} className="back-button">
                ← Retour à la liste    
            </Link>
            <section>
                <h1>{defineSpecies(data.animal.species)}{data.animal.name}</h1>
                <p className='animal-breed'>{data.animal.breed} • {data.animal.sex == "M" ? "Mâle" : "Femelle"}</p>
                <ul className='badges'>
                    <li className='badge badge-primary'>🎂 {calculateAge(data.animal.birth_date)}</li>
                    <li className='badge badge-secondary'>⚖️ {data.animal.weight}kg</li>
                    <li className='badge badge-success'>🎨 {data.animal.color}</li>
                    <li className="badge">#{data.animal.chip_number}</li>
                </ul>
            </section>
            <section>
                    <h2>👤 Propriétaire</h2>
                <div className='inside-card gradient'>
                    <h2>{data.owner.first_name} {data.owner.last_name}</h2>
                    <p>📞 {data.owner.phone}</p>
                    <p>📧 {data.owner.email}</p>
                    <p>📍 {data.owner.address}</p>
                </div>
            </section>
            <section>
            <h2>🏥 Historique des visites</h2>
            
            {data.visits.length === 0 ? (
                <p>Aucune visite enregistrée</p>
            ) : (
                <div className="list-card">
                {data.visits.map(visit => (
                    <div key={visit.visit_id} className="list-card-item">
                    <p className="blue-title">{new Date(visit.visit_date).toLocaleDateString('fr-FR')}</p>
                    <h3 className='h3'>{visit.reason}</h3>
                    <p className="meta-text">Dr {visit.veterinarian.last_name} • {visit.visit_weight}kg</p>
                    
                    <div className="meta-description">
                        <p><strong>Diagnostic:</strong> {visit.diagnosis}</p>
                        <p><strong>Observations:</strong> {visit.observations}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </section>
            <section>
            <h2>💉 Vaccins</h2>
            
            {data.vaccines.length === 0 ? (
                <p>Aucun vaccin enregistré</p>
            ) : (
                <div className="list-card">
                {data.vaccines.map(vaccine => (
                    <div key={vaccine.vaccine_id} className="list-card-item">
                    <p className="blue-title">{new Date(vaccine.injection_date).toLocaleDateString('fr-FR')}</p>
                    <h3 className='h3'>{vaccine.vaccine_name}</h3>
                    <p className="meta-text">Dr {vaccine.veterinarian.last_name}</p>
                    
                    <div className="meta-description">
                        <p><strong>Lot:</strong> {vaccine.batch_number}</p>
                        <p><strong>Prochain rappel:</strong> {new Date(vaccine.reminder_date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </section>
        </div>
    );
}

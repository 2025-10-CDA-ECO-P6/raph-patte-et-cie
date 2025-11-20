

export async function loadVetData() {
    const res = await fetch("http://localhost:3000/data/data.json");
    const json = await res.json();
    return json;
}

export async function getAnimalById(animalId) {

    const data = await loadVetData();

    if (!data) return null;

    const animal = data.animals.find(a => a.animal_id === animalId);
    if (!animal) return null;

    const owner = data.owners.find(o => o.owner_id === animal.owner_id);

    const visits = data.visits
        .filter(v => v.animal_id === animalId)
        .map(visit => {
            const vet = data.veterinarians.find(v => v.vet_id === visit.vet_id);
            return { ...visit, veterinarian: vet };
        });

    const vaccines = data.vaccines
        .filter(v => v.animal_id === animalId)
        .map(vaccine => {
            const vet = data.veterinarians.find(v => v.vet_id === vaccine.vet_id);
            return { ...vaccine, veterinarian: vet };
        });

    const allData = { animal, owner, visits, vaccines }

    console.log(allData)

    return allData;
}

export function defineSpecies(specie) {
    if (specie == "Chien") return "🐕";

    if (specie == "Chat") return "🐈";

    if (specie == "Lapin") return "🐇";

    return "❓";
}


export function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (years === 0) {
        return `${months} mois`;
    } else if (months === 0) {
        return `${years} an${years > 1 ? 's' : ''}`;
    } else {
        return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
    }
}
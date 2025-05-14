const fs = require('fs');

// Liste de prénoms et de noms
const firstNames = ["Jean", "Marie", "Paul", "Sophie", "Luc", "Anna", "Pierre", "Isabelle", "Thomas", "Emma", "Richard","Jacques","Clémence","Aurélien","Frédéric","Chloé","François","Mehdi","Rachel","Virginie","Benjamin","Marlène","Denis","Elio","Alexandre","Alexandra","Lucie","Sabine","Coralie","Laetitia","Pauline"];
const lastNames = ["Dupont", "Curie", "Martin", "Bernard", "Robert", "Petit", "Durand", "Leroy", "Moreau", "Simon","Dupond","Dupuis","Delarue","Langlet","Delafosse","Tourano","Candat","Cantou","Henry","Flame","Mutte","Lebeurre"];
const jobTitles = ["Directeur Général", "Chercheur", "Ingénieur", "Responsable RH", "Analyste", "Développeur", "Chef de Projet", "Commercial", "Comptable", "Secrétaire"];

// Créer toutes les combinaisons uniques de prénoms et noms
const nameCombinations = [];
firstNames.forEach(firstName => {
    lastNames.forEach(lastName => {
        nameCombinations.push([firstName, lastName]);
    });
});

// Sélectionner 500 combinaisons aléatoires sans répétition
const selectedCombinations = [];
while (selectedCombinations.length < 500) {
    const randomIndex = Math.floor(Math.random() * nameCombinations.length);
    const combination = nameCombinations.splice(randomIndex, 1)[0];
    selectedCombinations.push(combination);
}

// Génération des utilisateurs sans doublons
const users = selectedCombinations.map((combination, index) => {
    const [firstName, lastName] = combination;
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.fr`;
    const imageUrl = index % 2 === 0 
        ? `https://randomuser.me/api/portraits/men/${index % 100}.jpg` 
        : `https://randomuser.me/api/portraits/women/${index % 100}.jpg`;
    
    return {
        id: Math.floor(Math.random() * 100000),
        firstName,
        lastName,
        jobTitle,
        email,
        imageUrl
    };
});

// Sauvegarde dans un fichier JSON
const filePath = 'users_unique_final.json';
fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

console.log(`File saved as ${filePath}`);
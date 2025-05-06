<script>
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const pseudo = this.pseudo.value.trim();
    const nom = this.nom.value.trim();
    const prenom = this.prenom.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value;
    const confirmPassword = this.confirm_password.value;
    const nom_club = this.nom_club.value.trim();
    const pays = this.pays.value.trim();
    const couleur = this.couleur.value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Récupère les comptes existants depuis le localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifie que le pseudo n’est pas déjà utilisé
    if (users.some(user => user.pseudo === pseudo)) {
      alert("Ce pseudo est déjà utilisé. Choisissez-en un autre.");
      return;
    }

    // Création du nouvel utilisateur
    const newUser = {
      pseudo,
      nom,
      prenom,
      email,
      password,
      nom_club,
      pays,
      couleur
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");
    window.location.href = "login.html";
  });
</script>
// génération des joueurs 
const postes = ["G", "DFC", "DFD", "DFG", "DLG", "DLD", "DLC", "MDD", "MDC", "MDG", "MOD", "MOG", "MOC", "ASC", "ASG", "ASD", "ATC", "ATD", "ATG"];
const pieds = ["Droit", "Gauche", "bis"];
const noms = ["Diallo", "Camara", "Traoré", "Sow", "Keita", "Cissé"];
const prenoms = ["Oury", "Mamadou", "Aliou", "Ibrahima", "Cheick", "Lamine"];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function genererJoueur(id) {
  let poste = randomItem(postes);
  let talents = genererTalents(poste);
  return {
    nom: randomItem(noms),
    prenom: randomItem(prenoms),
    age: Math.floor(Math.random() * 26) + 15,
    poste: poste,
    pied_fort: randomItem(pieds),
    note: Math.floor(Math.random() * 21) + 40,
    condition: Math.floor(Math.random() * 31) + 70,
    contrat: {
      duree: Math.floor(Math.random() * 4) + 1,
      salaire: Math.floor(Math.random() * 20000) + 30000,
      statut: "Titulaire"
    },
    valeur: Math.floor(Math.random() * 800000) + 500000,
    numero: id + 1,
    club_actuel: "Haycom FC",
    club_provenance: "Généré",
    club_formateur: "Haycom FC",
    talents: talents
  };
}

function genererTalents(poste) {
  const talentsDispo = {
    G: ["Réflexes", "Détente", "Plongeon", "Relance", "Positionnement"],
    DEF: ["Tacle", "Marquage", "Tête", "Endurance", "Vitesse"],
    MIL: ["Passes", "Vision", "Tirs de loin", "Endurance", "Tacle", "Dribble"],
    ATT: ["Finition", "Vitesse", "Tête", "Dribble", "Sang-froid"]
  };

  let talents = {};
  let type;
  if (poste === "G") type = "G";
  else if (poste.startsWith("DF")) type = "DEF";
  else if (poste.startsWith("M")) type = "MIL";
  else type = "ATT";

  talentsDispo[type].forEach(talent => {
    talents[talent] = Math.floor(Math.random() * 41) + 60;
  });
  return talents;
}

function genererEquipe() {
  const joueurs = [];
  for (let i = 0; i < 16; i++) {
    joueurs.push(genererJoueur(i));
  }
  localStorage.setItem("monEquipe", JSON.stringify(joueurs));
  afficherJoueurs(joueurs);
}

function afficherJoueurs(joueurs = JSON.parse(localStorage.getItem("monEquipe") || "[]")) {
  const tbody = document.querySelector("#tableJoueurs tbody");
  tbody.innerHTML = "";
  joueurs.forEach(joueur => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${joueur.prenom} ${joueur.nom}</td>
      <td>${joueur.age}</td>
      <td>${joueur.poste}</td>
      <td>${joueur.pied_fort}</td>
      <td>${joueur.note}</td>
      <td>${joueur.condition}</td>
      <td>${joueur.contrat.duree} ans</td>
      <td>${joueur.valeur.toLocaleString()}</td>
      <td>${joueur.numero}</td>
      <td>${joueur.club_actuel}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Charger à l’ouverture si déjà généré
window.onload = () => afficherJoueurs();
window.onload = () => {
  const equipe = JSON.parse(localStorage.getItem("monEquipe"));
  if (!equipe || equipe.length === 0) {
    genererEquipe(); // génère automatiquement l’équipe si non encore présente
  } else {
    afficherJoueurs(equipe); // sinon on l'affiche
  }
};

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

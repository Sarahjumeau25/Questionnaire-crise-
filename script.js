document.getElementById("voirDiagnostic").addEventListener("click", function() {
    // Récupérer les réponses
    const reponses = {
        q1: document.querySelector('input[name="q1"]:checked') ? document.querySelector('input[name="q1"]:checked').value : null,
        q2: document.querySelector('input[name="q2"]:checked') ? document.querySelector('input[name="q2"]:checked').value : null,
        q3: document.querySelector('input[name="q3"]:checked') ? document.querySelector('input[name="q3"]:checked').value : null,
        q4: document.querySelector('input[name="q4"]:checked') ? document.querySelector('input[name="q4"]:checked').value : null,
        q5: document.querySelector('input[name="q5"]:checked') ? document.querySelector('input[name="q5"]:checked').value : null,
        q6: document.querySelector('input[name="q6"]:checked') ? document.querySelector('input[name="q6"]:checked').value : null,
        q7: document.querySelector('input[name="q7"]:checked') ? document.querySelector('input[name="q7"]:checked').value : null,
        q8: document.querySelector('input[name="q8"]:checked') ? document.querySelector('input[name="q8"]:checked').value : null,
        q9: document.querySelector('input[name="q9"]:checked') ? document.querySelector('input[name="q9"]:checked').value : null,
        q10: document.querySelector('input[name="q10"]:checked') ? document.querySelector('input[name="q10"]:checked').value : null,
        q11: document.querySelector('input[name="q11"]:checked') ? document.querySelector('input[name="q11"]:checked').value : null,
        q12: document.querySelector('input[name="q12"]:checked') ? document.querySelector('input[name="q12"]:checked').value : null
    };

    // Compter les réponses "positives" (complet, recent, oui, etc.)
    const positives = Object.values(reponses).filter(reponse =>
        reponse === "complet" ||
        reponse === "recent" ||
        reponse === "veille_reguliere" ||
        reponse === "regulierement" ||
        reponse === "oui"
    ).length;

    // Compter les réponses "moyennes" (partiel, occasionnel, peut_etre, etc.)
    const moyennes = Object.values(reponses).filter(reponse =>
        reponse === "partiel" ||
        reponse === "occasionnel" ||
        reponse === "veille_incomplete" ||
        reponse === "peut_etre"
    ).length;

    // Déterminer le diagnostic
    let diagnostic = "";
    let titre = "";
    let description = "";
    let risques = [];
    let conseils = "";

    if (positives >= 8) {
        titre = "✅ Vous êtes prêt.";
        description = "Votre entreprise montre un haut niveau de préparation aux crises. Vous disposez d’un plan clair, d’une équipe formée, et d’outils de communication et de veille efficaces.";
        conseils = "Cependant, même les organisations bien préparées bénéficient d’un regard extérieur indépendant ou de simulations régulières. Opinion Valley peut vous accompagner en toute discrétion dans l’amélioration continue de votre dispositif.";
    } else if (moyennes >= 6 || (positives >= 4 && positives < 8)) {
        titre = "⚠️ Préparation partielle.";
        description = "Votre entreprise est sensibilisée à la gestion de crise, mais plusieurs angles morts subsistent :";
        risques = [
            "Outils incomplets ou non partagés",
            "Plan de crise inexistant ou daté",
            "Communication interne/externe incertaine"
        ];
        conseils = "En cas de crise, vous risquez des pertes de crédibilité, des tensions sociales mal gérées, ou une perte de contrôle médiatique. Opinion Valley intervient en amont pour sécuriser vos points de vulnérabilité.";
    } else {
        titre = "🚨 Vulnérabilité élevée.";
        description = "Votre entreprise présente un niveau d’impréparation préoccupant, aggravé par votre secteur d’activité. Vos réponses indiquent :";
        risques = [
            "Aucun plan de crise clair",
            "Manque de formation de vos dirigeants",
            "Absence de stratégie de communication d’urgence"
        ];
        conseils = "Le risque est majeur : une crise pourrait très vite devenir incontrôlable et nuire gravement à votre réputation, vos équipes, vos relations avec les pouvoirs publics ou les médias. Opinion Valley aide les entreprises les plus exposées à construire une réponse adaptée.";
    }

    // Afficher le diagnostic
    const form = document.getElementById("criseForm");
    form.innerHTML = `
        <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: ${titre.includes("✅") ? "#27ae60" : titre.includes("⚠️") ? "#f39c12" : "#e74c3c"};">${titre}</h2>
            <p style="font-size: 16px; line-height: 1.6;">${description}</p>
            ${risques.length > 0 ? `
                <ul style="text-align: left; margin: 20px auto; max-width: 500px; padding-left: 20px;">
                    ${risques.map(risque => `<li>${risque}</li>`).join('')}
                </ul>
            ` : ''}
            <p style="font-size: 16px; line-height: 1.6; font-style: italic;">${conseils}</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button id="retourQuestionnaire" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Retour au questionnaire</button>
        </div>
    `;

    // Ajouter la section contact
    form.innerHTML += `
        <div style="background-color: white; padding: 30px; border-radius: 10px; margin-top: 40px; text-align: center;">
            <img src="https://opinionvalley.com/logo.png" alt="Logo Opinion Valley" style="width: 100px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50;">Vous souhaitez aller plus loin ?</h2>
            <p style="color: #7f8c8d;">Laissez-nous vos coordonnées et nous vous contacterons dans les meilleurs délais :</p>
            <form id="contactForm" style="max-width: 500px; margin: 0 auto;">
                <input type="text" placeholder="Nom :" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;"><br>
                <input type="email" placeholder="Email :" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;"><br>
                <textarea placeholder="Message :" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; min-height: 100px;"></textarea><br>
                <button type="submit" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Envoyer</button>
            </form>
        </div>
    `;

    // Gérer le retour au questionnaire
    document.getElementById("retourQuestionnaire").addEventListener("click", function() {
        location.reload();
    });
});

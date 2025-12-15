document.addEventListener('DOMContentLoaded', function() {
    const boutonDiagnostic = document.getElementById('voirDiagnostic');
    if (!boutonDiagnostic) {
        console.error("Erreur : Le bouton 'Voir mon diagnostic' est introuvable !");
        return;
    }

    boutonDiagnostic.addEventListener('click', function() {
        const reponses = {};
        for (let i = 1; i <= 12; i++) {
            const checkedInput = document.querySelector(`input[name="q${i}"]:checked`);
            reponses[`q${i}`] = checkedInput ? checkedInput.value : null;
        }

        // Calcul du diagnostic
        const positives = Object.values(reponses).filter(reponse =>
            ["complet", "recent", "veille_reguliere", "regulierement", "oui", "complete", "sensibilisees", "rapide_efficace", "cartographie_a_jour", "secteur_sensible"].includes(reponse)
        ).length;

        const moyennes = Object.values(reponses).filter(reponse =>
            ["partiel", "occasionnel", "veille_incomplete", "pas_social_interne", "partielle", "pas_depuis_longtemps", "non_testes", "cartographie_ancienne", "peut_etre", "il_y_a_longtemps"].includes(reponse)
        ).length;

        // Détermination du diagnostic
        let titre, description, risques, conseils, couleur;
        if (positives >= 9) {
            titre = "✅ Vous êtes prêt.";
            couleur = "#27ae60";
            description = "Votre entreprise montre un haut niveau de préparation aux crises.";
            conseils = "Cependant, même les organisations bien préparées bénéficient d’un regard extérieur indépendant.";
        } else if (moyennes >= 6 || (positives >= 4 && positives < 9)) {
            titre = "⚠️ Préparation partielle.";
            couleur = "#f39c12";
            description = "Votre entreprise est sensibilisée à la gestion de crise, mais plusieurs angles morts subsistent :";
            risques = ["Outils incomplets ou non partagés", "Plan de crise inexistant ou daté", "Communication interne/externe incertaine"];
            conseils = "En cas de crise, vous risquez des pertes de crédibilité, des tensions sociales mal gérées.";
        } else {
            titre = "🚨 Vulnérabilité élevée.";
            couleur = "#e74c3c";
            description = "Votre entreprise présente un niveau d’impréparation préoccupant.";
            risques = ["Aucun plan de crise clair", "Manque de formation de vos dirigeants", "Absence de stratégie de communication d’urgence"];
            conseils = "Le risque est majeur : une crise pourrait très vite devenir incontrôlable.";
        }

        // Afficher le diagnostic
        const diagnosticSection = document.getElementById('diagnosticSection');
        diagnosticSection.style.display = 'block';
        diagnosticSection.innerHTML = `
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: ${couleur};">${titre}</h2>
                <p style="font-size: 16px; line-height: 1.6;">${description}</p>
                ${risques?.length > 0 ? `
                    <ul style="text-align: left; margin: 20px auto; max-width: 500px; padding-left: 20px; list-style-type: disc;">
                        ${risques.map(risque => `<li>${risque}</li>`).join('')}
                    </ul>
                ` : ''}
                <p style="font-size: 16px; line-height: 1.6; font-style: italic;">${conseils}</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button id="retourQuestionnaire" style="background-color: #3498db;">Retour au questionnaire</button>
            </div>
        `;

        // Ajouter la section contact
        let hiddenFields = '';
        for (let i = 1; i <= 12; i++) {
            hiddenFields += `<input type="hidden" name="q${i}" value="${reponses[`q${i}`] || ''}">`;
        }

        const contactHTML = `
            <div class="contact-section">
                <h2>Vous souhaitez aller plus loin ?</h2>
                <p>Laissez-nous vos coordonnées et nous vous contacterons dans les meilleurs délais :</p>
                <form name="criseForm" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="criseForm">
                    ${hiddenFields}
                    <input type="text" name="nom" placeholder="Nom :" required><br>
                    <input type="email" name="email" placeholder="Email :" required><br>
                    <textarea name="message" placeholder="Message :" required></textarea><br>
                    <button type="submit">Envoyer</button>
                </form>
                <div id="confirmationMessage" style="display: none; text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #27ae60;">Merci pour votre message !</h3>
                    <p>Nous vous recontacterons dans les meilleurs délais.</p>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: #7f8c8d;">Contact : <a href="mailto:vincent.prevost@opinionvalley.com">vincent.prevost@opinionvalley.com</a></p>
            </div>
        `;

        diagnosticSection.innerHTML += contactHTML;

        document.getElementById("retourQuestionnaire").addEventListener("click", function() {
            location.reload();
        });
    });
});

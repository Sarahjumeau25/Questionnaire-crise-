document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="criseForm"]');
    if (!form) {
        console.error("Erreur : Le formulaire 'criseForm' est introuvable !");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            form.style.display = 'none';
            document.getElementById('confirmationMessage').style.display = 'block';
        })
        .catch((error) => {
            alert('Une erreur est survenue. Veuillez réessayer.');
            console.error(error);
        });
    });
});

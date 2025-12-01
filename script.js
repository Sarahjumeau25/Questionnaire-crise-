document.getElementById("criseForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var formData = {
    nom: document.getElementById("nom").value,
    q1: document.querySelector('input[name="q1"]:checked') ? document.querySelector('input[name="q1"]:checked').value : "non répondu",
    q2: document.querySelector('input[name="q2"]:checked') ? document.querySelector('input[name="q2"]:checked').value : "non répondu",
    q3: document.querySelector('input[name="q3"]:checked') ? document.querySelector('input[name="q3"]:checked').value : "non répondu",
    q4: document.querySelector('input[name="q4"]:checked') ? document.querySelector('input[name="q4"]:checked').value : "non répondu",
    q5: document.querySelector('input[name="q5"]:checked') ? document.querySelector('input[name="q5"]:checked').value : "non répondu",
    q6: document.querySelector('input[name="q6"]:checked') ? document.querySelector('input[name="q6"]:checked').value : "non répondu",
    q7: document.querySelector('input[name="q7"]:checked') ? document.querySelector('input[name="q7"]:checked').value : "non répondu",
    q8: document.querySelector('input[name="q8"]:checked') ? document.querySelector('input[name="q8"]:checked').value : "non répondu",
    q9: document.querySelector('input[name="q9"]:checked') ? document.querySelector('input[name="q9"]:checked').value : "non répondu",
    q10: document.querySelector('input[name="q10"]:checked') ? document.querySelector('input[name="q10"]:checked').value : "non répondu",
    q11: document.querySelector('input[name="q11"]:checked') ? document.querySelector('input[name="q11"]:checked').value : "non répondu",
    q12: document.querySelector('input[name="q12"]:checked') ? document.querySelector('input[name="q12"]:checked').value : "non répondu"
  };

  fetch('TON_URL_APPS_SCRIPT', {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    alert("Merci pour vos réponses ! Elles ont été enregistrées.");
    document.getElementById("criseForm").reset();
  })
  .catch(error => {
    alert("Une erreur s'est produite. Veuillez réessayer.");
  });
});

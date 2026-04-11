const origine = document.querySelector('#origine');   // Seleziona il campo di input per l'origine
const destinazione = document.querySelector('#destinazione'); // Seleziona il campo di input per la destinazione
const eta = document.querySelector('#age');   // Seleziona il menu a tendina dell'età
const button = document.querySelector('#btn');   // Seleziona il pulsante per calcolare il prezzo
const nome = document.querySelector('#name');   // Seleziona il campo del nome
const cognome = document.querySelector('#cognome'); // Seleziona il campo del cognome
const check = document.querySelector('#check');   // Seleziona la checkbox per il viaggio di andata e ritorno
const ticket = document.querySelector('#ticket'); // Seleziona il contenitore dove mostrare il biglietto
const dateTorna = document.querySelector('#date-torna'); // Seleziona il campo della data di ritorno

// Popola il menu dell'età con valori da 4 a 110
for (let i = 4; i <= 110; i++) {
    eta.innerHTML += `<option value="${i}">${i}</option>`;
}

// Oggetto che contiene le distanze fisse tra le città
const distanze = {
    "milano-roma": 570,
    "milano-torino": 140,
    "milano-venezia": 270,
    "milano-napoli": 770,
    "milano-firenze": 300,
    "roma-torino": 670,
    "roma-venezia": 530,
    "roma-napoli": 230,
    "roma-firenze": 280,
    "torino-venezia": 400,
    "torino-napoli": 880,
    "torino-firenze": 390,
    "venezia-napoli": 730,
    "venezia-firenze": 260,
    "napoli-firenze": 470
}

// Funzione che calcola la distanza tra origine e destinazione
const calcoDistanza = () => {
    const da = origine.value;   // Legge il valore dell'origine
    const a = destinazione.value; // Legge il valore della destinazione

    if (da === a) {   // Se le due città sono uguali
        return;       // Non calcola nulla
    } else {
        const part1 = `${da}-${a}`; // Crea la chiave "origine-destinazione"
        const part2 = `${a}-${da}`; // Crea la chiave inversa "destinazione-origine"
        const distanza = distanze[part1] || distanze[part2]; // Cerca la distanza nell'oggetto
        return distanza;
    }
}

// Funzione che calcola il prezzo del biglietto
const calcolaPrezzo = () => {

    let prezzo = calcoDistanza() * 0.21; // Prezzo base: distanza × 0.21 €/km

    if (eta.value < 18) {          // Sconto per minorenni
        prezzo = prezzo * 0.8;
    } else if (eta.value > 65) {   // Sconto per over 65
        prezzo = prezzo * 0.6;
    } else if (check.checked) {    // Se è selezionato andata e ritorno
        prezzo = prezzo * 2;
    }

    const prezzoFinale = `${prezzo.toFixed(2)}€`; // Arrotonda a 2 decimali
    console.log(prezzoFinale);
    return prezzoFinale;
}

// Attiva o disattiva il campo data di ritorno in base alla checkbox
check.addEventListener("change", () => {
    if (check.checked) {
        dateTorna.disabled = false; // Abilita la data di ritorno
    } else {
        dateTorna.disabled = true;  // Disabilita la data di ritorno
    }
})

// Evento click sul pulsante per generare il biglietto
button.addEventListener("click", (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form

    const prezzoFinale = calcolaPrezzo(); // Calcola il prezzo finale

    if (prezzoFinale != "NaN€") { // Controlla che i dati siano validi
        document.querySelector('#ticket').innerHTML =
            `<h3 class="text-center text-light mt-2 pt-2 ">preventino</h3>
        <hr class="text-light">
        <div class="row mb-2">
            <h4 class="text-light mb-5"> Dettaglio Passeggeri</h4>
            <div class="col-md-3 col-12 text-light">Nome: <span class="detali-ticket" > ${nome.value.toUpperCase()} </span></div>
            <div class="col-md-3 col-12 text-light">Cognome: <span class="detali-ticket">
            ${cognome.value.toUpperCase()}</span></div>
            <div class="col-md-3 col-12 text-light">Origine: <span class="detali-ticket"> ${origine.value.toUpperCase()}</span></div>
            <div class="col-md-3 col-12 text-light mb-3">Destinazione: <span class="detali-ticket"> ${destinazione.value.toUpperCase()}</span></div>
            <hr class="text-light mt-2">
            </div>
            <div class="row">
            <div class="col-4 text-warning pb-3">
            <h4>Totale:${prezzoFinale} </h4>
            </div>
        </div> `;
        
        ticket.classList.add('show'); // Mostra il biglietto
    }
});

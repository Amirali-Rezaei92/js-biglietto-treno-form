const origine = document.querySelector('#origine');
const destinazione = document.querySelector('#destinazione');
const eta = document.querySelector('#age');
const button = document.querySelector('#btn');
const nome = document.querySelector('#name');
const cognome = document.querySelector('#cognome');
const check = document.querySelector('#check');
const ticket = document.querySelector('#ticket');
const dateTorna = document.querySelector('#date-torna');
for (let i = 4; i <= 110; i++) {
    eta.innerHTML += `<option value="${i}">${i}</option>`;
}

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
const calcoDistanza = () => {
    const da = origine.value;
    const a = destinazione.value;
    if (da === a) {
        return;
    } else {
        const part1 = `${da}-${a}`;
        const part2 = `${a}-${da}`;
        const distanza = distanze[part1] || distanze[part2];
        return distanza;
    }
}


const calcolaPrezzo = () => {

    let prezzo = calcoDistanza() * 0.21;

    if (eta.value < 18) {
        prezzo = prezzo * 0.8;
    } else if (eta.value > 65) {
        prezzo = prezzo * 0.6;
    } else if (check.checked) {
        prezzo = prezzo * 2;
    }

    const prezzoFinale = `${prezzo.toFixed(2)}€`;
    console.log(prezzoFinale);
    return prezzoFinale;

}

check.addEventListener("change", () => {
    if (check.checked) {
        dateTorna.disabled = false;
    } else {
        dateTorna.disabled = true;
    }
})

button.addEventListener("click", () => {

    const prezzoFinale = calcolaPrezzo();
    if (prezzoFinale != "NaN€") {
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
        ticket.classList.add('show');
    }
});

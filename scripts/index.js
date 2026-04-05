const origine = document.querySelector('#origine');
const destinazione = document.querySelector('#destinazione');
const eta = document.querySelector('#age');
const button = document.querySelector('#btn');

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
        prezzo = prezzo * 0.8;   // sconto 20%
    } else if (eta.value > 65) {
        prezzo = prezzo * 0.6;   // sconto 40%
    }

    const prezzoFinale = `${prezzo.toFixed(2)}€`;
    console.log(prezzoFinale);
    return prezzoFinale;

}

button.addEventListener("click", (e) => {
    e.preventDefault(); 
    calcolaPrezzo();
});

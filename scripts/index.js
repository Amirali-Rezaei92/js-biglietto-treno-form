const chilometri = document.querySelector('#km');
const eta = document.querySelector('#age');
const button = document.querySelector('#btn');

const calcolaPrezzo = () => {

    let prezzo = chilometri.value * 0.21;

    if (eta.value < 18) {
        prezzo = prezzo * 0.8;   // sconto 20%
    } else if (eta.value > 65) {
        prezzo = prezzo * 0.6;   // sconto 40%
    }

    const prezzoFinale = `${prezzo.toFixed(2)}€`;
    console.log(prezzoFinale);
    return prezzoFinale;
}

button.addEventListener("click", calcolaPrezzo);


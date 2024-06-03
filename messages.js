
import { pelaa_painike } from "./gameLogic.js";
export const ilmoitus = document.getElementById("ilmoitus");
import { getBet } from "./handleBets.js";
import { viesti } from "./main.js";

export function pelaaPainike(arvo){

    pelaa_painike.disabled = arvo;
}



//viestit
export const messages = {
    saldo0() {
        ilmoitus.innerHTML = "Saldosi ei riitä pyöräytykseen, pienennä panosta tai tee talletus!";
    },
    win(arvo) {
        ilmoitus.innerHTML = `Voitit ${(arvo * getBet()).toFixed(2)} €!!!`;
    },
    noWin() {
        ilmoitus.innerHTML = "Ei voittoa";
    },
    virhe(){
        viesti.innerHTML = "Anna summa numeroina!"
    }
};
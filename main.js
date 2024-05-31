
//import
import { spinWheel } from "./gameLogic.js";
import { getBet, getSaldo } from "./handleBets.js";
import { depositCash} from "./handleBets.js";

//elementit
const pelaa_painike = document.getElementById("pelaa");
let saldo_naytto = document.getElementById("saldo_naytto");
const talleta_painike = document.getElementById("paina_ja_talleta");
let viesti = document.getElementById("message");

//tapahtumakäsittelijät
pelaa_painike.addEventListener("click", spinWheel);
talleta_painike.addEventListener("click", () => depositCash());


//tilat


pelaa_painike.disabled = true;

// export
export { saldo_naytto, pelaa_painike, viesti };

// pelin aloitus
startGame();

function startGame() {
    // alkutila pelille
    let panos = getBet();
    let saldo = getSaldo();
    if (saldo >= panos && panos != 0.50) {
        pelaa_painike.disabled = false;
        saldo_naytto.innerHTML = `Saldosi on ${saldo} €`;
    }
}

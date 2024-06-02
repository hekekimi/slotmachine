

//importit
import { checkWin } from "./handleWin.js";
import { messages, pelaaPainike } from "./messages.js";
import { checkBetandSaldo,chargePlayer } from "./handleBets.js";
import {ilmoitus } from "./messages.js";


//elementtit
export const pelaa_painike = document.getElementById("pelaa");

//muuyttujat
const lockedReels = [false, false, false, false]; // lukitut rullat
let canLockReels = false; // voiko rullia lukita
//tapahtumakäsittelijäy
pelaa_painike.addEventListener("click",spinWheel);
pelaa_painike.disabled = true;

// kuvat pyöritystä varten
const images = [
    "assets/0.png",
    "assets/1.png",
    "assets/2.png",
    "assets/3.png",
    "assets/4.png",
    "assets/5.png",
    "assets/6.png"
];

export function spinWheel() {
    
    if (!checkBetandSaldo()) {
        
        messages.saldo0();
        setTimeout(()=> {
            ilmoitus.innerHTML = ""},2000);
    


        pelaaPainike(true);
        return;

    }
    else{
        chargePlayer();
    }
    
    



    // jos rullat eivät saa olla lukittuja, estetään niiden lukitseminen tällä kierroksella
    if (!canLockReels) {
        for (let i = 0; i < 4; i++) {
            unlockReel(i);
        }
    }

    // estetään lukitusnapit pyöräytyksen aikana
    toggleLockButtons(false);

    const reels = document.querySelectorAll(".reel img");
    reels.forEach((reel, index) => {
        if (!lockedReels[index]) {
            reel.classList.add("spin");
            // Animaation aikana vaihdetaan kuvat useamman kerran
            let intervalId = setInterval(() => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                reel.setAttribute("src", randomImage);
            }, 80); //nopeus

            setTimeout(() => {
                clearInterval(intervalId);
                const randomIndex = Math.floor(Math.random() * images.length);
                reel.setAttribute("src", images[randomIndex]);
                reel.classList.remove("spin");
                reel.dataset.value = randomIndex;
            }, 1000);
        }
    });

    setTimeout(() => {
        finalizeSpin();
        //checkWin(2,2,2,2);
        checkWin(
            Number(document.querySelectorAll("img")[0].src.match(/(\d)\.png$/)[1]), //etsitään oikeat kuvat voiton varmistamiseksi
            Number(document.querySelectorAll("img")[1].src.match(/(\d)\.png$/)[1]),
            Number(document.querySelectorAll("img")[2].src.match(/(\d)\.png$/)[1]),
            Number(document.querySelectorAll("img")[3].src.match(/(\d)\.png$/)[1])
        );
        

        if (!canLockReels) {
            for (let i = 0; i < 4; i++) {
                unlockReel(i);
            }
            toggleLockButtons(false);
        } else {
            toggleLockButtons(true);
        }

        
    }, 1000);

    canLockReels = !canLockReels; // Vaihda lukitusmahdollisuus seuraavalle kierrokselle

   
   

    


}

function finalizeSpin() {
    const reels = document.querySelectorAll(".reel img");
    reels.forEach((reel, index) => {
        if (!lockedReels[index]) {
            const randomIndex = Math.floor(Math.random() * images.length);
            reel.setAttribute("src", images[randomIndex]); //lopullinen kuva
        }
    });

    reels.forEach(reel => {
        reel.classList.remove("spin");
    });
}

window.toggleLock = function toggleLock(index) {//lukitus, jos mahdollista tällä kierroksella
    if (canLockReels) {
        lockedReels[index] = !lockedReels[index];
        const button = document.getElementById(`lukitse-button-${index}`);
        if (lockedReels[index]) {
            button.textContent = "LUKITTU";
            button.classList.add("locked");
        } else {
            button.textContent = "LUKITSE";
            button.classList.remove("locked");
        }
    } else {
        ilmoitus.innerHTML = "Et voi tällä hetkellä lukita";
    }
}

function unlockReel(index) {//lukituksen poisto
    lockedReels[index] = false;
    const button = document.getElementById(`lukitse-button-${index}`);
    if (button) {
        button.textContent = "LUKITSE";
        button.classList.remove("locked");
    } else {
        console.error(`Painiketta 'lukitse-button-${index}' ei löydy`);
    }
}

export function toggleLockButtons(enable) {//ottaa käyttöön tai estää lukitusnapit
    for (let i = 0; i < 4; i++) {
        const button = document.getElementById(`lukitse-button-${i}`);
        if (button) {
            button.disabled = !enable;
        }
    }
}

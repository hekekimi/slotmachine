
//import

import { messages, pelaaPainike } from "./messages.js";
import { saldo_naytto, pelaa_painike, viesti } from "./main.js";


let panos = 0.5;
//elementit
const panos_painike = document.getElementById("panos");
const panos_naytto = document.getElementById("panos_naytto");
let saldo = 0;



//tilat
let panos_asetettu = false;

panos_painike.addEventListener("click",setBet);


export function setBet(){
    let currentSaldo = getSaldo();
    panos += 0.50;
    panos_asetettu = true;
    

    if(panos > 10){
    panos = 1;
    };

    panos_painike.innerHTML = `Aseta panos (+0,50 €)`
    panos_naytto.innerHTML = `Panos: ${panos.toFixed(2)} €`;
    if(panos_asetettu && currentSaldo >= panos){
        pelaaPainike(false);
    }
    else{
        pelaaPainike(true);
    }
    

}


export function chargePlayer(){
    

    let currentSaldo = getSaldo();
    currentSaldo = updateSaldo(-panos);
    saldo_naytto.innerHTML = `Saldosi on ${currentSaldo.toFixed(2)} €`;
    
    

}

export function getBet(){
    return panos;
}

/*export function checkSaldo(){
    

}*/

export function checkBetandSaldo(){
    getBet();
    let currentSaldo = getSaldo();
    if(!panos_asetettu || panos > currentSaldo){
        return false;
        
    }
    else{
        return true
    }


}



export function depositCash(){
    const talletaArvo = document.getElementById("talleta").value.trim();
    const arvoTesti = /^\d+(\.\d{1,2})?$/;
    
    if(arvoTesti.test(talletaArvo)){
        const talletaLuku = parseFloat(talletaArvo,10);
        saldo += talletaLuku;
        saldo_naytto.innerHTML = `Saldosi on ${saldo.toFixed(2)} €`;
        viesti.innerHTML = ""; 
    }else {
        messages.virhe();
    }
    let panos = getBet();
    if(saldo >= panos && panos != 0.50){
        pelaa_painike.disabled = false;

    }
}




export function getSaldo(){
    return saldo;
}

export function updateSaldo(voitto){

    saldo += voitto;
    saldo_naytto.innerHTML = `Saldosi on ${saldo.toFixed(2)} €`;
    return saldo;


}

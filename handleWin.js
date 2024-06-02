import { updateSaldo } from "./handleBets.js";
import { getBet } from "./handleBets.js";
import { ilmoitus,messages} from "./messages.js";
import { toggleLockButtons } from "./gameLogic.js";

export function checkWin(rulla1,rulla2,rulla3,rulla4){
    
    const rullat = [rulla1,rulla2,rulla3,rulla4];

    function checkReels(rullat,luku){//ovatko kaikki rullat samat
        return rullat.every(num => num === luku);
        
    }
    
    
    const tulos = checkReels(rullat,rullat[0]);

    function checkSevens(rullat){
        let seiskat = 0;
        let arvo = 6;
        rullat.forEach(rulla => {
            if(rulla === arvo){
                seiskat ++;
            }
            
        });
        
        

        return seiskat >=3;

    }


    
    if(tulos && rullat[0] ===0){
        messages.win(6);
        updateSaldo(6 * getBet());
        toggleLockButtons(!enable);
        
    }


    else if (tulos && rullat[0] ===1){
        messages.win(3);
        updateSaldo(3 * getBet());
        toggleLockButtons(!enable);
        
    }
    else if(tulos && rullat[0] ===2){
        messages.win(2);
        updateSaldo(2 * getBet());
        toggleLockButtons(!enable);
    }

    else if(tulos && rullat[0] ===3){//päärynät
        messages.win(4);
        updateSaldo(4 * getBet());
        toggleLockButtons(!enable);
    }
    else if(tulos && rullat[0] ===4){//mansikat
        messages.win(7);
        updateSaldo(7 * getBet());
        toggleLockButtons(!enable);
    }
    else if(tulos && rullat[0] ===5){//melonit
        messages.win(5);
        updateSaldo(5 * getBet());
        toggleLockButtons(!enable);
    }

    else if(tulos && rullat[0] ===6){
        messages.win(10);
        updateSaldo(10 * getBet());
        toggleLockButtons(!enable);
    }

    else if(checkSevens(rullat)){
        
        
        messages.win(5);
        updateSaldo(5 * getBet());
        toggleLockButtons(!enable);

    }





    else{
        messages.noWin();
        ilmoitus.classList.remove("animate");
        void ilmoitus.offsetLeft;
        ilmoitus.classList.add("animate");
        
    };
    





}


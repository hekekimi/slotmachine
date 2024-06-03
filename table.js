const button = document.getElementById('table-button');
const table = document.getElementById('taulukko');
button.addEventListener("click",showTable);


function showTable(){

    if (table.classList.contains("hidden")) {
        table.classList.remove("hidden");
        button.textContent = "Piilota voittotaulukko"
        
    } else {
        table.classList.add("hidden");
        button.textContent = "Näytä voittotaulukko"
        
    }


};


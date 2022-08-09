const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector(".form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
        //criando uma tag que passe o currency code como texto e valor
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserindo opções dentro da tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
    dropList[i].addEventListener("change",e => {
        loadFlag(e.target); //carregando loadFlag com o parsing element
    });
}

function loadFlag(element) {
    for(code in country_code){
        if(code == element.value){//se ocounty code  é igual ao selecionado
            let imgTag = element.parentElement.querySelector("img");//selecionando img
            //passando a img para a currency escolhida
            imgTag.src=`https://flagcdn.com/48x36/${country_code[code]}.png`

        }
    }
}


window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click",e=>{
    e.preventDefault();//prevenção do form from
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);//carregando as flags
    loadFlag(toCurrency);//carregando as flags
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
     //não deixar o usuario setar o valor 0 
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${fromCurrency.value}`;
    //fetching a api response e retornando em json response
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Errou";
    });
}

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
}
window.addEventListener("load",e=>{
    getExchangeRate();
});

getButton.addEventListener("click",e=>{
    e.preventDefault();//prevenção do form from
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount-input");
     exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    //não deixar o usuario setar o valor 0 
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amount.value = 1;
    }
    exchangeRateTxt.innerText= "Convertendo";
    let url = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${fromCurrency.value}`;
    //fetching a api response e retornando em json response
    fetch(url).then(response =>response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);

        
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value}=${totalExchangeRate}  ${toCurrency.value}`;

    })
}
let input1 = document.querySelector('.numberSection1')
let input2 = document.querySelector('.numberSection2')
let selectCurrency1 = document.querySelector('#selectCurrency1'); // Add correct selector
let selectCurrency2 = document.querySelector('#selectCurrency2'); // Add correct selector
let lastUpdateDate = document.querySelector('.upadateDate')
let result = document.querySelector('.result')

let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/`;

let currencyData = {}

async function getData(baseCurrency = 'usd') {
    let response = await fetch(`${url}${baseCurrency}.json`)
    // console.log(response)

    let responseData = await response.json()
    console.log("responseData : ", responseData)

    lastUpdateDate.innerText = responseData.date

    let data = responseData[baseCurrency]
    // console.log("Fetched Data :", data)

    currencyData = data;
    // console.log('currencyData: ', currencyData)

    for (key in data) {
        let option1 = document.createElement('option');
        option1.innerText = key;
        option1.value = key;
        selectCurrency1.appendChild(option1);

        let option2 = document.createElement('option');
        option2.innerText = key;
        option2.value = key;
        selectCurrency2.appendChild(option2);

        // console.log("Value :",data[key])

        // console.log(selectCurrency1.value)
    }
    convert()
}

function convert() {
    let selectedCurrency = selectCurrency2.value
    let currencyValue = currencyData[selectedCurrency]
    if (currencyValue) {
        input2.value = currencyValue
        let mainResult = Number(input1.value) *  Number(input2.value).toFixed(2)
        result.innerText = mainResult
    } else {
        input2.value = "";
        result.innerText = "0";
    }
}

selectCurrency2.addEventListener("change", convert)

selectCurrency1.addEventListener("change", function () {
    getData(selectCurrency1.value); // Fetch new base currency data
});

input1.addEventListener("input", convert);



getData()
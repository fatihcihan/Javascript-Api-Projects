const apiKey = "c7928bbe9ac3ecfe36e30793";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}`;

// elements

const currency_one = document.getElementById('currency_one');
const currency_two = document.getElementById('currency_two');
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    });

calculate.addEventListener("click", function () {
    // currencyOne -> base
    const currencyOne = currency_one.value;
    const currencyTwo = currency_two.value;
    const quantity = amount.value;

    fetch(url + "/latest/" + currencyOne)
        .then(res => res.json())
        .then(data => {
            const calculatedValue = (data.conversion_rates[currencyTwo] * quantity).toFixed(3);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;">
                       ${quantity} ${currencyOne} = ${calculatedValue} ${currencyTwo}
                    </div>
                </div> 
            `;
        })
})
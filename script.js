const BASE_URL = "https://api.frankfurter.app/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
//  for (code in countryList){
//     console.log(code,countryList[code]);
//   }
const button = document.querySelector(".btn");
const fromCurr = document.querySelector("#drop_down1");
const toCurr = document.querySelector("#drop_down2");
const msg = document.querySelector(".text");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  // console.log(element);
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  // console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".input_box");
  let amtVal = amount.value;
  // console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value,toCurr.value);
  const URL = `${BASE_URL}?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let rate = data.rates[toCurr.value];
  msg.innerText = `${amtVal} ${fromCurr.value}= ${rate} ${toCurr.value}`;
});

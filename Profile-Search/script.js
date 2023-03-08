const fromLanguage = document.querySelector("#from-lang");
const toLanguage = document.querySelector("#to-lang");

for (let language in languages) {
    let option = `<option value="${language}">${languages[language]}</option> `;
    fromLanguage.insertAdjacentHTML("beforeend", option);
    toLanguage.insertAdjacentHTML("beforeend", option);

    fromLanguage.value = "tr-TR";
    toLanguage.value = "en-GB";
}
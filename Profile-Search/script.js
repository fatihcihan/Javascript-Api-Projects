const fromLanguage = document.querySelector("#from-lang");
const toLanguage = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");


for (let language in languages) {
    let option = `<option value="${language}">${languages[language]}</option> `;
    fromLanguage.insertAdjacentHTML("beforeend", option);
    toLanguage.insertAdjacentHTML("beforeend", option);

    fromLanguage.value = "tr-TR";
    toLanguage.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let fromLang = fromLanguage.value;
    let toLang = toLanguage.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${fromLang}|${toLang}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
})



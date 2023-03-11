const fromLanguage = document.querySelector("#from-lang");
const toLanguage = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons")

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


exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let language = fromLanguage.value;
    fromLanguage.value = toLanguage.value;
    toLanguage.value = language;
});

for (let icon of icons) {
    icon.addEventListener("click", (element) => {
        if (element.target.classList.contains("fa-copy")) {
            if (element.target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (element.target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLanguage.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLanguage.value;
            }
            speechSynthesis.speak(utterance);
        };
    });
}
// API ENDPOINT : 

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMessage = document.querySelector(".error__message");
const loader = document.querySelector(".loader")
const reasultsDisplay = document.querySelector(".results__display");

const handleSubmit = (e) => {
    e.preventDefault();

    if (input.value === "") {
        errorMessage.textContent = "Woops, veuillez remplir le champs";
        return;
    } else {
        errorMessage.textContent = "";
        loader.style.display = "flex";
        reasultsDisplay.textContent = "";
        wikiApiCall(input.value)
    }
}

form.addEventListener("submit", handleSubmit)

const wikiApiCall = async (searchInput) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);
        if (response.ok) {
            const data = await response.json()
            createCards(data.query.search)
            loader.style.display = "none";
        } 
    } catch (error) {
        errorMessage.textContent = `${error}`;
        loader.style.display = "none";
    }

}


const createCards = (data) => {
    if(!data.length) {
        errorMessage.textContent = "Woops, aucun résultat !";
        return;
    }
    data.forEach(element => {
        const url = `https://en.wikipedia.org/?curid=${element.pageId}`

        const card = document.createElement("div");
        card.className = "result__item";
        card.innerHTML = `
            <h3 class="result__title">
                <a href="${url}" target="_blank">${element.title}</a>
            </h3>
            <a href="${url}" class="result__link" target="_blank">${url}</a>
            <span class="result__snippet">${element.snippet}</span>
        `;
        reasultsDisplay.append(card);
    });
}
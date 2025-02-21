let academicCards = JSON.parse(localStorage.getItem("academic_cards")) || [
    {
        id: `${Date.now()}`,
        url: "https://www.comfenalcovalle.com.co/wp-content/uploads/2022/02/Logo-Comfandi.png",
        title: "Comfandi el Prado.",
        content: (
            "Soy egresado de Comfandi el Prado."+
            "<br>En aquella institucion cursé tanto la <strong>primaria</strong> como el <strong>bachiller</strong>."+
            "<br><br>Una de las mejores instituciones a la que he asistido y en la que descubrí mi pasión/amor por la programación."
        )
    },
    {
        id: `${Date.now() + 1}`,
        url: "https://ulibros.com/publisher/plogo/3012e4fbe03f911b804ed3e00d7781c4",
        title: "Universidad Santiago de Cali",
        content: (
            "En estos instantes (por cosa notoria incluso) me encuentro cursando en la <strong>USC.</strong>"+
            "<br><br>Aun sigo mi pasión por la programacion de software, sitios/aplicaciones web. Hasta estos momentos, he ampliado bastante mis conocimientos que tenia desde la primaria."
        )
    }
]

//Once the window loads, load content
window.addEventListener("load", () => {
    updateCardContent();
    handleCards();
})

// console.log(JSON.parse(academicCards));
function updateCardContent(updateHtml = true){
    const cardsContainer = document.querySelector("#academic-container");
    if(!cardsContainer) throw new Error("NO_ACADEMIC_CARD_CONTAINER");

    for(const card of academicCards){
        if(!updateHtml) continue;
        const htmlContent = `<div class="card" card-id="${card.id}">
            <img class="image" src="${card.url}" alt="">
            <div class="title">${card.title}</div>
            <div class="detail">
                ${card.content}
            </div>
        </div>`

        cardsContainer.innerHTML += htmlContent;
    }

    localStorage.setItem("academic_cards", JSON.stringify(academicCards));
}

function removeCard(cardId){
    academicCards = academicCards.filter(c => c.id !== cardId);
    updateCardContent(false);
}

function handleCards(){
    const cards = document.querySelectorAll(".card");
    
    for(const card of cards){
        card.addEventListener("click", () => {
            const cardId = card.getAttribute("card-id");
            if(!cardId) return;

            card.remove();
            removeCard(cardId);
        })
    }
}
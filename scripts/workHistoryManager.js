/*
<div class="work-add" onclick="window.location.assign('http://127.0.0.1:5500/pages/add-work-history.html')">
    +
</div>
*/

/*
{
    id: string,
    url: string,
    image: string,
    title: string,
    content: string
}
*/
let workCards = JSON.parse(localStorage.getItem("work_cards")) || []

//Once the window loads, load content
window.addEventListener("load", () => {
    updateWorkCardContent();
    handleWorkCards();
})

// console.log(JSON.parse(academicCards));
function updateWorkCardContent(updateHtml = true){
    const cardsContainer = document.querySelector("#work-container");
    if(!cardsContainer) throw new Error("NO_WORK_CARD_CONTAINER");

    cardsContainer.innerHTML = "";
    if(workCards.length === 0){
        cardsContainer.innerHTML += `<div class="banner">
            <div class="title">Pues uhhhh..</div>
            <div class="detail">
                No he tenido ningun empleo desde lo que llevo en la <strong>Universidad</strong>
                <br><br>La razon es simple: Por pereza/irresponsabilidad. Apenas si puedo responder con los trabajos de la <strong>Universidad</strong>, como me encargare de un empleo que requiere mucha mas disciplina y responsabilidad
                <br><br><span class="subtitle">¿Tengo pensado en buscar empleo a futuro?</span> Si.
                <br>Pero ahora no me siento en la capacidad de hacerlo. Mas que nada porque prefiero tambien <strong>empleos remotos.</strong>
                <br><br>
            </div>
            <button class="button button-secondary" style="width: fit-content; align-self: center; margin-bottom: 1rem;"
                onclick="redirect('pages/add-work-history.html')"
            >Añadir historia Laboral</button>
            <div class="footer">
                Pero hey te podria cobrar barato por hacerte codigo en PSEint, Java o NodeJS. <strong>Solo digo.</strong>
                <br>Tambien depende de lo que se solicite. No hare una app full 4k HD 1080p.
            </div>
        </div>`;
    }else{
        cardsContainer.innerHTML += `<div class="card-add" onclick="redirect('pages/add-work-history.html')">
            +
        </div>`;

        for(const card of workCards){
            if(!updateHtml) continue;
            const htmlContent = `<div class="card" id="work-card" work-id="${card.id}">
                <img class="image" src="${card.image}" alt="">
                <div class="title">${card.title}</div>
                <div class="detail">
                    ${card.content}
                </div>
            </div>`
    
            cardsContainer.innerHTML += htmlContent;
        }
    }

    localStorage.setItem("work_cards", JSON.stringify(workCards));
}

function removeWorkCard(cardId){
    workCards = workCards.filter(c => c.id !== cardId);
    updateWorkCardContent(false);
}

function handleWorkCards(){
    const cards = document.querySelectorAll("#work-card");
    
    for(const card of cards){
        card.addEventListener("click", () => {
            const cardId = card.getAttribute("work-id");
            if(!cardId) return;

            card.remove();
            removeWorkCard(cardId);
        })
    }
}
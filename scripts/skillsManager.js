let skillsData = JSON.parse(localStorage.getItem("skills")) || [
    {
        id: `${Date.now()}`,
        title: `FRONTEND`,
        content: (
            "Diseño de paginas web con HTML puro, CSS y JS."+
            "<br>Diseño de paginas web con React."
        ),
        footer: `React precioso.`
    },
    {
        id: `${Date.now()+1}`,
        title: `BACKEND`,
        content: (
            "He diseñado APIs para proyectos escolares, por ejemplo \"Coffee Net\" <strong>[Descontinuado]</strong>"+
            "<br><br>Incluso otras APIs por motivos mas personales."
        ),
        footer: `Es facil de hacer una API.`
    },
    {
        id: `${Date.now()+2}`,
        title: `JAVA`,
        content: (
            "Es tedioso de manejar por el simple hecho de:"+
            "<br><strong>La forma en la que se manejan las estructuras</strong>"+
            "<br><br>Pero estoy confiado de que sé lo suficiente de Java."
        ),
        footer: `Lenguaje completamente dificil y odiable.`
    },
    {
        id: `${Date.now()+3}`,
        title: `JAVASCRIPT/TYPESCRIPT - NODEJS`,
        content: (
            "El lenguaje de programacion que usé por primera vez."+
            "<br>Me puedo considerar que soy experto en el lenguaje."+
            "<br><br><strong>Con mas de 5 años de experiencia.</strong>"
        ),
        footer: `El amor de mi vida.`
    }
]

//Once the window loads, load content
window.addEventListener("load", () => {
    updateSkillContent();
    handleSkills();
})

// console.log(JSON.parse(academicCards));
function updateSkillContent(updateHtml = true){
    const skillContainer = document.querySelector(".skill-container");
    if(!skillContainer) throw new Error("NO_SKILL_CONTAINER");

    for(const skill of skillsData){
        if(!updateHtml) continue;
        const htmlContent = `<div class="skill" skill-id="${skill.id}">
            <div class="title">${skill.title}</div>
            <div class="detail">
                ${skill.content}
            </div>
            <div class="footer">
                ${skill.footer}
            </div>
        </div>`

        skillContainer.innerHTML += htmlContent;
    }

    localStorage.setItem("skills", JSON.stringify(skillsData));
}

function removeSkill(skillId){
    skillsData = skillsData.filter(c => c.id !== skillId);
    updateSkillContent(false);
}

function handleSkills(){
    const skills = document.querySelectorAll(".skill");
    
    for(const skill of skills){
        skill.addEventListener("click", () => {
            const skillId = skill.getAttribute("skill-id");
            if(!skillId) return;

            skill.remove();
            removeSkill(skillId);
        })
    }
}
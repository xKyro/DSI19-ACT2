const form = document.querySelector("form");
const urlRegex = (/^http(s?):\/\/([^ ]+\.?)$/);

if(!form) throw new Error("NO_BUTTON");

form.addEventListener("change", (event) => {
    const elements = { form };

    for(const input of elements.form){
        if(!input.classList.contains("input") && !input.classList.contains("textarea")) continue;

        const [ isUrl, isNonEmpty ] = [
            input.hasAttribute("url-regex"),
            input.hasAttribute("non-empty")
        ];

        const value = input.value;

        if(isUrl){
            if(urlRegex.test(value)){ input.classList.remove("invalid"); }else{ input.classList.add("invalid"); }
        }else if(isNonEmpty){
            if(value.trim() !== ""){ input.classList.remove("invalid"); }else{ input.classList.add("invalid"); }
        }
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const { elements } = event.target;
    const image = elements[0].value;
    const title = elements[1].value;
    const content = elements[2].value;

    const currentData = JSON.parse(localStorage.getItem("work_cards")) || [];
    currentData.push({
        id: `${Date.now()}`,
        image,
        title,
        content: content.replaceAll("\n", "<br>")
    });

    localStorage.setItem("work_cards", JSON.stringify(currentData));
    redirect("pages/index.html");
})
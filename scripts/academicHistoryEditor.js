//Bob - https://www.quantamagazine.org/wp-content/uploads/2019/07/Olivier_1500_Trptch.jpg

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
    const url = elements[0].value;
    const title = elements[1].value;
    const content = elements[2].value;

    if(!urlRegex.test(url)) return;

    const currentData = JSON.parse(localStorage.getItem("academic_cards")) || [];
    currentData.push({
        id: `${Date.now()}`,
        url,
        title,
        content: content.replaceAll("\n", "<br>")
    });

    localStorage.setItem("academic_cards", JSON.stringify(currentData));
    redirect("pages/index.html");
})
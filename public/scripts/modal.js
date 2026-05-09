const random_button = document.querySelector(".header_random_mem_text");
const modal = document.querySelector(".modal");
const cross = document.querySelector(".modal_cross");
const flip_card = document.querySelector(".flip-card");
const flip_card_back = document.querySelector(".flip-card-back");
const modal_header = document.querySelector(".modal_header");

random_button.addEventListener("click", () => {
    modal.classList.add("active");
});

cross.addEventListener("click", () => {
    modal.classList.remove("active");
});

flip_card.addEventListener("click", () => {
    flip_card.classList.add("active");

    modal_header.textContent = "Вітаю 🥳! Тобі випав мем ...";

    modal_header.classList.remove("animate");

    modal_header.classList.add("animate");
});

async function get_random_mem() {
    try {
        const random_mem_data = await axios.get("/api/memes/random");
        const random_mem = random_mem_data.data;
        console.log(random_mem);

        const data_templates = await axios("/api/templates");
        const templates = data_templates.data;
        console.log(templates);

        const template = templates.find(
            (template) => template.name == random_mem.title,
        );

        flip_card_back.innerHTML = `
        <div class="meme_card">
        <div class="meme_image_wrapper">
            <img src="${template.imageBase64}" alt="${random_mem.title}" />
        </div>

        <div class="meme_content">
            <h3 class="meme_title">${random_mem.title}</h3>
            <p class="meme_response">${random_mem.response}</p>

            <div class="meme_footer">
                <span class="meme_category">${random_mem.category}</span>
                <span class="meme_likes">❤️ ${random_mem.likes}</span>
            </div>
        </div>
    </div>
    `;
    } catch (e) {
        console.log(e);
    }
}

get_random_mem();

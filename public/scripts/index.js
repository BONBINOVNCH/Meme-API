import convertImg from "../utils/convert.js";

const memes_block = document.querySelector(".main_content_block");
const input_file = document.querySelector(".file");
const update_memes = document.querySelector(".update_memes");

const random_button = document.querySelector(".header_random_mem_text");
const modal = document.querySelector(".modal");
const cross = document.querySelector(".modal_cross");
const flip_card = document.querySelector(".flip-card");
const flip_card_back = document.querySelector(".flip-card-back");
const modal_header = document.querySelector(".modal_header");

async function getData() {
    const data = await axios("/api/memes");
    const data_templates = await axios("/api/templates");
    console.log(data);
    console.log(data_templates);
    const memes = data.data;
    const templates = data_templates.data;
    console.log(memes);
    console.log(templates);
    for (const meme of memes) {
        const template = templates.find(
            (template) => template.name == meme.title,
        );
        console.log(template);

        memes_block.innerHTML += `
             <div class="meme_card">
        <div class="meme_image_wrapper">
            <img src="${template.imageBase64}" alt="${meme.title}" />
        </div>

        <div class="meme_content">
            <h3 class="meme_title">${meme.title}</h3>
            <p class="meme_response">${meme.response}</p>

            <div class="meme_footer">
                <span class="meme_category">${meme.category}</span>
                <span class="meme_likes">❤️ ${meme.likes}</span>
            </div>
        </div>
    </div>
    `;
    }
}

getData();

// const memeImages = {
//     "This is fine": "https://i.imgflip.com/26am.jpg",
//     "Works on my machine": "https://i.imgflip.com/1w7ygt.jpg",
//     "Friday deploy": "https://i.imgflip.com/30b1gx.jpg",
//     "Student mode": "https://i.imgflip.com/2fm6x.jpg",
// };

// input_file.addEventListener("change", async (e) => {
//     const currFiles = e.target.files;

//     if (currFiles.length > 0) {
//         let src = URL.createObjectURL(currFiles[0]);
//         const base64Img = await convertImg(currFiles[0]);
//         console.log(base64Img);

//         const template = {
//             name: "Student mode",
//             imageBase64: base64Img,
//             mimeType: "image/png",
//             width: 180,
//             height: 180,
//         };

//         try {
//             const response = await axios.post("/api/templates", template);
//             console.log(response);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// });

update_memes.addEventListener("click", () => {
    memes_block.innerHTML = ``;
    getData();
});

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

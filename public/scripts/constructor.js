import convertImg from "../utils/convert.js";

const choose_template_line = document.querySelector(".choose_template_line");
const card_img = document.querySelector(".meme_image_wrapper > img");
const meme_title = document.querySelector(".meme_title");
const meme_response = document.querySelector(".meme_response");
const meme_category = document.querySelector(".meme_category");

const post_btn = document.querySelector(".post");

async function getData(choice = "first") {
    choose_template_line.innerHTML = ``;
    const data_templates = await axios("/api/templates");
    const templates = data_templates.data;
    console.log(templates);
    for (const template of templates) {
        choose_template_line.innerHTML += `
             <div class="template_item" id="${template.name}">
        <div class="template_image_wrapper">
            <img src="${template.imageBase64}" alt="${template.name}" />
        </div>
    </div>
    `;
    }

    const items = document.querySelectorAll(
        ".choose_template_line .template_item",
    );
    console.log(items);
    if (choice === "first") {
        items[0].classList.add("active");
        meme_title.textContent = items[0].id;
    } else {
        items[items.length - 1].classList.add("active");
        meme_title.textContent = items[items.length - 1].id;
    }
    const item_img = document.querySelector(".active img");
    card_img.src = item_img.src;
}

getData();

document.addEventListener("click", (e) => {
    const item = e.target.closest(".template_item");
    if (!item) return;

    document
        .querySelectorAll(".template_item")
        .forEach((el) => el.classList.remove("active"));

    item.classList.add("active");
    const item_img = document.querySelector(".active img");
    card_img.src = item_img.src;

    meme_title.textContent = item.id;
});

let template = {
    name: "",
    imageBase64: "",
    mimeType: "image/png",
    width: 180,
    height: 180,
};

const template_name = document.querySelector(
    ".choose_template_user_name_input",
);

const template_text = document.querySelector(".choose_template_text_input");
const template_category = document.querySelector(
    ".choose_template_category_input",
);

// template_name.addEventListener("input", (e) => {
//     meme_title.textContent = e.target.value;
//     if (!e.target.value) {
//         meme_title.textContent = "Титул шаблону";
//     }
// });

template_text.addEventListener("input", (e) => {
    meme_response.textContent = e.target.value;
    if (!e.target.value) {
        meme_response.textContent = "Твоя ситуація";
    }
});

template_category.addEventListener("input", (e) => {
    meme_category.textContent = e.target.value;
    if (!e.target.value) {
        meme_category.textContent = "general";
    }
});

const input_file = document.querySelector(".file");
const btn_download = document.querySelector(".btn_download");

btn_download.addEventListener("click", async (e) => {
    const currFiles = input_file.files;
    if (!template_name.value) {
        template_name.style = `border-color: red;`;
        const currFiles = null;
    } else {
        template_name.style = `border-color: green;`;
        if (currFiles.length > 0) {
            let src = URL.createObjectURL(currFiles[0]);
            const base64Img = await convertImg(currFiles[0]);
            console.log(base64Img);

            template = {
                name: template_name.value,
                imageBase64: base64Img,
                mimeType: "image/png",
                width: 180,
                height: 180,
            };

            try {
                const response = await axios.post("/api/templates", template);
                console.log(response);
            } catch (e) {
                console.log(e);
            }

            getData("last");
        }
    }
});

post_btn.addEventListener("click", async () => {
    let meme = {
        title: meme_title.textContent,
        category: meme_category.textContent,
        response: meme_response.textContent,
        tags: [],
    };

    try {
        const response = await axios.post("/api/memes", meme);
        console.log(response);
    } catch (e) {
        console.log(e);
    }
});

import convertImg from "./utils/convert.js";

const memes_block = document.querySelector(".main_content_block");
const input_file = document.querySelector(".file");
const update_memes = document.querySelector(".update_memes");

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

const memeImages = {
    "This is fine": "https://i.imgflip.com/26am.jpg",
    "Works on my machine": "https://i.imgflip.com/1w7ygt.jpg",
    "Friday deploy": "https://i.imgflip.com/30b1gx.jpg",
    "Student mode": "https://i.imgflip.com/2fm6x.jpg",
};

input_file.addEventListener("change", async (e) => {
    const currFiles = e.target.files;

    if (currFiles.length > 0) {
        let src = URL.createObjectURL(currFiles[0]);
        const base64Img = await convertImg(currFiles[0]);
        console.log(base64Img);

        const template = {
            name: "Student mode",
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
    }
});

update_memes.addEventListener("click", () => {
    memes_block.innerHTML = ``;
    getData();
});

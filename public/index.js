const memes_block = document.querySelector(".main_content_block");

async function getData() {
    const data = await axios("/api/memes");
    console.log(data);
    const memes = data.data;
    console.log(memes);
    for (const meme of memes) {
        memes_block.innerHTML += `
        <div>${meme.title}</div>
    `;
    }
}

getData();

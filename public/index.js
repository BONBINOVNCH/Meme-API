async function getData() {
    const data = await axios("/api/memes");
    console.log(data);
}

getData();

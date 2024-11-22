const button_post = document.getElementById('button_post');

async function postDB() {
    await fetch("/api/compras", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({produto:"blusa", valor: 59.90})
    })
}
button_post.addEventListener("click", postDB)
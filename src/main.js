const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=6&";
const API_URL_FAVOTITES = "https://api.thecatapi.com/v1/favourites?api_key=live_KPguNHQSI7W6L4k0M3qarIaUnM9JaVkg7dpeudglO9t27Rfexxv9deGJvPtxJfdW";
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_KPguNHQSI7W6L4k0M3qarIaUnM9JaVkg7dpeudglO9t27Rfexxv9deGJvPtxJfdW`;
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichis(data[0].id);
    btn2.onclick = () => saveFavouriteMichis(data[1].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES);
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById("favoritesMichis")
    section.innerHTML=""
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis favoritos");
    h2.appendChild(h2Text);
    section.append(h2);

    data.forEach(michi => {
        const article = document.createElement("article")
        const img = document.createElement("img")
        const btn = document.createElement("button")
        const btnText = document.createTextNode("Sacar al michi de favoritos");

        img.src = michi.image.url;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavouriteMichis(michi.id)
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
    });
  }
}

async function saveFavouriteMichis(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("guardar michi en favoritos");
    loadFavouriteMichis();
  }
};

async function deleteFavouriteMichis(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("eliminar michi de favoritos");
    loadFavouriteMichis();
  }

}

async function upLoadMichiFoto() {
  const form = document.getElementById("up-loading-form")
  const formData = new FormData(form);

  console.log(formData.get("file"));

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "X-API-KEY": "api_key=live_KPguNHQSI7W6L4k0M3qarIaUnM9JaVkg7dpeudglO9t27Rfexxv9deGJvPtxJfdW",
    },
    body: formData,   
  })
}

loadRandomMichis();
loadFavouriteMichis();

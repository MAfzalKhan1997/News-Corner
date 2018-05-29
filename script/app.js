var apikey = "bfee90f3072f4738844fccfeedfb5b3e";
const main=document.querySelector("#div");
const selector =document.querySelector("#selector");
const defineDefault="the-washington-post";

window.addEventListener('load' , async e =>{
    updatenews();
    await updateSources()
    selector.value=defineDefault;

    selector.addEventListener('change', e =>{
        updatenews(e.target.value)
    })

    
})

async function updatenews(source = defineDefault) {
    let imagesArray = [];
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`);
    const json =await res.json();
    console.log(json);
    for (let key in json.articles){
        imagesArray.push(json.articles[key].urlToImage)
    }
    // console.log(imagesArray, "Images")

    var flag = 0;
    var timer;
    
    document.getElementById('img').style.backgroundImage = "url(" + imagesArray[0] +" )"
    function images(){
        if (flag === imagesArray.length) {
            flag = 0
            // console.log(flag)
            document.getElementById('img').style.backgroundImage = "url( "+ imagesArray[flag] + ")"
        }    
        else{
            document.getElementById('img').style.backgroundImage = "url( "+ imagesArray[flag] + ")";
            // console.log(flag)
        }
    }
    // }
    timer = setInterval(() => {
        flag++
        images()
    }, 3000)

    main.innerHTML=json.articles.map(createArticles).join('\n')
}

function createArticles(article){
    return `
    <div class="col-md-8 col-md-offset-2">
    <h2 class='h2'>${article.title}</h2>
    <img class="img-rounded" width='100%' src="${article.urlToImage}"/>
    <p class='h4'>${article.description}</p>
    </div>
    `
}

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json()
    console.log(json);

    selector.innerHTML = json.sources
        .map(src =>`<option value="${src.id}">${src.name}</option>`).join('\n')
} 
 
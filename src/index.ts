abstract class Movie {
    title: string;
    duration: number;
    url: string;

    constructor(title: string, duration: number, url: string) {
        this.title = title;
        this.duration = duration;
        this.url = url;
    }
}
class Series extends Movie {
    episodes: number;

    constructor(title: string, duration: number, url: string, episodes: number) {
        super(title, duration, url);
        this.episodes = episodes;
    }
}
const button = document.querySelector("#button") as HTMLButtonElement || null;
 
button.addEventListener("click", () => {
    // get inputs of the HTML
    const title = document.querySelector("#title") as HTMLInputElement || null;
    const duration = document.querySelector("#duration") as HTMLInputElement || null;
    const url = document.querySelector("#ulr") as HTMLInputElement || null;
    const episodes = document.querySelector("#episodes") as HTMLInputElement || null;
    // get values of the inputs 
    const titleValue = title.value;
    const durationValue = Number(duration.value);
    const urlValue = url.value;
    const episodesValue = Number(episodes.value);
    // validation 
    if(!titleValue || !durationValue || !urlValue || !episodesValue) {
       return alert("preencha os campos corretamente");
    }
    if(typeof(durationValue) && typeof(episodesValue) !== "number"){
        return alert("preencha os campos corretamente");
    }
    // create new movie
    const movie = new Series(titleValue, durationValue, urlValue, episodesValue);
    console.log(movie);
    createMovie(movie);
    saveMovie(movie);
});
type T = {
    title:string,
    duration:number,
    url:string,
    episodes:number,
};
//function save movie in LocalStorage;
function saveMovie(movie: T):void {
    const storieMovies = localStorage.getItem("movies");
    let movies:T[] = storieMovies ? JSON.parse(storieMovies): [];
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
    console.log("Filme Salvo")
}
//function show movies list;
window.onload = function showMovie(): void {
    let movies = localStorage.getItem("movies");
    
    if (movies !== null) {
        const moviesArray = JSON.parse(movies);
        const container = document.querySelector(".container") as HTMLDivElement || null;
        // Clear previous content in the container
        container.innerHTML = '';
        // Creating new elements for each movie
        moviesArray.map((movie: T, index: number) => {
            const div = document.createElement("div") as HTMLDivElement;
            const divContent = document.createElement("div") as HTMLDivElement;
            const img = document.createElement("img") as HTMLImageElement;
            const contentName = document.createElement("div") as HTMLDivElement;
            const h3 = document.createElement("h3") as HTMLElement;
            const remove = document.createElement("button") as HTMLButtonElement;
            const link = document.createElement("a") as HTMLAnchorElement;
            // Adding attributes and classes
            remove.textContent = "remover";
            link.href = "http://127.0.0.1:3000/src/pages/movie.html";
            link.id = "pageMovie"
            h3.textContent = movie.title;
            img.src = movie.url;
            img.alt = movie.title;
            div.classList.add("img");
            divContent.classList.add("content");
            contentName.classList.add("name");
            // Adding to parent component
            contentName.appendChild(h3);
            contentName.appendChild(remove);
            divContent.appendChild(contentName);
            divContent.appendChild(div);
            divContent.appendChild(contentName)
            link.appendChild(img);
            div.appendChild(link);
            container.appendChild(divContent);
            // function ramove item
            remove.addEventListener("click", () => {
                removeItem(index);
            });
            link.addEventListener("click", () => {
                window.location.href = "http://127.0.0.1:3000/src/pages/movie.html";
            })
        });
    } else {
        alert("Não há nenhum movie no localStorage!");
    }
}
//function create movie;
function createMovie(movie: T):void {
    const container = document.querySelector(".container") as HTMLDivElement || null;
    // creating news elements html
    const div = document.createElement("div") as HTMLDivElement;
    const divContent = document.createElement("div") as HTMLDivElement;
    const img = document.createElement("img") as HTMLImageElement;
    const h3 = document.createElement("h3") as HTMLElement;
    const remove = document.createElement("button") as HTMLButtonElement;
    const contentName = document.createElement("div") as HTMLDivElement;
    const link = document.createElement("a") as HTMLAnchorElement;
    // adding attributes and classes
    remove.textContent = "remover";
    link.href = "http://127.0.0.1:3000/src/pages/movie.html";
    link.id = "pageMovie"
    contentName.classList.add("name");
    h3.textContent = movie.title;
    img.src = movie.url;
    img.alt = movie.title;
    div.classList.add("img");
    divContent.classList.add("content");
    // adding to parent component
    divContent.appendChild(div);
    contentName.appendChild(h3);
    contentName.appendChild(remove);
    divContent.appendChild(contentName);
    link.appendChild(img);
    div.appendChild(link);
    container.appendChild(divContent);
};
//function remove movie;
function removeItem(index: number): void {
    let movies = localStorage.getItem("movies");

    if (movies !== null) {
        const moviesArray = JSON.parse(movies);
        moviesArray.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(moviesArray));
        location.reload();
    }
}
// function showMovie2 ():void {
//     let saveLocalStorage = localStorage.getItem("movies");
//     if(saveLocalStorage !== null) {
//         const object = JSON.parse(saveLocalStorage);
//         console.log(object);
//         object.map(item => {
//             // creating elements in html;
//             const container = document.querySelector(".movie") as HTMLDivElement || null;
//             const div = document.createElement("div") as HTMLDivElement;
//             const img = document.createElement("img") as HTMLImageElement;
//             const span = document.createElement("span") as HTMLSpanElement;
//             const h3 = document.createElement("h3") as HTMLElement;
//             //adding propeties 
//             div.classList.add("img");
//             img.src = item.url;
//             img.alt = item.title;
//             h3.textContent = item.title;
//             span.textContent = item.episodes;
//             //
//             div.appendChild(img);
//             div.appendChild(h3)
//             div.appendChild(span)
//             container.appendChild(div);
//         })

//     } else {
//         alert("Não há nenhum movie disponivel no localStorage!");
//     }
// };

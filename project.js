const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title")
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url")
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")

//uı OBJESİNİ BAŞLATMA 

const ui = new UI();

//tüm evetnleri yükleme 
//event denilen şey mesela üszerine mause gelince yapıalcak işlemi belli ediyorum 
const storage = new Storage();

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films)
    });

    cardBody.addEventListener("click", deleteFilm)
    clear.addEventListener("click", clearAllFilms);

}

function addFilm(e) {
    const title = titleElement.value; //burada değerini alıyorum
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") { //eğer boş varsa hata dönecek burada 
        ui.displayMessages("Tüm alanlaı doldurun...", "danger")
    } else {
        const newFilm = new Film(title, director, url)

        ui.addFilmToUI(newFilm); // Arayüze Filme Ekleme 
        storage.addFilmToStorage(newFilm); //storage a film ekleme 
        ui.displayMessages("Film başarı ile eklendi...", "success")
    }

    ui.clearInputs(titleElement, urlElement, directorElement); //b burada filmler eklendikten sonra inputlardaki yazılar da 
    //kalkmış oldu. bu işlemi sağlayan fonksiyonu ui da yazdım 


    e.preventDefault()
}

function deleteFilm(e) {
    // console.log(e.target);//nereye basarsam consola orası gelecek
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
    }
}

function clearAllFilms() {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}
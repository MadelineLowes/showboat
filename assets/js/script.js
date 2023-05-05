const API_KEY = "0LfuULGGR7AG1SuLfgpY4MyCQiLkyJALLnMyHEBA";
// SAVE THIS KEY! 0MKrwqaOXYN6JzTKlLZUg0qQEFEUYUmBtsxq1jEz

let loaderContainer = document.querySelector('.loader-container');
let modal = document.querySelector(".modal")
let movieModal = document.getElementById("list-modal");
let heartBtnHome = document.getElementById("heart-btn-home");
let weatherBtn = document.getElementById("wbtn");
let weatherbubble = document.querySelector('.weather');
let weatherClose = document.getElementById("closeWeather");
let weatherApiKey = "cd449ce8a0596130f95722331fe56ab4";

function closeModal() {
    modal.style.display = "none";
    hideLoading();
}

window.addEventListener('load', () => {
    loaderContainer.style.visibility = 'hidden';
});

const displayLoading = () => {
    loaderContainer.style.visibility = 'visible';
};

const hideLoading = () => {
    loaderContainer.style.visibility = 'hidden';
};

function fetchBySearchHome() {
    displayLoading()
    let searchValue = document.getElementById("search-text").value

    let searchBarLink = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${searchValue}`

    // then we'll fetch using the updated URL
    fetch(searchBarLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.title_results[0]) {
                modal.style.display = "block";
            } else {
                modal.style.display = "none";
            }
            let titleId = {
                id: data.title_results[0].id
            }
            localStorage.setItem("titleId", JSON.stringify(titleId));
            titleId = JSON.stringify(titleId.id);
            // then we fetch using the id
            idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;

            fetch(idSearchLink)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (i = 0; i < data.sources.length; i++) {
                        if (data.sources[i].type === "sub") {
                            let availableOn = (data.sources[i].name);
                            // create an object and store inside local storage
                            let searchedShow = {
                                title: data.title,
                                poster: data.poster,
                                genres: data.genre_names,
                                runtime: data.runtime_minutes,
                                releaseDate: data.release_date,
                                similarTitles: data.similar_titles,
                                userRating: data.user_rating,
                                criticScore: data.critic_score,
                                findOn: availableOn,
                                type: data.type,
                                webUrl: data.sources[i].web_url,
                            }
                            localStorage.setItem("searchedShow", JSON.stringify(searchedShow));
                            window.location.href = "./results.html";
                        } else {
                            modal.style.display = "block"
                        }
                    };
                });
        });
};

function fetchById() {
    let getTitleId = localStorage.getItem("titleId");
    parseTitleId = JSON.parse(getTitleId)
    let titleId = parseTitleId.id;

    // then we can fetch using the id
    idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.sources.length; i++) {
                if (data.sources[i].type === "sub") {
                    let availableOn = (data.sources[i].name);
                    // create an object and store inside local storage
                    let searchedShow = {
                        title: data.title,
                        poster: data.poster,
                        genres: data.genre_names,
                        runtime: data.runtime_minutes,
                        releaseDate: data.release_date,
                        similarTitles: data.similar_titles,
                        userRating: data.user_rating,
                        criticScore: data.critic_score,
                        findOn: availableOn,
                        type: data.type,
                        webUrl: data.sources[i].web_url
                    }
                    localStorage.setItem("searchedShow", JSON.stringify(searchedShow));
                    window.location.href = "./results.html";
                };
            };
        });
};

heartBtnHome.addEventListener("click", function (event) {
    event.preventDefault();
    const likedArray = localStorage.getItem("likedMovieArray");
    likedMovieList = JSON.parse(likedArray)
    if (likedMovieList.length > 0) {
        for (i = 0; i < likedMovieList.length; i++) {
            let movie = likedMovieList[i][0].name;
            let li = document.createElement("li");
            li.textContent = movie;
            li.onclick = function () {
                for (i = 0; i < likedMovieList.length; i++) {
                    if (movie === likedMovieList[i][0].name) {
                        let titleId = {
                            id: likedMovieList[i][0].id
                        }
                        localStorage.setItem("titleId", JSON.stringify(titleId));
                        fetchById();
                    }
                }
            }

            li.setAttribute("data-index", i);
            let button = document.createElement("button");
            button.textContent = "X";
            button.setAttribute('class', 'removeBtn')
            button.onclick = function () {
                document.getElementById("liked-list").removeChild(li);
                for (i = 0; i < likedMovieList.length; i++) {
                    if (movie === likedMovieList[i][0].name) {
                        const indexOfObject = i;
                        likedMovieList.splice(indexOfObject, 1);
                    }
                }

                localStorage.setItem("likedMovieArray", JSON.stringify(likedMovieList));
            }

            li.appendChild(button);
            document.getElementById("liked-list").appendChild(li);
            movieModal.style.display = "block";
        }
    }
});

window.addEventListener("click", function (event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
        let movieList = document.getElementById("liked-list");
        movieList.innerHTML = '';
    }
});
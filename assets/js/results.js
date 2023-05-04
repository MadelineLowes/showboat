const API_KEY = "0LfuULGGR7AG1SuLfgpY4MyCQiLkyJALLnMyHEBA";

let showTitle = document.getElementById("titleId");
let showPoster = document.getElementById("show-poster");
let showLink = document.getElementById("show-link");
let showGenres = document.getElementById("genresId");
let showDuration = document.getElementById("durationId");
let showReleaseDate = document.getElementById("releaseDateId");
let showSimilarTitles = document.getElementById("recommended");
let showUserRating = document.getElementById("userRatingId");
let showCriticScore = document.getElementById("criticsScoreId");
let showAvaileableOn = document.getElementById("availableOnId")
let showType = document.getElementById("typeId");
let similarTitle0 = document.getElementById("similarTitle0");
let similarTitle1 = document.getElementById("similarTitle1");
let similarTitle2 = document.getElementById("similarTitle2");
let similarTitle3 = document.getElementById("similarTitle3");
let heartBtnResults = document.getElementById("heart-btn-results");
let modal = document.querySelector(".modal");
let likedMovieArray = [];
const loaderContainer = document.querySelector('.loader-container');

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

function resultsPage() {
    // on load of second html, get object from local storage
    document.querySelector(".fa-heart").classList.add("fa-regular");
    document.querySelector(".fa-heart").classList.remove("fa-solid");
    const showDetails = localStorage.getItem("searchedShow");
    show = JSON.parse(showDetails)

    showTitle.textContent = "Title: " + (show.title);
    showAvaileableOn.textContent = "Available on: " + (show.findOn);
    showReleaseDate.textContent = "Release date: " + (show.releaseDate);
    showUserRating.textContent = "User Rating: " + (show.userRating);
    showCriticScore.textContent = "Critics Score: " + (show.criticScore);
    showDuration.textContent = "Duration: " + (show.runtime);
    showGenres.textContent = "Genre(s): " + (show.genres);
    showType.textContent = "Type: " + (show.type);
    showPoster.setAttribute('src', (show.poster));
    showLink.setAttribute('href', (show.webUrl));

    // fetch the IDs and use those IDs to get the poster
    idSearchLink0 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[0]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink0)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle0.setAttribute('src', (data.poster));
        });
    idSearchLink1 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[1]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink1)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle1.setAttribute('src', (data.poster));
        });
    idSearchLink2 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[2]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle2.setAttribute('src', (data.poster));
        });
    idSearchLink3 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[3]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink3)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle3.setAttribute('src', (data.poster));
        });
};

resultsPage();
hideLoading();

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
                    resultsPage();
                    hideLoading();
                };
            };
        });
};

function fetchBySearchResults() {
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
                modal.style.display = "block"
            } else {
                modal.style.display = "none";
                let titleId = {
                    id: data.title_results[0].id
                }
                localStorage.setItem("titleId", JSON.stringify(titleId));
                fetchById();
            }
        });
};

function storeId0() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    let titleId = {
        id: clickedId.similarTitles[0]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId1() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    let titleId = {
        id: clickedId.similarTitles[1]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId2() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    let titleId = {
        id: clickedId.similarTitles[2]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId3() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    let titleId = {
        id: clickedId.similarTitles[3]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

heartBtnResults.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".fa-heart").classList.add("fa-solid");
    document.querySelector(".fa-heart").classList.remove("fa-regular");
    const showDetails = localStorage.getItem("searchedShow");
    show = JSON.parse(showDetails)

    const currentId = localStorage.getItem("titleId");
    currentTitleId = JSON.parse(currentId)

    const likedArray = localStorage.getItem("likedMovieArray");
    likedMovieList = JSON.parse(likedArray);

    // checking if the movie is already in the liked list, so it isn't added twice
    var inArray = false;
    for (var i = 0; i < likedMovieList.length; i++) {
        if (currentTitleId.id === likedMovieList[i][0].id) {
            var inArray = true;
        }
    }

    if (inArray === false) {
        // so we just need to store titleName with the titleID
        let storeLikedMovie = [{
            name: show.title,
            id: currentTitleId.id
        }]
        likedMovieArray.push(storeLikedMovie);

        localStorage.setItem("likedMovieArray", JSON.stringify(likedMovieArray));
    }
    // }
    // for else {
    //         
    //     }


});

// on page load, likedMoviearray (local storage) gets pushed to empty array
function loadLikedList() {
    const likedArray = localStorage.getItem("likedMovieArray");
    likedMovieList = JSON.parse(likedArray);
    for (i = 0; i < likedMovieList.length; i++) {
        let storeLikedMovie = [{
            name: likedMovieList[i][0].name,
            id: likedMovieList[i][0].id
        }]
        likedMovieArray.push(storeLikedMovie);
    }

    for (var i = 0; i < likedMovieList.length; i++) {
        getId = localStorage.getItem("titleId");
        currentTitle = JSON.parse(getId)

        if (currentTitle.id === likedMovieList[i][0].id) {
            document.querySelector(".fa-heart").classList.add("fa-solid");
            document.querySelector(".fa-heart").classList.remove("fa-regular");
        }

    }


}


// on page load, if liked movie title is in likedmovielist array, then fill in heart
// heartBtnResults
// event.preventDefault();
// document.querySelector(".fa-heart").classList.add("fa-solid");
// document.querySelector(".fa-heart").classList.remove("fa-regular");
//  let storeLikedMovie = [{
//     name: show.title,
//     id: currentTitleId.id
// }]

loadLikedList();
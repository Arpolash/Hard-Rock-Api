
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-box input");
const searchResult = document.querySelector(".search-result");
const singleLyrics = document.querySelector(".single-lyrics");

searchButton.addEventListener("click", getSearchResult);

//search result form api
function getSearchResult() {
	const songTitle = searchInput.value;
	const API = `https://api.lyrics.ovh/suggest/${songTitle}`;
	if (songTitle) {
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				const apiData = data.data;
				const songsData = apiData.map((item) => item).slice(0, 10);
                console.log(songsData);
				if (!songsData.length) {
					searchResult.innerHTML = `<h3 class="text-center">Sorry! no songs found.</h3>`;
				} else {
					searchResult.innerHTML = "";
					songsData.map((item) => {
						searchResult.innerHTML += `
                        <!-- single result -->
                        <div class="single-result d-flex align-items-center justify-content-between my-3 p-3">
                            <div>
                                <h3 class="lyrics-name">
                                    <a href="${item.link}" target="_blank">${item.title}</a>
                                </h3>
                                <p class="author lead">${item.album.title} by <span style="font-style: italic;" >${item.artist.name}</span>
                                </p>
                            </div>
                            <div class="text-md-right text-center">
                                <button class="btn btn-success" onclick="songLyrics('${item.artist.name}', '${item.title}', '${item.title}', '${item.artist.name}')">Get Lyrics </button>
                            </div>
                        </div>
                        <!-- ./ single result -->
                        `;
					});
				}

				searchInput.value = "";
			});
	} else {
		alert("Please wirte a song name");
	}
}

//song lyrics
function songLyrics(artist, title, songTitle, artistName) {
	const API = `https://api.lyrics.ovh/v1/${artist}/${title}`;

	fetch(API)
		.then((res) => res.json())
		.then((data) => {
			singleLyrics.innerHTML = `
			<button class="btn back" onclick="Back()">back</button>
                <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
                <pre class="lyric text-white">${
					!data.lyrics ? data.error : data.lyrics
				}</pre>
				
            `;
			searchResult.style.display = "none";
		});
}

//back button
function Back() {
	searchResult.style.display = "block";
	singleLyrics.innerHTML = "";
}

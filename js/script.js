//API.key: 31a356ab418ba2338f504ff73df86cf3
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
const amountOption = document.querySelector('#amount');
const sizeOption = document.querySelector('#size');
const searchPic = document.querySelector('#searchPic');
const formSubmit = document.querySelector('#searchButton');
const displayResult = document.querySelector('#displayResult');
const sortOptions = document.querySelector('#sort');
const searchBy = document.querySelector('#searchBy');
let sizeSuffix;

//_____________Skapa Element___________________________________________________________    
for (let i = 1; i <= 10; i++) {
    elementCreate(amountOption, 'option', i);
}

function elementCreate(addTo, element, text, src, id) {
    let added = document.createElement(element);
    addTo.append(added);
    added.innerText = text;
    added.src = src;
    added.id = id;
}
//________________Hämta Input___________________________________
formSubmit.addEventListener('click', getUserInput);

function getUserInput(event) {
    event.preventDefault();

    if (searchPic.value == '') {
        searchPic.value = 'random';
    }

    displayResult.innerHTML = '';
    imgGetter(searchPic.value, amountOption.value, sizeOption.value, sortOptions.value, searchBy.value);
}
//____________Hämta URL o Skapa IMG___________________________________________
function imgGetter(searchInput, amountChoosen, sizeInput, sortOptions, searchBy) {

    const callUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=31a356ab418ba2338f504ff73df86cf3&${searchBy}=${searchInput}&sort=${sortOptions}&per_page=${amountChoosen}&format=json&nojsoncallback=1`;
    
    fetch(callUrl).then(response => {

        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error('Fetch failed');
        }
    })
        .then(data => {

            const dataArr = data.photos.photo;
            
            if (dataArr.length == 0) {
                elementCreate(displayResult, 'h1', 'No matches found!', '', 'errorMessage');                
            }

            for (let i = 0; i < dataArr.length; i++) {
                let imgUrl = `https://live.staticflickr.com/${dataArr[i].server}/${dataArr[i].id}_${dataArr[i].secret}_${sizeInput}.jpg`;
                elementCreate(displayResult, 'a', '', '');
                let aTag = document.querySelectorAll('a')[i];
                aTag.href = imgUrl;
                elementCreate(aTag, 'img', '', imgUrl);
            }
        })
        .catch(
            function (error) {
                elementCreate(displayResult, 'h1', 'Oopsie!!... Something went wrong!', '', 'errorMessage');
                console.log(error)
            }
        );
}


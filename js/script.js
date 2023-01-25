//API.key: 31a356ab418ba2338f504ff73df86cf3
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

const amountOption = document.querySelector('#amount');
const sizeOption = document.querySelector('#size');
const searchPic = document.querySelector('#searchPic');
const formSubmit = document.querySelector('form #button');
const displayResult = document.querySelector('#displayResult');
//_____________Skapa Element___________________________________________________________    
for (let i = 1; i <= 10; i++) {
    elementCreate(amountOption, 'option', i);
}

for (let i = 0; i <= 2; i++) {
    const sizes = ['Small', 'Medium', 'Large'];
    elementCreate(sizeOption, 'option', sizes[i]);
}

function elementCreate(addTo, element, text, src) {
    let added = document.createElement(element);
    addTo.append(added);
    added.innerText = text;
    added.src = src;
}

//________________Hämta Input___________________________________
formSubmit.addEventListener('click', getUserInput);

function getUserInput(event) {
    event.preventDefault();

    displayResult.innerHTML = '';
    urlTest(searchPic.value, amountOption.value, sizeOption.value);
}

//____________Hämta URL o Skapa IMG___________________________________________
function urlTest(searchInput, amountChoosen, sizeInput) {
    const callUrl = ` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=31a356ab418ba2338f504ff73df86cf3&text=${searchInput}&per_page=${amountChoosen}&format=json&nojsoncallback=1`;
    let sizeSuffix = '';

    switch (sizeInput) {
        case 'Small': sizeSuffix = 'w';
            break;
        case 'Medium': sizeSuffix = 'z';
            break;
        case 'Large': sizeSuffix = 'b';
            break;
    }

    fetch(callUrl).then(response => {
        return response.json();
    })
        .then(data => {

            let dataArr = data.photos.photo;

            for (let i = 0; i < dataArr.length; i++) {
                let serverId = data.photos.photo[i].server;
                let id = data.photos.photo[i].id;
                let secret = data.photos.photo[i].secret;

                let imgUrl = `https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg`

                elementCreate(displayResult, 'img', '', imgUrl)
            }
        });
}


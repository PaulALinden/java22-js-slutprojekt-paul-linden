//API.key: 31a356ab418ba2338f504ff73df86cf3
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
const amountOption = document.querySelector('#amount');
const sizeOption = document.querySelector('#size');
const searchPic = document.querySelector('#searchPic');
const formSubmit = document.querySelector('form #button');
const displayResult = document.querySelector('#displayResult');
const sortOptions = document.querySelector('#sort');
const sizes = ['Small', 'Medium', 'Large'];
const sort = ['relevance', 'interestingness', 'date-posted'];
let sorter;
let sizeSuffix;

//_____________Skapa Element___________________________________________________________    
for (let i = 1; i <= 10; i++) {
    elementCreate(amountOption, 'option', i);
}

for (let i = 0; i <= 2; i++) {
    elementCreate(sizeOption, 'option', sizes[i]);
    elementCreate(sortOptions, 'option', sort[i]);
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
    imgGetter(searchPic.value, amountOption.value, sizeOption.value, sortOptions.value);
}
//____________Hämta URL o Skapa IMG___________________________________________
function imgGetter(searchInput, amountChoosen, sizeInput, sortOptions) {

    const sortArr = ['relevance', 'interestingness', 'date-posted-desc'];
    const prov = switcher(sortOptions, sort, sorter, sortArr);
    const callUrl = ` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=31a356ab418ba2338f504ff73df86cf3&tags=${searchInput}&sort=${prov}&per_page=${amountChoosen}&format=json&nojsoncallback=1`;
    
    fetch(callUrl).then(response => {

        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error('Fetch failed');
        }
    })
        .then(data => {

            const suffixArr = ['w', 'z', 'b']
            let choosenSize = switcher(sizeInput, sizes, sizeSuffix, suffixArr);
            const dataArr = data.photos.photo;
            
            if (dataArr.length == 0) {
                elementCreate(displayResult, 'h1', 'No matches found!', '', 'errorMessage');                
            }

            for (let i = 0; i < dataArr.length; i++) {
                let imgUrl = `https://live.staticflickr.com/${dataArr[i].server}/${dataArr[i].id}_${dataArr[i].secret}_${choosenSize}.jpg`;
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
function switcher(expression, caseParameter, returnVariable, addVariable) {

    switch (expression) {
        case caseParameter[0]: returnVariable = addVariable[0];
            return returnVariable
        case caseParameter[1]: returnVariable = addVariable[1];
            return returnVariable
        case caseParameter[2]: returnVariable = addVariable[2];
            return returnVariable
    }
}

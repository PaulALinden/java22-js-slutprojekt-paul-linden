// DOM-Elements
const selectAmount = document.querySelector('#amount');
const selectSize = document.querySelector('#size');
const inputSearchPic = document.querySelector('#searchPic');
const inputSubmitForm = document.querySelector('#searchSubmit');
const containerDisplayImage = document.querySelector('#displayImage');
const selectSort = document.querySelector('#sort');
const selectSearchBy = document.querySelector('#searchBy');


// Create options for amount   
for (let i = 1; i <= 10; i++) {
    createElement(selectAmount, 'option', i);
}

// Function for creating Elements
function createElement(addTo, element, text, src, id) {
    let newElement = document.createElement(element);
    addTo.append(newElement);
    newElement.innerText = text;
    newElement.src = src;
    newElement.id = id;
}

// EventListner for searchForm
inputSubmitForm.addEventListener('click', getUserInput);

//Function to get user input from searchForm
function getUserInput(event) {
    event.preventDefault();

    if (inputSearchPic.value == '') {
        inputSearchPic.value = 'random';
    }

    containerDisplayImage.innerHTML = '';
    imgGetAndDisplay(inputSearchPic.value, selectAmount.value, selectSize.value, selectSort.value, selectSearchBy.value);
}

//Function for calling API and display searched images
function imgGetAndDisplay(searchInput, amountChoosen, sizeChoosen, sortChoosen, searchByChoosen) {

    const callUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=31a356ab418ba2338f504ff73df86cf3&${searchByChoosen}=${searchInput}&sort=${sortChoosen}&per_page=${amountChoosen}&format=json&nojsoncallback=1`;
    
    fetch(callUrl).then(response => {

        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error('Fetch failed');
        }
    })
        .then(data => {

            const dataReturned = data.photos.photo;
            
            console.log(dataReturned);

            if (dataReturned.length == 0) {
                createElement(containerDisplayImage, 'h1', 'No matches found!', '', 'errorMessage');                
            }

            for (let i = 0; i < dataReturned.length; i++) {
                let imgUrl = `https://live.staticflickr.com/${dataReturned[i].server}/${dataReturned[i].id}_${dataReturned[i].secret}_${sizeChoosen}.jpg`;
                createElement(containerDisplayImage, 'a', '', '');
                let aTag = document.querySelectorAll('a')[i];
                aTag.href = imgUrl;
                createElement(aTag, 'img', '', imgUrl);
            }
        })
        .catch(
            function (error) {
                createElement(containerDisplayImage, 'h1', 'Oopsie!!... Something went wrong!', '', 'errorMessage');
                console.log(error)
            }
        );
}


var gobackBtn = document.querySelector(".goback")
var cardsContainer = document.querySelector(".cards-container")
var searchTitle = document.querySelector(".card-title")
var searchBtn = document.querySelector(".searchBtn")



gobackBtn.addEventListener("click", ()=>{
    window.location.assign("index.html")
})

async function getLibraryInfo(what,how = "") {
    if (how == "") {
        var link = "https://www.loc.gov/search/?q=" + what + "&fo=json";
    }else{
        var link = "https://www.loc.gov/" + how + "/?q=" + what + "&fo=json";
    }

	let libraryInfo = await fetch(link);
	let libraryText = await libraryInfo.text();
    let libraryJSON = JSON.parse(libraryText)
    for (i = 0; i < libraryJSON.results.length; i++) {

        ///////////////////// TILE ////////////////////////////////////
        if (libraryJSON.results[i].hasOwnProperty("title")) {
            var libraryTitle = libraryJSON.results[i].title;
        }else{
            var libraryTitle = "";
        }
        ////////////////////// DATE ///////////////////////////////////
        if (libraryJSON.results[i].hasOwnProperty("date")) {
            var libraryDate = libraryJSON.results[i].date;
        }else{
            var libraryDate = "";
        }
        //////////////////////// Subject /////////////////////////////////
        if (libraryJSON.results[i].hasOwnProperty("subject")) {
            var librarySubject = libraryJSON.results[i].subject;
        }else{
            var librarySubject = "";
        }
        ///////////////////// Description ////////////////////////////////////
        if (libraryJSON.results[i].hasOwnProperty("description")) {
            var libraryDescription = libraryJSON.results[i].description[0];
        }else{
            var libraryDescription = "";
        }
        ///////////////////// Id ////////////////////////////////////
        if (libraryJSON.results[i].hasOwnProperty("id")) {
            var libraryId = libraryJSON.results[i].id;
        }else{
            var libraryId = "";
        }

        

        createNewCard(libraryTitle,libraryDate,librarySubject,libraryDescription,libraryId)
    }
}

function createNewCard(title,date,subjects,description,id) {
    
    var newCard = document.createElement("div")
    newCard.setAttribute("class","card p-3 m-3")

    var newTitle = document.createElement("h2");
    newTitle.textContent = title;

    var newDate = document.createElement("p");
    newDate.textContent = date;
    var newDateTitle = document.createElement("span");
    newDateTitle.textContent = "Date: ";
    
    var newSubject = document.createElement("p");
    newSubject.textContent = subjects;
    var newSubjectTitle = document.createElement("span");
    newSubjectTitle.textContent = "Subject: ";

    var newDescription = document.createElement("p");
    newDescription.textContent = description;
    var newDescriptionTitle = document.createElement("span");
    newDescriptionTitle.textContent = "Description: ";

    var newButton = document.createElement("button")
    newButton.textContent = "Read More";
    newButton.setAttribute("class","btn btn-dark my-2 readMore")
    newButton.addEventListener("click",()=>{
        window.location.assign(id)
    })

    newDate.prepend(newDateTitle);
    newSubject.prepend(newSubjectTitle);
    newDescription.prepend(newDescriptionTitle);

    newCard.appendChild(newTitle);
    newCard.appendChild(newDate);
    newCard.appendChild(newSubject);
    newCard.appendChild(newDescription);
    newCard.appendChild(newButton);

    cardsContainer.appendChild(newCard);

    // Result
    // <div class="card p-3 m-3">
    //     <h2> Title </h2>
    //     <p><span>Date: </span>1966</p>
    //     <p><span>Subject: </span>Math</p>
    //     <p><span>Description: </span>Some description</p>
    //     <button type="button" class="btn btn-dark my-2 readMore"> Read More </button>
    // </div>
}

function setTitle(searched) {
    searchTitle.textContent = "Showing results for " + searched;
}



if(window.location.href.search("=")>0){
    var startQ = window.location.href.search("=")+1;
    var endQ = window.location.href.search("&");
    var startFormat =  endQ + 8;
    var endFormat = window.location.href.length;

    var q  = window.location.href.substring(startQ,endQ)
    var format  = window.location.href.substring(startFormat,endFormat)

    setTitle(q);

    getLibraryInfo(q,format)  
}
const gitHubAPI = "https://api.github.com";
const paginationCall = "https://api.github.com/search/users";

// function listenForReload(){
//     let mirrorNum = localStorage.getItem("page");
//     if(location.reload() == true){
//         if(mirrorNum != 1){
//             localStorage.clear();
//             // localStorage.setItem("page", 1);
//         }
//     }
//     // window.localStorage.clear();
// }
// $(listenForReload);
let currentPageNum = 1;

function searchUser(searchInput, callback){
    let pageLocation = localStorage.getItem("page");
    console.log("Current Page Number: " + pageLocation);
    const query = {
        q: `${searchInput} in:name`,
        page: pageLocation,
        per_page: 20
    }
    $.getJSON(paginationCall, query, callback);
    // console.log("Test callback: " + JSON.stringify());
}
function renderTheListOfResults(result){
    return `
        <div class="resultBox">
            <a href="${result.html_url}">
                <div class="userAvatarPic">
                    <img src="${result.avatar_url}">
                </div>
                <p class="resultUserName">${result.login}</p>
            </a>
        </div>
    `;
}
// function resultsCount(data){
//     const totalCount = data;
//     console.log(totalCount);
// }
// $(resultsCount);

function displaySearchData(data){
    const searchCount = data.total_count;
    console.log(searchCount);
    $(".theCount").html(searchCount);
    const results = data.items.map((item, index) => renderTheListOfResults(item));
    $("#resultsArea").html(results);
}
// function turnOnButtons(){
//     const arrows = document.getElementsByClassName("pageButton");
//     arrows.style.visibility = "hidden";
// }

function listenToSubmit(){
    $("#searchForm").submit(function(e){
        e.preventDefault();
        localStorage.clear();
        let valueInput = $(".formText").val();
        console.log("Value: " + valueInput);
        localStorage.setItem("searchInput", valueInput);
        searchUser(valueInput, displaySearchData);
        // turnOnButtons();
    });
}

// function previousPage(){
//     $(".previous").click(function(){
//         console.log("The previous button has been clicked");
//     });
// }
// let currentPageNum = 1;


$(".previous").click(function(){
    console.log("The previous button has been clicked");
    if(currentPageNum > 1){
        currentPageNum--;
    }
    console.log("Minus one = " + currentPageNum);
    localStorage.setItem("page", currentPageNum);
    let currentInput = localStorage.getItem("searchInput");
    console.log("Testing: " + currentInput);
    searchUser(currentInput, displaySearchData);
    $(".pageNumber").html(currentPageNum);
});

$(".next").click(function(){
    console.log("The next button has been clicked");
    currentPageNum++;
    console.log("Added one = " + currentPageNum);
    localStorage.setItem("page", currentPageNum);
    let currentInput = localStorage.getItem("searchInput");
    console.log("Testing: " + currentInput);
    searchUser(currentInput, displaySearchData);
    $(".pageNumber").html(currentPageNum);
});

// function nextPage(){
//     $(".next").click(function(){
//         console.log("The next button has been clicked");
//     });
// }

// $(previousPage);
// $(nextPage);




$(listenToSubmit);
// $(listenForReload);

// SearchUser();


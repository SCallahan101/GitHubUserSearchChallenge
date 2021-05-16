const gitHubAPI = "https://api.github.com";
const paginationCall = "https://api.github.com/search/users";

// function searchUser, renderTheListOfResults, displaySearchData, and listenToSubmit were the same basic setup that I had from my bootcamp and it fits plenty enough but not exact code by code...Not much differently away from my original plan. The rest was on my own. As you can see, I tried to incorporate a second GitHub URL on followers. I left my failed attempts down below here for you to see my work. Basically, I want to cut around the corner by incorporate the second .getJSON to add into the .html profile after counting the number of followers. I struck out...maybe due to my lack of experiences on quick around on this tricky combination.


let currentPageNum = 1;

function searchUser(searchInput, callback){
    let pageLocation = localStorage.getItem("page");
    console.log("Current Page Number: " + pageLocation);
    const query = {
        q: `${searchInput}`,
        page: pageLocation,
        per_page: 20
    }
    $.getJSON(paginationCall, query, callback);
}
//First attempt to send out the count of followers.
// function countFollowers(username){
//     console.log("Checking the username: " + username);
//     let completedUrl = `https://api.github.com/users/${username}/followers`;
//     let countTheFollowers;
//     $.getJSON(completedUrl, function(num){
//         console.log("Number: " + num.length);
//         countTheFollowers = num.length;
//     });
//     console.log(countTheFollowers + " within the variable");
        // console.log("Follower(s): " + data.length);
        // countTheFollowers = data.length;
        // localStorage.setItem("numFollowers", countTheFollowers);
        // return countTheFollowers;
        // });
        // function callbackNum(data){
        //     console.log("Follower(s): " + data.length);
        //     let countTheFollowers = data.length;
        //     let stringTheCount = String(countTheFollowers);
        //     console.log("string? " + stringTheCount);
        //     localStorage.setItem("numFollowers", stringTheCount);
        //     return stringTheCount;
        // }

        // localStorage.setItem("numFollowers", countTheFollowers);
    // let followers = 0;
    // for(let i = 0; i < callback.length; i++){
        
    // }

    // };
    // let followers = localStorage.getItem("numFollowers");
    // console.log("Check the number: " + followers);

function renderTheListOfResults(result){
    //First attempt to bring in count of followers
    // countFollowers(result.login);
    //Second attempt to enact the count of followers.
    // let username = result.login;
    // let urlForFollowersCount = `https://api.github.com/users/${username}/followers`;
    // // let countTheFollowers;
    //     $.getJSON(urlForFollowersCount, function(num){
    //         console.log("Number: " + num.length);
    //         let numData = num.length;
    //         dataReady(numData);
    //         // countTheFollowers = num.length;
    //         // dataReady();
    //     });
    // function dataReady(data){
    //     console.log("Final? " + data);
    //     // countTheFollowers = data;
    //     // return countTheFollowers;
    // }
    // console.log("post-retrieve test: " + countTheFollowers);
    // let followers = localStorage.getItem("numFollowers");
    // console.log("Check the number: " + followers);
    //Take out tag out of below here to prevent error. 
    // <p class="followersCount">Follower(s): ${countTheFollowers}</p>
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

function displaySearchData(data){
    const searchCount = data.total_count;
    console.log(searchCount);
    $(".theCount").html(searchCount);
    const results = data.items.map((item) => renderTheListOfResults(item));
    $("#resultsArea").html(results);
}

function listenToSubmit(){
    $("#searchForm").submit(function(e){
        e.preventDefault();
        localStorage.clear();
        let theBottomBox = document.getElementById("resultsContainer");
        theBottomBox.style.display = "initial";
        let valueInput = $(".formText").val();
        console.log("Value: " + valueInput);
        localStorage.setItem("searchInput", valueInput);
        searchUser(valueInput, displaySearchData);
    });
}

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

$(listenToSubmit);


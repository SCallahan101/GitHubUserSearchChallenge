const gitHubAPI = "https://api.github.com";
const paginationCall = "https://api.github.com/search/repositories";

function SearchUser(searchInput, callback){
    const query = {
        q: `${searchInput} in:name`,
        per_page: 20
    }
    $.getJSON(paginationCall, query, callback);
    console.log("Test callback: " + JSON.stringify(callback));
}

$("#searchForm").submit(function(e){
    e.preventDefault();
    let valueInput = $(".formText").val();
    console.log("Value: " + valueInput);
    SearchUser(valueInput);
})
// SearchUser();


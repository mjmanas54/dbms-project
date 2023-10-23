const navbar = document.querySelector('#navBar');
const content = document.querySelector('#content-id');
const t = navbar.offsetTop;

function stickynavbar() {
    if (window.scrollY >= t) {
        navbar.classList.add('sticky');
        content.classList.add('content-class');
    } else {
        navbar.classList.remove('sticky');
        content.classList.remove('content-class');
    }
}
window.addEventListener('scroll', stickynavbar);

const search=()=>{
    const searchElement = document.getElementById("search-input");
    const restaurants = document.getElementById("restaurants");
    const items = document.getElementById("items");
    const searchResults = document.getElementById("search-result");
    const city = document.getElementById("city");
    const selectedText = city.value;
    let query = searchElement.value;
    query += "_";
    query += selectedText;
    let val1 = false;
    let val2 = false;
    if(query[0]=='_') {
        searchResults.classList.remove("show");
    }else{
        let url = `http://localhost:8090/search/${query}`;

        fetch(url)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                let text = `<div class="list-group">`;
                if(data.length===0){
                    val1 = true;
                }
                data.forEach((restaurant)=>{
                    text += `<a href="#" class="list-group-item list-group-action">${restaurant.restaurantName}`;
                })
                text += `</div>`;
                restaurants.innerHTML = text;

            })
        let itemurl = `http://localhost:8090/searchItem/${query}`;
        fetch(itemurl)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                let text = `<div class="list-group">`;
                if(data.length===0){
                    val2 = true;
                }
                data.forEach((items)=>{
                    text += `<a href="#" class="list-group-item list-group-action">${items.itemName}`;
                })
                text += `</div>`;
                items.innerHTML = text;

            })
        searchResults.classList.add("show");
    }
}

console.log("working");

//hidding img
const rs = document.querySelector('#RS-img'); 
function hideImage() {
    rs.style.display = 'none';
}

//Btn to alternate
const titleDiv = document.getElementById('title');
const title = titleDiv.querySelector('h2');
const homeBtn = document.getElementById('button1');
homeBtn.addEventListener('click', home);
const mealList = document.getElementById('section-center');
const lunchBtn = document.getElementById('button2');
lunchBtn.addEventListener('click', () => {
    hideImage();
    getLunchList();
});

const dinnerBtn = document.getElementById('button3');
dinnerBtn.addEventListener('click', () => {
    hideImage();
    getDinnerList();
});

const dessertBtn = document.getElementById('button4');
dessertBtn.addEventListener('click', () => {
    hideImage(); 
    getDessertList();
});

let prices = ["8.99","9.5","10.99","7","5.89"]; // Array to store prices
let priceIndex = 0; // Counter to keep track of the current index

function home(){
    title.innerText = "Cheap Eats";
    rs.style.display = 'block';
    mealList.innerHTML ='' // Clear any exisiting content
}

function getLunchList(){
    title.innerText = "Lunch Menu";
    title.classList.add('menu-name');
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
    .then(response => response.json())
    .then(data => {
        displayMeal(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function getDinnerList(){
    title.innerText = "Dinner Menu";
    title.classList.add('menu-name');
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(response => response.json())
    .then(data => {
        displayMeal(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function getDessertList(){
    title.innerText = "Snack Menu";
    title.classList.add('menu-name');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        displayMeal(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}


function displayMeal(meals){
    mealList.innerHTML ='' // Clear any exisiting content
    meals.forEach(meal => {
        const menuItem = document.createElement('article');
        menuItem.id = 'mean-items';

        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.className = 'photo';
        img.alt = meal.strMeal;

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        const sameLine = document.createElement('header');
        sameLine.className = 'same-line';

        const mealName = document.createElement('h4');
        mealName.textContent = meal.strMeal;

        const price = document.createElement('h4');
        price.className = 'price';
        price.textContent = `$${prices[priceIndex]}`; // Use the current price from the array
        // Increment the priceIndex and reset if it reaches the end of the array
        priceIndex = (priceIndex + 1) % prices.length;

        const itemText = document.createElement('p');
        itemText.className = 'item-text';
        itemText.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ducimus magnam dignissimos architecto aperiam atque, cupiditate iste totam, accusantium labore facilis pariatur sunt repudiandae eaque, dicta itaque et quas corrupti?';

        sameLine.appendChild(mealName);
        sameLine.appendChild(price);
        itemInfo.appendChild(sameLine);
        itemInfo.appendChild(itemText);
        menuItem.appendChild(img);
        menuItem.appendChild(itemInfo);
        mealList.appendChild(menuItem);
    });
}


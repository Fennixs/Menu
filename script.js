console.log("testing"); // checking if js is going through

const text = document.querySelector("#text");
const egg = document.querySelector("#mid-home-img-egg");
const infoBtn = document.querySelector(".info-btn");
const infoBtn1 = document.querySelector(".facts-btn");
const infoBtn2 = document.querySelector(".about-btn");
const card = document.querySelector(".card");
const mediaQuery = window.matchMedia("(max-width: 768px)");

// Function to update display properties based on media query
function updateDisplay() {
  if (mediaQuery.matches) {
    // Media query is active
    egg.style.display = "none";
    infoBtn.style.display = "none";
    infoBtn1.style.display = "none";
    infoBtn2.style.display = "none";
    card.style.display = "block";
  } else {
    // Media query is not active
    egg.style.display = "block";
    infoBtn.style.display = "block";
    infoBtn1.style.display = "block";
    infoBtn2.style.display = "block";
    card.style.display = "none";
  }
}

// Initial check
updateDisplay();

// Add an event listener to handle changes in the media query
mediaQuery.addEventListener("change", updateDisplay);

// btn on img in homepage
document
  .querySelectorAll(".about-btn, .info-btn, .facts-btn")
  .forEach((btn) => {
    btn.addEventListener("mouseover", (event) => {
      const overlay = document.querySelector(".overlay");
      const text = document.querySelector("#text");

      if (event.target.classList.contains("about-btn")) {
        text.innerText =
          "Welcome to Cheap Food, where deliciousness meets affordability!\n\n 🍔🍕🍣 At Cheap Food, we believe that everyone deserves to enjoy mouth-watering meals without breaking the bank. Our mission is to provide high-quality, tasty dishes at unbeatable prices.\n\n From savory burgers and crispy fries to fresh sushi and hearty pasta, our diverse menu has something for everyone. Founded in 2024, Cheap Food was born out of a passion for great food and a desire to make dining out accessible to all. Our team of talented chefs uses only the freshest ingredients to craft each dish with love and care. Whether you are grabbing a quick bite on the go or enjoying a leisurely meal with friends and family, we strive to make every visit a delightful experience. Join us at Cheap Food and discover why we are the go-to spot for affordable, delicious dining. We can not wait to serve you!";
      } else if (event.target.classList.contains("info-btn")) {
        text.innerText =
          "Monday - Friday: \n" +
          "Breakfast: 7:00 AM - 10:30 AM \n" +
          "Lunch: 11:30 AM - 2:30 PM \n" +
          "Dinner: 5:00 PM - 10:00 PM \n" +
          "Saturday: closed \n\n" +
          "Brunch: 8:00 AM - 2:00 PM \n" +
          "Dinner: 5:00 PM - 11:00 PM \n" +
          "Sunday: closed \n\n" +
          "Happy Hour: Monday - Friday, 4:00 PM - 6:00 PM \n" +
          "Live Music: Friday and Saturday, 7:00 PM - 10:00 PM \n";
      } else if (event.target.classList.contains("facts-btn")) {
        text.innerText =
          "Fun Facts About Cheap Eats \n\n" +
          "1. Worlds Largest Burger: Cheap Eats once served a burger so large that it took 10 people to finish it!\n\n " +
          "2. Secret Ingredient: The secret ingredient in their famous sauce is a rare herb that only grows in the owners backyard.\n\n " +
          "3. Celebrity Chef: The head chef at Cheap Eats is rumored to have cooked for royalty and rock stars.\n\n " +
          "4. Mystery Dish: Every Friday, they serve a mystery dish that changes every week and has never been repeated.\n\n " +
          "5. 24-Hour Challenge: They have a 24-hour eating challenge where you can eat as much as you want for a whole day for just $50.\n\n\n " +
          "Disclaimer: This is a demo site and all facts are fictional. ";
      }

      overlay.style.width = "40%";
    });

    btn.addEventListener("mouseout", () => {
      document.querySelector(".overlay").style.width = "0";
    });
  });

function hideImage() {
  egg.style.display = "none";
  card.style.display = "none";
  infoBtn.style.display = "none";
  infoBtn1.style.display = "none";
  infoBtn2.style.display = "none";
}

//Btn to alternate to differnt meals
const titleDiv = document.getElementById("title");
const title = titleDiv.querySelector("h2");
const homeBtn = document.getElementById("button1");
homeBtn.addEventListener("click", home);
const mealList = document.getElementById("section-center");
const lunchBtn = document.getElementById("button2");
lunchBtn.addEventListener("click", () => {
  hideImage();
  getLunchList();
});

const dinnerBtn = document.getElementById("button3");
dinnerBtn.addEventListener("click", () => {
  document.querySelector(".home-cover").classList.add("hidden");
  hideImage();
  getDinnerList();
});

const dessertBtn = document.getElementById("button4");
dessertBtn.addEventListener("click", () => {
  hideImage();
  getDessertList();
});

let prices = ["8.99", "9.5", "10.99", "7", "5.89"]; // Array to store prices
let priceIndex = 0; // Counter to keep track of the current index

function home() {
  title.innerText = "Cheap Eats";
  updateDisplay();
  mealList.innerHTML = ""; // Clear any exisiting content
}

function getLunchList() {
  title.innerText = "Lunch Menu";
  title.classList.add("menu-name");
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast")
    .then((response) => response.json())
    .then((data) => {
      displayMeal(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getDinnerList() {
  title.innerText = "Dinner Menu";
  title.classList.add("menu-name");
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
    .then((response) => response.json())
    .then((data) => {
      displayMeal(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getDessertList() {
  title.innerText = "Snack Menu";
  title.classList.add("menu-name");
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    .then((response) => response.json())
    .then((data) => {
      displayMeal(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMeal(meals) {
  mealList.innerHTML = ""; // Clear any exisiting content
  meals.forEach((meal) => {
    const menuItem = document.createElement("article");
    menuItem.id = "mean-items";

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.className = "photo";
    img.alt = meal.strMeal;

    const itemInfo = document.createElement("div");
    itemInfo.className = "item-info";

    const sameLine = document.createElement("header");
    sameLine.className = "same-line";

    const mealName = document.createElement("h4");
    mealName.textContent = meal.strMeal;

    const price = document.createElement("h4");
    price.className = "price";
    price.textContent = `$${prices[priceIndex]}`; // Use the current price from the array
    // Increment the priceIndex and reset if it reaches the end of the array
    priceIndex = (priceIndex + 1) % prices.length;

    const itemText = document.createElement("p");
    itemText.className = "item-text";
    itemText.textContent =
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ducimus magnam dignissimos architecto aperiam atque, cupiditate iste totam, accusantium labore facilis pariatur sunt repudiandae eaque, dicta itaque et quas corrupti?";

    sameLine.appendChild(mealName);
    sameLine.appendChild(price);
    itemInfo.appendChild(sameLine);
    itemInfo.appendChild(itemText);
    menuItem.appendChild(img);
    menuItem.appendChild(itemInfo);
    mealList.appendChild(menuItem);
  });
}

// Initial check to update display properties based on media query
updateDisplay();

// Add an event listener to handle changes in the media query
mediaQuery.addEventListener("change", updateDisplay);

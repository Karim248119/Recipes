const drawer = document.getElementById("drawer");
const drawerBtn = document.getElementById("drawer-btn");
const menu = document.getElementById("menu");
const container = document.getElementById("container");

const availableQueries = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs",
];

availableQueries.map((e) => {
  let itemContainer = document.createElement("div");
  itemContainer.classList.add("itemContainer");
  let itemBg = document.createElement("div");
  itemBg.classList.add("itemBg");
  let li = document.createElement("li");
  li.classList.add("menuItem");
  li.innerHTML = e;
  menu.appendChild(itemContainer);
  itemContainer.appendChild(itemBg);
  itemContainer.appendChild(li);
});

drawerBtn.addEventListener("click", () => {
  drawer.classList.toggle("md:left-0");
  drawer.classList.toggle("left-0");
});

const fetchRecipes = async (query) => {
  try {
    container.innerHTML = "";

    let storedRecipes = JSON.parse(localStorage.getItem(query));
    if (!storedRecipes) {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
      );
      const data = await response.json();
      storedRecipes = data.recipes;
      localStorage.setItem(query, JSON.stringify(storedRecipes));
    }

    storedRecipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("card", "m-5", "bg-white/10");
      const header = document.querySelector(".header");
      header.innerHTML = `Best <span class='text-main capitalize'>${query} </span>Recipes`;
      card.innerHTML = `
        <div class="w-full h-[30vh] overflow-hidden">
          <img
            src='${recipe.image_url}'
            alt="${recipe.title}"
            class="object-cover w-full h-full hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
          />
        </div>
        <div class="p-5 flex flex-col gap-3 justify-center container">
          <div class="md:text-2xl text-xl font-bold title">${recipe.title}</div>
          <div class="flex justify-between">
            <div class="text-white/50">${recipe.publisher}</div>
            <div class="text-main font-semibold">${Math.floor(
              recipe.social_rank
            )}</div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
};

const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    drawer.classList.remove("md:left-0", "left-0");

    const query = item.textContent;
    localStorage.setItem("lastQuery", query);
    fetchRecipes(query);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lastQuery = localStorage.getItem("lastQuery");
  if (lastQuery) {
    fetchRecipes(lastQuery);
  } else {
    fetchRecipes("chicken");
  }
});

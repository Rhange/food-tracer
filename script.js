const waterNodeList = document.querySelectorAll(".water");
const waterArr = Array.from(waterNodeList);
const form = document.getElementsByClassName("food-form");
const foodContainer = document.querySelector(".food-container");
const lists = document.createElement("ul");
const inputFood = document.querySelector(".food");
const addBtn = document.querySelector(".add-food");
const currentDate = document.querySelector(".date");
const currentTime = document.querySelector(".time");
const option = document.querySelector(".select");
const completeBtn = document.querySelector(".complete");
const pooNodeList = document.querySelectorAll(".poo");
const pooArr = Array.from(pooNodeList);

let allOfList = [];
let waterCounter = 0;
let pooCounter = 0;
let dailyObj = {
  foods: [],
  date: "",
  time: "",
  water: "",
  option: "",
  bad: 0,
  id: 0
};

const loadLocalStorage = () => {
  const loadData = localStorage.getItem("daily");
  if (loadData) {
    const parsedData = JSON.parse(loadData);
    dailyObj = parsedData;
    showFoods(parsedData);
  }
};

const saveLocalStorage = () => {
  localStorage.setItem("daily", JSON.stringify(dailyObj));
};

const calculateTotalWater = () => {
  const totalWater = waterCounter * 330;
  dailyObj.water = `${totalWater} ml`;
};

const handleWaterClick = (e) => {
  const {
    target: { classList }
  } = e;
  classList.toggle("filled");

  const waterArr = Array.from(e.target.classList);
  if (waterArr.includes("filled")) {
    waterCounter++;
  } else {
    waterCounter--;
  }
  console.log(waterCounter);
  calculateTotalWater();
};

const handleDeleteClick = (e) => {
  e.preventDefault();
  const li = e.target.parentNode;
  const liFoodName = li.innerText.slice(2);
  lists.removeChild(li);

  dailyObj.foods = dailyObj.foods.filter((food) => food !== liFoodName);
  console.log(dailyObj.foods);
  saveLocalStorage();
};

const showFoods = (dailyObj) => {
  const { foods } = dailyObj;
  lists.innerHTML = "";
  foods.forEach((food) => {
    const list = document.createElement("li");
    const delBtn = document.createElement("button");
    const foodName = document.createElement("span");
    delBtn.innerText = "✖";
    delBtn.style.all = "unset";
    delBtn.style.color = "red";
    list.appendChild(delBtn);
    delBtn.addEventListener("click", handleDeleteClick);
    foodName.innerText = ` ${food}`;
    foodName.style.lineHeight = "1.5";
    list.appendChild(foodName);
    lists.appendChild(list);
  });
  foodContainer.appendChild(lists);
};

const handleAddClick = (e) => {
  e.preventDefault();
  const newFood = inputFood.value;
  const { foods } = dailyObj;
  if (newFood !== "") {
    foods.push(newFood);
    console.log(foods);
    inputFood.value = "";
  }

  showFoods(dailyObj);
  saveLocalStorage();
};

const handleCompleteClick = (e) => {
  e.preventDefault();
  dailyObj.time = showTime();
  const newId = new Date().getTime();
  dailyObj.id = newId;
  saveLocalStorage();

  waterArr.map((each) => each.classList.remove("filled"));

  lists.innerHTML = "";
};

const showDate = () => {
  const date = new Date();
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = days[date.getDay()];
  const now = `${y}년 ${m < 10 ? `0${m}` : m}월 ${
    d < 10 ? `0${d}` : d
  }일 ${day}`;

  currentDate.innerText = now;
  dailyObj.date = now;
};

const showTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const nowTime = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;

  currentTime.innerText = nowTime;
  return nowTime;
};

const handleOptionClick = (e) => {
  const selectValue = e.target.value;
  dailyObj.option = selectValue;
};

const handlePooClick = (e) => {
  const {
    target: { classList }
  } = e;
  classList.toggle("filled");

  const pooArr = Array.from(e.target.classList);
  if (pooArr.includes("filled")) {
    pooCounter++;
  } else {
    pooCounter--;
  }
  console.log(pooCounter);
  dailyObj.bad = pooCounter;
};

const init = () => {
  loadLocalStorage();

  if (waterArr) {
    waterArr.forEach((each) => {
      each.addEventListener("click", handleWaterClick);
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", handleAddClick);
  }

  if (completeBtn) {
    completeBtn.addEventListener("click", handleCompleteClick);
  }

  if (currentDate) {
    showDate();
  }

  if (currentTime) {
    setInterval(showTime, 1000);
  }

  if (option) {
    option.addEventListener("change", handleOptionClick);
  }

  if (pooArr) {
    pooArr.forEach((each) => {
      each.addEventListener("click", handlePooClick);
    });
  }
};

init();

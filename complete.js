const container = document.querySelector(".complete-container");

let allRecord = [];

const saveAllRecord = () => {
  localStorage.setItem("all", JSON.stringify(allRecord));
};

const updateAllRecord = () => {
  const loadDailyData = localStorage.getItem("daily");
  const loadAllData = localStorage.getItem("all");
  allRecord = JSON.parse(loadAllData);

  if (loadDailyData) {
    const parsedData = JSON.parse(loadDailyData);
    allRecord.push(parsedData);
    localStorage.removeItem("daily");
  }
};

const handleDelClick = (e) => {
  const box = e.target.parentNode;
  const parent = box.parentNode;
  parent.removeChild(box);
  allRecord.pop();
  saveAllRecord();
};

const showData = (array) => {
  array.forEach((each) => {
    const { foods, water, time, date, option } = each;
    const box = document.createElement("div");
    box.className = "box";
    const record = `
  <h2>${date} (${option})</h2>
  <br/>
  <ul>
  <li>시간 ⏰ = ${time}</li>
  <li>먹은 음식 🍚 = ${String(foods)}</li>
  <li>마신 물 💧 = ${water}</li>
  </ul>`;
    box.innerHTML = record;

    const delRecord = document.createElement("button");
    delRecord.innerText = "삭제";
    delRecord.addEventListener("click", handleDelClick);
    box.appendChild(delRecord);
    container.appendChild(box);
  });
};

const loadAllRecord = () => {
  const loadedAllData = localStorage.getItem("all");
  if (loadedAllData) {
    const parsedAllData = JSON.parse(loadedAllData);
    showData(parsedAllData);
  }
};

const init = () => {
  if (localStorage.daily !== undefined) {
    updateAllRecord();
    saveAllRecord();
  }
  loadAllRecord();
};

init();

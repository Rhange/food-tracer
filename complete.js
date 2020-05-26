const container = document.querySelector(".complete-container");

let allRecord = [];

const updateAllRecord = () => {
  const loadDailyData = localStorage.getItem("daily");
  const loadAllData = localStorage.getItem("all");
  if (loadAllData) {
    allRecord = JSON.parse(loadAllData);
  }
  if (loadDailyData) {
    const parsedData = JSON.parse(loadDailyData);
    allRecord.push(parsedData);
    localStorage.removeItem("daily");
  }

  localStorage.setItem("all", JSON.stringify(allRecord));
};

const handleDelClick = (e) => {
  const box = e.target.parentNode;
  const parent = box.parentNode;

  // delete box from html
  parent.removeChild(box);

  // delete box info from allRecord array
  allRecord.filter((each) => each.id !== box.id);

  // update localStorage
  saveAllRecord();
};

const showData = (array) => {
  array.forEach((each) => {
    const { foods, water, time, date, option, id, bad } = each;
    const box = document.createElement("div");
    box.className = "box";
    box.id = id;
    const record = `
  <h2>${date} (${option})</h2>
  <br/>
  <ul>
  <li>시간 ⏰ = ${time}</li>
  <li>먹은 음식 🍚 = ${String(foods)}</li>
  <li>마신 물 💧 = ${water}</li>
  <li>설사 빈도수 😢 = ${bad} 회</li>
  </ul>`;
    box.innerHTML = record;

    const delRecord = document.createElement("button");
    delRecord.className = "box-del";
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
  }
  loadAllRecord();
};

init();

const inputBox = document.getElementById("input-box");
const inputBox2 = document.getElementById("input-box2");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("É necessário que insira nome à tarefa");
  } else if (inputBox2.value === "") {
    alert("É necessário que insira valor ao produto");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `${inputBox.value} - Quantidade: ${inputBox2.value}`;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
  inputBox2.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

const inputBox = document.getElementById("input-box");
const inputBox2 = document.getElementById("input-box2");
const inputBox3 = document.getElementById("input-box3");
const listContainer = document.getElementById("list-container");
const valortotal = document.getElementById("valortotal");

function addTask() {
  if (inputBox.value === "") {
    alert("É necessário que insira nome à tarefa");
    return;
  }
  if (inputBox2.value === "") {
    alert("É necessário que insira quantidade ao produto");
    return;
  }
  if (inputBox3.value === "") {
    alert("É necessário que insira valor ao produto");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    ${inputBox.value} - Quantidade: ${
    inputBox2.value
  } - Valor Unitário: R$ ${parseFloat(inputBox3.value).toFixed(2)}
  `;

  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  listContainer.appendChild(li);

  updateTotal();
  saveData();

  inputBox.value = "";
  inputBox2.value = "";
  inputBox3.value = "";
}

function updateTotal() {
  let total = 0;

  const listItems = listContainer.getElementsByTagName("li");

  for (let item of listItems) {
    const quantidade = parseFloat(item.innerHTML.match(/Quantidade: (\d+)/)[1]);
    const valor = parseFloat(
      item.innerHTML.match(/Valor Unitário: R\$ (\d+(\.\d+)?)/)[1]
    );

    total += quantidade * valor;
  }

  valortotal.innerHTML = `<p>Valor Total: R$ ${total.toFixed(2)}</p>`;
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;

    const spans = listContainer.getElementsByTagName("span");
    for (let span of spans) {
      span.addEventListener("click", function () {
        this.parentElement.remove();
        updateTotal();
        saveData();
      });
    }
  }
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      updateTotal();
      saveData();
    }
  },
  false
);

showTask();
updateTotal();

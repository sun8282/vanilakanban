const containerbtn = document.querySelector(".addcontainer");

const itemcontainer = document.querySelector(".itemcontainer");
const addbtn = [...document.querySelectorAll(".addbtn")];

const addinput = document.querySelector(".addinput");
const ul = [...document.querySelectorAll(".ul")];
const list = [...document.querySelectorAll(".list")];
const addbox = document.querySelector(".addbox");
const closebtn = [...document.querySelectorAll(".close")];

const itembtn = [...document.querySelectorAll(".additem")];
const article = [...document.querySelectorAll(".article")];
// const draggables = [...document.querySelectorAll(".draggable")];
let add = false;

const clickadd = (e) => {
  //   let add = false;
  //   console.log(e.target);
  //   const btn = e.target;
};
const addcontainer = (value) => {
  // if (!add) return;
  const item = document.createElement("div");
  item.className = "article";
  item.setAttribute("draggable", true);
  item.innerHTML = `
  <h4>${value}</h4>
  <ul class ="ul">
      
  </ul>
  <button class="additem">add</button>
  <div class="addbox none">
            <input type="text" class="iteminput">
            <div class="btns">
            <button class="addbtn">add</button>
            <span class="close">❌</span>
            </div>
  `;

  itemcontainer.append(item);
  console.log(article);
};
const additem = (value, el) => {
  const prev =
    el.previousSibling.previousSibling.previousSibling.previousSibling;
  const item = document.createElement("li");
  item.className = "list";
  item.setAttribute("draggable", true);
  item.innerText = value;
  prev.append(item);
};

itembtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.nextSibling.nextSibling);

    el.target.nextSibling.nextSibling.classList.remove("none");
  });
});
addbtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.parentNode.previousSibling.previousSibling);
    const parentel = el.target.parentNode.parentNode;
    const input = el.target.parentNode.previousSibling.previousSibling;
    if (input.value !== "" && parentel.className == "addcontainer") {
      addcontainer(addinput.value);
      addinput.value = "";
    } else if (input.value !== "" && parentel.className == "addbox") {
      additem(input.value, parentel);
      input.value = "";
    }
  });
});
closebtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.parentNode.parentNode);
    el.target.parentNode.parentNode.classList.add("none");
  });
});
ul.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement === undefined) {
      console.log(draggable);
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});
list.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

function getDragAfterElement(container, x) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      // console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

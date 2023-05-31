const containers = document.querySelectorAll(".container");
const addbox = document.querySelector(".addbox");
const closebtn = [...document.querySelectorAll(".close")];
const itembtn = [...document.querySelectorAll(".additem")];
const addbtn = [...document.querySelectorAll(".addbtn")];
const addinput = document.querySelector(".addinput");
const itemcontainer = document.querySelector(".itemcontainer");
const itempd = document.querySelector(".pd");
const draggables = document.querySelectorAll(".draggable");
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement === undefined && draggable !== null) {
      container.appendChild(draggable);
    } else if(draggable !== null) {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
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

const addcontainer = (value) => {
  // if (!add) return;
  const item = document.createElement("div");
  item.className = "container";
  item.setAttribute("draggable", true);
  item.innerHTML = `
  <h3> ${value}</h3>
  <button class="additem">add</button>
  <div class="addbox none">
            <input type="text" class="iteminput">
            <div class="btns">
            <button class="addbtn">add</button>
            <span class="close">❌</span>
            </div>
  </div>
    `;

  itempd.append(item);
  const itembtn = [...document.querySelectorAll(".additem")];
  const containers = document.querySelectorAll(".container");
  const closebtn = [...document.querySelectorAll(".close")];
  const addbtn = [...document.querySelectorAll(".addbtn")];
  const addinput = document.querySelector(".addinput");
  itembtn.forEach((e) => {
    e.addEventListener("click", (el) => {
      console.log(el.target.nextSibling.nextSibling);

      el.target.nextSibling.nextSibling.classList.remove("none");
    });
  });
  closebtn.forEach((e) => {
    e.addEventListener("click", (el) => {
      console.log(el.target.parentNode.parentNode);
      el.target.parentNode.parentNode.classList.add("none");
    });
  });
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientX);
      const draggable = document.querySelector(".dragging");
      if (afterElement === undefined) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
    addbtn.forEach((e) => {
      e.addEventListener("click", (el) => {
        console.log(el.target.parentNode.previousSibling.previousSibling);
        const parentel = el.target.parentNode.parentNode.parentNode;
        console.log(parentel.children[0]);
        const input = el.target.parentNode.previousSibling.previousSibling;
        if (
          input.value !== "" &&
          parentel.children[0].className == "addcontainer"
        ) {
          addcontainer(addinput.value);
          addinput.value = "";
        } else if (input.value !== "" && parentel.className == "container") {
          additem(input.value, parentel);
          input.value = "";
        }
      });
    });
  });
};
const additem = (value, el) => {
  console.log(el);
  //   const prev =
  //     el.previousSibling.previousSibling.previousSibling.previousSibling;
  const item = document.createElement("li");

  item.className = "draggable";
  item.setAttribute("draggable", true);
  item.innerHTML = `<span class="itemtext">${value}</span><span class ="edit">✏️</span> <span class="delete">❌</span>`;

  el.append(item);
  const draggables = document.querySelectorAll(".draggable");
  const deleteitem = document.querySelectorAll(".delete");

  deleteitem.forEach(e =>{
    e.addEventListener("click", el =>{
      el.target.parentNode.remove();
    })
  })
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
};
addbtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.parentNode.previousSibling.previousSibling);
    const parentel = el.target.parentNode.parentNode.parentNode;
    console.log(parentel.children[0]);
    const input = el.target.parentNode.previousSibling.previousSibling;
    if (
      input.value !== "" &&
      parentel.children[0].className == "addcontainer"
    ) {
      addcontainer(addinput.value);
      addinput.value = "";
    } else if (input.value !== "" && parentel.className == "container") {
      additem(input.value, parentel);
      input.value = "";
    }
  });
});
itembtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.nextSibling.nextSibling);

    el.target.nextSibling.nextSibling.classList.remove("none");
  });
});
closebtn.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el.target.parentNode.parentNode);
    el.target.parentNode.parentNode.classList.add("none");
  });
});

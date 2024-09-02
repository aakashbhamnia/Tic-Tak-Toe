let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let trun0 = true; //player o turn
let count = 0;

const winpatt = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  trun0 = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.classList.remove("box-o");
    box.classList.remove("box-x");
  });
  
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (trun0) {
      //palyer O turn
      box.innerText = "O";
      box.classList.add("box-o");
      box.classList.remove("box-x");
      trun0 = false;
    } else {
      //palyer X turn
      box.innerText = "X";
      box.classList.add("box-x");
      box.classList.remove("box-o");
      trun0 = true;
    }
    box.disabled = true;
    count++;
    let iswinner = checkwinner();

    if (count === 9 && !iswinner) {
      draw();
    }
  });
});

const draw = () => {
  msg.innerText = "match is draw";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `congratulions,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkwinner = () => {
  for (let pattern of winpatt) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

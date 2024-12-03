const start = document.querySelector(".start"),
    timer = document.querySelector(".timer"),
    box = document.querySelector(".card-box"),
    score = document.querySelector(".score"),
    end = document.querySelector(".end"),
    gameover = document.querySelector(".gameover"),
    startPage = document.querySelector(".start-page"),
    final = document.querySelector(".final"),
    again = document.querySelector(".again"),
    againWin = document.querySelector(".again-win");
let cards = Array.from(box.children);
let scorenum = 0;
score.innerHTML = `score: ${scorenum}`;
start.onclick = function () {
    countdown();
    startPage.remove();
    cards.forEach((e) => {
        let ran = Math.floor(Math.random() * 40);
        e.style.order = ran;
    });
};
cards.forEach((e) => {
    e.dataset.clicked = "false";
});

let det = 0;
let compare = [];
cards.forEach((e) => {
    e.onclick = function () {
        if (det === 0) {
            if (e.dataset.clicked === "false") {
                e.style.transform = "rotateY(180deg)";
                e.dataset.clicked = true;
                compare.push(e);
                det = 1;
            }
        } else if (det === 1) {
            console.log(det);
            if (e.dataset.clicked === "false") {
                det = 2;
                e.style.transform = "rotateY(180deg)";
                e.dataset.clicked = true;
                compare.push(e);
                if (compare[0].dataset.char === compare[1].dataset.char) {
                    setTimeout(() => {
                        score.innerHTML = `score: ${(scorenum += 10)}`;
                        compare.forEach((e) => {
                            e.style.opacity = 0;
                            e.style.cursor = "auto";
                            compare = [];
                            det = 0;
                            if (scorenum === 100) {
                                end.classList.remove("hidden");
                            }
                        });
                    }, 400);
                } else {
                    setTimeout(() => {
                        compare.forEach((e) => {
                            e.style.transform = "rotateY(0deg)";
                            e.dataset.clicked = false;
                            compare = [];
                            det = 0;
                        });
                    }, 500);
                }
            }
        }
    };
});

//timer
function countdown() {
    let counter = setInterval(() => {
        let time = timer.innerHTML.split(":");
        let mins = +time[0];
        let secs = +time[1];
        if (secs > 0) {
            secs -= 1;
        }
        if (mins > 0 && secs == 0) {
            mins -= 1;
            secs = 59;
        }
        if (secs < 10 && secs.length != 2) {
            secs = `0${secs}`;
        }
        timer.innerHTML = `${mins}:${secs}`;
        if (secs == 0 && mins == 0) {
            gameover.classList.remove("hidden");
            final.innerHTML = `your score: ${scorenum}`;
            clearInterval(counter);
        }
        if (scorenum == 100) {
            clearInterval(counter);
        }
    }, 1000);
}

//play again
again.onclick = function () {
    location.reload();
    startPage.remove();
};
againWin.onclick = function () {
    location.reload();
};

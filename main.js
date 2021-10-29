"use strict";
const lightLevel = 14;
const width = 32;
const height = 16;
const holder = document.getElementById("holder");
const count = document.getElementById("count");
const blocks = [];
const isLight = [];
let lightCount = 0;
function render() {
    let isLightArr = [], tmpLight = [];
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            if (isLight[i][j])
                isLightArr.push([i, j]);
        }
        tmpLight.push(Array(width).fill(0));
    }
    for (let i = 0; i < height; ++i)
        for (let j = 0; j < width; ++j) {
            let brightness = lightLevel;
            for (let k = 0; k < isLightArr.length; ++k) {
                if (Math.abs(isLightArr[k][0] - i) + Math.abs(isLightArr[k][1] - j) < brightness) {
                    brightness = Math.abs(isLightArr[k][0] - i) + Math.abs(isLightArr[k][1] - j);
                }
            }
            if (lightLevel - brightness >= 8) {
                blocks[i][j].style.color = "#000000";
                blocks[i][j].style.backgroundColor = `rgb(${(0xff * (lightLevel - brightness)) / 16}, ${(0xff * (lightLevel - brightness)) / 16}, ${(0xff * (lightLevel - brightness)) / 16})`;
            }
            else {
                blocks[i][j].style.color = "#FFFFFF";
                blocks[i][j].style.backgroundColor = `#FF0000`;
            }
            if (isLight[i][j]) {
                blocks[i][j].style.backgroundColor = "#FFEB9C";
                blocks[i][j].innerText = "T";
            }
            else {
                blocks[i][j].innerText = (lightLevel - brightness).toString();
            }
        }
    count.innerText = lightCount.toString();
}
function placeLight(x, y) {
    if (isLight[y][x]) {
        isLight[y][x] = false;
        blocks[y][x].style.backgroundColor = "#000000";
        lightCount--;
    }
    else {
        isLight[y][x] = true;
        blocks[y][x].style.backgroundColor = "#FFEB9C";
        lightCount++;
    }
    // update using all isLight
    render();
}
function reset() {
    lightCount = 0;
    for (let i = 0; i < height; ++i)
        for (let j = 0; j < width; ++j)
            isLight[i][j] = false;
    render();
}
document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "r":
            reset();
            break;
    }
});
for (let i = 0; i < height; ++i) {
    blocks.push(Array.from({ length: width }, (_element, index) => {
        let elem = document.createElement("div");
        elem.classList.add("block");
        elem.addEventListener("click", () => {
            placeLight(index, i);
        });
        holder.appendChild(elem);
        return elem;
    }));
    isLight.push(Array(width).fill(false));
    holder.appendChild(document.createElement("br"));
}
render();

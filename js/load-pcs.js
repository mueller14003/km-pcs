function loadPCs() {
    var pc_grid = document.getElementById("pc_grid");
    pc_grid.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var json_obj = JSON.parse(this.responseText);
        for (x in json_obj.PCs) {
          PC = json_obj.PCs[x];
          pc_grid.innerHTML += formatPC(PC);
        }
        pc_grid.style = "";
      } else if (this.status == 404) {
        pc_grid.style.color = "red";
        pc_grid.innerHTML = "File Not Found?!?";
      }
    }
    xhttp.open("GET", "./PCs.json", true);
    xhttp.send();
    disableAnnoyingBottomSpace();
}

function formatPC(PC) {
    title = getTitle(PC);
    return `<article class="card product-item"${PC.url == "" ? "" : ` onclick="location.href='${PC.url}'"`}>` + 
        `<header class="card__header"><h1 class="product__title">${title}</h1></header><div class="card__image">` +
        `<img src="${getImageSource(PC)}" alt="${title}" class="card__image"></div></article>`;
}

function getTitle(PC) {
    return PC.CPU + (PC.GPU == "" ? "" : `, ${PC.GPU}`);
}

function getImageSource(PC) {
    return "./media/images/" + PC.CPU.split(" ").join("_") + (PC.GPU == "" ? "" : `_${PC.GPU.split(" ").join('')}`) + ".jpg";
}

function disableAnnoyingBottomSpace() {
  var badSpace = document.getElementById("octo-extension-root");
  if (badSpace != null) {
    badSpace.style = "display: none;";
  }
}
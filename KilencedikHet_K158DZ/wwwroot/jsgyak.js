// JavaScript source code

var faktorialis = n => {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * faktorialis(n - 1)
    }
};
var pascal = document.getElementById("pascal");
var méret = 10;
for (var s = 0; s <= méret; s++) {
    var újSor = document.createElement("div");
    újSor.classList.add("sor");    
    pascal.appendChild(újSor);

    for (var o = 0; o <= s; o++) {
        var újElem = document.createElement("div");
        újElem.innerHTML = faktorialis(s) / (faktorialis(o) * faktorialis(s - o)) 
        újElem.classList.add("elem");
        újSor.appendChild(újElem);
    }
}
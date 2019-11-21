const colorSchemes = {
    "Scheme 1": [ "#555358", "#C6CA53", "#678C69", "#C9DCB3", "#F1F5F2" ],
    "Scheme 2": [ "#2A4F2B", "#678C69", "#B098A4", "#DBD9DB", "#E5EBEA" ],
    "Scheme 3": [ "#CFF09E", "#A8DBA8", "#678C69", "#0B486B", "#72B5B5" ],
    "Scheme 4": [ "#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#678C69" ],
    "Scheme 5": [ "#FFED90", "#A8D46F", "#678C69", "#3C3251", "#341139" ],
    "Scheme 6": [ "#678C69", "#AFC97E", "#D4E6B5", "#E2D686", "#FFDF64" ],
    "Scheme 7": [ "#678C69", "#E4FFE1", "#F4FDD9", "#FFE8C2", "#FFB06B" ],
    "Scheme 8": [ "#678C69", "#C5E063", "#F9FBB2", "#E3E9C2", "#A5ABAF" ],
};

const squaresFromGrandma = {
    "Light Green": 13,
    "Dark Green": 4,
    "Dark Brown": 4,
    "Light Brown": 5,
    "Beige": 1,
    "Red": 1
}

const patterns = {
    "Diagonal Symmetric": [
        [4, 0, 1, 2, 3],
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 3],
        [2, 3, 4, 3, 2],
        [3, 4, 3, 2, 1],
        [4, 3, 2, 1, 0],
        [3, 2, 1, 0, 4]
    ],
    "Diagonal Asymmetric": [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 0],
        [2, 3, 4, 0, 1],
        [3, 4, 0, 1, 2],
        [4, 0, 1, 2, 3],
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 0],
    ],
    "Diamond": [
        [0, 1, 2, 1, 0],
        [1, 2, 3, 2, 1],
        [2, 3, 4, 3, 2],
        [3, 4, 0, 4, 3],
        [2, 3, 4, 3, 2],
        [1, 2, 3, 2, 1],
        [0, 1, 2, 1, 0],
    ],
    "Stripes": [
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
    ],
    "Horizontal": [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3],
        [2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
    ]
}

function makeQuiltArray(colorScheme, pattern) {
    var quiltArray = [];
    for (var row = 0; row < pattern.length; row++) {
        var rowArray = [];
        for (var col = 0; col < pattern[row].length; col++) {
            rowArray.push(colorScheme[pattern[row][col]]);
        }
        quiltArray.push(rowArray);
    }
    return quiltArray;
}

function makeBlanketTableHTML(colorArray) {
    var tableHTML = `<table class="blanket box shadowed">`;
    // create colored cells
    for (var row = 0; row < colorArray.length; row++) {
  	    tableHTML += "<tr>";
        for (var col = 0; col < colorArray[row].length; col++) {
            tableHTML += "<td bgcolor=\"" + colorArray[row][col] + "\"></td>";
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    return tableHTML;
}

function schemeSelectedHandler(selectedRow) {
    selectedScheme.className -= " selected";
    selectedScheme = selectedRow;
    selectedRow.className += " selected";
    drawBlanket(selectedRow.dataset.scheme.split(','));
}

function makeSchemeSelectorHTML() {
    var tableHTML = "<table id=schemeSelectorTable class=schemeSelector>";
    tableHTML += Object.keys(colorSchemes).map(schemeName => {
        var colors = colorSchemes[schemeName];
        var trString = `<tr data-scheme="${colors}" onclick="schemeSelectedHandler(this)">`;
        trString += colors.map(color => `<td bgcolor="${color}"/>`).join("");
        trString += `<th>${schemeName}</th>`;
        trString += "</tr>";
        return trString;
    }).join("");
    tableHTML += "</table>";
    return tableHTML;
}

function drawBlanket(selectedScheme) {
    var quiltArrays = Object.keys(patterns).map(pattern => makeQuiltArray(selectedScheme, patterns[pattern]));
    var blanketContainerElement = document.getElementById("blanketContainer");
    blanketContainerElement.innerHTML = quiltArrays.map(quiltArray => makeBlanketTableHTML(quiltArray)).join("");
}

const schemeSelectorElement = document.getElementById("schemeSelector");
schemeSelectorElement.innerHTML = makeSchemeSelectorHTML();
let selectedScheme = document.getElementById("schemeSelectorTable").rows[0];
schemeSelectedHandler(selectedScheme);

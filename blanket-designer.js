const colorSchemes = {
    "Scheme 1": [ "#555358", "#C6CA53", "#678C69", "#C9DCB3", "#F1F5F2" ],
    "Scheme 2": [ "#2A4F2B", "#B098A4", "#678C69", "#DBD9DB", "#E5EBEA" ],
    "Scheme 3": [ "#CFF09E", "#A8DBA8", "#678C69", "#72B5B5", "#0B486B" ],
    "Scheme 4": [ "#FE4365", "#FC9D9A", "#678C69", "#C8C8A9", "#F9CDAD" ],
    "Scheme 5": [ "#FFED90", "#A8D46F", "#678C69", "#3C3251", "#341139" ],
    "Scheme 6": [ "#D4E6B5", "#AFC97E", "#678C69", "#E2D686", "#FFDF64" ],
    "Scheme 7": [ "#F4FDD9", "#E4FFE1", "#678C69", "#FFE8C2", "#FFB06B" ],
    "Scheme 8": [ "#C5E063", "#E3E9C2", "#678C69", "#F9FBB2", "#A5ABAF" ],
};

function makeQuiltArray(colorScheme) {
    var quiltArray = [];
    for (var row = 0; row < colorScheme.length; row++) {
        quiltArray.push(colorScheme);
    }
    return quiltArray;
}

function makeBlanketTableHTML(colorArray) {
    var tableHTML = "<table class=blanket>";
    // create columns
    for (var col = 0; col < colorArray[0].length; col++) {
  	    tableHTML += "<col>";
    }
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
    drawBlanket(selectedRow.dataset.scheme.split(','));
}

function makeSchemeSelectorHTML() {
    var tableHTML = "<table class=schemeSelector>";
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

function drawBlanket(scheme) {
    document.getElementById("blanketContainer").innerHTML = makeBlanketTableHTML(makeQuiltArray(scheme));
}

const schemeSelectorElement = document.getElementById("schemeSelector");
schemeSelectorElement.innerHTML = makeSchemeSelectorHTML();
drawBlanket(colorSchemes["Scheme 1"]);

const colorSchemes = {
    "Scheme 1": [ "#555358", "#C6CA53", "#678C69", "#C9DCB3", "#F1F5F2" ],
    "Scheme 2": [ "#2A4F2B", "#B098A4", "#678C69", "#DBD9DB", "#E5EBEA" ],
    "Scheme 3": [ "#CFF09E", "#A8DBA8", "#678C69", "#72B5B5", "#0B486B" ]
};

function makeQuiltArray(colorScheme) {
    var quiltArray = [];
    for (var row = 0; row < colorScheme.length; row++) {
        quiltArray.push(colorScheme);
    }
    return quiltArray;
}

function makeTableHTML(colorArray) {
    var tableHTML = "<table>";
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

function makeDropdownList(list) {
    return list.map(item => `<option value="${item}">${item}</option>`).join("");
}

function drawBlanket(schemeName) {
    document.getElementById("quilt").innerHTML = makeTableHTML(makeQuiltArray(colorSchemes[schemeName]));
}

const schemeSelectorElement = document.getElementById("schemeSelector");
schemeSelectorElement.innerHTML = makeDropdownList(Object.keys(colorSchemes));
schemeSelectorElement.addEventListener('change', (event) => {
    drawBlanket(event.target.value);
});
drawBlanket("Scheme 1");

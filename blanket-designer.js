scheme1 = [ "#555358", "#C6CA53", "#678C69", "#C9DCB3", "#F1F5F2" ]

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

document.getElementById("quilt").innerHTML = makeTableHTML(makeQuiltArray(scheme1));

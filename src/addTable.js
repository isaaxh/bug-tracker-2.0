function AddTableARIA() {
  try {
    var allTables = document.querySelectorAll("table");
    for (var i = 0; i < allTables.length; i++) {
      allTables[i].setAttribute("role", "table");
    }
    var allCaptions = document.querySelectorAll("caption");
    for (var i = 0; i < allCaptions.length; i++) {
      allCaptions[i].setAttribute("role", "caption");
    }
    var allRowGroups = document.querySelectorAll("thead, tbody, tfoot");
    for (var i = 0; i < allRowGroups.length; i++) {
      allRowGroups[i].setAttribute("role", "rowgroup");
    }
    var allRows = document.querySelectorAll("tr");
    for (var i = 0; i < allRows.length; i++) {
      allRows[i].setAttribute("role", "row");
    }
    var allCells = document.querySelectorAll("td");
    for (var i = 0; i < allCells.length; i++) {
      allCells[i].setAttribute("role", "cell");
    }
    var allHeaders = document.querySelectorAll("th");
    for (var i = 0; i < allHeaders.length; i++) {
      allHeaders[i].setAttribute("role", "columnheader");
    }
    // this accounts for scoped row headers
    var allRowHeaders = document.querySelectorAll("th[scope=row]");
    for (var i = 0; i < allRowHeaders.length; i++) {
      allRowHeaders[i].setAttribute("role", "rowheader");
    }
  } catch (e) {
    console.log("AddTableARIA(): " + e);
  }
}

AddTableARIA();

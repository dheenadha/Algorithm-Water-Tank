function calculateWater() {

    let input = document.getElementById("inputArray").value;
    let arr = input.split(",").map(Number);

    let n = arr.length;

    let leftMax = new Array(n);
    let rightMax = new Array(n);

    // Left max
    leftMax[0] = arr[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], arr[i]);
    }

    // Right max
    rightMax[n - 1] = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], arr[i]);
    }

    let water = 0;

    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - arr[i];
    }

    document.getElementById("result").innerText =
        "Stored Water: " + water + " Units";

    // ✅ Show output after clicking
    document.getElementById("outputSection").style.display = "block";

    drawGrids(arr, leftMax, rightMax);
}

function drawGrids(arr, leftMax, rightMax) {

    let grid = document.getElementById("grid");
    let waterGrid = document.getElementById("waterGrid");

    grid.innerHTML = "";
    waterGrid.innerHTML = "";

    let n = arr.length;
    let maxHeight = Math.max(...leftMax, ...rightMax);

    for (let row = maxHeight; row > 0; row--) {

        let rowDiv = document.createElement("div");
        rowDiv.className = "row";

        let waterRowDiv = document.createElement("div");
        waterRowDiv.className = "row";

        for (let col = 0; col < n; col++) {

            let blockHeight = arr[col];
            let waterHeight = Math.min(leftMax[col], rightMax[col]);

            // 🔶 Combined Grid
            let cell = document.createElement("div");
            cell.className = "cell";

            if (blockHeight >= row) {
                cell.classList.add("block");
            } 
            else if (waterHeight >= row) {
                cell.classList.add("water");
            }

            rowDiv.appendChild(cell);

            // 🔷 Water Only Grid
            let waterCell = document.createElement("div");
            waterCell.className = "cell";

            if (blockHeight < row && waterHeight >= row) {
                waterCell.classList.add("water");
            }

            waterRowDiv.appendChild(waterCell);
        }

        grid.appendChild(rowDiv);
        waterGrid.appendChild(waterRowDiv);
    }
}
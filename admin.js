const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        // قراءة شيت "داتا"
        const dataSheet = workbook.Sheets["داتا"];

        if (!dataSheet) {
            alert("لم يتم العثور على شيت داتا");
            return;
        }

        const employees = XLSX.utils.sheet_to_json(dataSheet);

        document.getElementById("sheetCount").textContent = workbook.SheetNames.length;
        document.getElementById("employeeCount").textContent = employees.length;
        document.getElementById("rowCount").textContent = employees.length;

        const table = document.getElementById("preview");
        table.innerHTML = "";

        if (employees.length === 0) return;

        const headers = Object.keys(employees[0]);

        let html = "<tr>";

        headers.forEach(h => {
            html += `<th>${h}</th>`;
        });

        html += "</tr>";

        employees.slice(0, 10).forEach(emp => {

            html += "<tr>";

            headers.forEach(h => {

                html += `<td>${emp[h] ?? ""}</td>`;

            });

            html += "</tr>";

        });

        table.innerHTML = html;

    };

    reader.readAsArrayBuffer(file);

});

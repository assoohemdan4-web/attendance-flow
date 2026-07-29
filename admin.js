const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (evt) {

        const workbook = XLSX.read(evt.target.result, { type: "binary" });

        document.getElementById("sheetCount").innerText =
            workbook.SheetNames.length;

        // ===== قراءة شيت داتا =====

        const sheet = workbook.Sheets["داتا"];

        const employees = XLSX.utils.sheet_to_json(sheet);

        document.getElementById("employeeCount").innerText =
            employees.length;

        document.getElementById("rowCount").innerText =
            employees.length;

        const table = document.getElementById("preview");

        table.innerHTML = "";

        if (employees.length === 0) {

            table.innerHTML = "<tr><td>لا توجد بيانات</td></tr>";

            return;

        }

        const headers = Object.keys(employees[0]);

        let html = "<tr>";

        headers.forEach(h => {

            html += `<th>${h}</th>`;

        });

        html += "</tr>";

        employees.slice(0,10).forEach(emp=>{

            html+="<tr>";

            headers.forEach(h=>{

                html+=`<td>${emp[h] ?? ""}</td>`;

            });

            html+="</tr>";

        });

        table.innerHTML = html;

    };

    reader.readAsBinaryString(file);

});

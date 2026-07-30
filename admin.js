const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (evt) {

        const workbook = XLSX.read(evt.target.result, {
            type: "binary"
        });

        document.getElementById("sheetCount").innerText =
            workbook.SheetNames.length;

        const sheet = workbook.Sheets["السحب"];

        // قراءة كل الصفوف كما هي
        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: ""
        });

        document.getElementById("employeeCount").innerText = rows.length;
        document.getElementById("rowCount").innerText = rows.length;

        const table = document.getElementById("preview");
        table.innerHTML = "";

        rows.slice(0, 10).forEach((row, index) => {

            let tr = "<tr>";

            row.forEach(cell => {

                if (index === 0) {
                    tr += `<th>${cell}</th>`;
                } else {
                    tr += `<td>${cell}</td>`;
                }

            });

            tr += "</tr>";

            table.innerHTML += tr;

        });

        console.log(rows);

    };

    reader.readAsBinaryString(file);

});

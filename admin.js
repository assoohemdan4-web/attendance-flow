function splitDateTime(cell) {

    if (!value) {
        return {
            date: "",
            time: ""
        };
    }

    // لو القيمة جاية كنص
    if (typeof value === "string") {

        const parts = value.split(" ");

        return {

            date: parts[0] || "",

            time: parts[1] ? parts[1].substring(0,5) : ""

        };

    }

    // لو القيمة جاية كرقم Excel
    const d = XLSX.SSF.parse_date_code(value);

    if (!d) {

        return {

            date:"",
            time:""

        };

    }

    const day = String(d.d).padStart(2,"0");
    const month = String(d.m).padStart(2,"0");
    const year = d.y;

    const hour = String(d.H).padStart(2,"0");
    const minute = String(d.M).padStart(2,"0");

    return{

        date:`${day}/${month}/${year}`,
        time:`${hour}:${minute}`

    };

}
// ===============================
// Excel Date & Time Formatter
// ===============================

function formatDate(value) {

    if (value === "" || value == null) return "";

    const date = XLSX.SSF.parse_date_code(value);

    if (!date) return value;

    const day = String(date.d).padStart(2, "0");
    const month = String(date.m).padStart(2, "0");
    const year = date.y;

    return `${day}/${month}/${year}`;
}

function formatTime(value) {

    if (value === "" || value == null) return "";

    const date = XLSX.SSF.parse_date_code(value);

    if (!date) return value;

    const hour = String(date.H).padStart(2, "0");
    const minute = String(date.M).padStart(2, "0");

    return `${hour}:${minute}`;
}

function formatDateTime(value) {

    if (value === "" || value == null) return "";

    const date = XLSX.SSF.parse_date_code(value);

    if (!date) return value;

    const day = String(date.d).padStart(2, "0");
    const month = String(date.m).padStart(2, "0");
    const year = date.y;

    const hour = String(date.H).padStart(2, "0");
    const minute = String(date.M).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}`;
}
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

            row.forEach((cell, colIndex) => {

    if (index === 0) {

        tr += `<th>${cell}</th>`;

    } else {

        let value = cell;

        const header = rows[0][colIndex];
        

        if (header === "Date/Time") {

    const dt = splitDateTime(value);

    value = `
        <div><b>${dt.date}</b></div>
        <div style="color:#2563eb">${dt.time}</div>
    `;

}

tr += `<td>${value}</td>`;

    }

});

            tr += "</tr>";

            table.innerHTML += tr;

        });

        console.log(rows);

    };

    reader.readAsBinaryString(file);

});

alert("ADMIN VERSION 3");

const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (evt) {

        const workbook = XLSX.read(new Uint8Array(evt.target.result), {
            type: "array"
        });

        document.getElementById("sheetCount").innerText = workbook.SheetNames.length;

        const sheet = workbook.Sheets["داتا"];

        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1
        });

        document.getElementById("employeeCount").innerText = rows.length;

        document.getElementById("rowCount").innerText = rows.length;

        const table = document.getElementById("preview");

        table.innerHTML = "";

        rows.slice(0,10).forEach((row,index)=>{

            let tr="<tr>";

            row.forEach(col=>{

                if(index==0){

                    tr+="<th>"+col+"</th>";

                }else{

                    tr+="<td>"+col+"</td>";

                }

            });

            tr+="</tr>";

            table.innerHTML+=tr;

        });

    };

    reader.readAsArrayBuffer(file);

});

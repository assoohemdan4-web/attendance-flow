// ===============================
// Convert Excel Date & Time
// ===============================

function splitDateTime(value) {


    if (!value) {

        return {
            date: "",
            time: ""
        };

    }



    // Excel date converted to JS Date

    if (value instanceof Date) {


        const day = String(value.getDate()).padStart(2, "0");

        const month = String(value.getMonth() + 1).padStart(2, "0");

        const year = value.getFullYear();


        const hour = String(value.getHours()).padStart(2, "0");

        const minute = String(value.getMinutes()).padStart(2, "0");



        return {

            date: `${day}/${month}/${year}`,

            time: `${hour}:${minute}`

        };


    }



    // لو التاريخ نص

    if (typeof value === "string") {


        const parts = value.split(" ");


        return {

            date: parts[0] || "",

            time: parts[1] ? parts[1].substring(0,5) : ""

        };


    }



    // لو Excel رقم Serial

    if (typeof value === "number") {


        const d = XLSX.SSF.parse_date_code(value);


        if (!d) {

            return {
                date:"",
                time:""
            };

        }



        return {

            date:
            `${String(d.d).padStart(2,"0")}/${String(d.m).padStart(2,"0")}/${d.y}`,

            time:
            `${String(d.H).padStart(2,"0")}:${String(d.M).padStart(2,"0")}`

        };


    }



    return {

        date:"",

        time:""

    };


}



// ===============================
// Upload Excel
// ===============================


const input = document.getElementById("excelFile");



input.addEventListener("change", function(e){



    const file = e.target.files[0];


    if(!file) return;



    const reader = new FileReader();



    reader.onload = function(evt){



        const workbook = XLSX.read(evt.target.result, {


            type:"binary",

            cellDates:true


        });



        document.getElementById("sheetCount").innerText =
            workbook.SheetNames.length;




        const sheet = workbook.Sheets["السحب"];



        if(!sheet){


            alert("لم يتم العثور على شيت السحب");

            return;


        }




        let rows = XLSX.utils.sheet_to_json(sheet, {


            header:1,

            defval:"",

            raw:true


        });





        // حذف الصف الفارغ الأول

        if(rows[0].every(cell => cell === "")){


            rows.shift();


        }





        const headers = rows[0];





        document.getElementById("employeeCount").innerText =
            rows.length - 1;



        document.getElementById("rowCount").innerText =
            rows.length - 1;





        const table = document.getElementById("preview");


        table.innerHTML="";





        rows.slice(0,11).forEach((row,index)=>{



            let tr="<tr>";





            row.forEach((cell,colIndex)=>{





                // Header

                if(index===0){


                    tr += `<th>${cell}</th>`;


                }



                else{



                    let value = cell;



                    const header = headers[colIndex];





                    if(header === "Date/Time"){



                        const dt = splitDateTime(value);




                        value = `

                        <div>
                            <b>${dt.date}</b>
                        </div>

                        <div style="color:#2563eb">
                            ${dt.time}
                        </div>

                        `;


                    }





                    tr += `<td>${value}</td>`;


                }




            });





            tr+="</tr>";



            table.innerHTML += tr;




        });






        console.log(rows);



    };




    reader.readAsBinaryString(file);



});

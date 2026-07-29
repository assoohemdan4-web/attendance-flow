const input=document.getElementById("excelFile");

input.addEventListener("change",function(e){

const file=e.target.files[0];

const reader=new FileReader();

reader.onload=function(evt){

const data=new Uint8Array(evt.target.result);

const workbook=XLSX.read(data,{type:"array"});

document.getElementById("sheetCount").innerText=workbook.SheetNames.length;

const sheet=workbook.Sheets["داتا"] || workbook.Sheets[workbook.SheetNames[0]];

const json=XLSX.utils.sheet_to_json(sheet);

document.getElementById("employeeCount").innerText=json.length;

document.getElementById("rowCount").innerText=json.length;

let table=document.getElementById("preview");

table.innerHTML="";

if(json.length>0){

let cols=Object.keys(json[0]);

let head="<tr>";

cols.forEach(c=>head+="<th>"+c+"</th>");

head+="</tr>";

table.innerHTML=head;

json.slice(0,10).forEach(r=>{

let row="<tr>";

cols.forEach(c=>row+="<td>"+(r[c]??"")+"</td>");

row+="</tr>";

table.innerHTML+=row;

});

}

}

reader.readAsArrayBuffer(file);

});

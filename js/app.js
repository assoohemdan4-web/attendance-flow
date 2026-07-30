/* ==========================================
   Attendance Management System
   app.js
   Main Application Controller
==========================================*/

"use strict";

class AttendanceApp {

    constructor() {

        // ==========================
        // Application State
        // ==========================

        this.workbook = null;
        this.sheet = null;
        this.attendanceData = {};

        // ==========================
        // Managers
        // ==========================

        this.parser = null;
        this.engine = null;
        this.search = null;
        this.report = null;

        // ==========================
        // UI Elements
        // ==========================

        this.ui = {

            excelFile: document.getElementById("excelFile"),

            sheetCount: document.getElementById("sheetCount"),

            employeeCount: document.getElementById("employeeCount"),

            rowCount: document.getElementById("rowCount"),

            searchInput: document.getElementById("searchInput"),

            searchBtn: document.getElementById("searchBtn"),

            result: document.getElementById("result")

        };

    }

    /* ==========================
       Initialize Application
    ========================== */

    init() {

        console.log("🚀 Attendance System Started");

        this.registerEvents();

    }

    /* ==========================
       Register Events
    ========================== */

    registerEvents() {

        this.ui.excelFile.addEventListener(

            "change",

            (e) => this.uploadExcel(e)

        );

        this.ui.searchBtn.addEventListener(

            "click",

            () => this.searchEmployee()

        );

        this.ui.searchInput.addEventListener(

            "keypress",

            (e) => {

                if (e.key === "Enter") {

                    this.searchEmployee();

                }

            }

        );

    }

    /* ==========================
       Upload Excel
    ========================== */

    uploadExcel(e) {

        console.log("📁 Excel Selected");

    }

    /* ==========================
       Search Employee
    ========================== */

    searchEmployee() {

        console.log("🔍 Search Employee");

    }

    /* ==========================
       Show Loading
    ========================== */

    showLoading(message = "Loading...") {

        this.ui.result.innerHTML = `

            <div class="waiting">

                ${message}

            </div>

        `;

    }

    /* ==========================
       Show Error
    ========================== */

    showError(message) {

        this.ui.result.innerHTML = `

            <div class="waiting"

            style="color:red;">

                ${message}

            </div>

        `;

    }

    /* ==========================
       Update Statistics
    ========================== */

    updateStats({

        sheets = 0,

        employees = 0,

        records = 0

    }) {

        this.ui.sheetCount.textContent = sheets;

        this.ui.employeeCount.textContent = employees;

        this.ui.rowCount.textContent = records;

    }

}

/* ==========================================
   Start Application
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        window.app = new AttendanceApp();

        app.init();

    }

);

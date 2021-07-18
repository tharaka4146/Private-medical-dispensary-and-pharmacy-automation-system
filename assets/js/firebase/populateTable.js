function SelectAllData() {

    firebase.database().ref('queue').on('value',
        function (AllRecords) {
            $("#tbody1 tr").remove();
            const currentDate = Date.now();

            const d = new Date(currentDate)
            const year = d.getFullYear()
            const day = d.getDate()
            const month = d.toLocaleString('default', { month: 'long' });
            let post = "th";

            if (day > 3 && day < 21) post = 'th';
            switch (day % 10) {
                case 1: post = "st";
                case 2: post = "nd";
                case 3: post = "rd";
                default: post = "th";
            }

            const today = day + post + " " + " " + month + ", " + year;

            date.innerHTML = today;

            let availablePatients = 0;
            let currentPatient = 0;

            AllRecords.forEach(
                function (CurrentRecord) {
                    var id = CurrentRecord.val().nic;
                    var dateTime = CurrentRecord.val().dateTime;
                    const d2 = new Date(currentDate)
                    const dayOld = new Date(dateTime)
                    var no = CurrentRecord.val().no;
                    var isExamined = CurrentRecord.val().isExamined;
                    if (isExamined == false && d2.getFullYear() == year && d2.getDate() == dayOld.getDate()) {
                        if (availablePatients == 0) {
                            currentPatient = no;
                            document.getElementById('currentPatient').innerHTML = currentPatient
                        }
                        availablePatients++;
                        document.getElementById('remainingPatientCount').innerHTML = availablePatients
                        // console.log(d2.getDate());
                        AddItemsToTable(id, dateTime, no);
                    }
                }
            );

            //real time clock
            display_ct();

            function display_c() {
                setTimeout(display_ct, 60000)
            }

            function display_ct() {
                var x = new Date()
                document.getElementById('ct').innerHTML = x.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                // console.log("time t");
                display_c();
            }

        });
}

window.onload = SelectAllData;

function AddItemsToTable(id, dateTime, no) {

    let year = "";
    let month = "";
    let monthInt = "";
    let day = "";


    //Clear Existing Details
    // $("#error").html("");
    // $("#gender").html("");
    // $("#year").html("");
    // $("#month").html("");
    // $("#day").html("");

    var NICNo = id;
    var dayText = 0;

    var gender = "";
    if (NICNo.length != 10 && NICNo.length != 12) {
        // console.log(NICNo);
        $("#error").html("Invalid NIC NO");
    } else if (NICNo.length == 10 && !$.isNumeric(NICNo.substr(0, 9))) {
        $("#error").html("Invalid NIC NO");
        // console.log("e2");
    }
    else {
        // Year
        if (NICNo.length == 10) {
            year = "19" + NICNo.substr(0, 2);
            dayText = parseInt(NICNo.substr(2, 3));
        } else {
            year = NICNo.substr(0, 4);
            dayText = parseInt(NICNo.substr(4, 3));
        }

        // Gender
        if (dayText > 500) {
            gender = "Female";
            dayText = dayText - 500;
        } else {
            gender = "Male";
        }

        // Day Digit Validation
        if (dayText < 1 && dayText > 366) {
            $("#error").html("Invalid NIC NO");
        } else {

            //Month
            if (dayText > 335) {
                day = dayText - 335;
                month = "December";
                monthInt = 12;
            }
            else if (dayText > 305) {
                day = dayText - 305;
                month = "November";
                monthInt = 11;
            }
            else if (dayText > 274) {
                day = dayText - 274;
                month = "October";
                monthInt = 10;
            }
            else if (dayText > 244) {
                day = dayText - 244;
                month = "September";
                monthInt = 9;
            }
            else if (dayText > 213) {
                day = dayText - 213;
                month = "August";
                monthInt = 8;
            }
            else if (dayText > 182) {
                day = dayText - 182;
                month = "July";
                monthInt = 7;
            }
            else if (dayText > 152) {
                day = dayText - 152;
                month = "June";
                monthInt = 6;
            }
            else if (dayText > 121) {
                day = dayText - 121;
                month = "May";
                monthInt = 5;
            }
            else if (dayText > 91) {
                day = dayText - 91;
                month = "April";
                monthInt = 4;
            }
            else if (dayText > 60) {
                day = dayText - 60;
                month = "March";
                monthInt = 3;
            }
            else if (dayText < 32) {
                month = "January";
                monthInt = 1;
                day = dayText;
            }
            else if (dayText > 31) {
                day = dayText - 31;
                month = "Febuary";
                monthInt = 2;
            }

            // console.log(year);
            // console.log(month);
            // console.log(day);

        }
    }

    // console.log(no);
    var tbody = document.getElementById('tbody1');

    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    td1.innerHTML = no;
    td2.innerHTML = id;

    const currentDate = Date.now();
    const d = new Date(currentDate)
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth()

    var ageYear = currentYear - year;
    var ageMonth = currentMonth - monthInt;

    if (ageMonth < 0) {
        ageMonth = 12 + ageMonth;
        ageYear--;
    }

    // console.log(currentMonth)

    td3.innerHTML = ageYear + " years " + ageMonth + " months ";
    // console.log("y2 " + year);

    // td3.innerHTML = year;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}


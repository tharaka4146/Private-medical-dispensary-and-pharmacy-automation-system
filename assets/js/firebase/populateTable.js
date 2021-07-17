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
                    var no = CurrentRecord.val().no;
                    var isExamined = CurrentRecord.val().isExamined;
                    // console.log(d2.getFullYear());
                    if (isExamined == false && d2.getFullYear() == year && d2.getDate() == day) {
                        if (availablePatients == 0) {
                            currentPatient = no;
                            document.getElementById('currentPatient').innerHTML = currentPatient
                        }
                        availablePatients++;
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
                document.getElementById('remainingPatientCount').innerHTML = availablePatients
                // console.log("time t");
                display_c();
            }

        });
}

window.onload = SelectAllData;

function AddItemsToTable(id, dateTime, no) {
    // console.log(no);
    var tbody = document.getElementById('tbody1');

    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    td1.innerHTML = no;
    td2.innerHTML = id;
    td3.innerHTML = dateTime;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}


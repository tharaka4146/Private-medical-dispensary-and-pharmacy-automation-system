const nicInput = document.getElementById("nicType");
const enqueue = document.getElementById("enqueue");
const nameType = document.getElementById("nameType");
const addressType = document.getElementById("addressType");

const addNewPatient = document.getElementById("addNewPatient");


const database = firebase.database();
let no = 0;
let isNicAvailable = false;
const currentDate = Date.now();


var patientNo = database.ref("queue");

patientNo.orderByChild("dateTime").limitToLast(1).on("value", function (snapshot) {
    snapshot.forEach(
        function (CurrentRecord) {
            var dateTime = CurrentRecord.val().dateTime;
            const d2 = new Date(currentDate)
            const dateTime2 = new Date(dateTime)
            console.log(dateTime2.getFullYear())
            if (d2.getFullYear() == dateTime2.getFullYear() && d2.getDate() == dateTime2.getDate()) {
                no = CurrentRecord.val().no;
            }
        }
    );
});

enqueue.addEventListener('click', (e) => {
    if (nicInput.value.toString().trim() != "") {

        function isAvailable() {

            isNicAvailable = false;

            firebase.database().ref('queue').orderByChild('nic').equalTo(nicInput.value.toString().trim()).on('value',
                function (AllRecords) {
                    AllRecords.forEach(
                        function (CurrentRecord) {
                            isNicAvailable = true;
                            return true
                        }
                    );
                    return false
                }
            );
        }

        isAvailable();

        if (isNicAvailable == true) {

            e.preventDefault();

            const currentDate = Date.now();

            database.ref('/queue/' + currentDate).set({
                nic: nicInput.value.toString().trim(),
                dateTime: currentDate,
                no: ++no,
                isExamined: false,
            });

            document.getElementById("nicType").value = "";

            md.showNotificationPatientAdded('top', 'center')
        } else {
            e.preventDefault();
            $('#exampleModalCenter').modal('show');
        }
    } else {
        e.preventDefault();
    }
});


addNewPatient.addEventListener('click', (e) => {

    if (nameType.value.toString().trim() != "" && addressType.value.toString().trim() != "") {

        const currentDate = Date.now();

        database.ref('/patient/' + currentDate).set({
            nic: nicInput.value.toString().trim(),
            dateTime: currentDate,
            name: nameType.value.toString().trim(),
            address: addressType.value.toString().trim(),
        });

        database.ref('/queue/' + currentDate).set({
            nic: nicInput.value.toString().trim(),
            dateTime: currentDate,
            no: ++no,
            isExamined: false,
        });

        document.getElementById("nicType").value = "";
        document.getElementById("nameType").value = "";
        document.getElementById("addressType").value = "";

        addNewPatientModelClose.click();

        md.showNotificationPatientAdded('top', 'center')
        // isNicAvailable = false;
    }
    else {
        e.preventDefault();
    }

});
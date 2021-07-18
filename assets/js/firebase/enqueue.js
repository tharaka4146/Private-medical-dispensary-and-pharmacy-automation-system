const nicInput = document.getElementById("nicType");
const enqueue = document.getElementById("enqueue");
const nameType = document.getElementById("nameType");
const addressType = document.getElementById("addressType");

const addNewPatient = document.getElementById("addNewPatient");


const database = firebase.database();
let no = 0;
let isNicAvailable = false;

enqueue.addEventListener('click', (e) => {

    if (nicInput.value.toString().trim() != "") {
        function isAvailable() {
            firebase.database().ref('patient').on('value',
                function (AllRecords) {
                    AllRecords.forEach(
                        function (CurrentRecord) {
                            var nicAvailable = CurrentRecord.val().nic;
                            if (nicInput.value == nicAvailable) {
                                // console.log(nicAvailable)
                                // console.log(nicInput.value)
                                // console.log("okkk");
                                isNicAvailable = true;
                            }
                        }
                    );
                });
        }

        isAvailable();
        // console.log(isNicAvailable)

        if (isNicAvailable == true) {

            e.preventDefault();

            const currentDate = Date.now();

            var patientNo = database.ref("queue");
            patientNo.orderByChild("no").limitToLast(1).on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    // console.log(data.val().no); // "Anrzej"
                    no = data.val().no;
                    // console.log(no);
                });
            });

            database.ref('/queue/' + currentDate).set({
                nic: nicInput.value.toString().trim(),
                dateTime: currentDate,
                no: ++no,
                isExamined: false,
            });

            document.getElementById("nicType").value = "";

            md.showNotificationPatientAdded('top', 'center')
            isNicAvailable = false;
        } else {
            e.preventDefault();
            $('#exampleModalCenter').modal('show');

        }
    } else {
        e.preventDefault();
        alert("asd");
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

        // let no = 0;
        var patientNo = database.ref("queue");

        patientNo.orderByChild("no").limitToLast(1).on("value", function (snapshot) {
            snapshot.once(function (data) {
                // console.log(data.val().no); // "Anrzej"
                no = data.val().no;
                // break;
                // console.log(no);
            });
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
        isNicAvailable = false;
    }
    else {
        alert("sad");
    }

});
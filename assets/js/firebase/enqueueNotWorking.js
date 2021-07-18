const nicInput = document.getElementById("nicType");
const enqueue = document.getElementById("enqueue");

const nameType = document.getElementById("nameType");
const addressType = document.getElementById("addressType");
const newPatient = document.getElementById("newPatient");
const addNewPatient = document.getElementById("addNewPatient");
const addNewPatientModelClose = document.getElementById("addNewPatientModelClose");


const database = firebase.database();

enqueue.addEventListener('click', (e) => {

    let isNicAvailable = false;
    let no = 0;


    function isAvailable() {
        firebase.database().ref('patient').on('value',
            function (AllRecords) {
                AllRecords.forEach(
                    function (CurrentRecord) {
                        var nicAvailable = CurrentRecord.val().nic;
                        // console.log("-----" + nicAvailable)
                        if (nicInput.value == nicAvailable) {
                            // console.log("okkk");
                            isNicAvailable = true;
                        }
                    }
                );
            });
    }


    isAvailable();

    console.log(isNicAvailable)

    if (isNicAvailable == true) {

        console.log("if")

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
            nic: nicInput.value,
            dateTime: currentDate,
            no: ++no,
            isExamined: false,
        });

        document.getElementById("nicType").value = "";

        md.showNotificationPatientAdded('top', 'center')

    } else {

        console.log("else")

        e.preventDefault();

        $('#exampleModalCenter').modal('show');

        temp();
        //patient database
        function temp() {
            addNewPatient.addEventListener('click', (e) => {

                console.log("add new patient clicked");

                const currentDate = Date.now();

                database.ref('/patient/' + currentDate).set({
                    nic: nicInput.value,
                    dateTime: currentDate,
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
                    nic: nicInput.value,
                    dateTime: currentDate,
                    no: ++no,
                    isExamined: false,
                });

                document.getElementById("nicType").value = "";
                document.getElementById("nameType").value = "";
                document.getElementById("addressType").value = "";

                // addNewPatientModelClose.click();

                md.showNotificationPatientAdded('bottom', 'center')

                console.log("else before end");
            });
        }
        console.log("else end")




    }
});

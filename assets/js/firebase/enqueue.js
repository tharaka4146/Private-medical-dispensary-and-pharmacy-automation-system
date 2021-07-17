const nicInput = document.getElementById("nicType");
const enqueue = document.getElementById("enqueue");

const database = firebase.database();

enqueue.addEventListener('click', (e) => {

    let isNicAvailable = false;


    function isAvailable() {
        firebase.database().ref('queue').on('value',
            function (AllRecords) {
                AllRecords.forEach(
                    function (CurrentRecord) {
                        var nicAvailable = CurrentRecord.val().nic;
                        // console.log(nicInput.value)
                        if (nicInput.value == nicAvailable) {
                            // console.log("okkk");
                            isNicAvailable = true;
                        }
                    }
                );
            });
    }

    isAvailable();
    if (isNicAvailable == true) {
        console.log("okayyyy")

        e.preventDefault();

        const currentDate = Date.now();

        let no = 0;
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
        e.preventDefault();


        document.getElementById("nicType").value = "";
        // md.showNotificationPatientAdded('top', 'center')
    }
});

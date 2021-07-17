const nic = document.getElementById("nic");
const enqueue = document.getElementById("enqueue");

const database = firebase.database();

enqueue.addEventListener('click', (e) => {
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
        nic: nic.value,
        dateTime: currentDate,
        no: ++no,
        isExamined: false,
    });
    document.getElementById("nic").value = "";
});

// database.collection('queue').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         // if(change.type == 'added'){
//         //     renderCafe(change.doc);
//         // } else if (change.type == 'removed'){
//         //     let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//         //     cafeList.removeChild(li);
//         // }
//     });
// });

    /*
    const d = new Date(currentDate)
    sxsx
    const year = d.getFullYear()
    const month = d.getMonth()
    const date = d.getDate()
    
    const hours = d.getHours()
    const minutes = d.getMinutes()
    
    const dateTime = d.toLocaleString()
    console.log(dateTime)
    
    */
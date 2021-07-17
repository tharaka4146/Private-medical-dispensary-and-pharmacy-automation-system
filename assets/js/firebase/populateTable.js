function SelectAllData() {

    firebase.database().ref('queue').on('value',
        function (AllRecords) {
            $("#tbody1 tr").remove();
            AllRecords.forEach(
                function (CurrentRecord) {
                    var id = CurrentRecord.val().nic;
                    var dateTime = CurrentRecord.val().dateTime;
                    var no = CurrentRecord.val().no;
                    var isExamined = CurrentRecord.val().isExamined;
                    // console.log(no);
                    if (isExamined == false) {
                        AddItemsToTable(id, dateTime, no);
                    }
                }
            );
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
    // console.log(id);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    tbody.appendChild(trow);

}
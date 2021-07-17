(function () {
  const config = {
    //YOUR CONFIGS

    apiKey: "AIzaSyBtuqHPRsAPaeJ744xIkjlfDzNfV7V1N7I",
    authDomain: "private-medical-dispensary.firebaseapp.com",
    databaseURL: "https://private-medical-dispensary-default-rtdb.firebaseio.com",
    projectId: "private-medical-dispensary",
    storageBucket: "private-medical-dispensary.appspot.com",
    messagingSenderId: "230214242377",
    appId: "1:230214242377:web:cdd4a6537b49660d202f98"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  firebase.initializeApp(config);
  const bigTextEvaluationStudents = document.getElementById('queue');
  const dbBigTextEvaluationStudentsRef = firebase.database().ref().child('queue');
  dbBigTextEvaluationStudentsRef.on('value', snap => bigTextEvaluationStudents.innerText = snap.val());

  var table = document.querySelector('#table1 tbody');
  const dbEvaluationStudentsRef = firebase.database().ref().child('nic');
  dbEvaluationStudentsRef.on('value', snap => {
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }

    var students = snap.val();
    for (var i in students) {
      var row = table.insertRow(-1);
      for (var j in students[i]) {
        cell = row.insertCell(-1);
        cell.innerHTML = students[i][j];
      }
    }
  });
}());

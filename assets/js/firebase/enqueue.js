const nic = document.getElementById("nic");
const enqueue = document.getElementById("enqueue");

const database = firebase.database();

enqueue.addEventListener('click', (e) => {
    e.preventDefault();

    database.ref('/users/' + nic.value).set({
        nic: nic.value
    });
});
const nic = document.getElementById("nic");
const enqueue = document.getElementById("enqueue");

const database = firebase.database();

enqueue.addEventListener('click', (e) => {
    e.preventDefault();

    const currentDate = Date.now();

    /*
        const d = new Date(currentDate)
    
        const year = d.getFullYear()
        const month = d.getMonth()
        const date = d.getDate()
    
        const hours = d.getHours()
        const minutes = d.getMinutes()
    
        const dateTime = d.toLocaleString()
        console.log(dateTime)
    
        */
    database.ref('/queue/' + nic.value).set({
        nic: nic.value,
        dateTime: currentDate
    });

});
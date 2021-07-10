const id = document.getElementById('id');
const btn = document.getElementById('btn');

const database = firebase.database();

btn.addEventListener('click', (e) => {
    window.alert('sdfsdf');
    e.preventDefault();
    database.ref('/users/' + id.value).set({
        id: id.value
    });
});
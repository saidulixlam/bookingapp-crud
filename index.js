const form = document.getElementById('my-form');
const submit = document.getElementById('btn');
const list = document.getElementById('list');
submit.addEventListener('click', addUser);
var userId;

function addUser(e) {
    e.preventDefault();
    namee = document.getElementById('name').value;
    email = document.getElementById('email').value;
    number = document.getElementById('number').value;

    const user = {
        namee,
        email,
        number
    }

    if (submit.innerText === 'Update') {
        axios.put(`https://crudcrud.com/api/d3c0440b2d434c6d8766be07f0273402/form/${userId}`, user)
            .then((res) => {
                console.log(res);
                removeItem(userId);
            }).catch((err) => {
                console.log(err);
            })
        //

    } else {
        axios.post(`https://crudcrud.com/api/d3c0440b2d434c6d8766be07f0273402/form`, user)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }
    displayUser(user);
    clearuserInput();
    submit.value = "Submit"
    submit.innerText = "Submit"
    submit.style.background="grey"
}

window.addEventListener('DOMContentLoaded', (e) => {
    axios.get("https://crudcrud.com/api/d3c0440b2d434c6d8766be07f0273402/form")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                displayUser(res.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        })
})

function displayUser(user) {
    let li = `<li id=${user._id}> ${user.namee} - ${user.email} - ${user.number}
     <button onclick=deleteUser('${user._id}')>Delete User</button>
     <button onclick=editUser('${user._id}','${user.namee}','${user.email}','${user.number}')>Edit User</button>
     </li>`

    list.innerHTML = list.innerHTML + li;
}

function removeItem(userId) {
    const elm = document.getElementById(userId);
    list.removeChild(elm);
}
function deleteUser(id) {
    axios.delete(`https://crudcrud.com/api/d3c0440b2d434c6d8766be07f0273402/form/${id}`)
        .then((res) => {
            console.log('delete');
        }).catch((err) => {
            console.log(err);
        })
    removeItem(id);
}
function editUser(id, name, email, number) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('number').value = number;
    userId = id;

    submit.value = "Update";
    submit.style.background = "green";
}
function clearuserInput() {
    document.getElementById('name').value = ' ';
    document.getElementById('email').value = ' ';
    document.getElementById('number').value = ' ';
}
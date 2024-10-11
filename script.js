let url = 'https://66e8219eb17821a9d9db8120.mockapi.io/tableOfUser'

async function getMessage() {
    try {
        const {data} = await axios.get(url)
        get(data);
    } catch (error) {
        console.log(error);
    }
}
getMessage()

let mes = document.querySelector(".mes")

function get(data) {
    mes.innerHTML =""
    data.forEach((e) => {
        let id = document.createElement("p")
        id.innerHTML = e.id;
        let pass = document.createElement("p")
        pass.innerHTML = e.pass
        let nameOfUser = document.createElement("h5")
        nameOfUser.innerHTML = e.nameOfUser
        nameOfUser.classList.add("add")
        let btnDelete = document.createElement("button")
        btnDelete.innerHTML = "delete"
        btnDelete.classList.add("btndel")
        btnDelete.onclick = () => {
            deleteUser(e.id)
            alert("Delete message sucssesfuly")
        }
        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "edit"
        btnEdit.classList.add("edit")
        btnEdit.onclick = () => {
        console.log(e);
        editUser.showModal()
        openModalEdit(e)
        }
        let divs = document.createElement("div")
        let message = document.createElement("h4")
        message.innerHTML = e.message;
        message.classList.add("messege")
        divs.classList.add("divs")
        divs.append(message,btnDelete,btnEdit)
        mes.append(divs)
    });
}


// addUser

async function postmessege(user) {
    try {
        await axios.post(url,user)
        getMessage()
    } catch (error) {
        console.error(error);
        
    }
}
let inpText = document.querySelector(".inpText")
let btnShare = document.querySelector(".btnShare")
let formadd = document.querySelector(".formadd")

formadd.onsubmit = (event) =>{
    event.preventDefault()
    let user = {
        message : formadd["inpText"].value,
    }
    postmessege(user)
    formadd.reset()
}

// Registration

let inpEmail = document.querySelector(".inpEmail")
let inpPass = document.querySelector(".inpPass")
let btnRegister = document.querySelector(".btnRegister")
let btnLogin = document.querySelector(".btnLogin")
let dialogChat = document.querySelector(".dialogChat")


// btnRegister.onclick = () =>{
//     let users = {
//         nameOfUser: inpEmail.value,
//         pass : inpPass.value,
//     }
//     postmessege(users)
//     dialogChat.showModal()
// }

let editUserForm = document.querySelector(".editUserForm")
// let input = document.createElement("input")
let editUser = document.querySelector(".editUser")
let btnSave = document.querySelector(".btnSave")
btnSave.onclick = () => {
    editUser.close()
}
function openModalEdit(e) {
    editUserForm['inpTitle'].value = e.message

    editUserForm.onsubmit = async (eve) => {
        eve.preventDefault();
        try {
            await axios.put(`${url}/${e.id}`, {
              message: editUserForm['inpTitle'].value
            });
            getMessage(); 
            } catch (error) {
            console.error(error);
        }
    };
}


// Delte user

async function deleteUser(id) { 
    try {
        await axios.delete(`${url}/${id}`)
        getMessage()
        console.log(id);
    } catch (error) {
        console.error(error);
        
    }
  }
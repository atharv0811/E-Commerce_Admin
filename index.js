let submit = document.getElementById("submit");
let amount = document.getElementById("amount");
let pName = document.getElementById("pName");
let table = document.getElementById("table");
let tableBody = document.getElementById("tableBody");
let total = document.getElementById("total");
let sum = 0;

submit.addEventListener("click", (e => {
    e.preventDefault();
    if (amount.value == "" || pName.value == "") {
        alert("fill the values")
    }
    else {
        let data = ({
            "amount": amount.value,
            "pName": pName.value
        })
        axios.post('https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/e-commerce', data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            showUser(res.data)
            findTotalAmount(parseInt(data["amount"]), "add")
        }).catch(err => console.log(err));
    }
}));
function showUser(data) {
    let infoParsed = data;
    let tr = document.createElement("tr");
    tr.setAttribute("userid", infoParsed._id);
    let td1 = document.createElement("td");
    td1.className = "td1";
    td1.appendChild(document.createTextNode(infoParsed["amount"] + " "));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td1.className = "td2";
    td2.appendChild(document.createTextNode(infoParsed["pName"] + " "));
    tr.appendChild(td2);



    let td3 = document.createElement("td");
    td1.className = "td3";
    var delbutton = document.createElement('button');
    delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
    delbutton.appendChild(document.createTextNode("X"));

    td3.appendChild(delbutton)
    tr.appendChild(td3)
    tableBody.appendChild(tr);
    amount.value = "";
    pName.value = "";
}

tableBody.addEventListener("click", del);
function del(e) {
    if (e.target.classList.contains('delete')) {
        let ParEle = e.target.parentElement.parentElement;
        let userId = ParEle.getAttribute("userid");
        axios.delete(`https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/e-commerce/${userId}`).then(() => {
            let textContent = ParEle.textContent.split(" ")
            findTotalAmount(parseInt(textContent[0]), 'sub')
            tableBody.removeChild(ParEle)
        }).catch(err => console.log(err))
    }
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/e-commerce').then(res => {
        for (let i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
    }).catch(err => console.log(err))
})

function findTotalAmount(totalAmount, type) {
    if (type === "add") {
        sum = sum + totalAmount;
    }
    else {
        if (sum != 0) {
            sum = sum - totalAmount;
        }
    }
    total.textContent = "Total Amount of Products is Rs." + sum;
}
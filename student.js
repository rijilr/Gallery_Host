storage = window.localStorage;
function createArrays() {
    if (!(storage.getItem("student_array"))) {
        storage.setItem("student_array", "[]");
        storage.setItem("employee_array", "[]");
    }
}
$.fn.serializeObject = function () {
    var object = {};
    var array = this.serializeArray();
    array.forEach( element =>
        object[element.name] = element.value
    )
    return object;
};
function addData(array, table) {
    let node = JSON.parse(storage.getItem(array));
    let object = $('.std-form').serializeObject();
    let name, id, standard, guardian, phone = object;
    let rows = `<tr><td>${name}</td><td>${id} </td><td> ${standard} </td><td> ${guardian} </td><td>${phone} </td><td><a class="waves-effect waves-light btn" onclick="removeItem(${node.length},'${array}','${table}');"><i class="material-icons">backspace</i></a></td><td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="editItem(${node.length},'${array}','${table}')"><i class="material-icons">edit</i></a></td></tr>`;
    $(rows).appendTo(table);
    node.push(object);
    storage.setItem(array, JSON.stringify(node));
    loadTableData(array, table);
    return false;
}
function loadTableData(array, table) {
    let node = JSON.parse(storage.getItem(array));
    var list = document.getElementById(table);
    var child = list.lastElementChild;
    while (child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }
    node.forEach(element => {
        let object = element;
        let { name, id, standard, guardian, phone } = object;
        let rows = `<tr><td> ${name}  </td><td>  ${id} </td><td> ${standard} </td><td> ${guardian} </td><td>${phone} </td><td><a class="waves-effect waves-light btn" onclick="removeItem(${node.indexOf(element)},'${array}','${table}')"><i class="material-icons">backspace</i></a></td><td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="editItem(${node.indexOf(element)},'${array}','${table}');"><i class="material-icons">edit</i></a></td></tr>`;
        $(rows).appendTo(list);
    })
}
function removeItem(key, array, table) {
    let node = JSON.parse(storage.getItem(array));
    node.splice(key, 1);
    storage.setItem(array, JSON.stringify(node));
    loadTableData(array, table);
}
function searchItem(value, table) {
    let filter = value.toUpperCase();
    table = document.getElementById(table);
    tr = table.getElementsByTagName("tr");
    var found = true;
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}
function editItem(key, array, table) {
    let node = JSON.parse(storage.getItem(array));
    var i = 0;
    let object = node[key];
    for (let property in object) {
        document.forms[0][i].value = object[property];
        i++;
    }
    let buttonElement = null;
    if (array == "student_array") {
        document.getElementById('std_submit').style = "display:none;";
        document.getElementById('std_update').style = "display:block;";
        document.getElementById('employee_submit').style = "display:none;";
        document.getElementById('employee_update').style = "display:none;";
        buttonElement = document.getElementById('std_update');
    }
    else {
        document.getElementById('std_submit').style = "display:none;";
        document.getElementById('std_update').style = "display:none;";
        document.getElementById('employee_submit').style = "display:none;";
        document.getElementById('employee_update').style = "display:block;";
        buttonElement = document.getElementById('employee_update');
    }
    buttonElement.addEventListener('click', {
        handleEvent: function (event) {
            test = (($('.std-form').serializeObject()));
            node[key] = test;
            storage.setItem(array, JSON.stringify(node));
            loadTableData(array, table);
        }
    });
}
function sortItem(item, array, table) {
    let node = JSON.parse(storage.getItem(array));
    let sorted_array = node.sort(function (a, b) {
        if (isNaN(a[item])) {
            if (a[item].toLowerCase() < b[item].toLowerCase()) { return -1; }
            else { return 1; }
        }
        else {
            return parseInt(a[item]) - parseInt(b[item]);
        }
    })
    storage.setItem(array, JSON.stringify(sorted_array));
    loadTableData(array, table);
}
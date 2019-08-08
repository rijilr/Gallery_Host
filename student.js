storage = window.localStorage;
window.onload = createArrays();
const student_node = JSON.parse(storage.getItem("student_array"));
function createArrays(){
    if(!(storage.getItem("student_array"))){
        storage.setItem("student_array", "[]");
        storage.setItem("employee_array", "[]");
    }
}
$.fn.serializeObject = function()
{
    var object = {};
    var array = this.serializeArray();
    $.each(array, function() {
        if (object[this.name] !== undefined) {
            // if (!object[this.name].push) {
            //     object[this.name] = [object[this.name]];
            // }
            object[this.name].push(this.value || '');
        } else {
            object[this.name] = this.value || '';
        }
    });
    return object;
};
$(function() {
    $('.std-form').submit(function() {
        let object = /*JSON.stringify*/($('.std-form').serializeObject());
        let name = object.name;
        let student_id = object.studentid;
        let standard = object.standard;
        let guardian = object.guardian;
        let phone = object.phone;
        let rows = `<tr><td> ${name}  </td><td>  ${student_id} </td><td> ${standard} </td><td> ${guardian} </td><td>${phone} </td><td><a class="waves-effect waves-light btn" onclick="removeItem(${student_node.length});"><i class="material-icons">backspace</i></a></td><td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="editItem(${student_node.length}); "><i class="material-icons">edit</i></a></td></tr>`;
        $(rows).appendTo("#std_tbody");
        console.log(student_node);
        student_node.push(object);
        storage.setItem("student_array",JSON.stringify(student_node));
        //location.reload(); 
        return false;
    });
});
function loadTableData(){
    var list = document.getElementById("std_tbody");
    var child = list.lastElementChild;  
        while (child) { 
            list.removeChild(child); 
            child = list.lastElementChild; 
        } 
    student_node.forEach(element => {
        let object = element;
        console.log(object.name);
        let name = object.name;
        let student_id = object.studentid;
        let standard = object.standard;
        let guardian = object.guardian;
        let phone = object.phone;
        let rows = `<tr><td> ${name}  </td><td>  ${student_id} </td><td> ${standard} </td><td> ${guardian} </td><td>${phone} </td><td><a class="waves-effect waves-light btn" onclick="removeItem(${student_node.indexOf(element)})"><i class="material-icons">backspace</i></a></td><td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="editItem(${student_node.indexOf(element)});"><i class="material-icons">edit</i></a></td></tr>`;
        $(rows).appendTo("#std_tbody");
    })
    }
function removeItem(key){
    student_node.splice(key,1);
    storage.setItem("student_array",JSON.stringify(student_node));
    loadTableData();
}
function searchItem(value){
    let filter = value.toUpperCase();
    table = document.getElementById("std_table");
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
    console.log(test);
}
function editItem(key){
    var i=0;
    let object = student_node[key];
    console.log(object);
    for(let property in object ){
        document.forms[0][i].value = object[property];
        i++;
    }
    document.getElementById('std_submit').style = "display:none;";
    document.getElementById('std_update').style = "display:block;";
    const buttonElement = document.getElementById('std_update');
    buttonElement.addEventListener('click', {
        handleEvent: function (event) {
                test = (($('.std-form').serializeObject()));
                student_node[key]=test;
                storage.setItem("student_array",JSON.stringify(student_node));
                loadTableData();
            }
        });
}
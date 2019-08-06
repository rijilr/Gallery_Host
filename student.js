storage = window.localStorage;
$.fn.serializeObject = function()
{
    var object = {};
    var array = this.serializeArray();
    $.each(array, function() {
        if (object[this.name] !== undefined) {
            if (!object[this.name].push) {
                object[this.name] = [object[this.name]];
            }
            object[this.name].push(this.value || '');
        } else {
            object[this.name] = this.value || '';
        }
    });
    return object;
};
var test = {};
var i=storage.length;
$(function() {
    $('.std-form').submit(function() {
        test = JSON.stringify(($('.std-form').serializeObject()));
        storage.setItem(i, test);
        i++;
        location.reload(); 
        return false;
    });
});
function loadTableData(){
    for (var key in localStorage){
        console.log(key);
        var obj = storage.getItem(key);
        var object = JSON.parse(obj);
        let name = object.name;
        let student_id = object.studentid;
        let standard = object.standard;
        let guardian = object.guardian;
        let phone = object.phone;
        let rows = `<tr><td> ${name}  </td><td>  ${student_id} </td><td> ${standard} </td><td> ${guardian} </td><td>${phone} </td><td><a class="waves-effect waves-light btn" onclick="storage.removeItem(${key});location.reload();"><i class="material-icons">backspace</i></a></td><td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="ediItem(${key});"><i class="material-icons">edit</i></a></td></tr>`;
        $(rows).appendTo("#std_tbody");
    }
}
function ediItem(key){
    let obj = storage.getItem(key);
    let object = JSON.parse(obj);
    let i=0;
    for(let property in object ){
        document.forms[0][i].value = object[property];
        i++;
    }
    document.getElementById('std_submit').style = "display:none;";
    document.getElementById('std_update').style = "display:block;";
    const buttonElement = document.getElementById('std_update');
    buttonElement.addEventListener('click', {
        handleEvent: function (event) {
                test = JSON.stringify(($('.std-form').serializeObject()));
                storage.setItem(key, test);
                location.reload();
            }
      });
}
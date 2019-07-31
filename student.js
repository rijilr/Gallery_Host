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
var i=1;
$(function() {
    $('.std-form').submit(function() {
        test = JSON.stringify(($('.std-form').serializeObject()));
        storage.setItem(i, test);
        i++;
        console.log(i);
        addData();
        return false;
    });
});
var rows = "";
function addData(){
    for(var ind=1;ind <i; ind++){
        var object = JSON.parse(storage.getItem(i));
        console.log(object);
        var name = document.getElementById("name").value;
        var student_id = document.getElementById("std-id").value;
        var standard = document.getElementById("standard").value;
        var guardian = document.getElementById("guardian").value;
        var phone = document.getElementById("phone").value;

        rows += "<tr><td>" + name + "</td><td>" + student_id + "</td><td>" + standard + "</td><td>" + guardian +"</td><td>"+ phone +"</td></tr>";
        $(rows).appendTo("#std_tbody");
    }
}
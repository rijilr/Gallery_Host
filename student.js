$(document).ready(function(){
    $("form").click(function(){
    var data = $("form").serialize().split("&");
    console.log(data);
    var obj={};
    for(var key in data)
    {
        console.log(data[key]);
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

    console.log(obj);
    });
});
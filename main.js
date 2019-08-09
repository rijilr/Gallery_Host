M.AutoInit();
$(document).ready(function(){
    $('.tooltipped').tooltip();
  });
const displayedImage = document.querySelector(".displayed-image");

const thumbBar = document.querySelector(".thumbnail");
for(let i = 1; i <= Object.keys(path.pic).length; i++) {
    var divImage = document.createElement('div')
    divImage.className = "thumb-image waves-effect";
    var newImage = document.createElement('img');
    newImage.setAttribute('class',"tooltipped");
    newImage.setAttribute('data-position',"top");
    newImage.setAttribute('data-tooltip',"Click to enlarge!");
    newImage.setAttribute('alt',"Thumbnail");
    newImage.setAttribute('src', path.pic[i][0]);
    var test = path.pic[i][0].match(/\d+/)[0];
    divImage.appendChild(newImage);
    thumbBar.appendChild(divImage);
    newImage.onclick = function(e) {
        var imgSrc = e.target.getAttribute('src');
        displayImage(imgSrc);
    }
}
function displayImage(imgSrc) {
    displayedImage.setAttribute('src', imgSrc);
    var id = imgSrc.match(/\d+/)[0];
    displayedImage.setAttribute('data-position',"top");
    displayedImage.setAttribute('data-tooltip',path.pic[id][1]);
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
});
function loadStudentManagement(){
  var ele = document.getElementsByClassName('student_label');
    for (var i = 0; i < ele.length; i++ ) {
      ele[i].style.display = "block"; 
    }
  var ele1 = document.getElementsByClassName('employee_label');
    for (var i = 0; i < ele1.length; i++ ) {
      ele1[i].style.display = "none"; 
  }
  document.getElementById("gallery_main").classList.add("hide");
  document.getElementById("student_management").classList.remove("hide");
  document.getElementById("employee_management").classList.add("hide");
  document.getElementById('std_submit').style = "display:block;";
  document.getElementById('std_update').style = "display:none;";
  document.getElementById('employee_update').style = "display:none;";
  document.getElementById('employee_submit').style = "display:none;";

}
function loadGallery(){
  document.getElementById("gallery_main").classList.remove("hide");
  document.getElementById('student_management').classList.add("hide");
  document.getElementById('employee_management').classList.add("hide");
  
}
function loadEmployeeManagement(){
  var ele = document.getElementsByClassName('student_label');
    for (var i = 0; i < ele.length; i++ ) {
      ele[i].style.display = "none"; 
    }
  var ele1 = document.getElementsByClassName('employee_label');
    for (var i = 0; i < ele1.length; i++ ) {
      ele1[i].style.display = "block"; 
  }
  document.getElementById("gallery_main").classList.add("hide");
  document.getElementById('student_management').classList.add("hide");
  document.getElementById('employee_management').classList.remove("hide");
  document.getElementById('std_submit').style = "display:none;";
  document.getElementById('std_update').style = "display:none;";
  document.getElementById('employee_update').style = "display:none;";
  document.getElementById('employee_submit').style = "display:block;";
  }

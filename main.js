$(document).ready(function(){
    $('.tooltipped').tooltip();
  });
const displayedImage = document.querySelector(".displayed-image");

const thumbBar = document.querySelector(".thumbnail");
for(var i = 1; i <= Object.keys(path.pic).length; i++) {
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


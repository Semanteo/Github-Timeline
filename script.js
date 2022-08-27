function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
let repos = [];
if(getUrlParameter('username') != ''){
    document.getElementById("user").value = getUrlParameter('username');
    document.getElementById(getUrlParameter("radio")).checked = true;
    fetch('https://api.github.com/users/' + getUrlParameter('username') + '/repos')
    .then(async response => {return await response.json()})
    .then(data => {
        data.forEach(repo => {
            repos.push(repo)
        }
        )
    }).then(() => {
      repos.sort(function (a, b) {
        var dateA = new Date(a.created_at.split("T")[0]), dateB = new Date(b.created_at.split("T")[0])
        if (getUrlParameter('radio') == "asc") {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      })
      fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json").then(async res => {return await res.json()})
      .then(data => {
      for(var i = 0; i < repos.length; i++) {
        var li = document.createRange().createContextualFragment(`
        <li>
        <div>
        <time onmouseover="hoverFunc(${i})" onmouseout="outFunc(${i})" onclick='window.open("${repos[i].html_url}", "__blank")'>${repos[i].fork?`<img id="git-fork-${i}" src="./img/git-fork.svg"/>`:""}${repos[i].name} -  ${repos[i].stargazers_count} <img id="git-star-${i}" src='./img/git-star.svg'/></time>
        <p style="color: #0d1117;">Created ${repos[i].created_at.split("T")[0]} - Last update ${repos[i].updated_at.split("T")[0]}</p>
        <p>${repos[i].description?repos[i].description:'No description'}</p>
        <br>
        ${repos[i].language?`<label class="container">
        <span style="background-color:${repos[i].language?data[repos[i].language].color:"#0d1117"};" class="option-input radio"></span>
        ${repos[i].language} </label>
        `:' '}
          </div>
        </li>
        `);
        document.getElementById('timeline').append(li);
      }  
      }).catch(err => {
          console.log(err)
        })
        
      })
    .catch(err => {
      alert(`${getUrlParameter('username')} is not a valid username`);
    })
  }
  else{}

  (function () {
    "use strict";
  
    // define variables
   
  
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function callbackFunc() {
      var items = document.querySelectorAll("li");
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();


function view_on_github(){
    window.open('https://github.com/Semanteo/Github-Timeline', '__blank');
}

function hoverFunc(i){
    if (document.getElementById(`git-star-${i}`)) document.getElementById(`git-star-${i}`).src = "./img/git-star-black.svg";
    if (document.getElementById(`git-fork-${i}`)) document.getElementById(`git-fork-${i}`).src = "./img/git-fork-black.svg";
}

function outFunc(i){
  if (document.getElementById(`git-star-${i}`)) document.getElementById(`git-star-${i}`).src = "./img/git-star.svg";
  if (document.getElementById(`git-fork-${i}`)) document.getElementById(`git-fork-${i}`).src = "./img/git-fork.svg";
}
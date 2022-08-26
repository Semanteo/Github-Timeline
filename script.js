function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
let repos = [];
if(getUrlParameter('username') != ''){
    document.getElementById("user").value = getUrlParameter('username');
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
        return dateA - dateB
      })
      for(var i = 0; i < repos.length; i++) {
        var li = document.createRange().createContextualFragment(`
        <li>
        <div>
        <time>${repos[i].name} - ${repos[i].created_at.split("T")[0]}</time>
        ${repos[i].description?repos[i].description:'No description'}<br>
        ${repos[i].svn_url?`<a id="url" target="__blank" href="${repos[i].svn_url}">Link to repo</a>`:''}
        </div>
        </li>
        `);
        document.getElementById('timeline').append(li);
      }
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
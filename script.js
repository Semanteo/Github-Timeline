function getUrlParameter(name){name=name.replace(/[\[]/,'\\[').replace(/[\]]/,'\\]');var regex=new RegExp('[\\?&]'+name+'=([^&#]*)');var results=regex.exec(location.search);return results===null?'':decodeURIComponent(results[1].replace(/\+/g,' '))}
function getMonth(month){let months={"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"}
return months[month]}
let repos=[];if(getUrlParameter('username')!=''){document.getElementById("user").value=getUrlParameter('username');document.getElementById(getUrlParameter("radio")).checked=!0;fetch('https://api.github.com/users/'+getUrlParameter('username')+'/repos').then(async response=>{return await response.json()}).then(data=>{data.forEach(repo=>{repos.push(repo)})}).then(()=>{repos.sort(function(a,b){var dateA=new Date(a.created_at.split("T")[0]),dateB=new Date(b.created_at.split("T")[0])
if(getUrlParameter('radio')=="asc"){return dateA-dateB}else{return dateB-dateA}})
fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json").then(async res=>{return await res.json()}).then(data=>{let year_to=repos[0].created_at.split("-")[0];let month_to=repos[0].created_at.split("-")[1];for(var i=0;i<repos.length;i++){let repo_year=repos[i].created_at.split("-")[0];let repo_month=repos[i].created_at.split("-")[1];var li=document.createRange().createContextualFragment(`
        <li>
        <div>
        <time onmouseover="hoverFunc(${i})" onmouseout="outFunc(${i})" onclick='window.open("${repos[i].html_url}", "__blank")'>${repos[i].fork?`<img id="git-fork-${i}" src="./img/git-fork.svg"/>`:""}${repos[i].name} -  ${repos[i].stargazers_count} <img id="git-star-${i}" src='./img/git-star.svg'/></time>
        <p style="color: #0d1117;">Created ${repos[i].created_at.split("T")[0]} - Last update ${repos[i].updated_at.split("T")[0]}</p>
        <p>${repos[i].description?repos[i].description:'No description'}</p>
        <br>
        ${repos[i].language?`<label class="container"><span style="background-color:${repos[i].language?data[repos[i].language].color:"#0d1117"};" class="option-input radio"></span>${repos[i].language}</label>`:' '}
          </div>
        </li>
        `);var year=document.createRange().createContextualFragment(`
        <h1 onclick="addScroll('${repo_year}')" id="${repo_year}" class="containerbackground">
        ${repo_year}
        </h1>
        <p></p>
        `)
var month=document.createRange().createContextualFragment(`
        <h2 onclick="addScroll('${repo_year}-${getMonth(repo_month)}')" id="${repo_year}-${getMonth(repo_month)}" class="containerbackground">
        ${getMonth(repo_month)}
        </h2>
        <p></p>
        `)
if(year_to!=repo_year||i==0){document.getElementById('timeline').append(year);year_to=repo_year}
if(month_to!=repo_month||i==0){document.getElementById('timeline').append(month);month_to=repo_month}
document.getElementById('timeline').append(li)}}).then(()=>{if(getUrlParameter('scroll')!=""){window.scrollTo(document.getElementById(getUrlParameter("scroll")).getBoundingClientRect().left,document.getElementById(getUrlParameter("scroll")).getBoundingClientRect().top)}}).catch(err=>{console.log(err)})}).catch(err=>{alert(`${getUrlParameter('username')} is not a valid username`)})}else{}(function(){"use strict";function isElementInViewport(el){var rect=el.getBoundingClientRect();return(rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth))}
function callbackFunc(){var items=document.querySelectorAll("li");for(var i=0;i<items.length;i++){if(isElementInViewport(items[i])){items[i].classList.add("in-view")}}}
window.addEventListener("load",callbackFunc);window.addEventListener("resize",callbackFunc);window.addEventListener("scroll",callbackFunc)})();function view_on_github(){window.open('https://github.com/Semanteo/Github-Timeline','__blank')}
function hoverFunc(i){if(document.getElementById(`git-star-${i}`))document.getElementById(`git-star-${i}`).src="./img/git-star-black.svg";if(document.getElementById(`git-fork-${i}`))document.getElementById(`git-fork-${i}`).src="./img/git-fork-black.svg"}
function outFunc(i){if(document.getElementById(`git-star-${i}`))document.getElementById(`git-star-${i}`).src="./img/git-star.svg";if(document.getElementById(`git-fork-${i}`))document.getElementById(`git-fork-${i}`).src="./img/git-fork.svg"}
function addScroll(loc){let new_loc=location.search
new_loc=location.search.split("&")[0]+"&"+location.search.split("&")[1]
location.search=`${new_loc}&scroll=${loc}`}
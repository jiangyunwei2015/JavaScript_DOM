//Change picture in html by using setAttribute
function showPic(whichpic)
{
    var source = whichpic.getAttribute("href");//get the source for change
    var placeholder = document.getElementById("placeholder");
    var titletext = whichpic.getAttribute("title");
    //alert(titletext);
    if(source)
        placeholder.setAttribute("src",source);
    //change the text in paragraph
    var description = document.getElementById("description");
    //alert(description.childNodes.length); firstChild equals to childNodes[0]
    //get description and then change the text to picture title
    description.firstChild.nodeValue = titletext;
}
function countBodyChildern()
{
    var body_element = document.getElementsByTagName("body")[0];//only one body tag
    alert(body_element.childNodes.length);//get number of all children in body
}
//window.onload = countBodyChildern


//Now change the function to another way:separate html and js completely
function prepareGallery()
{
    //check if brower support getElementsByTagName?
    if(!document.getElementsByTagName || !document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    //get the href in tag "a"
    var links = gallery.getElementsByTagName("a");
    //traverse the links
    for(var i = 0;i<links.length;i++)
    {
        //when the link is clicked then call the anonymous function to deal with this action
        links[i].onclick = function()
        {
            //Then call showPic
            showPic(this);
            //cancel the default action that the brower dealing with the clicking hyperlink action
            return false;
        }
    }

}
//call function prepareGallery
//prepareGallery();
//Use window.onload
/*
window.onload = function()
{
    prepareGallery();
}
*/
//use addLoadEvent
addLoadEvent(prepareGallery);

function addLoadEvent(func) 
{
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } 
    else 
    {
        window.onload = function() 
        {
            oldonload();
            func();
        }
    }
}

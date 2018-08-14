//Change picture in html by using setAttribute
function showPic(whichpic)
{
    var source = whichpic.getAttribute("href");//get the source for change
    var placeholder = document.getElementById("placeholder");
    
    //alert(titletext);
    if(source)
        placeholder.setAttribute("src",source);
    //Since already remove description in html
    if(!document.getElementById("description")) return false;
    if(whichpic.getAttribute("title"))
    {
        var titletext = whichpic.getAttribute("title");
    }
    else
    {
        var titletext = "";
    }
    //change the text in paragraph
    var description = document.getElementById("description");
    if(description.firstChild.nodeType == 3)
    {
        
        description.firstChild.nodeValue = titletext;
    }
    return false;
    
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
        links[i].onkeypress = links[i].onclick;
    }

}
//Use another way to create HTML elements
function preparePlaceHolder()
{
    //Use createElement,createTextNode,setAttribute to do the work
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.png");
    var text = document.createElement("p");
    text.setAttribute("id","description");
    var destext = document.createTextNode("Choose an image");
    text.appendChild(destext);
    //The last step: add these new created element to document
    document.body.appendChild(placeholder);
    document.body.appendChild(text);
    //Use insertBefore
    var gallery = document.getElementById("imagegallery");
    gallery.parentNode.insertAfter(placeholder,gallery);

}

function insertAfter(newElement,targetElement)
{
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement)
    {
        //just use appendChild
        parent.appendChild(newElement);

    }
    else
    {
        //if not,insert to targetElement's nextSibling
        parent.insertBefore(newElement,targetElement.nextSibling);
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
addLoadEvent(preparePlaceHolder);


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

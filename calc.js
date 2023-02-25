// .clientWidth gets the width of a container
//.offsetHeight gets the height of a container
//window.innerWidth to get width of the entir html document
//window.innerHeight to get the Height of the entire html document

let openHistory = function(){

    document.getElementsByClassName("history")[0].style.animationName = "open";
    document.getElementById("histbut").style.transform = "rotate(-180deg)";
}
let closeHistory = function(){
    document.getElementsByClassName("history")[0].style.animationName = "close";
    document.getElementById("histbut").style.transform = "rotate(0deg)";
}


/*In order to make the calculator always at the center of the webpage we will need to know the height and 
width of both the webpage and the calculator */

let calcBody =  document.querySelector(".calcBody");
// let calcBody = document.getElementsByClassName("calcBody")
let clicker = document.getElementById("clicker");
let wiper = document.getElementById("wiper");
let error = document.getElementById("error");


// function getMargin(){
//     margin = (window.innerWidth - calcWidth)/2 + 'px'
//     console.log(margin);
//     document.getElementsByClassName("calcBody").style.left = `${margin}`
//     console.log(document.getElementsByClassName("calcBody").style.left)
// }
// window.addEventListener('DOMContentLoaded', getMargin());

let display = document.getElementById("display1");
let displaySub = document.getElementById("display2");

display.value = "";
// create a space to store recent calculations
let history = Array(8);
// each recent should contain what was calculated and the result
for ( i = 0; i < history.length; i++){
    history[i] = {
        a : "",
        b : "",
    }
}

//create variables to hold error messages
let errNan = "NaN";
let errSyn = "Syntax Error";
let errUndef = "undefined"

// join the numeral that is clicked to the end 
function add(val){
    // if an error message is displayed
    if( display.value == errNan || display.value == errSyn || display.value == errUndef ){
        // clear the screen before adding a new value
        clearScreen();
    } 
    if (reset){
        display.value = val;
        reset = false;
    } else {
        // otherwise just add the value
        display.value += val;
    }
    clicker.play();
}

function bracket1(){
    display.value += "(";
    clicker.play();
}
function bracket2(){
    display.value += ")";
    clicker.play();
}

// to delete a value on the screen
function removeLast(){

    // clear the screen if it is an error message
    if (display.value == errNan || display.value == errSyn){

        clearScreen();

    } else {
        // otherwise remove the last value on the screen
        let a = display.value;
        display.value =  a.slice(0,-1);

    }
    clicker.play();    
}
function clearScreen(){

    display.value = "";
    displaySub.innerHTML = "";
    wiper.play();
}

let x;
let reset;
// when the equals button is clicked calculate and display the answer
function solve(){
    if ( display.value == "" ){
        return
    }
    try{

        // initialize a variable to the current displayed expression
        x = display.value;
        // initialize another variable to hold the result of the expression
        let y = eval(display.value);
        // output the expression calculated
        displaySub.innerHTML = x;
        // output the result
        display.value = y;  

    }
// when an error occurs display an error and delete the expression entered
    catch(err){
        display.value = errSyn; 
        error.play();
        displaySub.innerHTML = "";
    }
    // if no error occcured store the calculation in history
    if ( displaySub.innerHTML != "" ){
        historyUpdate();
        reset = true;
        clicker.play();
    }    
    return x;
    
}
// to prevent overflow of recent calculations
function historyUpdate(){

    // delete the oldest calculation
    history.pop();
    // add latest calculation
    history.unshift({a : displaySub.innerHTML, b : display.value});
    // re-display recents
    historyRealign();

}

function historyRealign(){
    // display the recent tab
    for (i = 0; i < history.length; i++){
        document.querySelector(`.a.j${i}`).innerText = history[i].a;
        document.querySelector(`.b.j${i}`).innerText = history[i].b;
    } 
}







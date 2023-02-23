// .clientWidth gets the width of a container
//.offsetHeight gets the height of a container
//window.innerWidth to get width of the entir html document
//window.innerHeight to get the Height of the entire html document


/*In order to make the calculator always at the center of the webpage we will need to know the height and 
width of both the webpage and the calculator */

let calcBody =  document.querySelector(".calcBody");
// let calcBody = document.getElementsByClassName("calcBody")


// function getMargin(){
//     margin = (window.innerWidth - calcWidth)/2 + 'px'
//     console.log(margin);
//     document.getElementsByClassName("calcBody").style.left = `${margin}`
//     console.log(document.getElementsByClassName("calcBody").style.left)
// }
// window.addEventListener('DOMContentLoaded', getMargin());

let display = document.getElementById("display1");
let displaySub = document.getElementById("display2");

display.value = 0;
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


// join the numeral that is clicked to the end 
function add(val){
    // if an error message is displayed
    if( display.value == errNan || display.value == errSyn){
        // clear the screen before adding a new value
        clearScreen();
    } 
    if (display.value == 0){
        display.value = val;
    } else {
        // otherwise just add the value
        display.value += val;
    }
}

function bracket1(){
    display.value += "(";
}
function bracket2(){
    display.value += ")"
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
    
}

function clearScreen(){
    display.value = "";
    displaySub.innerHTML = "";
}

let x;
// when the equals button is clicked calculate and display the answer
function solve(){
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
        displaySub.innerHTML = "";
    }
    // if no error occcured store the calculation in history
    if ( displaySub.innerHTML != "" ){
        historyUpdate();
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







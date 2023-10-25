import { elements } from "./data.js";
const myroot = document.getElementById("root");
let maxScore = localStorage.getItem("maxScore") || 0;
let currScore = 0;
let correctAnswer = null;
let currentElement = null;
let currentItem = null ;
let attempts = new Object();
let flipped = [];
const colorPalette = [ "bg-[#EBF875]" ,"bg-[#FE6B35]" ,"bg-[#28CF75]", "bg-[#A0EDFF]"  ,  "bg-[#79FFFE]" , "bg-[#FEC763]" , "bg-[#FDB232]" ]

function showRemainingAttempts(){
    document.getElementById("attempts").innerHTML = attempts[currentItem.name];
}

function closeDialogBox(){
    console.log("clciking close");
    
    var radioButtons = document.getElementsByName("elementSelected");
    for(var i=0;i<radioButtons.length;i++)
    radioButtons[i].checked = false;
    document.getElementById("noChoice").classList.add("hidden")
    document.getElementById("dialogRoot").className = "hidden"
}

function twistElement()
{
    currentElement.classList.remove("bg-[#2C333F]");
    let randomIndex = (Math.ceil(Math.random()*1000)%(colorPalette.length));

    console.log(randomIndex);
    currentElement.classList.add(colorPalette[randomIndex]);

    const symbol = document.createElement('p');
    symbol.innerHTML = currentItem.symbol;
    symbol.className = "text-xl font-bold"

    const number = document.createElement('p');
    number.innerHTML = currentItem.number;
    number.className = "text-[12px] font-bold"
    
    const name = document.createElement('p');
    name.innerHTML = currentItem.name;
    name.className = "text-[9px] font-bold overflow-hidden"
    currentElement.classList.add("text-black" , "flex" ,"flex-col" ,"p-1" )
    currentElement.appendChild(number);
    currentElement.appendChild(symbol);
    currentElement.appendChild(name);
}

function checkAnswer(event){
    document.getElementById("noChoice").classList.add("hidden");
    document.getElementById("result").innerHTML = ""
    event.preventDefault();

    var radioButtons = document.getElementsByName('elementSelected');
   
    let selectedButton = null;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked)
            {
                selectedButton = radioButtons[i].value;
                console.log(selectedButton);
                break;
            }
    }
    if(selectedButton===null)
    {
        document.getElementById("noChoice").classList.remove("hidden")
        return;
    }

    attempts[currentItem.name] = attempts[currentItem.name]-1;
    showRemainingAttempts(currentItem.name);
    if(attempts[currentItem.name] <= 0)
    {
        document.getElementById("submitButton").setAttribute("disabled",true);
        showBanner(`The correct answer was : ${currentItem.name}`)
        setTimeout(()=>{  closeDialogBox()},400);
        setTimeout(()=>{twistElement()},800);
    }
  
    if(selectedButton === correctAnswer)
    {
        document.getElementById("result").classList.remove("text-[#FF0000]")
        document.getElementById("result").classList.add("text-[#28CF75]");
        flipped.push(currentItem.name);
        document.getElementById("result").innerHTML = "You did it Right !";
        setTimeout(()=>{  closeDialogBox()},400);
        setTimeout(()=>{twistElement()},800);
        currScore++;
        if(currScore>maxScore)
        {
            maxScore = currScore;
            localStorage.setItem("maxScore",maxScore);
            // banner
            showBanner("Hurray ! You made new High Score")
        }
        showScore();
    }
    else
    {
        // decrease count
        document.getElementById("result").classList.remove("text-[#28CF75]")
        document.getElementById("result").classList.add("text-[#FF0000]");
        document.getElementById("result").innerHTML = "Oh! No Wrong Answer Try Again"
    }
}
function showBanner(value){
    const banner = document.getElementById("highScoreBroken");
            banner.innerHTML=value
            banner.classList.remove("hidden");
            setTimeout(()=>{
                banner.classList.add("hidden")
            },2000);
}
function generateHints(item){
    const appearance = document.getElementById("appearance");
    const category = document.getElementById("category");
    const atomic = document.getElementById("atomic");
    const number = document.getElementById("number");
    const block = document.getElementById("block");

    category.innerHTML= `I belong to category of ${item.category}`
    if(item.appearance)
    {
    appearance.innerHTML = `I am ${item.appearance}` 
    appearance.classList.remove("hidden");
    }
    else
    appearance.classList.add("hidden");
    atomic.innerHTML = `My Atomic mass is ${(item.atomic_mass).toFixed(2)}`
    number.innerHTML = `My atomic Number is ${item.number}`
    block.innerHTML = `I belong to ${item.block} block. ${item.name}`
}

function generateOptions(item){
    let count = 4;
    const position = Math.floor((Math.random()*4));
    correctAnswer = `option${position+1}`
    console.log(item.name);

    if(position===4)
    position -= 1;

    let arr = [];
    arr[position] = item.name;
    
    for(let i=0;i<4;i++)
    {
        if(i!==position)
        {   
            let option ;
            do{
            let randomIndex = Math.floor( Math.random() * (elements.length-1) );
            option = elements[randomIndex].name;
            }
            while(option === item.name || option === "level1" || option==="level2");
            arr[i] = option;
        }
    }
    

    for(let i=1;i<=4;i++)
    {
        document.getElementById(`label${i}`).innerHTML = arr[i-1];
    }

    const submitButton = document.getElementById("submitButton");
    submitButton.removeEventListener("click", checkAnswer);
    submitButton.addEventListener("click", checkAnswer);
}

function showDialogBox(item){
    if(flipped.includes(item.name))
    {
        return;
    }
    document.getElementById("result").innerHTML=""
    document.getElementById("submitButton").disabled = false;
    if(attempts[item.name]<=0)
    document.getElementById("submitButton").disabled = true;
    currentItem = item;
    const dialogRoot = document.getElementById("dialogRoot");
    dialogRoot.className = "fixed inset-0 z-[1000] overflow-auto bg-white bg-opacity-10 backdrop-blur-sm";
    const closeButton = document.getElementById("close");
    closeButton.removeEventListener("click", closeDialogBox);
    closeButton.addEventListener("click", closeDialogBox);

    showRemainingAttempts(item.name);
    generateHints(item);
    generateOptions(item);
    
}
function showElements()
{
    elements.map((item , index)=>{
        if(item.atomic_mass >= 140.1161 && item.atomic_mass <= 174.96681 || item.atomic_mass >= 231.035882 && item.atomic_mass <= 266)
        return;
        const divElement = document.createElement('div');
        if(item.name === 'level1')
        divElement.className = "w-[88%]"
        else if(item.name === 'level2')
        divElement.className = "w-[55%]"
        else
        {
        divElement.className = `w-[5.50%] text-center border-2 border-black bg-[#2C333F] hover:cursor-pointer hover:scale-95 transition-all duration-300 hover:shadow-[0px_0px_15px_#0F7A9D]`
        divElement.addEventListener("click",()=>{
            currentElement = divElement;
            showDialogBox(item);
        })
        // divElement.innerHTML = item.symbol;
        }
        divElement.classList.add("h-[80px]")
        myroot.appendChild(divElement);
        if(item.name !== "level1" && item.name !== "level1")
        attempts[item.name] = 3;
    })
    document.getElementById("restart").addEventListener("click",()=>{
        location.reload();
    })
}
function showScore(){
    document.getElementById("maxscore").innerHTML = maxScore;
    document.getElementById("currscore").innerHTML = currScore;
}
showScore();
showElements();

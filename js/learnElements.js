import { elements } from "../assets/data/data.js";
let allElements  = [];
let currentIndex = -1;
let currentElement = null;

// Function to display element properties in the table
function displayProperties(listItem , element) {
    if(listItem !== currentElement)
    {
        currentElement?.classList.remove("bg-[#FDB232]" ,"text-black" , "px-1" , "font-bold");
        currentElement = listItem;
        listItem.classList.add("bg-[#FDB232]" , "text-black" , "px-1" , "font-bold");
        for(var i =0;i<allElements.length;i++)
        {
            if(allElements[i].listItem === listItem)
            {
                currentIndex = i;
                break;
            }
        }
        console.log(currentIndex);
    }
    
    document.getElementById("element-properties").classList.remove("hidden") 
    document.getElementById("demo-text")?.remove();
    document.getElementById("elementSymbol").innerText= `${element.symbol}`;
    document.getElementById("elementName").innerText= `${element.name}`;
    document.getElementById("elementAtomicMass").innerText= `${element.atomic_mass}`;
    document.getElementById("elementCategory").innerText= `${element.category}`;
    document.getElementById("elementBlock").innerText= `${element.block}`;
    document.getElementById("elementGroup").innerText= `${element.group}`;
    document.getElementById("elementPeriod").innerText= `${element.period}`;
    document.getElementById("elementAtomicNumber").innerText= `${element.number}`;
    document.getElementById("elementDiscovery").innerText= `${element.discovered_by}`;
    document.getElementById("elementPhase").innerText= `${element.phase}`;
    document.getElementById("elementElectron").innerText= `${element.electron_configuration}`;
    const imageElement = document.createElement("img");
    document.getElementById("imgElem")?.remove();
    imageElement.src = `${element.bohr_model_image}`;
    imageElement.width=150
    imageElement.height = 150
    imageElement.id = "imgElem"
    document.getElementById("elementImg").appendChild(imageElement)
}

// Function to generate the list of elements on the left
function generateElementList() {
    const elementList = document.getElementById("element-list");

       elements.forEach((element) => {
        if(element.name === "level1" ||element.name === "level2" )
        return;
        if(element.atomic_mass >= 140.1161 && element.atomic_mass <= 174.96681 || element.atomic_mass >= 231.035882 && element.atomic_mass <= 266)
        return;
        const listItem = document.createElement("li");
        listItem.textContent = element.name;
        listItem.classList.add("cursor-pointer", "hover:bg-[#FDB232]" ,"hover:font-bold","hover:text-black","hover:px-1","transition-all" , "duration-100" ,"mx-4","text-[17px]" );
        listItem.addEventListener("click", () => {
            displayProperties(listItem , element);
        });
        allElements.push({listItem , element});
        elementList.appendChild(listItem);
    });
}

document.addEventListener('keydown', (event) => {
    if(currentIndex === -1 && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft'||  event.key === 'ArrowRight'))
    {
        displayProperties(allElements[0].listItem ,allElements[0].element );
        return;
    }
    switch (event.key) {
        case 'ArrowUp':
            if (currentIndex > 0) {
                currentIndex--;
                displayProperties(allElements[currentIndex].listItem , allElements[currentIndex].element)
            }
            break;
        case 'ArrowDown':
            if (currentIndex < allElements.length - 1) {
                currentIndex++;
                displayProperties(allElements[currentIndex].listItem , allElements[currentIndex].element)
            }
            break;
        case 'ArrowLeft':
            if(currentIndex-24>0)
            {
                currentIndex-=24;
                displayProperties(allElements[currentIndex].listItem , allElements[currentIndex].element)
            }
            break;
        case 'ArrowRight':
            if(currentIndex+24<allElements.length)
            {
                currentIndex+=24;
                displayProperties(allElements[currentIndex].listItem , allElements[currentIndex].element)
            }
            break;
    }
});

// Initialize the element list
generateElementList();

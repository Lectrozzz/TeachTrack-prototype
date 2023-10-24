import { calculateFee,calculateFeeSum } from "./calculator.js";

function addNode(courseId, courseName, classType, classLocation, classLanguage, studentCount){
    const tr=document.createElement("tr");
    tr.classList.add("itemList");
    
    // add data to the table
    const status=document.createElement("td");
    let tempStatus=document.createElement("input");
    tempStatus.type="checkbox";
    tempStatus.checked=true;
    status.classList.add("table");
    status.classList.add("statusBox");
    status.classList.add("availableBox");
    tempStatus.addEventListener("click", changeStatusColor);
    status.appendChild(tempStatus);
    tr.appendChild(status);

    const id=document.createElement("td");
    id.appendChild(document.createTextNode(courseId));
    tr.appendChild(id);

    const name=document.createElement("td");
    name.appendChild(document.createTextNode(courseName));
    tr.appendChild(name);

    const type=document.createElement("td");
    type.appendChild(document.createTextNode(classType));
    type.classList.add("classType")
    tr.appendChild(type);

    const location=document.createElement("td");
    location.appendChild(document.createTextNode(classLocation));
    tr.appendChild(location);

    const language=document.createElement("td");
    language.appendChild(document.createTextNode(classLanguage));
    language.classList.add("classLanguage");
    tr.appendChild(language);

    const count=document.createElement("td");
    count.appendChild(document.createTextNode(studentCount));
    count.classList.add("studentCount");
    tr.appendChild(count);

    const round=document.createElement("td");
    let roundCount=document.getElementById("roundCount").value;
    let tempRound=document.createElement("input");
    tempRound.classList.add("shortInput");
    tempRound.classList.add("roundList");
    tempRound.type="number";
    tempRound.value=roundCount;
    round.appendChild(tempRound);
    tr.appendChild(round);

    const previous=document.createElement("td");
    let prevLesson=document.getElementById("previousLesson").value;
    previous.appendChild(document.createTextNode(prevLesson));
    tr.appendChild(previous);

    const next=document.createElement("td");
    let nextClass=document.getElementById("nextClass").value;
    let tempNext=document.createElement("input");
    tempNext.type="date";
    tempNext.value=nextClass;
    next.appendChild(tempNext);
    tr.appendChild(next);

    const fee=document.createElement("td");
    const amount=calculateFee(classType,classLanguage,Number(studentCount),Number(roundCount));
    fee.appendChild(document.createTextNode(String(amount)));
    fee.classList.add("feeAmount");
    tr.appendChild(fee);

    // add delete button
    const deleteButton=document.createElement("td");
    let tempButton=document.createElement("button");
    tempButton.classList.add("btn");
    tempButton.classList.add("deleteButton");
    tempButton.innerHTML="Delete";
    tempButton.addEventListener("click",removeNode);
    deleteButton.appendChild(tempButton);
    tr.appendChild(deleteButton);


    //insert selected node to the table
    const table=document.getElementById("courseTable")
    const control=document.getElementById("controlNode");
    table.deleteRow(-1);
    table.appendChild(tr);
    table.appendChild(control);
    summaryUpdate();

}

function removeNode(e){
    let targetButton=e.target;
    let table=document.getElementById("courseTable");
    table.removeChild(targetButton.parentNode.parentNode);
    summaryUpdate();
}

function summaryUpdate(){
    //add table data refresh

    const feeList=document.getElementsByClassName("feeAmount");

    let teachingCount=document.getElementById("courseCount");
    teachingCount.innerHTML=feeList.length;

    let totalFee=calculateFeeSum(feeList);
    let teachingFee=document.getElementById("teachingFee");
    teachingFee.innerHTML=totalFee;
}


function changeStatusColor(e){
    if(e.target.checked===true){
        e.target.parentNode.classList.remove("notAvailableBox");
        e.target.parentNode.classList.add("availableBox");
    }
    else{
        e.target.parentNode.classList.remove("availableBox");
        e.target.parentNode.classList.add("notAvailableBox");
    }
}

function feeCheck(item){
    console.log(item);
    let type=item.querySelector(".classType").innerHTML;
    let language=item.querySelector(".classLanguage").innerHTML;
    let studentCount=item.querySelector(".studentCount").innerHTML;
    let roundCount=item.querySelector(".roundList").value;
    let currentFee=item.querySelector(".feeAmount").innerHTML;

    let newFee=calculateFee(type, language, Number(studentCount), Number(roundCount));

    console.log(newFee);
    
    if(Number(currentFee)!==Number(newFee)){
        item.querySelector(".feeAmount").innerHTML=String(newFee);
    }
    summaryUpdate();
}

function addCourseHandler(e){
    //prevent page refresh after submitting the form
    e.preventDefault();

    //important field
    let courseId=document.getElementById("courseId").value;
    let courseName=document.getElementById("courseList").value;
    let classType=document.getElementById("classTypeList").value;
    let classLocation=document.getElementById("locationList").value;
    let classLanguage=document.getElementById("courseLanguage").value;
    let studentCount=document.getElementById("studentCount").value;
    
    if(courseId!=="" && courseName!=="" && classType!=="" && classLocation!=="" && courseLanguage!=="" && studentCount!=="0"){
        addNode(courseId, courseName, classType, classLocation, classLanguage, studentCount);
    }
    else{
        alert("Please complete the form");
    }
}

function refreshHandler(e){
    let itemList=document.getElementsByClassName("itemList");
    // console.log(itemList);
    for(let temp of itemList){
        feeCheck(temp);
    }
}

let addCourse=document.querySelector("#addCourse");
addCourse.addEventListener("submit", addCourseHandler);



let refreshButton=document.querySelector("#refreshButton")
refreshButton.addEventListener("click", refreshHandler);

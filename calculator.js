const baseLine=200; //baseline for normal class
const ilBaseLine=100; //baseline for introductory lesson class
const additionalFee=50; //additional for class with extra condition

function calculateFee(classType, classLanguage, studentCount, roundCount){
    if(classType==="introductory"){
        return ilBaseLine*roundCount;
    }
    else{
        let fee=baseLine;
        if(studentCount>=3){
            fee+=additionalFee;
        }
        if(classLanguage==="English"){
            fee+=additionalFee;
        }
        return fee*roundCount;
    }
}

function calculateFeeSum(feeList){
    let total=0;
    for(let item of feeList){
        total+=Number(item.innerHTML);
    }
    return String(total);
}

export{calculateFee,calculateFeeSum};
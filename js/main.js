function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    document.getElementById("history-value").innerText = num;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if(num == ''){
        document.getElementById("output-value").innerText = num;
    }
    else{
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}
function getFormattedNumber(num){
    if(num == "-"){
        return "";
    }
    const n = Number(num);
    const value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

//Handle operator class
const operators = document.getElementsByClassName("operator");
for(const operator of operators){
    operator.addEventListener("click", function(event){
        if(operator.id == "clear"){
            printHistory("");
            printOutput("");
        }
        else if(operator.id == "backspace"){
            let output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else{
            let output = getOutput();
            let history = getHistory();
            if(output == "" && history != ""){
                if(isNaN(history[history.length-1])){
                    history =history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != ""){
                output = output == "" ? output : reverseNumberFormat(getOutput());
                history+=output;
                if(operator.id == "="){
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else{
                    history += operator.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}
//Handle number class
const numbers = document.getElementsByClassName("number");
for(const number of numbers){
    number.addEventListener("click", function(event){
        let output = reverseNumberFormat(getOutput());
        if(output != NaN){
            output+=number.id;
            printOutput(output);
        }
    });
}

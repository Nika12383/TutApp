function alertFunction(buttonID) {
    buttonText = document.getElementById(buttonID)
    if (buttonText.innerHTML != "I have been alerted") {
        alert("Hello User!")
        buttonText.innerHTML = "I have been alerted"
    } else {
        alert("Stop Pressing Me!")
    }
    
}
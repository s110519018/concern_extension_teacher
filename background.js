var isClassing=2;
// var isClassing=false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.msg === "sendtoPOPUP") {
    //     sendResponse({isClassing: isClassing});
    // }
    if (request.msg === "createWindow") {
        chrome.windows.create({
        url: "chart.html?classroomID=" + request.data.classroomID,
        type: "popup",
        width: 1000,
        height: 800,
        }, function (newWindow) {
            console.log(newWindow);
        });
        console.log(request.data.classroomID+request.data.studentName);
    }
    else{
        console.log(request.isClassing);
        isClassing=request.isClassing;
    }
    
});

window.setInterval(function(){
    chrome.runtime.sendMessage({
        msg: "sendtoPOPUP", 
        data: {
            isClassing: isClassing,
        }
    }); 
}, 1000);


// var isClassing=0;
var isClassing=false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.msg === "sendtoPOPUP") {
    //     sendResponse({isClassing: isClassing});
    // }
    // else{
        console.log(request.isClassing);
        isClassing=request.isClassing;
    // }
    
});

window.setInterval(function(){
    chrome.runtime.sendMessage({
        msg: "sendtoPOPUP", 
        data: {
            isClassing: isClassing,
        }
    }); 
}, 1000);


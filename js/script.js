var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('start').addEventListener('click', () => {
    var name = document.getElementById("name");
    sendMessage({ action: 'START' , name: name.value});
    // window.close();
  });
  document.getElementById('end').addEventListener('click', () => {
    sendMessage({ action: 'END' });
    window.close();
    // chrome.runtime.reload();
  });
}
chrome.tabs.getSelected(null, getSelectedTab);

// chrome.runtime.sendMessage({msg: "sendtoPOPUP"}, function(response) {
//   document.getElementById('loading').textContent="loading...";
//   if (response.isClassing==1){
//     document.getElementById('loading').textContent="";
//     document.getElementById('not_classing').style.display='none';
//     document.getElementById('is_classing').style.display='block';
//   }
//   else if(response.isClassing==2){
//     document.getElementById('loading').textContent="";
//     document.getElementById('is_classing').style.display='none';
//     document.getElementById('not_classing').style.display='block';
//   }
//   else{
//     document.getElementById('loading').textContent="";
//     document.getElementById('is_classing').style.display='none';
//     document.getElementById('not_classing').style.display='block';
//   }
// });

chrome.runtime.onMessage.addListener(  
  function(request, sender, sendResponse) {   
    if (request.msg === "sendtoPOPUP") {
      document.getElementById('loading').textContent="";
      if (request.data.isClassing){
        document.getElementById('not_classing').style.display='none';
        document.getElementById('is_classing').style.display='block';
      }
      else{
        document.getElementById('is_classing').style.display='none';
        document.getElementById('not_classing').style.display='block';
      }
    } 
});

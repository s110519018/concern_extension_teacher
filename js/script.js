var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('start').addEventListener('click', () => {
    var name = document.getElementById("name");
    sendMessage({ action: 'START' , name: name.value});
    // window.close();
  });
  document.getElementById('end').addEventListener('click', () => sendMessage({ action: 'END' }));
}
chrome.tabs.getSelected(null, getSelectedTab);

chrome.runtime.onMessage.addListener(  
  function(request, sender, sendResponse) {    
    if (request.isClassing){
      document.getElementById('not_classing').style.display='none';
      document.getElementById('is_classing').style.display='block';
    }
    if (!request.isClassing){
      document.getElementById('is_classing').style.display='none';
      document.getElementById('not_classing').style.display='block';
    }
});

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('start').addEventListener('click', () => {
    var name = document.getElementById("name");
    // var studentID = document.getElementById("studentID");
    // console.log("name"+name.value);
    // console.log("studentID"+studentID.value);
    // sendMessage({ action: 'START' , name: name.value, studentID: studentID.value})
    sendMessage({ action: 'START' , name: name.value});
    window.close();
  });
  document.getElementById('end').addEventListener('click', () => sendMessage({ action: 'END' }));
  

}
chrome.tabs.getSelected(null, getSelectedTab);

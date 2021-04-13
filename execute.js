var my_awesome_script = document.createElement('script');
my_awesome_script.setAttribute('src','https://www.gstatic.com/charts/loader.js');
document.head.appendChild(my_awesome_script);

var video;
var body=document.getElementsByTagName('body')[0];
var insert_script = document.createElement("script");
insert_script.innerHTML = 'var red_c=0; var green_c=0; var yellow_c=0;'+

'var isClassing=false;'+
'window.addEventListener("message",function(me) {  '+
      'console.log("me.data.isClassing"+me.data.isClassing);'+
      'if(me.data.isClassing){isClassing=me.data.isClassing;setTimeout(StudentData, 1000);}'+
      'else{isClassing=me.data.isClassing;}'+
'});'+

'var StudentData = () => {'+
  'if(isClassing){'+
    'const url = window.location.pathname.substr(1);'+
    '$.ajax({'+
      'type: "POST",'+
      'contentType: "application/json",'+
      'dataType: "text",'+
      'url: "https://concern-backendserver.herokuapp.com/api/teacher/getAllNewData",'+
      'data: JSON.stringify({'+
        '"classroomID": url'+
      '}),'+
      'success: function (data) {'+
        'calltest(data);'+
      '},'+
      'error: function (XMLHttpRequest) {'+
        'console.log("error"+XMLHttpRequest.responseText);'+
      '}'+
    '});'+
  '}'+
'};'+



'function calltest(data) {'+
  'console.log("calltest進入");'+
  'console.log("data"+data+typeof(data));'+

  'red_c=0; green_c=0; yellow_c=0;'+

  'var response = JSON.parse("[" + data + "]");'+
  'console.log("response"+response+typeof(response));'+


  'response.forEach(function(r){'+

    'var student_everyone=document.querySelectorAll(".YBp7jf");'+
    'student_everyone.forEach(function(student){'+

        'if(student.innerHTML==r.studentName){'+
            'console.log(r.studentName);'+
            'video = student.parentElement.nextElementSibling.nextElementSibling.firstElementChild;'+
            'video.parentElement.parentElement.style.boxSizing = "border-box";'+
            'console.log(r.studentName+video.getAttribute("data-uid"));'+
            'if (r.newConcernDegree != "No Face"&&r.newConcernDegree != "") {'+
              'if (r.newConcernDegree < 0.5) {'+
                'video.parentElement.parentElement.style.border = "8px solid red";'+
                'red_c+=1;'+
              '}'+
              'else if (r.newConcernDegree > 0.5 && r.newConcernDegree < 0.8) {'+
                'video.parentElement.parentElement.style.border = "4px solid yellow";'+
                'yellow_c+=1'+
              '}'+
              'else if (r.newConcernDegree > 0.8) {'+
                'video.parentElement.parentElement.style.border = "4px solid green";'+
                'green_c+=1'+
              '}'+
            '}'+
            'else {'+
              'console.log("No Face");'+
              'video.parentElement.parentElement.style.border = "8px solid red";'+
              'red_c+=1;'+
            '}'+
          '}'+
    '});'+


  '});'+

  'google.charts.load("current", {packages:["corechart"]});'+
  'google.charts.setOnLoadCallback(drawChart);'+
  'setTimeout(StudentData, 1000);'+
'}'+

'function drawChart() {'+
  'var data = new google.visualization.arrayToDataTable(['+
    '["專注度", "人數", { role: "style" } ],'+
    '["不專心", red_c, "red"],'+
    '["普通", yellow_c, "yellow"],'+
    '["專心", green_c, "green"]'+
 ']);'+
  'var view = new google.visualization.DataView(data);'+
  'view.setColumns([0, 1,'+
                   '{ calc: "stringify",'+
                     'sourceColumn: 1,'+
                     'type: "string",'+
                     'role: "annotation" },'+
                   '2]);'+
  'var options = {'+
    'title: "專注度統計",'+
    'width: 400,'+
    'height: 250,'+
    'backgroundColor: "transparent",'+
    'bar: {groupWidth: "95%"},'+
    'legend: { position: "none" },'+
    'titleTextStyle: {'+
      'color: "white",'+
      'fontSize: 23,'+
      'bold: true,'+
    '},'+
    'hAxis: {'+
      'textStyle: {'+
        'color: "#FFFFFF",'+
        'fontSize: 18,'+
        'bold: true'+
      '},'+
        'gridlines: {'+
            'color: "#fff"'+
        '},'+
        'baselineColor: "#fff"'+
    '},'+
    'vAxis: {'+
      'textStyle: {'+
        'color: "#FFFFFF",'+
        'fontSize: 14,'+
        'bold: true'+
     '},'+
        'gridlines: {'+
            'color: "#fff"'+
        '},'+
        'baselineColor: "#fff"'+
    '},'+
    'annotations: {'+
        'alwaysOutside: false,'+
        'textStyle: {'+
            'fontSize: 20,'+
            'auraColor: "none"'+
        '}'+
    '}'+
  '};'+
  'var chart = new google.visualization.ColumnChart(document.getElementById("barchart_values"));'+
  'chart.draw(view, options);'+
'}'+

'document.getElementById("show").addEventListener("click", show);'+
'document.getElementById("hide").addEventListener("click", hide);'+
'function show(){'+
  'document.getElementById("barchart").classList.add("show");'+
  'document.getElementById("barchart").classList.remove("hide");'+
'}'+
'function hide(){'+
  'document.getElementById("barchart").classList.add("hide");'+
  'document.getElementById("barchart").classList.remove("show");'+
'}';




//barchart
var barchart = document.createElement('div');
barchart.innerHTML='<div id="barchart" class="barchart"><div style="position: absolute;right: 20px;top: 20px;cursor: pointer;"><div style="width: 50px;height: 50px;z-index:999999999;" id="hide"><svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2.14275L12.857 0L7.5 5.35725L2.14275 0L0 2.14275L5.357 7.5L0 12.8573L2.14275 15L7.5 9.64275L12.857 15L15 12.8573L9.6425 7.5L15 2.14275Z" fill="#E5E5E5"/></svg></div></div><div id="barchart_values" style="display:flex;align-items: center;justify-content: center;width: auto; height: 300px;"></div></div><div style="z-index:150;position: fixed;right: 20px;bottom: 20px;cursor: pointer;" id="show"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="37.5" cy="37.5" r="35" fill="#5C5A5B" stroke="#35373A" stroke-width="5"/><path d="M55.0072 55.5723V23.2681H43.2602V55.5723H37.3867V35.0151H25.6397V55.5723H21.2346V17.3946H18.2979V55.5723C18.2979 56.3512 18.6073 57.0981 19.158 57.6489C19.7088 58.1996 20.4557 58.509 21.2346 58.509H59.4123V55.5723H55.0072ZM34.45 55.5723H28.5765V37.9518H34.45V55.5723ZM52.0704 55.5723H46.1969V26.2048H52.0704V55.5723Z" fill="white"/></svg></div>';
//barchart的css
var barchart_css = document.createElement("style");
barchart_css.innerHTML ='.barchart{  z-index:150; position: fixed;  right: 100px;  bottom: 100px;  background-color: rgba(0, 0, 0, 0.5);  transform: scale(0);  opacity:0;  transform-origin: bottom right;}.show{  -webkit-transition: 1s;  -moz-transition: 1s;  -ms-transition: 1s;  -o-transition: 1s;  transition: 1s;  opacity:1;  transform: scale(1)  !important;}.hide{  -webkit-transition: 1s;  -moz-transition: 1s;-ms-transition: 1s;  -o-transition: 1s;  transition: 1s; opacity:0;  transform: scale(0)  !important;}';

const onMessage = (message) => {
  switch (message.action) {
    case 'START':
      start(message.name);
      break;
    case 'END':
      end();
      break;
    default:
      break;
  }
}
chrome.runtime.onMessage.addListener(onMessage);
function start(name) {
  if (name == '') {
    alert("請填入Google Meet名字");
  }
  else {
    chrome.runtime.sendMessage({isClassing:0});
    console.log("開始上課");
    const url = window.location.pathname.substr(1);
    var today=new Date();
    var currentDateTime =today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    $.ajax({
      type:"POST",
      contentType: 'application/json',
      dataType: "text",
      url: "https://concern-backendserver.herokuapp.com/api/teacher/startClass",
      data: JSON.stringify({
        "classroomID": url,
        "startTime": currentDateTime
      }),
      success: function(data) {
          console.log("成功"+data);
          window.postMessage({isClassing:true});
          chrome.runtime.sendMessage({isClassing:1});
      },
      error: function(XMLHttpRequest){
        console.log(XMLHttpRequest.responseText);
      }
  });
    body.appendChild(barchart_css);
    body.appendChild(barchart);
    body.appendChild(insert_script);
    document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').setAttribute('aria-disabled', true);
    document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').setAttribute('data-tooltip', "請透過疫距數得結束課程");
    document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').setAttribute('aria-label', "請透過疫距數得結束課程");
    document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').style.background='#D0D0D0';
  }

}
function end(){
  chrome.runtime.sendMessage({isClassing:0});
  const url = window.location.pathname.substr(1);
  var today=new Date();
  var currentDateTime =today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  $.ajax({
    type:"POST",
    contentType: 'application/json',
    dataType: "text",
    url: "https://concern-backendserver.herokuapp.com/api/teacher/endClass",
    data: JSON.stringify({ 
      "classroomID":url,
	    "endTime": currentDateTime 
    }),
    success: function (data) {
        console.log(data);
        window.postMessage({isClassing:false});
        chrome.runtime.sendMessage({isClassing:2});
        barchart.remove();
        barchart_css.remove();
        document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').setAttribute('aria-disabled', false);
        document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.GaONte.Qwoy0d.ZPasfd.vzpHY').click();
        chrome.runtime.sendMessage({
          msg: 'createWindow',
          data:{
            classroomID: window.location.pathname.substr(1)
          }
        });
    },
    error: function(XMLHttpRequest){
      console.log(XMLHttpRequest.responseText);
    }
  });
  
}

// function waitSeconds() {
  //// window.setInterval("SendTime()", 5000);
//   window.setInterval("StudentData()", 1000);
// }


//老師端送出時間
// var SendTime = () => {
//   $.ajax({
//     type: "GET",
//     dataType: "jsonp",
//     jsonp: "callback", //Jquery生成驗證引數的名稱
//     // a/grad.ntue.edu.tw/
//     url: "https://script.google.com/a/grad.ntue.edu.tw/macros/s/AKfycby8KOoQDDk421wDDhiUjoDBRMJGCu8BGX6B_519cW-b3uF610ww/exec?prefix=call",
//     data: {
//       "name": name,
//       "number": "teacher"
//     },
//     success: function () {
//       console.log("成功");
//     },
//     error: function () {
//       console.log("失敗！");
//     }
//   });
// };


// 接收學生資料
// var StudentData = () => {
//   $.ajax({
//     type: "GET",
//     url: "https://concern-backendserver.herokuapp.com/api/teacher/getAllNewData",
//     success: function (data) {
//       console.log("成功"+data);
//     },
//     error: function () {
//       console.log("失敗！");
//     }
//   });
// };



// function addborder(color_str) {
//   if (color_str != "No Face") {
//     const color = parseFloat(color_str)
//     if (color < 0.4) {
//       video.parentElement.parentElement.style.border = "6px solid red";
//     }
//     else if (color > 0.4 && color < 0.65) {
//       video.parentElement.parentElement.style.border = "6px solid yellow";
//     }
//     else if (color > 0.65) {
//       video.parentElement.parentElement.style.border = "6px solid green";
//     }
//   }
//   else {
//     console.log("No Face")
//   }
// }





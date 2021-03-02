const submitBtn = document.querySelector('[data-action="submit"]');
submitBtn.addEventListener("click", processFormData);

const url = new URL(window.location.href);
console.log("classroomID: "+ url.searchParams.get('classroomID'));
try {

    //------------------------------全班
    $.ajax({
        type:"POST",
        contentType: 'application/json',
        dataType: "json",
        url: "https://concern-backendserver.herokuapp.com/api/teacher/getAllConcernCalcDiagram",
        data: JSON.stringify({
            "classroomID": url.searchParams.get('classroomID'),
            "timeSpacing":500,
        }),
        success: function (msg) {
            // console.log(msg);
            drawChart_class(msg);
        },
        error: function(error){
            console.log(error);
            $('.container').css('display', 'none');
            $('#error').text("error錯誤，請按f5重新載入");  
        }
    });
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart_class);

} catch (error) {
    console.log(error);
    $('.container').css('display', 'none');
    $('#error').text("error錯誤，請按f5重新載入");
}
function processFormData(e){
    const form = document.forms['form'];
    //取 elements 集合中 name 屬性為 name 的值
    const name = form.elements.name.value;
    $('#loading').css('display', 'block');
    //之後圖片載入要用非同步!不然一定完蛋
    $.ajax({
        type:"POST",
        contentType: 'application/json',
        dataType: "json",
        url: "https://concern-backendserver.herokuapp.com/api/teacher/getPersonConcernDiagram",
        data: JSON.stringify({
        "classroomID": url.searchParams.get('classroomID'),
        "studentName": name,
        "timeSpacing":100
        }),
        success: function (msg) {
            console.log(msg);
            drawChart(msg);
        },
        error: function(error){
            console.log(error);
            $('#loading').css('display', 'none');
            $('.container').css('display', 'none');
            $('#error').text("error錯誤，請按f5重新載入");    
        }
    });
    google.charts.setOnLoadCallback(drawChart);
}
function drawChart(results) {
    if(results==undefined){
        return
    }
    var json_data=results;
    var dataTable=[];
    var Header= ['時間', '專注度'];
    dataTable.push(Header);
    for (var i = 0; i < json_data.timeLineArray.length; i++) {
        var temp=[];
        temp.push(json_data.timeLineArray[i]);
        if(json_data.concernArray[i]>0.8)
          json_data.concernArray[i]=1;
        else if (json_data.concernArray[i]<0.8&&json_data.concernArray[i]>0.5)
          json_data.concernArray[i]=0.5;
        else
          json_data.concernArray[i]=0;
        temp.push(json_data.concernArray[i]);
        dataTable.push(temp);
     }
    var data = new google.visualization.arrayToDataTable(dataTable);
    var view = new google.visualization.DataView(data);
  var options = {
    title: results.studentName+"的專注度統計",
    width: '1200px',
    height: '400px',
    backgroundColor: "white",
    legend: { position: "none" },
    titleTextStyle: {
      color: "black",
      fontSize: 20,
      bold: true,
    },
    hAxis: {
      title: "時間",
      textStyle: {
        color: "black",
        fontSize: 12,
        bold: true
      },
      gridlines: {
        color: "#BEBEBE"
      },
      baselineColor: "#BEBEBE"
    },
    vAxis: {
      title: "專注度",
      textStyle: {
        color: "black",
        fontSize: 16,
        bold: true
        },
        gridlines: {
            color: "#BEBEBE"
        },
        baselineColor: "#BEBEBE",
        viewWindow:{
            max:1,
            min:-0.2
        },
        ticks: [{v:1, f:'專心'}, {v:0.5, f:'普通'},{v:0, f:'不專心'},{v:-0.2, f:''}]
    },
    series: {
        0: {
            areaOpacity: 0,
            lineWidth: 4
        }
    }
  };
  var chart = new google.visualization.SteppedAreaChart(document.getElementById("SteppedAreachart_values_personal"));
//   chart.draw(view, options);
    google.visualization.events.addListener(chart, 'ready', function () {
        var imgUri = chart.getImageURI();
        $('button').css('display', 'block');
        $('#loading').css('display', 'none');
        var a = document.getElementById("download");
        a.href = imgUri;
        $('#download').text("下載"+results.studentName+"的專注度統計");
        a.download = results.studentName+"的專注度統計";
        // a.click(); //要和按鈕融合
    });
    chart.draw(view, options);
}

//------------------------------全班
function drawChart_class(results) {

    if(results==undefined){
        return
    }
    var dataTable=[];
    var Header= ['時間', '不專心', '普通' ,'專心'];
    dataTable.push(Header);
    for (var i = 0; i < results.timelineArray.length; i++) {
        var temp=[];
        temp.push(results.timelineArray[i]);
        temp.push(results.redConcernCountArray[i]);
        temp.push(results.yellowConcernCountArray[i]);
        temp.push(results.greenConcernCountArray[i]);
        dataTable.push(temp);
     }
    var data = new google.visualization.arrayToDataTable(dataTable);
    var view = new google.visualization.DataView(data);
    //產生Annotation
    // view.setColumns([0,
    //   1, {calc: function (dataTable, rowIndex) {return getAnnotation(dataTable, rowIndex, 1);}, type: "string", role: "annotation"},
    //   2, {calc: function (dataTable, rowIndex) {return getAnnotation(dataTable, rowIndex, 2);}, type: "string", role: "annotation"},
    //   3, {calc: function (dataTable, rowIndex) {return getAnnotation(dataTable, rowIndex, 3);}, type: "string", role: "annotation"}
    // ]);
    // function getAnnotation(dataTable, rowIndex, columnIndex) {
    //   console.log(dataTable.getFormattedValue(rowIndex, columnIndex))
    //   if(dataTable.getFormattedValue(rowIndex, columnIndex)==0)
    //     return null;
    //   else
    //     return dataTable.getFormattedValue(rowIndex, columnIndex)
    // }
  var options = {
    title: "全班專注度狀況分布 ",
    width: '100%',
    height: '600',
    backgroundColor: "white",
    isStacked: 'percent',
    // isStacked: true,
    legend: { position: "right" },
    titleTextStyle: {
      color: "black",
      fontSize: 20,
      bold: true,
    },
    hAxis: {
      title: "時間",
      textStyle: {
        color: "black",
        fontSize: 12,
        bold: true
      },
      gridlines: {
        color: "#BEBEBE"
      },
      baselineColor: "#BEBEBE"
    },
    vAxis: {
      title: "專注狀況",
      textStyle: {
        color: "black",
        fontSize: 16,
        bold: true
        },
        gridlines: {
            color: "#BEBEBE"
        },
        baselineColor: "#BEBEBE",
        minValue: 0,
        // format:0,
        annotations: {
          alwaysOutside: true,
          textStyle: {
              fontSize: 20,
              auraColor: "none"
          }
      }
    },
    series: {
        0: {
            areaOpacity: 0.5,
            lineWidth: 0,
            color: "red",
        },
        1: {
            areaOpacity: 0.5,
            lineWidth: 0,
            color:"#f5d782"
        },
        2: {
            areaOpacity: 0.5,
            lineWidth: 0,
            color:"green"
        }
    }
  };
  var chart = new google.visualization.ColumnChart(document.getElementById("SteppedAreachart_values_class"));
  google.visualization.events.addListener(chart, 'ready', function () {
    var imgUri = chart.getImageURI();
    $('#button_class').css('display', 'block');
    $('#loading_class').css('display', 'none');
    var a = document.getElementById("download_class");
    a.href = imgUri;
    a.download = "全班時間專注度對照表.png";
    // a.click(); //要和按鈕融合
  });
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
    //here you can write your custom message or nothing if you want remove
    $('.container').css('display', 'none');
    $('#error').text("error錯誤，請按f5重新載入");
  });
    chart.draw(view, options);

}
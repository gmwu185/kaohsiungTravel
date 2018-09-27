/*=============================================
=            透過AJAX取得JSON資料            =
=============================================*/

var allData="";
var allDataRecord; // 對應資料路徑
var allDataRecordLen;
var nowData;
var JsonUrl = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
var xhr = new XMLHttpRequest(); 

/*----------  xhr 使用 post true 與 .send() 方式戴入資料  ----------*/
xhr.open('post', JsonUrl, true)
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send()
//console.log(xhr)
xhr.onload = function() {
  // console.log(xhr.status)
  
  // console.log(JdataParse);
  if(xhr.status == 200){
    // 轉換解析 Json xhr.responseText > 可讀 JS Object 格式
    allData = JSON.parse(xhr.responseText);
    allDataRecord = allData.result.records;
    nowData = allDataRecord;
    allDataRecordLen = allDataRecord.length;
    
    /*----------  初始化設定  ----------*/
    cleckButNum = 1;
    // 各區資料過濾處理成陣列
    allZoneFun();
    nowZoneDataFunc("全部區域");
    pgNunCount(nowData.length, cleckButNum, pgMaxVal);
    renderCards(nowData);
    // console.log(allDataRecord);
    scrolTopFun();
    /*----------  初始化設定  ----------*/

  }else {
    alert("伺服器發生錯誤，請稍後再試");
  }
}
/*----------  xhr 使用 post true 與 .send() 方式戴入資料  ----------*/

/*=====  End of 透過AJAX取得JSON資料   ======*/






/*=============================================
=            DOM 選取元素            =
=============================================*/

var scrollEl = document.getElementById('scroll');
var select_location = document.querySelector('#select_location');
var datadBox = document.querySelector('.datadBox');
var datadBoxTitle = document.querySelector('.datadTaitle');
var elHitBtn = document.querySelectorAll('.hitoBtn');
var elUlList = document.querySelector('.ulList');
var elPgLen = document.querySelector('.pageLen');

/*=====  End of DOM 選取元素  ======*/





/*=============================================
=            functions            =
=============================================*/

/*----------  依地點處理的資料分流  ----------*/
var nowZone;
function nowZoneDataFunc(zone){
  if(zone == "全部區域"){
    datadBoxTitle.textContent = "全部區域";
    nowZone = zone;
    nowData = allDataRecord;
  } else {
    datadBoxTitle.textContent = zone;
    nowZone = zone;
    nowData = dataOrderByZone[zone];
    // console.log('此區資料筆數： ' + nowData.length);
    // console.log('else nowZone: '+nowZone);
    // console.log(nowData);
  }
}
/*----------  /依地點處理的資料分流  ----------*/

/*----------  頁碼變數  ----------*/
// 依資料長度計算有幾頁
var pgTotal;
// 依資料長度計算的最後一頁
var pgEnd;
// pgNunCount 運算後存的變數
var pgNum;
// 每頁開始的資料筆數
var dataNumStart;
// 每頁結束的資料筆數
var dataNumEnd;
// 現在頁碼
var nowPgNum; 
console.log('nowPgNum:' + nowPgNum);
var cleckButNum;
console.log('cleckButNum: '+cleckButNum);
// 每個分頁最多幾筆資料
var pgMaxVal = 8;
var pgStart;
/*----------  /頁碼變數  ----------*/

/*----------  頁碼記算與動態建立  ----------*/
/**
 *
 * @param dataLen: 資料總長度
 * @param pgNum: 頁碼初始/變數用於點按鈕傳回的值
 * @param pgFuncMaxVal: 每頁的資料筆數
 * ? createPageEl() 在算完分頁長度後，開始於此定元素內建立內容。
 */
function pgNunCount(dataLen, pgNum, pgFuncMaxVal) {
  // console.log("dataLen-共幾筆資料: " + dataLen);
  // console.log('pgFuncMaxVal-每頁的資料筆數: ' + pgFuncMaxVal);
  // console.log(dataLen)
  
  if(pgFuncMaxVal<1){pgFuncMaxVal=1};
  // pgTotal: 頁面總數
  pgTotal = (Math.floor(dataLen / pgFuncMaxVal)+1);
  // dataLen 有餘數的話自動將加一頁
  console.log('dataLen % pgFuncMaxVal: '+ dataLen % pgFuncMaxVal);
  if( dataLen % pgFuncMaxVal !== 0){ 
    pgEnd = pgTotal+1;
  }else{
    pgEnd = pgTotal;
  };
  if(pgNum == undefined){ pgNum =1 }
  nowPgNum = pgNum;
  console.log('nowPgNum:' + nowPgNum);
  // 記算讓card區顯示的區間
  dataNumStart = (pgNum - 1) * pgFuncMaxVal;
  // 目前頁面最後一筆資料數
  dataNumEnd = dataNumStart + pgFuncMaxVal;

  function createPageEl() {
    pgStart = 1;
    var btnAllStr = '';

    if( dataLen > pgFuncMaxVal){
      // console.log("dataLen <= pgFuncMaxVal: " + dataLen <= pgFuncMaxVal);
      
      // pageNum_btn
      for(var i = pgStart; i < pgEnd; i++){
        if(nowPgNum == i){
          var btnCountStr = '<li class="pageNum now"><a href="#" data-pgbtn=' + i + '> '+ i +' </a></li>';
        }else{
          var btnCountStr = '<li class="pageNum"><a href="#" data-pgbtn=' + i + '> '+ i +' </a></li>';
        }
        btnAllStr += btnCountStr;
      }

      // prev_btn
      if(nowPgNum != 1){
        var btnStartStr = '<li class="pageNum"><a href="#" data-pgbtn="' + (cleckButNum-1) + '">< prev</a></li>';
      }else{
        var btnStartStr = '<li class="pageNum disable"><a href="#" data-pgbtn="' + cleckButNum + '">< prev</a></li>';
      }

      // next_btn
      if( nowPgNum != (pgEnd-1) ){
        var btnEndStr = '<li class="pageNum"><a href="#" data-pgbtn="' + (cleckButNum+1) + '">next &gt;</a></li>';
      }else{
        btnEndStr = '<li class="pageNum disable"><a href="#" data-pgbtn="' + cleckButNum + '">next &gt;</a></li>';
      }

      elPgLen.innerHTML = btnStartStr + btnAllStr + btnEndStr;
    }else{
      // elUlList.style.display = 'none';
      elPgLen.innerHTML = '';
    }
  }
  createPageEl();
};
/*----------  /頁碼記算與動態建立  ----------*/

/*----------  過濾各區存於指定陣列中  ----------*/
/**
 * ? for...of 處理陣列的值，將陣列一筆筆取出，item 會取出的是單筆的 Obj
 * ? 過濾資料使用空陣列 allZone 依地區存放。
 * ? allZone 使用 llZone.indexOf(item.Zone)，比對有沒有重復的資料字串，如果
 * ? dataOrderByZone 最後會是物件包每一筆陣列的方式存資料。例如：dataOrderByZone.鼓山區[0].Zone = "鼓山區"。
 */
var dataOrderByZone = [];
function allZoneFun(){
  var allZone = [];
  for (let item of allData.result.records){
    // console.log('item.Zone: '+ item.Zone);
    if(allZone.indexOf(item.Zone) == -1){
      // 暫存記錄所有區域
      allZone.push(item.Zone);
      // 新建該區域的資料陣列
      dataOrderByZone[item.Zone] = [];
      // console.log('dataOrderByZone:' +dataOrderByZone);

      var newOption = document.createElement("option");
      // 新建該區域的資料陣列
      newOption.textContent = item.Zone;
      select_location.appendChild(newOption);
    }
    // console.log('var allZone[]: ' + allZone);
    
    // 將資料放進對應的區域
    dataOrderByZone[item.Zone].push(item);
  }
  // console.log('allZone:' + allZone);
}
// console.log('dataOrderByZone:' + dataOrderByZone);
/*----------  /過濾各區存於指定陣列中  ----------*/

/*----------  將資料寫入頁面中  ----------*/
/**
 * @param data 傳進資料
 * ! 比對參數後依 if(){}else{} 組字串跑 HTML 架構
 */

function renderCards(data) {
  var cardStr = '';
  var carVisitStr = '';
  var cardStrEnd = '';
  for(let i = dataNumStart; i < dataNumEnd &&  data[i] !== undefined; i++){
      // console.log(i);
      // console.log(data);
      cardStr += `
        <li>
          <div class="locationCoverImg" style="background-image: url(${ data[i].Picture1}">
            <h3><span class="locationName">${ data[i].Name}</span><span class="locationaArea">${ data[i].Zone}</span></h3>
          </div>
          <div class="locationInfo">
            <p class="time">${ data[i].Opentime}</p>
            <p class="add">${ data[i].Add}</p>
            <p class="tel">${ data[i].Tel}</p>
      `;
    if( data[i].Ticketinfo !== ''){
      carVisitStr = `
        <p class="visit">${ data[i].Ticketinfo}</p>
      `;
    }
    cardStrEnd = `
          </div>
        </li>
      `;
  }
  datadBox.innerHTML = cardStr + carVisitStr + cardStrEnd;
};
/*----------  /將資料寫入頁面中  ----------*/

/*----------  置頂滾動  ----------*/
function scrolTopFun(){
  var scrollTop = null;
  // 置頂對象點擊事件
  scrollEl.onclick = function() {
    var timer = setInterval(function() {
        window.scrollBy(0, -100);
        if (scrollTop == 0) 
          clearInterval(timer);
    }, 10);
  }
  // 窗口滾動檢測
  window.onscroll = function() {
    scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    scrollEl.style.display = (scrollTop >= 500) ? "block" : "none";
  }  
};
/*----------  置頂滾動  ----------*/

/*=====  End of functions  ======*/






/*=============================================
=            Events            =
=============================================*/

select_location.addEventListener('change', function (e) {
  locationVal = e.target.value;
  // console.log( locationVal );
  nowZone = this.value;
  console.log('this.value: ' + this.value);
  nowZoneDataFunc(nowZone);
  // 防止算點按的數值大於 pgNunCount() {cleckButNum} 的值，防呆直接設第一筆資料
  pgNunCount(nowData.length, 1, pgMaxVal);
  renderCards(nowData);
  
  // locationName = 'dataOrderByZone.'+ this.value;
  // locationNameLen = locationName.length
  // console.log('locationName:' + locationName);
  // console.log('locationNameLen: ' + locationNameLen);
  // pgNunCount(nowData.length, cleckButNum, pgMaxVal);
} , false);

var elHitBtnLen = elHitBtn.length;
for(let i = 0; i < elHitBtnLen; i++){
  elHitBtn[i].firstChild.addEventListener('click', function(e){
    e.preventDefault();
    // 將熱門行政區按鈕點按後的值傳去上方的 select
    console.log(e.target.dataset.hitobtn);
    nowZone = e.target.dataset.hitobtn;
    select_location.value = e.target.dataset.hitobtn;
    nowZoneDataFunc(nowZone);
    // 防止算點按的數值大於 pgNunCount() {cleckButNum} 的值，防呆直接設第一筆資料
    pgNunCount(nowData.length, 1, pgMaxVal);
    renderCards(nowData);
    
    // console.log('dataOrderByZone' + select_location.value);
    // pgNunCount();
    // renderCards(nowZone, nowData);
    // pgNunCount(nowData.length, cleckButNum, pgMaxVal);
  } , false);
}

elPgLen.addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.nodeName !== "A"){ return }
  targetButNum = e.target.dataset.pgbtn;
  cleckButNum = Number(targetButNum);
  console.log('cleckButNum:'+cleckButNum);
  if(cleckButNum > pgTotal){ 
    cleckButNum = pgTotal;
  }
  nowZoneDataFunc(nowZone);
  pgNunCount(nowData.length, cleckButNum, pgMaxVal);
  // console.log(nowData);
  renderCards(nowData);
} );

/*=====  End of Events  ======*/
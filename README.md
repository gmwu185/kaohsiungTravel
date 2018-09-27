# 高雄旅遊資訊網 / kaohsiungTravel

[展示頁面](https://gmwu185.github.io/kaohsiungTravel/)

## 1-前言與開發目標：

### 1-1-樣版設計
- 符合 HTML5 語意規則，結合偽元素處理成較精簡的架構。
- 不使用 CSS 框架 (如：Bootstrap or Foundation)，直接使用手刻完成，並使用 SASS 了解與 LESS 與 SCSS 的共通與差異。
- 在大於 1024px 以上，盡可能達到視覺樣版的畫面與元件尺寸大小，同時完全 RWD 自適應化。
- 大於 1600px 以上，將所有版面自動補上空白處，依 .container 內的寬值讓每筆資料自動調整排版。
- 高相容性，符合 IE 10 自適應。
- 圖片都使用 background-image 處理，加快載入速外。

### 1-2-前端功能
- 使用 AJAX 串接政府 OpenData 公開平台資料使用。
- 針對相關分區處理，將指定選取事件後過濾資料於前台頁面中。
- 針對超果六筆以上的分頁資料 (少於不出現頁碼)，出現分頁頁碼操作出現資料筆數與頁面中。



## 2-使用工具：

- VS Code
- Adobe Brackets
- Prepros
- Firefox 瀏覽器
- Sourcetree

### 2-1-VS Code 相關套件
- Better Comments
- VS Code Idiomatic CSS Comments
- VS Code CSS Comments
- js-beautify for VS Code
- Code Beautifier Visual Studio Code Extension
- CSS Peek
- Indented Sass syntax highlighting, autocomplete & snippets for VSCode
- Sass.ms
- vscode-sass-lint
- CSS, Less, Sass formatter
- vscode-preview-server

### 2-2-Adobe Brackets 相關套件
- Brackets Autoprefixer
- brackets-add-comment
- Brackets-SmartComment
- Brackets SASS Code Hints
- Brackets-Color-Highlighter
- brackets-SASShints



## 3-SASS/CSS 預處理器 

### 3-1-SASS 與 SCSS 、 LESS 的共通性
- 可使用嵌套方式，以退位來分別。
- 變數 SASS 與 SCSS 都是 $ ，而 LESS 是 @。
- 可使用類 JavaScript function 的運算方式，處理重復屬性或是值與 ClassName，但這裡完全沒用到。
- LESS 與 SCSS 都可以將完整的 CSS 直接貼入文件檔中，在輸出上不會有問題，但 SASS 一定要照著編寫的結構編寫處理，如果不注意的話將無法輸出成 CSS 檔。
- SASS 與 SCSS 的 import 的路徑有一點不同的差異，SCSS 要注意 "" 與 ; ，例如： @import "檔案路徑";。

### 3-2-改寫 SASS 所發生的問題
- 需使用全空白鍵字符或是 Tab 退位字符不能混用，使用上可比較精簡，但相對寫的排版上就要比較嚴僅，樣式屬性對應退位會影響包層的結果，這點同於 HTML 的 Pug/Jade 的寫法。
- 如果不要使用的 CSS 屬性可以直接在同層後使用 // ，之後的屬性就等同被註解。
- SASS 無法使用 VSCode 的移至定義與預覽定義是會直接跳到轉出後的 CSS 上，而 Brackets 的快速編輯也是如此，如果常在 HTML 下直接針對 ID 或是 class Name 修改，會比較不方便，而常用的話直接寫 LESS 與 SCSS 就不會有以上的問題， LESS 與 SCSS 共同性都會用到大括弧(層次結構的套嵌語法)，可能也是和開頭結尾都有用到的關係。
- SASS 的編寫結構很簡約，在輸入編輯時可省略 ';' 號來做斷行，但好處也是問題，使用過不同的 CSS 預處理器，除了對 ';' 過敏外，也對 ClassName 後面的 ':' 與前後的空隔有可能會嗔出錯誤的訊息。
- SASS 在 VSCode 與 Brakets 使用上如果要使用自動格式化編排(自動整理格式)，會被直接壓成一行。
- SASS 所存的變數在外連頁面時，無法於 VSCode 快速引用，只有 Brakets 的整合使用插件 [Brackets Sass Hints](https://github.com/karmatys/brackets-sass)，另外像是 LESS 或是 SCSS 的部份變數存於外檔，取用也是透過相關對應的套件，使用上是比較沒問題，而提示功能也比較直覺就可選用。





## 完成心得與總結

### 對於開發版型與前端功能結合

#### 開版
- 以往工作上多半直接使用 Bootstrap 3/4 來開發版型，方便與效率上是肯定的，但對於 CSS 的原理運用和廣度使用常會因框架上反而有局限，雖然開版的內容對我來說不算是難事，但要將前端功能結合上自已所開的版，確實還是需要中途小修。
- 在開版前除了整理的內容外，另外全較優先的是從最小單位的應用元件開始，其中字串長度也是其中一項考量要點，對於自適應版型開發上，除了將元素限高度的方式，另外也可以將使用 text-overflow: ellipsis; -webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box; 等方式整體將版型限字串高寬，配合自適應的彈性規劃，如果沒先處理字串長度問題，會使得版面因字串長度有所改變，因此容易使得版型凌亂。
- 主要使用 LESS 為主，當然和 SASS 比較下還是有優缺點，但對於 LESS 的使用上針對色彩的操作函式，可以讓色彩管理更方便，對於一開始習慣先確任色彩企劃後在做版型的整體使用，這也是最大的優勢。

#### JavaScript
- 了解變數的操作，在全域與區域中使用上的差異，變數在計算使用因為有後蓋前的特性，可以如果分頁頁碼取得數值後，再運算完將功能帶出，最後重新渲染指定區塊。
- function(){} 在收發參數上的關係，可以直接接受變數與資料進入，也可以在執行函式時將參數由執行部份帶入，例： function Name(參數一, 參數二));，參數名在函內可另命避免與外層變數混在一起。
- function(){} 有區域的特性，除了可以與全域做分隔外，在 IDE 文字編輯器上可以讓過長的區塊收合，方便在編寫時不讓整體內容過長使得針對操作上因找尋特定內容產生麻煩(滾動過長)，另外可以將特定的功能一部份一部份的切開，針對獨立的功能編寫，如果在除錯上比較不會照成從頭找到尾的情形。
- 與 ES6 混用組字串功能，ES6 的 let 與 const 相對在編寫與讀取的方便性。
- 函式事件的認知與使用，例如：e.preventDefault(); 針對 a 標與 .addEventListener('change') 與 .addEventListener('click') 操作元素對象的不同。
- AJAX JSON 始使化在非同步的函式處理，會使得存入全域變數存入的時間點，因為載入的完成使得在還沒存入變數前，其他全域函式就先路了，因此會造成載入沒有內容，因此初始化的函式執行於 xhr.onload 內，可確保完整的完資料後接續處理函式。
- AJAX JSON 資料過濾與處理，將分開處理的資料分別存於不同的變數在取用，在指定的事件元素取用時可以不用另外在讀取。

### 在決定要把 JavaScript 的基礎與課程都通熟的理由

目前工作以自適應網頁開版為主(RWD)，之前對於有要用到相關功能與效果多半會使用 jQuery 或就可以滿足，在找到對應的 jQuery 套件與簡單的功能編寫，雖然可以很快速的產出與滿足開發需求，不過對於運作與運用原理還是完全不了解，已致於在客製與發開上，常常因觀念的不解使得亂試花費大量的時間。

此外，在初步來說運用大量的觀念這是必然的，完成後更深刻了解到前端對於資料的介接使用與處理流程，接資料、處理資料與過濾資料、變數與函式的整體規劃與應用、將函式與變數處理完的內容渲染於頁面上，這之中如果沒有一步步的學習與了解，對於應用上不只會照成疑惑，而在除錯上也可能因為不解而無法解開除錯上的問題 (就有在分頁頁碼因為別的區域分享點按後，在切換不同地點照片無法將資料渲梁於頁面中，原因局然是頁碼的目前頁面變數大於點新點的地點頁數量，使得頁面沒有內容出現)。

對於剛跨入前端學習的我，還有很多功課與知識要學習與了解，原先也是想先了解對象是 Vue.js 這類的框架直接操作使用，但如果沒有將基礎好好的打好的話，就算框架運用上熟了，如果發生問題時根本還是無法解決，也是因為對於基礎的不了解反而產生更多運用上的問題，因此也成就這作業的完成的動力 (一直在挑戰自我，希望可以將所學會的推向一個程里)。

過程中參考了不同人完成的寫法與作法，最後還是希望將最根本的方式與課程中了解熟識與靈活運用，對於頁碼的功能真的卡很久，但在來回中不斷的思考測試後，終於將分頁頁碼的功能整合在裡面，這過程真是天殺的…

如果單純的只有拷貝貼上，除了可能不了解原因外也有可能沒多久就忘了，花心力是過程中必然的，但能在實用上可以讓想法和做法完整的呈現，才會是在日後運用上真的派的上用場，也不斷的自我期許，如同海賊王 蒙其·D·魯夫 一樣，「我要成為海賊王」！（日語：海賊王に、おれはなる!），向這無盡的大海航行前進。





## 相關資料

### 素材來源
- [高雄市政府資料開放](https://data.kcg.gov.tw/)
- [使用素材](https://hexschool.github.io/JavaScript_HomeWork/#artboard0)

### 參考資料
- GitHub
  - [https://github.com/hbdoy/kaohsiung_travel](https://github.com/hbdoy/kaohsiung_travel)、[演示畫面](https://hbdoy.github.io/kaohsiung_travel/)
  - [https://github.com/lloyd3126/kaohsiungTravel](https://github.com/lloyd3126/kaohsiungTravel)、[演示畫面](https://lloyd3126.github.io/kaohsiungTravel/)
  - [六角學院「JavaScript 入門篇 - 學徒的試煉」最終作業 -高雄旅遊資訊](https://github.com/opcmaruko/hexschoolJSHomeworkopendata)
  - [JavaScript練習，台北旅遊景點/AJAX history storage](https://github.com/guahsu/JavaScript-TravelMap)、[演示畫面](https://guahsu.io/JavaScript-TravelMap/index.html)
- codepan
  - [codepen-最終作業-高雄旅遊資訊](https://codepen.io/picka/pen/LrLZbE)

### 其他
- (js之滚动置顶效果)[https://my.oschina.net/cobish/blog/300626]
- (javascript读取Json数据并分页显示，支持键盘和滚轮翻页)[http://www.aspxhome.com/javascript/skills/20101/122346.htm]


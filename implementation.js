var { cal } = ChromeUtils.import("resource:///modules/calendar/calUtils.jsm");
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
ChromeUtils.import("resource://gre/modules/AppConstants.jsm");
ChromeUtils.import("resource://gre/modules/Preferences.jsm");
var { AddonManger } = Components.utils.import("resource://gre/modules/AddonManager.jsm");
var { ExtensionParent } = ChromeUtils.import("resource://gre/modules/ExtensionParent.jsm");
var extension = ExtensionParent.GlobalManager.getExtension("Timetable@Sungho.Hwang");


var myapi = class extends ExtensionCommon.ExtensionAPI {
  onShutdown(isAppShutdown) {
    if (isAppShutdown) {
        return;
    }
    const Cu = Components.utils;
    const rootURI = this.extension.rootURI.spec;
    for (var module of Cu.loadedModules) {
        if (module.startsWith(rootURI)) {
            Cu.unload(module);
            };
    }
    const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
    Services.obs.notifyObservers(null, "startupcache-invalidate", null);
    }
  getAPI(context) {
  extension.callOnClose(this)
    return {
        myapi: {
            setOne: function (selector, property, timeTable) {
                var windows = Services.wm.getEnumerator("mail:3pane");
                while (windows.hasMoreElements()) {
                    var window = windows.getNext();
                    var element = window.document.querySelector(selector)
                    var timeTable = window.document.createXULElement('calendar-modevbox');
                    timeTable.style.width = "210px";
                    timeTable.setAttribute("id", "time-table");
                    timeTable.setAttribute("mode", "task");
                    timeTable.style.border = '1px solid';
                    timeTable.style.fontSize = '13px';
                    timeTable.style.display = 'flex';
                    timeTable.style.flexDirection = 'column';
                    timeTable.style.flexWrap = 'wrap';
                    var body = window.document.createElement("body");
                    body.setAttribute("autocomplete", "on");
                    var dateBoxO = window.document.createXULElement('vbox');
                    var dateBoxT = window.document.createXULElement('hbox');
                    var dateToday = window.document.createXULElement('hbox');
                    function bodyatDate(date) {
                        var d = new Date(date),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = "/ " + d.getFullYear();

                        return [year, month, day].join('-');
                    };
                    dateToday.append(bodyatDate(Date()));
                    dateToday.style.display = "flex";
                    dateToday.style.alignItems = "center";
                    dateToday.style.justifyContent = "center";
                    dateToday.style.fontWeight = "bold";
                    dateToday.style.fontSize = "13px";
                    var inputDate = window.document.createElement("input");
                    var inputDate = window.document.createElement("input");
                    inputDate.style.fontWeight = "bold";
                    inputDate.style.fontSize = "13px";
                    inputDate.setAttribute("id", "inputDate");
                    inputDate.setAttribute("id", "inputDate");

                    function divDate(date) {
                        var day = Services.wm.getMostRecentWindow("mail:3pane").TodayPane.start.day;
                        var month = Services.wm.getMostRecentWindow("mail:3pane").TodayPane.start.month + 1;
                        var year = Services.wm.getMostRecentWindow("mail:3pane").TodayPane.start.year;

                        return [year, month, day].join('-');
                    };
                    inputDate.setAttribute("value", divDate());
                    inputDate.setAttribute("onchange", "Todaypane.setDaywithjsDate(this.value)");
                    dateBoxO.style.display = "flex";
                    dateBoxO.style.alignItems = "center";
                    dateBoxO.style.justifyContent = "center";
                    inputDate.style.display = "flex";
                    inputDate.style.alignItems = "center";
                    inputDate.style.justifyContent = "center";
                    inputDate.style.display = "flex";
                    inputDate.style.alignItems = "center";
                    inputDate.style.justifyContent = "center";
                    dateBoxT.style.display = "flex";
                    dateBoxT.style.alignItems = "center";
                    dateBoxT.style.justifyContent = "center";
                    inputDate.style.height = '13px';
                    inputDate.style.fontSize = '13px';
                    inputDate.style.width = '80px';
                    inputDate.style.fontWeight = "bold";
                    var miniMonthBtn = window.document.getElementById("miniday-dropdown-button").cloneNode(0);
                    miniMonthBtn.setAttribute("type", "menu");
                    miniMonthBtn.setAttribute("wantdropmarker", "true");
                    miniMonthBtn.setAttribute("class", "toolbarbutton");
                    var dropdownMinimonth = window.document.getElementById("miniday-dropdown-minimonth").cloneNode(0);
                    var popup = window.document.createXULElement("menupopup");
                    dropdownMinimonth.setAttribute("type", "menuitem");
                    popup.appendChild(dropdownMinimonth);
                    dropdownMinimonth.addEventListener("click", function () { inputDate.setAttribute("value", divDate()); });
                    miniMonthBtn.appendChild(popup);
                    dateBoxO.appendChild(inputDate);
                    dateBoxO.appendChild(miniMonthBtn);
                    dateBoxT.appendChild(inputDate);
                    dateBoxT.appendChild(dateToday);
                    body.appendChild(dateBoxO);
                    body.appendChild(dateBoxT);
                    
                    var AM06 = window.document.createXULElement('hbox');
                    AM06.style.padding = '0';
                    AM06.style.margin = '0';
                    var label06 = window.document.createXULElement('label');
                    label06.setAttribute('value', 'AM 06:');
                    label06.style.height = '13px';
                    label06.style.padding = '0';
                    label06.style.margin = '0';
                    label06.style.width = '50px';
                    label06.style.textAlign = 'left';
                    var input06 = window.document.createElement('input');
                    input06.style.height = '13px';
                    input06.style.width = '150px';
                    input06.style.padding = '0';
                    input06.style.margin = '0';
                    input06.style.align = 'right';
                    input06.setAttribute("type", "text");
                    input06.setAttribute("id", "input06");
                    input06.textContent = input06.value;
                    AM06.appendChild(label06);
                    AM06.appendChild(input06);
                    body.appendChild(AM06);

                    var AM07 = window.document.createXULElement('hbox');
                    AM07.style.padding = '0';
                    AM07.style.margin = '0';
                    var label07 = window.document.createXULElement('label');
                    label07.setAttribute('value', 'AM 07:');
                    label07.style.height = '13px';
                    label07.style.padding = '0';
                    label07.style.margin = '0';
                    label07.style.width = '50px';
                    label07.style.textAlign = 'left';
                    var input07 = window.document.createElement('input');
                    input07.style.height = '13px';
                    input07.style.width = '150px';
                    input07.style.padding = '0';
                    input07.style.margin = '0';
                    input07.style.align = 'right';
                    input07.setAttribute("type", "text");
                    input07.setAttribute("id", "input07");
                    input07.textContent = input07.value;
                    AM07.appendChild(label07);
                    AM07.appendChild(input07);
                    body.appendChild(AM07);

                    var AM08 = window.document.createXULElement('hbox');
                    AM08.style.padding = '0';
                    AM08.style.margin = '0';
                    var label08 = window.document.createXULElement('label');
                    label08.setAttribute('value', 'AM 08:');
                    label08.style.height = '13px';
                    label08.style.padding = '0';
                    label08.style.margin = '0';
                    label08.style.width = '50px';
                    label08.style.textAlign = 'left';
                    var input08 = window.document.createElement('input');
                    input08.style.height = '13px';
                    input08.style.width = '150px';
                    input08.style.padding = '0';
                    input08.style.margin = '0';
                    input08.style.align = 'right';
                    input08.setAttribute("type", "text");
                    input08.setAttribute("id", "input08");
                    input08.textContent = input08.value;
                    AM08.appendChild(label08);
                    AM08.appendChild(input08);
                    body.appendChild(AM08);

                    var AM09 = window.document.createXULElement('hbox');
                    AM09.style.padding = '0';
                    AM09.style.margin = '0';
                    var label09 = window.document.createXULElement('label');
                    label09.setAttribute('value', 'AM 09:');
                    label09.style.height = '13px';
                    label09.style.padding = '0';
                    label09.style.margin = '0';
                    label09.style.width = '50px';
                    label09.style.textAlign = 'left';
                    var input09 = window.document.createElement('input');
                    input09.style.height = '13px';
                    input09.style.width = '150px';
                    input09.style.padding = '0';
                    input09.style.margin = '0';
                    input09.style.align = 'right';
                    input09.setAttribute("type", "text");
                    input09.setAttribute("id", "input09");
                    input09.textContent = input09.value;
                    AM09.appendChild(label09);
                    AM09.appendChild(input09);
                    body.appendChild(AM09);

                    var AM10 = window.document.createXULElement('hbox');
                    AM10.style.padding = '0';
                    AM10.style.margin = '0';
                    var label10 = window.document.createXULElement('label');
                    label10.setAttribute('value', 'AM 10:');
                    label10.style.height = '13px';
                    label10.style.padding = '0';
                    label10.style.margin = '0';
                    label10.style.width = '50px';
                    label10.style.textAlign = 'left';
                    var input10 = window.document.createElement('input');
                    input10.style.height = '13px';
                    input10.style.width = '150px';
                    input10.style.padding = '0';
                    input10.style.margin = '0';
                    input10.style.align = 'right';
                    input10.setAttribute("type", "text");
                    input10.setAttribute("id", "input10");
                    input10.textContent = input10.value;
                    AM10.appendChild(label10);
                    AM10.appendChild(input10);
                    body.appendChild(AM10);

                    var AM11 = window.document.createXULElement('hbox');
                    AM11.style.padding = '0';
                    AM11.style.margin = '0';
                    var label11 = window.document.createXULElement('label');
                    label11.setAttribute('value', 'AM 11:');
                    label11.style.height = '13px';
                    label11.style.padding = '0';
                    label11.style.margin = '0';
                    label11.style.width = '50px';
                    label11.style.textAlign = 'left';
                    var input11 = window.document.createElement('input');
                    input11.style.height = '13px';
                    input11.style.width = '150px';
                    input11.style.padding = '0';
                    input11.style.margin = '0';
                    input11.style.align = 'right';
                    input11.setAttribute("type", "text");
                    input11.setAttribute("id", "input11");
                    input11.textContent = input11.value;
                    AM11.appendChild(label11);
                    AM11.appendChild(input11);
                    body.appendChild(AM11);

                    var MD12 = window.document.createXULElement('hbox');
                    MD12.style.padding = '0';
                    MD12.style.margin = '0';
                    var label12 = window.document.createXULElement('label');
                    label12.setAttribute('value', 'MD 12:');
                    label12.style.height = '13px';
                    label12.style.padding = '0';
                    label12.style.margin = '0';
                    label12.style.width = '50px';
                    label12.style.textAlign = 'left';
                    var input12 = window.document.createElement('input');
                    input12.style.height = '13px';
                    input12.style.width = '150px';
                    input12.style.padding = '0';
                    input12.style.margin = '0';
                    input12.style.align = 'right';
                    input12.setAttribute("type", "text");
                    input12.setAttribute("id", "input12");
                    input12.textContent = input06.value;
                    MD12.appendChild(label12);
                    MD12.appendChild(input12);
                    body.appendChild(MD12);

                    var PM01 = window.document.createXULElement('hbox');
                    PM01.style.padding = '0';
                    PM01.style.margin = '0';
                    var label13 = window.document.createXULElement('label');
                    label13.setAttribute('value', 'PM 01:');
                    label13.style.height = '13px';
                    label13.style.padding = '0';
                    label13.style.margin = '0';
                    label13.style.width = '50px';
                    label13.style.textAlign = 'left';
                    var input13 = window.document.createElement('input');
                    input13.style.height = '13px';
                    input13.style.width = '150px';
                    input13.style.padding = '0';
                    input13.style.margin = '0';
                    input13.style.align = 'right';
                    input13.setAttribute("type", "text");
                    input13.setAttribute("id", "input13");
                    input13.textContent = input13.value;
                    PM01.appendChild(label13);
                    PM01.appendChild(input13);
                    body.appendChild(PM01);

                    var PM02 = window.document.createXULElement('hbox');
                    PM02.style.padding = '0';
                    PM02.style.margin = '0';
                    var label14 = window.document.createXULElement('label');
                    label14.setAttribute('value', 'PM 02:');
                    label14.style.height = '13px';
                    label14.style.padding = '0';
                    label14.style.margin = '0';
                    label14.style.width = '50px';
                    label14.style.textAlign = 'left';
                    var input14 = window.document.createElement('input');
                    input14.style.height = '13px';
                    input14.style.width = '150px';
                    input14.style.padding = '0';
                    input14.style.margin = '0';
                    input14.style.align = 'right';
                    input14.setAttribute("type", "text");
                    input14.setAttribute("id", "input14");
                    input14.textContent = input14.value;
                    PM02.appendChild(label14);
                    PM02.appendChild(input14);
                    body.appendChild(PM02);

                    var PM03 = window.document.createXULElement('hbox');
                    PM03.style.padding = '0';
                    PM03.style.margin = '0';
                    var label15 = window.document.createXULElement('label');
                    label15.setAttribute('value', 'PM 03:');
                    label15.style.height = '13px';
                    label15.style.padding = '0';
                    label15.style.margin = '0';
                    label15.style.width = '50px';
                    label15.style.textAlign = 'left';
                    var input15 = window.document.createElement('input');
                    input15.style.height = '13px';
                    input15.style.width = '150px';
                    input15.style.padding = '0';
                    input15.style.margin = '0';
                    input15.style.align = 'right';
                    input15.setAttribute("type", "text");
                    input15.setAttribute("id", "input15");
                    input15.textContent = input15.value;
                    PM03.appendChild(label15);
                    PM03.appendChild(input15);
                    body.appendChild(PM03);

                    var PM04 = window.document.createXULElement('hbox');
                    PM04.style.padding = '0';
                    PM04.style.margin = '0';
                    var label16 = window.document.createXULElement('label');
                    label16.setAttribute('value', 'PM 04:');
                    label16.style.height = '13px';
                    label16.style.padding = '0';
                    label16.style.margin = '0';
                    label16.style.width = '50px';
                    label16.style.textAlign = 'left';
                    var input16 = window.document.createElement('input');
                    input16.style.height = '13px';
                    input16.style.width = '150px';
                    input16.style.padding = '0';
                    input16.style.margin = '0';
                    input16.style.align = 'right';
                    input16.setAttribute("type", "text");
                    input16.setAttribute("id", "input16");
                    input16.textContent = input16.value;
                    PM04.appendChild(label16);
                    PM04.appendChild(input16);
                    body.appendChild(PM04);

                    var PM05 = window.document.createXULElement('hbox');
                    PM05.style.padding = '0';
                    PM05.style.margin = '0';
                    var label17 = window.document.createXULElement('label');
                    label17.setAttribute('value', 'PM 05:');
                    label17.style.height = '13px';
                    label17.style.padding = '0';
                    label17.style.margin = '0';
                    label17.style.width = '50px';
                    label17.style.textAlign = 'left';
                    var input17 = window.document.createElement('input');
                    input17.style.height = '13px';
                    input17.style.width = '150px';
                    input17.style.padding = '0';
                    input17.style.margin = '0';
                    input17.style.align = 'right';
                    input17.setAttribute("type", "text");
                    input17.setAttribute("id", "input17");
                    input17.textContent = input17.value;
                    PM05.appendChild(label17);
                    PM05.appendChild(input17);
                    body.appendChild(PM05);

                    var PM06 = window.document.createXULElement('hbox');
                    PM06.style.padding = '0';
                    PM06.style.margin = '0';
                    var label18 = window.document.createXULElement('label');
                    label18.setAttribute('value', 'PM 06:');
                    label18.style.height = '13px';
                    label18.style.padding = '0';
                    label18.style.margin = '0';
                    label18.style.width = '50px';
                    label18.style.textAlign = 'left';
                    var input18 = window.document.createElement('input');
                    input18.style.height = '13px';
                    input18.style.width = '150px';
                    input18.style.padding = '0';
                    input18.style.margin = '0';
                    input18.style.align = 'right';
                    input18.setAttribute("type", "text");
                    input18.setAttribute("id", "input18");
                    input18.textContent = input18.value;
                    PM06.appendChild(label18);
                    PM06.appendChild(input18);
                    body.appendChild(PM06);

                    var PM07 = window.document.createXULElement('hbox');
                    PM07.style.padding = '0';
                    PM07.style.margin = '0';
                    var label19 = window.document.createXULElement('label');
                    label19.setAttribute('value', 'PM 07:');
                    label19.style.height = '13px';
                    label19.style.padding = '0';
                    label19.style.margin = '0';
                    label19.style.width = '50px';
                    label19.style.textAlign = 'left';
                    var input19 = window.document.createElement('input');
                    input19.style.height = '13px';
                    input19.style.width = '150px';
                    input19.style.padding = '0';
                    input19.style.margin = '0';
                    input19.style.align = 'right';
                    input19.setAttribute("type", "text");
                    input19.setAttribute("id", "input19");
                    input19.textContent = input19.value;
                    PM07.appendChild(label19);
                    PM07.appendChild(input19);
                    body.appendChild(PM07);

                    var PM08 = window.document.createXULElement('hbox');
                    PM08.style.padding = '0';
                    PM08.style.margin = '0';
                    var label20 = window.document.createXULElement('label');
                    label20.setAttribute('value', 'PM 08:');
                    label20.style.height = '13px';
                    label20.style.padding = '0';
                    label20.style.margin = '0';
                    label20.style.width = '50px';
                    label20.style.textAlign = 'left';
                    var input20 = window.document.createElement('input');
                    input20.style.height = '13px';
                    input20.style.width = '150px';
                    input20.style.padding = '0';
                    input20.style.margin = '0';
                    input20.style.align = 'right';
                    input20.setAttribute("type", "text");
                    input20.setAttribute("id", "input20");
                    input20.textContent = input20.value;
                    PM08.appendChild(label20);
                    PM08.appendChild(input20);
                    body.appendChild(PM08);

                    var PM09 = window.document.createXULElement('hbox');
                    PM09.style.padding = '0';
                    PM09.style.margin = '0';
                    var label21 = window.document.createXULElement('label');
                    label21.setAttribute('value', 'PM 09:');
                    label21.style.height = '13px';
                    label21.style.padding = '0';
                    label21.style.margin = '0';
                    label21.style.width = '50px';
                    label21.style.textAlign = 'left';
                    var input21 = window.document.createElement('input');
                    input21.style.height = '13px';
                    input21.style.width = '150px';
                    input21.style.padding = '0';
                    input21.style.margin = '0';
                    input21.style.align = 'right';
                    input21.setAttribute("type", "text");
                    input21.setAttribute("id", "input21");
                    input21.textContent = input21.value;
                    PM09.appendChild(label21);
                    PM09.appendChild(input21);
                    body.appendChild(PM09);

                    var PM10 = window.document.createXULElement('hbox');
                    PM10.style.padding = '0';
                    PM10.style.margin = '0';
                    var label22 = window.document.createXULElement('label');
                    label22.setAttribute('value', 'PM 10:');
                    label22.style.height = '13px';
                    label22.style.padding = '0';
                    label22.style.margin = '0';
                    label22.style.width = '50px';
                    label22.style.textAlign = 'left';
                    var input22 = window.document.createElement('input');
                    input22.style.height = '13px';
                    input22.style.width = '150px';
                    input22.style.padding = '0';
                    input22.style.margin = '0';
                    input22.style.align = 'right';
                    input22.setAttribute("type", "text");
                    input22.setAttribute("id", "input22");
                    input22.textContent = input22.value;
                    PM10.appendChild(label22);
                    PM10.appendChild(input22);
                    body.appendChild(PM10);

                    var PM11 = window.document.createXULElement('hbox');
                    PM11.style.padding = '0';
                    PM11.style.margin = '0';
                    var label23 = window.document.createXULElement('label');
                    label23.setAttribute('value', 'PM 11:');
                    label23.style.height = '13px';
                    label23.style.padding = '0';
                    label23.style.margin = '0';
                    label23.style.width = '50px';
                    label23.style.textAlign = 'left';
                    var input23 = window.document.createElement('input');
                    input23.style.height = '13px';
                    input23.style.width = '150px';
                    input23.style.padding = '0';
                    input23.style.margin = '0';
                    input23.style.align = 'right';
                    input23.setAttribute("type", "text");
                    input23.setAttribute("id", "input23");
                    input23.textContent = input23.value;
                    PM11.appendChild(label23);
                    PM11.appendChild(input23);
                    body.appendChild(PM11);

                    var MN00 = window.document.createXULElement('hbox');
                    MN00.style.padding = '0';
                    MN00.style.margin = '0';
                    var label00 = window.document.createXULElement('label');
                    label00.setAttribute('value', 'MN 00:');
                    label00.style.height = '13px';
                    label00.style.padding = '0';
                    label00.style.margin = '0';
                    label00.style.width = '50px';
                    label00.style.textAlign = 'left';
                    var input00 = window.document.createElement('input');
                    input00.style.height = '13px';
                    input00.style.width = '150px';
                    input00.style.padding = '0';
                    input00.style.margin = '0';
                    input00.style.align = 'right';
                    input00.setAttribute("type", "text");
                    input00.setAttribute("id", "input00");
                    input00.textContent = input00.value;
                    MN00.appendChild(label00);
                    MN00.appendChild(input00);
                    body.appendChild(MN00);

                    var AM01 = window.document.createXULElement('hbox');
                    AM01.style.padding = '0';
                    AM01.style.margin = '0';
                    var label01 = window.document.createXULElement('label');
                    label01.setAttribute('value', 'AM 01:');
                    label01.style.height = '13px';
                    label01.style.padding = '0';
                    label01.style.margin = '0';
                    label01.style.width = '50px';
                    label01.style.textAlign = 'left';
                    var input01 = window.document.createElement('input');
                    input01.style.height = '13px';
                    input01.style.width = '150px';
                    input01.style.padding = '0';
                    input01.style.margin = '0';
                    input01.style.align = 'right';
                    input01.setAttribute("type", "text");
                    input01.setAttribute("id", "input01");
                    input01.textContent = input01.value;
                    AM01.appendChild(label01);
                    AM01.appendChild(input01);
                    body.appendChild(AM01);

                    var AM02 = window.document.createXULElement('hbox');
                    AM02.style.padding = '0';
                    AM02.style.margin = '0';
                    var label02 = window.document.createXULElement('label');
                    label02.setAttribute('value', 'AM 02:');
                    label02.style.height = '13px';
                    label02.style.padding = '0';
                    label02.style.margin = '0';
                    label02.style.width = '50px';
                    label02.style.textAlign = 'left';
                    var input02 = window.document.createElement('input');
                    input02.style.height = '13px';
                    input02.style.width = '150px';
                    input02.style.padding = '0';
                    input02.style.margin = '0';
                    input02.style.align = 'right';
                    input02.setAttribute("type", "text");
                    input02.setAttribute("id", "input02");
                    input02.textContent = input02.value;
                    AM02.appendChild(label02);
                    AM02.appendChild(input02);
                    body.appendChild(AM02);

                    var AM03 = window.document.createXULElement('hbox');
                    AM03.style.padding = '0';
                    AM03.style.margin = '0';
                    var label03 = window.document.createXULElement('label');
                    label03.setAttribute('value', 'AM 03:');
                    label03.style.height = '13px';
                    label03.style.padding = '0';
                    label03.style.margin = '0';
                    label03.style.width = '50px';
                    label03.style.textAlign = 'left';
                    var input03 = window.document.createElement('input');
                    input03.style.height = '13px';
                    input03.style.width = '150px';
                    input03.style.padding = '0';
                    input03.style.margin = '0';
                    input03.style.align = 'right';
                    input03.setAttribute("type", "text");
                    input03.setAttribute("id", "input03");
                    input03.textContent = input03.value;
                    AM03.appendChild(label03);
                    AM03.appendChild(input03);
                    body.appendChild(AM03);

                    var AM04 = window.document.createXULElement('hbox');
                    AM04.style.padding = '0';
                    AM04.style.margin = '0';
                    var label04 = window.document.createXULElement('label');
                    label04.setAttribute('value', 'AM 04:');
                    label04.style.height = '13px';
                    label04.style.padding = '0';
                    label04.style.margin = '0';
                    label04.style.width = '50px';
                    label04.style.textAlign = 'left';
                    var input04 = window.document.createElement('input');
                    input04.style.height = '13px';
                    input04.style.width = '150px';
                    input04.style.padding = '0';
                    input04.style.margin = '0';
                    input04.style.align = 'right';
                    input04.setAttribute("type", "text");
                    input04.setAttribute("id", "input04");
                    input04.textContent = input04.value;
                    AM04.appendChild(label04);
                    AM04.appendChild(input04);
                    body.appendChild(AM04);

                    var AM05 = window.document.createXULElement('hbox');
                    AM05.style.padding = '0';
                    AM05.style.margin = '0';
                    var label05 = window.document.createXULElement('label');
                    label05.setAttribute('value', 'AM 05:');
                    label05.style.height = '13px';
                    label05.style.padding = '0';
                    label05.style.margin = '0';
                    label05.style.width = '50px';
                    label05.style.textAlign = 'left';
                    var input05 = window.document.createElement('input');
                    input05.style.height = '13px';
                    input05.style.width = '150px';
                    input05.style.padding = '0';
                    input05.style.margin = '0';
                    input05.style.align = 'right';
                    input05.setAttribute("type", "text");
                    input05.setAttribute("id", "input05");
                    input05.textContent = input05.value;
                    AM05.appendChild(label05);
                    AM05.appendChild(input05);
                    body.appendChild(AM05);

                    var list = window.document.createElement("ul");
                    var h1 = window.document.createElement("h1");
                    var h2 = window.document.createElement("h2");
                    timeTable.appendChild(h1);
                    h1.style.fontSize = "13px";
                    h1.textContent = "Timetable - Mozilla Thunderbird";
                    h1.style.display = "flex";
                    h1.style.alignItems = "center";
                    h1.style.justifyContent = "center";
                    timeTable.appendChild(body);
                    timeTable.appendChild(list);
                    h2.style.fontSize = "13px";
                    var previousBtn = window.document.createElement("button");
                    previousBtn.textContent = "Previous";
                    previousBtn.style.display = "flex";
                    previousBtn.style.alignItems = "center";
                    previousBtn.style.justifyContent = "center";
                    var nextBtn = window.document.createElement("button");
                    nextBtn.textContent = "Next";
                    nextBtn.style.display = "flex";
                    nextBtn.style.alignItems = "center";
                    nextBtn.style.justifyContent = "center";
                    var updateBtn = window.document.createElement("button");
                    updateBtn.textContent = "Update";
                    updateBtn.style.display = "flex";
                    updateBtn.style.alignItems = "center";
                    updateBtn.style.justifyContent = "center";
                    var deleteBtn = window.document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.style.display = "flex";
                    deleteBtn.style.alignItems = "center";
                    deleteBtn.style.justifyContent = "center";
                    var buttonBoxOne = window.document.createXULElement("hbox");
                    var buttonBoxTwo = window.document.createXULElement("hbox");
                    buttonBoxOne.style.display = "flex";
                    buttonBoxOne.style.alignItems = "center";
                    buttonBoxOne.style.justifyContent = "center";
                    buttonBoxTwo.style.display = "flex";
                    buttonBoxTwo.style.alignItems = "center";
                    buttonBoxTwo.style.justifyContent = "center";
                    previousBtn.style.fontSize = "13px";
                    nextBtn.style.fontSize = "13px";
                    updateBtn.style.fontSize = "13px";
                    deleteBtn.style.fontSize = "13px";
                    previousBtn.style.border = "1px solid";
                    nextBtn.style.border = "1px solid";
                    updateBtn.style.border = "1px solid";
                    deleteBtn.style.border = "1px solid";
                    buttonBoxOne.appendChild(updateBtn);
                    buttonBoxOne.appendChild(deleteBtn);
                    buttonBoxTwo.appendChild(previousBtn);
                    buttonBoxTwo.appendChild(nextBtn);
                    body.appendChild(buttonBoxOne);
                    body.appendChild(buttonBoxTwo);
                    body.style.overflow = "auto";
                    previousBtn.onclick = "previousData();";
                    previousBtn.onclick = "nextData();";
                    updateBtn.onclick = "updateData();";
                    deleteBtn.onclick = "deleteData();";
                    previousBtn.style.width = "90px";
                    nextBtn.style.width = "90px";
                    updateBtn.style.width = "90px";
                    deleteBtn.style.width = "90px";
                    timeTable.appendChild(h2);

                    window.document.getElementById("today-pane-panel").appendChild(timeTable);

                    //1)
                    var db;
                    var dbName = "TT-DB";
                    var request = window.indexedDB.open("TT-DB", 4);

                    request.onerror = function (event) {
                        h2.textContent += "Error loading database.";
                    };
                    request.onsuccess = function (event) {
                        db = event.target.result;
                        h2.textContent += "Database created.";

                    window.addEventListener("storage", request.onupgradeneeded);
                    };

                    request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var objectStore = db.createObjectStore("TT-OS", { keyPath: "id", autoIncrement: true });
                            objectStore.createIndex("inputDate", "inputDate", { unique: false });
                            objectStore.createIndex("input06", "input06", { unique: false });
                            objectStore.createIndex("input07", "input07", { unique: false });
                            objectStore.createIndex("input08", "input08", { unique: false });
                            objectStore.createIndex("input09", "input09", { unique: false });
                            objectStore.createIndex("input10", "input10", { unique: false });
                            objectStore.createIndex("input11", "input11", { unique: false });
                            objectStore.createIndex("input12", "input12", { unique: false });
                            objectStore.createIndex("input13", "input13", { unique: false });
                            objectStore.createIndex("input14", "input14", { unique: false });
                            objectStore.createIndex("input15", "input15", { unique: false });
                            objectStore.createIndex("input16", "input16", { unique: false });
                            objectStore.createIndex("input17", "input17", { unique: false });
                            objectStore.createIndex("input18", "input18", { unique: false });
                            objectStore.createIndex("input19", "input19", { unique: false });
                            objectStore.createIndex("input20", "input20", { unique: false });
                            objectStore.createIndex("input21", "input21", { unique: false });
                            objectStore.createIndex("input22", "input22", { unique: false });
                            objectStore.createIndex("input23", "input23", { unique: false });
                            objectStore.createIndex("input00", "input00", { unique: false });
                            objectStore.createIndex("input01", "input01", { unique: false });
                            objectStore.createIndex("input02", "input02", { unique: false });
                            objectStore.createIndex("input03", "input03", { unique: false });
                            objectStore.createIndex("input04", "input04", { unique: false });
                            objectStore.createIndex("input05", "input05", { unique: false });

                            var data = {
                                "inputDate": "2021-1-1",
                                "input06": "Input text",
                                "input07": "Input text",
                                "input08": "Input text",
                                "input09": "Input text",
                                "input10": "Input text",
                                "input11": "Input text",
                                "input12": "Input text",
                                "input13": "Input text",
                                "input14": "Input text",
                                "input15": "Input text",
                                "input16": "Input text",
                                "input17": "Input text",
                                "input18": "Input text",
                                "input19": "Input text",
                                "input20": "Input text",
                                "input21": "Input text",
                                "input22": "Input text",
                                "input23": "Input text",
                                "input00": "Input text",
                                "input01": "Input text",
                                "input02": "Input text",
                                "input03": "Input text",
                                "input04": "Input text",
                                "input05": "Input text"
                            };

                            objectStore.transaction.oncomplete = function (event) {
                                h2.textContent += "Data finished.";
                            };
                                objectStore.add(data);
                                objectStore.transaction.oncomplete = function (event) {
                                    h2.textContent += "Data added.";
                            }
                    }

                    //2)
                     function previousData (event) {
                            var request = window.indexedDB.open("TT-DB", 4);
                            var db = event.target.result;
                            var transaction = db.transaction(["TT-OS"], "readwrite");
                            var objectStore = transaction.objectStore("TT-OS");
                            for (var j; j < key.length;  j--) {
                            objectStore.get("j");
                                inputDate.textContent = key.inputDate;
                                input06.textContent = key.input06;
                                input07.textContent = key.input07;
                                input08.textContent = key.input08;
                                input09.textContent = key.input09;
                                input10.textContent = key.input10;
                                input11.textContent = key.input11;
                                input12.textContent = key.input12;
                                input13.textContent = key.input13;
                                input14.textContent = key.input14;
                                input15.textContent = key.input15;
                                input16.textContent = key.input16;
                                input17.textContent = key.input17;
                                input18.textContent = key.input18;
                                input19.textContent = key.input19;
                                input20.textContent = key.input20;
                                input21.textContent = key.input21;
                                input22.textContent = key.input22;
                                input23.textContent = key.input23;
                                input00.textContent = key.input00;
                                input01.textContent = key.input01;
                                input02.textContent = key.input02;
                                input03.textContent = key.input03;
                                input04.textContent = key.input04;
                                input05.textContent = key.input05;
                            }
                    };

                    //3)
                    function nextData (event) {
                            var request = window.indexedDB.open("TT-DB", 4);
                        var db = event.target.result;
                            var transaction = db.transaction(["TT-OS"], "readwrite");
                            var objectStore = transaction.objectStore("TT-OS");
                            for (var k = 1; k < key.length; k++) {
                            objectStore.get("key");
                                inputDate.textContent = key.inputDate;
                                input06.textContent = key.input06;
                                input07.textContent = key.input07;
                                input08.textContent = key.input08;
                                input09.textContent = key.input09;
                                input10.textContent = key.input10;
                                input11.textContent = key.input11;
                                input12.textContent = key.input12;
                                input13.textContent = key.input13;
                                input14.textContent = key.input14;
                                input15.textContent = key.input15;
                                input16.textContent = key.input16;
                                input17.textContent = key.input17;
                                input18.textContent = key.input18;
                                input19.textContent = key.input19;
                                input20.textContent = key.input20;
                                input21.textContent = key.input21;
                                input22.textContent = key.input22;
                                input23.textContent = key.input23;
                                input00.textContent = key.input00;
                                input01.textContent = key.input01;
                                input02.textContent = key.input02;
                                input03.textContent = key.input03;
                                input04.textContent = key.input04;
                                input05.textContent = key.input05;
                            };
                    };

                    //4)
                    function updateData (event) {
                            var request = window.indexedDB.open("TT-DB", 4);
                            var db = event.target.result;
                            var transaction = db.transaction(["TT-OS"], "readwrite");
                            var objectStore = transaction.objectStore("TT-OS");
                            objectStore.put(data);
                        request.onsuccess = function (event) {
                            h2.textContent += "Data updated.";
                        };
                    };

                    //5)
                    function deleteData (event) {
                            var request = db.transaction(["TT-OS"],  "readwrite")
                                                          .objectStore("TT-OS")
                                                          .delete(keys);
                        request.onsuccess = function (event) {
                            h2.textContent += "Data deleted.";
                        };
                                             }
                                };
                            },
                setThree: function() {
                    var windows = Services.wm.getEnumerator("mail:3pane");
                    while (windows.hasMoreElements()) {
                        var window = windows.getNext();
                        var todayPanePanel = window.document.querySelector("#today-pane-panel");
                        var todayPanePanelLastChild = window.document.querySelector("#today-pane-panel>#time-table");
                        todayPanePanel.removeChild(todayPanePanelLastChild);
                   }
                },
                  setSeven: function(id, property, getCurrentFrAMeColor) {
                    var windows = Services.wm.getEnumerator("mail:3pane");
                    while (windows.hasMoreElements()) {
                        var window = windows.getNext();
                            window.document.getElementById('time-table').style.backgroundColor = getCurrentFrAMeColor;
                        }
                    },
                  setEight: function(id, property, getCurrentBorderColor) {
                    var windows = Services.wm.getEnumerator("mail:3pane");
                    while (windows.hasMoreElements()) {
                        var window = windows.getNext();
                            window.document.getElementById('time-table').style.color = getCurrentBorderColor;
                    }
                }
            }
        }
    }
    close() {
                    var windows = Services.wm.getEnumerator("mail:3pane");
                    while (windows.hasMoreElements()) {
                        var window = windows.getNext();
                        var todayPanePanel = window.document.querySelector("#today-pane-panel");
                        var todayPanePanelLastChild = window.document.querySelector("#today-pane-panel>#time-table");
                        todayPanePanel.removeChild(todayPanePanelLastChild);
                   }
        Services.obs.notifyObservers(null, "startupcache-invalidate", null); 
    }
};
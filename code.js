formOne.addEventListener('click', function () {
    browser.myapi.setOne('#today-pane-panel', 'appendChild', 'eventView');
async function execute(theme) { 

var theme = await browser.theme.getCurrent();

var getCurrentFrameColor = theme.colors.frame;
var getCurrentBorderColor = theme.colors.toolbar_field_text;

browser.myapi.setSeven("time-table", "backgroundColor", getCurrentFrameColor); 
browser.myapi.setEight("time-table", "borderColor", getCurrentBorderColor); 
function update() {
theme.update(getCurrentFrameColor);
theme.update(getCurrentBorderColor);
}
update();
};
execute();
browser.theme.onUpdated.addListener(execute);
});

formTwo.addEventListener("click", function() {
    browser.myapi.setThree();
});
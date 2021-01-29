/*

// Takeing care of this later

async function execute(theme) {
    var theme = await browser.theme.getCurrent();

    var getCurrentFrameColor = theme.colors.frame;
    var getCurrentBorderColor = theme.colors.toolbar_field_text;

    browser.myapi.setSeven("time-table", "backgroundColor", getCurrentFrameColor);
    browser.myapi.setEight("time-table", "borderColor", getCurrentBorderColor);

	theme.update(getCurrentFrameColor);
	theme.update(getCurrentBorderColor);
};

browser.theme.onUpdated.addListener(execute);

*/

// Register a webExtension iframe inside the calendar
messenger.ex_customui.add(
  messenger.ex_customui.LOCATION_CALENDAR,
  "timetable/timetable.html",
  {
      height: 500
  }
);

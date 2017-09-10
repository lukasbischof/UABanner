# UABanner
Small JS Library for displaying a notification-banner.

## Usage
#### UABanner
Constructor:

`UABanner(String title, String text, Int timeout, Array buttons, Int width);`

or 

`UABanner(Object options);`

Possible values for the options object:
* `title`: String, required
* `text`: String
* `width`: Int, default: 800, min: 200
* `timeout`: Int, default: (buttons specified? yes => No timeout, no => 4000ms); In Miliseconds
* `buttons`: Array of UAButton objects


#### UAButton
Constructor:

`UAButton(String text, String style, Function pressedEventHandler);`

or 

`UAButton(Object options);`

Possible values for the options object:
* text: String, required
* style: String, default: UAButton.NORMAL
* pressedEventHandler: Function

### Sample usage
```javascript
var banner = new UABanner({
	title: "Title",
	text : "Text",
	width: 500,
	buttons: [
		new UAButton({
			text: "Ok",
			style: UAButton.NORMAL,
			pressedEventHandler: function(e) {
				// …
			}
		}),
    // …
	]
});

banner.show();
```

For a demo open banner.html in your browser

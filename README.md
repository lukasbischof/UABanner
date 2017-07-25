# UABanner
Small JS Library for displaying a banner


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

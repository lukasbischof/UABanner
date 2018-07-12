# UABanner

Small JS Library for displaying a notification-banner.

## Usage

#### Installation

Include

```css
<link rel="stylesheet" href="dist/UABanner.min.css" />
<script type="text/javascript" src="dist/UABanner.min.js"></script>
```

in your header

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
				// ...
			}
		}),
    // ...
	]
});

banner.show();
```

For a demo open demo/index.html in your browser

## Development

To test the current code, just include the UABanner.js directly in development environment.

To make a release version, run `yarn run build` to generate a minified version in the dist folder.

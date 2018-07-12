window.addEventListener("load", function(e1) {
  document.querySelector("button").addEventListener("click", function(e2) {
    //var banner = new UABanner("Custom Banner", "Dies ist mein Banner :)");
    var banner = new UABanner({
      title: "Custom Banner",
      text : "Dies ist mein Banner :)",
      //timeout: false,
      width: 500,
      buttons: [
        new UAButton({
          text: "Abbrechen",
          style: UAButton.DESTRUCTIVE,
          pressedEventHandler: function(e) {
            e.banner.dismiss();
          }
        }),
        new UAButton("Ok", UAButton.NORMAL, function(e) {
          new UABanner({
            title: "Ausgeführt",
            timeout: 3000,
            width: 200
          }).show();
          
          setTimeout(function() {
            e.banner.dismiss();
          }, 3100);
        })
      ]
    });
    
    banner.show();
  });
});

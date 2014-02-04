var Homescreen = {
    container: null,
    screen: null,
    apps: null,
    appSplash: null,
    appUrl: null,
    appIframe: null,
    appSplashIco: null,


    handleAppClick: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var img = e.currentTarget.childNodes[1]; // img element

        // clone and hide icon
        var appSplashIco = img.cloneNode();
        
        // position and add clone to screen
        appSplashIco.classList.add("appSplashIco");
        appSplashIco.classList.add("show");
        Homescreen.appSplashIco = appSplashIco;

        // animate homescreen 
        Homescreen.screen.classList.remove("show");
        Homescreen.screen.classList.add("slideOut");

        // animate splash   
        Homescreen.appSplash.style.backgroundColor = e.currentTarget.dataset.bgcolor;
        Homescreen.appSplash.classList.add("slideIn");
        Homescreen.appSplash.appendChild(appSplashIco);
      
        Homescreen.appUrl = e.currentTarget.href;

        setTimeout(function() {
            Homescreen.loadApp();
        }, 3000)

        
        // var translateX = img.offsetLeft-((img.offsetWidth)-(Homescreen.screen.offsetWidth/2))+'px';
        // var translateY = ((Homescreen.screen.offsetHeight/2)-(img.offsetHeight))+'px';
       //img.style.transform = 'translate('+translateX+', '+translateY+')';


    },

    loadApp: function() {
        if (Homescreen.appUrl === undefined) {
            console.error("Homescreen.appUrl not defined");
            return false;
        };

        var iframe = document.createElement("iframe");
        iframe.scrolling = "no"
        iframe.src = Homescreen.appUrl;
        iframe.classList.add("appScreen");
        Homescreen.appIframe = iframe;
        Homescreen.container.appendChild(iframe);
 
        setTimeout(function() {
            var iframeBody = Homescreen.appIframe.contentDocument.body;
            iframeBody.style.margin = '0';
            iframeBody.style.padding = '0';
            iframeBody.addEventListener("click", Homescreen.goHome);
            Homescreen.appIframe.classList.add("show");
        },500);
        

    },

    goHome: function() {
        Homescreen.appIframe.classList.add("hide");
        Homescreen.appIframe.addEventListener("transitionend", function() {
            Homescreen.appIframe.parentNode.removeChild(Homescreen.appIframe);
        });
        
        Homescreen.appSplashIco.parentNode.removeChild(Homescreen.appSplashIco);
        Homescreen.appSplash.classList.remove("slideIn");

        Homescreen.screen.classList.add("show");
        Homescreen.screen.classList.remove("slideOut");
    },

    init: function() {
        this.screen = document.getElementById("home");
        this.appSplash = document.getElementById("appSplash");
        this.apps = document.getElementsByTagName("a");
        this.container = document.getElementById("container");
        
        var length = this.apps.length;
        for (var i = 0; i < length; i++) {
            var app = this.apps[i];
            app.addEventListener("click", this.handleAppClick)
        }
    }
};

(function() {
    Homescreen.init();
})();



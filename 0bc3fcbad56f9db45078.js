!function(i){i.extend(i.fn,{simpleLightboxVideo:function(){return i.simpleLightboxVideo.vars=i.extend({},{delayAnimation:300,keyCodeClose:27}),this.click((function(){if(window.innerHeight>540)var e=(window.innerHeight-540)/2;else e=0;var o='<div class="slvj-lightbox" style="margin-top:'+e+'px">';if(i("body").append('<div id="slvj-window"><div id="slvj-background-close"></div><div id="slvj-back-lightbox">'+o+'<div id="slvj-close-icon"></div><iframe src="" width="640" height="480" id="slvj-video-embed" style="border:0;"></iframe></div></div></div>'),i("#slvj-window").hide(),"youtube"==i(this).data("videosite"))var d="http://www.youtube.com/embed/"+i(this).data("videoid")+"?autoplay=1";else"vimeo"==i(this).data("videosite")&&(d="http://player.vimeo.com/video/"+i(this).data("videoid")+"?autoplay=1");return i("#slvj-window").fadeIn(),i("#slvj-video-embed").attr("src",d),i("#slvj-close-icon").click((function(){i("#slvj-window").fadeOut(i.simpleLightboxVideo.vars.delayAnimation,(function(){i(this).remove()}))})),i("#slvj-background-close").click((function(){i("#slvj-window").fadeOut(i.simpleLightboxVideo.vars.delayAnimation,(function(){i(this).remove()}))})),!1})),i(document).keyup((function(e){27==e.keyCode&&i("#slvj-window").fadeOut(i.simpleLightboxVideo.vars.delayAnimation,(function(){i(this).remove()}))})),i(window).resize((function(){if(window.innerHeight>540)var e=(window.innerHeight-540)/2;else e=0;i(".slvj-lightbox").css({marginTop:e+"px"})})),!1}})}(jQuery),function(i){i.simpleLightboxVideo=function(e,o){return i(o).simpleLightboxVideo()}}(jQuery);
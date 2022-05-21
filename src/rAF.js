var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var preFps = 0;

var rAF = function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var loopToGetFps = function() {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // not set 0， to get FPS by recording the difference in this value at the beginning and end of the animation 
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        console.log("fps:", fps);

        if (preFps != fps) {
            var sendFps = "fpsNum" + fps;
            if (alexaFpsFlag) {
                sendMessage(sendFps);
            }
            preFps = fps;
        }
        frame = 0;
        lastTime = now;
    };
    rAF(loopToGetFps);
}
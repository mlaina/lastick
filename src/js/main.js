window.onload = function(){
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    var curr = h * 60 * 60 + m * 60 + s;
    svg.setCurrentTime(curr);
};
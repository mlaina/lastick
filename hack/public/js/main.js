var center=100;
var tick=document.createElementNS("http://www.w3.org/2000/svg", 'path');
tick.style.fill = "none";
tick.style.stroke = "#fff";
tick.style.strokeWidth="85px";
var tack=document.createElementNS("http://www.w3.org/2000/svg", 'path');
tack.style.fill = "none";
tack.style.stroke = "#fff"; //Set stroke colour
tack.style.strokeWidth="55px";
var now;
var inn=false;
var currentTask;


function changeTheClock(i, f){
    now.getHours();
    console.log(now.getDays());

}

function addTask(){
    var id=$("input[name=name_task]").val();
    id.replace(/ /g,'');

    var color=$("input[name=color_task]").val();;


    var timeI=$("input[name=time_ini_task]").val();
    timeI=[Number(timeI[0]+timeI[1]), Number(timeI[3]+timeI[4])];

    var timeF=$("input[name=time_fin_task]").val();
    timeF=[Number(timeF[0]+timeF[1]), Number(timeF[3]+timeF[4])];

    //if(changeTheClock(timeI, timeF)){

        var svg = document.getElementsByTagName('svg')[0]; //Get svg element
        var min = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        min.setAttribute("d", makePath("min", timeI, timeF)); //Set path's data
        min.style.fill = "none";
        min.style.stroke = color; //Set stroke colour
        min.style.strokeWidth = "25px"; //Set stroke width
        var hour = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        hour.setAttribute("d", makePath("hour", timeI, timeF)); //Set path's data
        hour.style.fill = "none";
        hour.style.stroke = color; //Set stroke colour
        hour.style.strokeWidth = "25px"; //Set stroke width

        svg.prepend(hour);
        svg.prepend(min);
    //}

    /*if(!check())
        error();

    storeTask();
    */
}


function makePath(type, timeIni, timeFin){
    var radius;
    var a = [ 0, 0 ];
    
    if(type=="min"){
        radius=230;
        a=iniFinMin(timeIni[0], timeIni[1], timeFin[0], timeFin[1]);
    }
    
    if(type=="hour"){
        radius=140;
        a=iniFinHours(timeIni[0], timeIni[1], timeFin[0], timeFin[1]);
    }
    return especificArc(center, center, radius, a[0], a[1]);
}



function error(){
    
}


// To BBDD /////////////////////////////////////////////////////////////////


function storeTask(){

}

function check(){


}

function clock(){
    now = new Date();
    var s=now.getHours()+"-"+now.getMinutes();
    
    if(now.getHours()<10)
        s="0"+now.getHours()+"-"+now.getMinutes();
    if(now.getMinutes()<10)
        s=now.getHours()+"-0"+now.getMinutes();
    if(now.getHours()<10 && now.getMinutes()<10)
        s="0"+now.getHours()+"-0"+now.getMinutes();

    document.getElementById("time").innerHTML=s;
    var atick=iniFinMin( now.getHours(), now.getMinutes(), now.getHours(), now.getMinutes()+1);
    var atack=iniFinHours( now.getHours(), now.getMinutes(), now.getHours(), now.getMinutes()+1);

    tick.setAttribute("d", especificArc(center, center, 205, atick[0], atick[0]+1)); //Set path's data
    tack.setAttribute("d", especificArc(center, center, 155, atack[0], atack[0]+1.5));


    if(inn){

    }
    
    setTimeout(clock, 1000);

}


window.onload = function(){
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element

    svg.appendChild(tick);
    svg.appendChild(tack);
    
    clock();
 
};


function getIntRGBvalues(hex){
    // get red/green/blue int values of hex
    var r1 = parseInt(hex.substring(1, 3), 16);
    var g1 = parseInt(hex.substring(3, 5), 16);
    var b1 = parseInt(hex.substring(5, 7), 16);
    console.log("R: " + r1);
    console.log("G: " + g1);
    console.log("B: " + b1);
    console.log(" ");
}

function triangulate(){
    var colour1 = $("#color1").val();
    var colour2 = triangulateColour(colour1);
    var colour3 = triangulateColour(colour2);

    $('#1').css("color", colour1);
    $('#2').css("color", colour2);
    $('#3').css("color", colour3);

    $("#center").attr("stroke", colour1);
    $("#hour").attr("stroke", colour2);
    $("#min").attr("stroke", colour3);

    getIntRGBvalues(colour1);
    getIntRGBvalues(colour2);
    getIntRGBvalues(colour3);
}

/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
function triangulateColour(hex){

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue 120 degrees and convert to [0-1] value
    h+= 120;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255); 
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16); 
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}  

function iniFinMin( hi, mi, hf, mf ) {
	var angleIni, angleFin;

	var h=hf-hi;
	var m=mi-mf;

	if(hf-hi>1|| (hi<hf && mi<mf && hf-hi==1))
	   return [0, 359];
	

	angleIni=mi*6;
	angleFin=mf*6;

	return [angleIni, angleFin];
}

function iniFinHours(hi, mi, hf, mf){
	var angleIni, angleFin;

	angleIni=(hi%12)*30+(30*mi/60);	
	angleFin=(hf%12)*30+(30*mf/60);	

	return  [angleIni, angleFin] ;
}


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function especificArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}


function view(){
    var circles=document.getElementsByClassName("radius");

    for(var i=0; i<circles.length; i++){
        circles[i].setAttribute("stroke", "white");
    }
    
    var t=document.getElementsByClassName("guie");

    for(var i=0; i<t.length; i++){
        t[i].setAttribute("fill", "white");
    }
    
    //document.write(circles);
    //document.write(t);
}

function noview(){
     var circles=document.getElementsByClassName("radius");

    for(var i=0; i<circles.length; i++){
        circles[i].setAttribute("stroke", "none");
    }
    
    var t=document.getElementsByClassName("guie");

    for(var i=0; i<t.length; i++){
        t[i].setAttribute("fill", "none");
    }
    
    //document.write(circles);
    //document.write(t);
}
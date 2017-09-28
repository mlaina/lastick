window.onload = function(){
    /*
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    var curr = h * 60 * 60 + m * 60 + s;
    svg.setCurrentTime(curr);
    */

    var a;

    ah = [ 0, 0 ];
    am = [ 0, 0 ];

    ah=iniFinHours(12, 30, 12, 40);
    am=iniFinMin(12, 5, 12, 45);
    
    $("#center").attr("d", describeArc(100, 100, 1, 0, 359));
    $("#hour").attr("d", describeArc(100, 100, 140, ah[0], ah[1]));
    $("#min").attr("d", describeArc(100, 100, 230, am[0], am[1]));


 
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
    var colour1 = $('#color1').val();
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

	if(hf-hi>1|| (hi<hf && mi<mf && hf-hi==1)){
		console.log(h+ " "+ m);
		return [0, 359];
	}

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

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}
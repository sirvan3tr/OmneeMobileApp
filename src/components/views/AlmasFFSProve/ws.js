export function mult(strNum1,strNum2){
    var a1 = strNum1.split("").reverse();
    var a2 = strNum2.toString().split("").reverse();
    var aResult = new Array;

    for ( var iterNum1 = 0; iterNum1 < a1.length; iterNum1++ ) {
        for ( var iterNum2 = 0; iterNum2 < a2.length; iterNum2++ ) {
            var idxIter = iterNum1 + iterNum2;    // Get the current array position.
            aResult[idxIter] = a1[iterNum1] * a2[iterNum2] + ( idxIter >= aResult.length ? 0 : aResult[idxIter] );

            if ( aResult[idxIter] > 9 ) {    // Carrying
                aResult[idxIter + 1] = Math.floor( aResult[idxIter] / 10 ) + ( idxIter + 1 >= aResult.length ? 0 : aResult[idxIter + 1] );
                aResult[idxIter] %= 10;
            }
        }
    }

    return aResult.reverse().join("");
}

export function modulo(aNumStr, aDiv) {
	var tmp = "";
	var  i, r;
	for ( i=0; i<aNumStr.length ; i++)
	{
		tmp += aNumStr.charAt( i);
		r = tmp % aDiv;
		tmp = r.toString( 10);
	}
	return tmp / 1;
}

// Generate a unique r and calculate x from it
export function genX(n, rnd=1, forID) {
    var r = Math.floor(Math.random() * n),
        rs = r.toString(),
        r2 = mult(rs,rs),
        x = modulo(r2.toString(), n),
        xJSON = JSON.stringify({'type' : 'almasFFSMobile', 'forID': forID, 'round' : rnd, 'step' : 1, 'data' : x });
    return [r, x, xJSON];
}

/*

FIAT-SHAMIR IDENTITY BASED CRYPTOSYSTEM

*/
export function almasFFSSubmit(forID) {
    const ws = new WebSocket("ws://10.0.2.2:5678/");
    var authResult = [];
    console.log(ws);
var v = [2333866390, 91504984, 24182319, 2679948747, 2426252266, 1543844700, 2667701433, 437491298, 2039680765, 153121206],
    s = [1220448689, 386273255, 15269095, 79929288, 1066903174, 592861078, 278860438, 905288239, 536397697, 51542499],
    I = 'Sirvan Almasi || 26/01/1992 || Saqqez || Sirvan3tr@gmail.com',
    j = [879526612, 1864187998, 3119683462, 785478098, 1061096975, 2814024602, 972289411, 2683930126, 1899345369, 666184941],
    n = 3328912597,
    omneeID = '';

var rndStatus = {'round' : 1, 'status' : false, 'fails' : 0},
    e = [],
    rnds = 10;
    r = 0;

ws.onopen = function() {
    console.log('Opened websocket');
    // Step 0: Initiate Proof with WebServer
    var inj = {'I': I, 'j' : j, 'n' : n};
    var innit = JSON.stringify({'type' : 'almasFFSMobile', 'forID': forID, 'round' : 1, 'step' : 0, 'data' : inj});
    ws.send(innit);
}; // on open

ws.onmessage = function(event) {
    var dataJSON = JSON.parse(event.data);
    if (dataJSON['round'] != rndStatus['round'] && rndStatus['status'] == true) {
        // We have a new round
        newRound = true;
        rndStatus['round'] += 1;
        rndStatus['status'] = false;
    } else {
        newRound = false;
    }

    // Step 1: random r
    if (dataJSON['step'] == 1) {
        // Get num of rounds
        rnds = dataJSON['rnds'];
        // Begin
        console.log('Round: ' + rndStatus['round']);
        [r, x, xJSON] = genX(n, rndStatus['round'], forID);
        console.log('x: ' + x);
        ws.send(xJSON);

    // Step 2: Server sends random bit vector
    } else if (dataJSON['step'] == 2) {
        e = dataJSON['data'];
        console.log('e: ' + e)
    // Step 3: Send y
        var y = r;
        for(var i=0; i < s.length; i++) {
            if (e[i]==1) {
                var ys = y.toString();
                var ss = s[i].toString();
                y = mult(ys, ss);
            }
        }
        y = modulo(y.toString(),n);
        console.log('y: ' + y)            
        var yJSON = JSON.stringify({'type' : 'almasFFSMobile', 'forID': forID, 'round' : 'rnds', 'step' : 3, 'data' : y});
        ws.send(yJSON);
    // Step 4: Server Verify
    } else if(dataJSON['step'] == 4) {
        if (dataJSON['data']=='Fail') rndStatus['fails'] += 1;
        console.log('Result: ' + dataJSON['data']);
        // Begin again
        if (rndStatus['round'] < rnds) {
            var innit = JSON.stringify({'type' : 'almasFFSMobile', 'forID': forID, 
                'round' : rndStatus['round']+1, 'step' : 0, 'data' : ''});
            ws.send(innit);
            rndStatus['round'] +=1;
        } else {
            console.log('The End');
            console.log('Fails: ' + rndStatus['fails'] + '/' + rndStatus['round']);
            authResult = [rndStatus['fails'] , rndStatus['round']];
            ws.close();
            return authResult;
        }
    }
}; // on msg
}// submitFunction
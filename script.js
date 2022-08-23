let output = document.getElementById("output")
let input = document.getElementById("input")
let btn = document.getElementById("btn")
let alertOut = document.getElementById("alert")

function checkVal(val) {
    if(val.match(/[^IVXLCDM0-9]/gi)) {
        displayReset('', 'This is not a decimal or roman number!')   
    } else if(val.match(/[^IVXLCDM]/gi) != undefined && val.match(/[^0-9]/gi) != undefined) {
        displayReset('', 'Only decimal numbers or only roman number allowed')   
    }else if(val.match(/[0-9]/gi)) {
        toRoman(val)
    }else if(val.match(/[IVXLCDM]/gi)) {
        toArabic(val)
    }else {displayReset("", " ")}
}
function toArabic(str) {
    let rplc
    rplc = str.replace(/M/gi, '-1000')
    rplc = rplc.replace(/D/gi, '-500')
    rplc = rplc.replace(/C/gi, '-100')
    rplc = rplc.replace(/L/gi, '-50')
    rplc = rplc.replace(/X/gi, '-10')
    rplc = rplc.replace(/V/gi, '-5')
    rplc = rplc.replace(/I/gi, '-1')
    rplc = rplc.split('-')
    rplc.shift()

    let result = 0
    let stack = 1
    for(let i=0;i<rplc.length;i++) {
        rplc[i] = parseInt(rplc[i], 10)
        if(rplc[i] == rplc[i+1]) {
            stack += 1
            //console.log('stacko: '+result+'('+stack+')')
            continue
        }
        if(rplc[i] < rplc[i+1]) {
            result -= rplc[i] * stack
            stack = 1
            //console.log('menor: '+result+' |'+rplc[i] +' < '+ rplc[i+1])
            continue
        }
        result += rplc[i] * stack
        stack = 1
        //console.log('maior: '+result+' |'+rplc[i] +' > '+ typeof(rplc[i+1]))
    }
    displayReset(result, 'Click to copy!')
}

function toRoman(int) {
    if(parseInt(int) <= 0 || parseInt(int) >= 4000) {
        displayReset("", "non-existent roman number")
        return
    }
    let array = []
    if(int<10){
        array.unshift(int)
    }else{
        for(let i=0;i<String(int).length-1;i++) {
            if(i == 0) {
                array.unshift(int%10)
            }
            array.unshift(int % Math.pow(10, i+2) - int % Math.pow(10, i+1))
        }
    }
    function toRo(aInt) {
        let strResult = ""
        const tam = String(aInt).length
        if(tam == 4) {
            for(let i=0;i<aInt/1000;i++) {
                strResult += "M"
            }
        }else if(tam == 3){
            if(aInt <= 300) {
                for(let i=0;i<aInt/100;i++) {
                    strResult += "C"
                }
            }else if(aInt==400){
                strResult += "CD"
            }else if(aInt==500){
                strResult += "D"
            }else if(aInt<=800){
                strResult += "D"
                for(let i=0;i<(aInt/100)-5;i++) {
                    strResult += "C"
                }
            }else strResult += "CM"
        }else if(tam == 2){
            if(aInt <= 30) {
                for(let i=0;i<aInt/10;i++) {
                    strResult += "X"
                }
            }else if(aInt==40){
                strResult += "XL"
            }else if(aInt==50){
                strResult += "L"
            }else if(aInt<=80){
                strResult += "L"
                for(let i=0;i<(aInt/10)-5;i++) {
                    strResult += "X"
                }
            }else strResult += "XC"
        }else if(tam == 1){
            if(aInt <= 3) {
                for(let i=0;i<aInt;i++) {
                    strResult += "I"
                }
            }else if(aInt==4){
                strResult += "IV"
            }else if(aInt==5){
                strResult += "V"
            }else if(aInt<=8){
                strResult += "V"
                for(let i=0;i<(aInt/1)-5;i++) {
                    strResult += "I"
                }
            }else strResult += "IX"
        }
        return strResult
    }
    for(let i=0;i<array.length;i++) {
        array[i] = toRo(array[i])
    }
    displayReset(array.join(""), "Click to copy!")
}
function displayReset(outputTxt, alertTxt) {
    setTimeout(() => {
        let anim
        let color
        if(alertTxt === " ") {
            anim = "blank"
            color = "rgba(0, 0, 0, 0)"
        }else if(output.innerHTML === "") {
            anim = "invalidInput"
            color = "rgba(255, 0, 0, 0.5)"
        } else {
            anim = "allowCopy"
            color = "rgba(60, 255, 0, 0.5)"
        }
        btn.style.animation = anim + ".25s 1"
        setTimeout(() => {
            btn.style.background = color
            btn.style.borderColor = color 
        }, 249);
    }, 1);
    output.innerHTML = outputTxt
    alertOut.innerHTML = alertTxt
    input.innerHTML = ''
}
function copy() {
    navigator.clipboard.writeText(output.innerHTML)
}
    // 1000| M    ||100| C    ||10| X
    // 900 | CM   ||90 | XC   ||9 | IX
    // 800 | DCCC ||80 | LXXX ||8 | VIII
    // 700 | DCC  ||70 | LXX  ||7 | VII
    // 600 | DC   ||60 | LX   ||6 | VI
    // 500 | D    ||50 | L    ||5 | V
    // 400 | CD   ||40 | XL   ||4 | IV
    // 300 | CCC  ||30 | XXX  ||3 | III
    // 200 | CC   ||20 | XX   ||2 | II
    // 100 | C    ||10 | X    ||1 | I
var keyArr = new Array();
export function createKeyboard(board){
    if(!board.hasClass('board')){
        board.addClass('board');
    }
    keyArr = ['` ~', '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )', '- _', '= +', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'CapsLk', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '; :', '. "', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ', <', '. >', '/  ?', 'SPACE'];
    var newKey = "";
    for (let i in keyArr) {
        if (i == 14 || i == 28 || i == 41 || i == 52) {
            newKey = "<div class='keys newline'>" + keyArr[i].split(' ')[0] + "</div>";
        } else {
            newKey = "<div class='keys'>" + keyArr[i].split(' ')[0] + "</div>";
        }
        $('.board').append(newKey);
    }
}
export function offKey() {
    $('.board').off('click','.keys');
  }
export function inputKey(toWriteIn) {
    $('.board').on('click', '.keys', function () {
        var newVal = $(this).text();
        switch (newVal) {
            case "Shift":
                toggleShift();
                break;
            case "CapsLk":
                toggleCaps();
                break;
            case "Backspace":
                if (toWriteIn.prop('tagName') == "INPUT") {
                    let val = toWriteIn.val();
                    toWriteIn.val(val.substring(0, val.length - 1));
                } else {
                    toWriteIn.text(function (index, oriText) {
                        return oriText.substring(0, oriText.length - 1);
                    })
                }
                break;
            default:
                    if(newVal=="Enter"){
                        newVal='\n';
                    }
                    else if(newVal=="SPACE"){
                        newVal=' ';
                    }
                    else if(newVal=='Tab'){
                        newVal='\t';
                    }
                if (toWriteIn.prop('tagName') == "INPUT") {
                    let val = toWriteIn.val();
                    toWriteIn.val(val + newVal);
                } else {
                    toWriteIn.text(function (index, oriText) {
                        return oriText + newVal;
                    })
                }
                break;
        }
    })
}
function toggleShift() {
    if ($('.keys').eq(0).text() == '`') {
        for (let i in keyArr) {
            if (keyArr[i].split(' ') != -1) {
                $('.keys').text(function (i, oriText) {
                    return keyArr[i].split(' ')[keyArr[i].split(' ').length - 1];
                })
            }
        }
    } else {
        for (let i in keyArr) {
            if (keyArr[i].split(' ') != -1) {
                $('.keys').text(function (i, oriText) {
                    return keyArr[i].split(' ')[0];
                })
            }
        }
    }
}
function toggleCaps() {
    if ($('.keys').eq(15).text() == "Q") {
        $('.keys').eq(28).removeClass('lightup');
        $('.keys').text(function (i, oriText) {
            if ((i >= 15 && i <= 24) || (i >= 29 && i <= 37) || (i >= 42 && i <= 48)) {
                return oriText.toLowerCase();
            }
        })
    } else {
        $('.keys').eq(28).addClass('lightup');
        $('.keys').text(function (i, oriText) {
            if ((i >= 15 && i <= 24) || (i >= 29 && i <= 37) || (i >= 42 && i <= 48)) {
                return oriText.toUpperCase();
            }
        })
    }
}

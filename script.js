let isEng;
if (localStorage.isEng !== undefined) {
    isEng = localStorage.isEng;
} else {
    isEng = 1;
    localStorage.isEng = 1;
}
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = new SpeechRecognition();
rec.interimResults = true;
const audioRu = document.querySelector('.audio-ru');
const audioEn = document.querySelector('.audio-en');
let audio = '';
if (isEng == 1) { audio = audioEn; } else { audio = audioRu; }
let isAudio = false;
let isCapsLock = false;
let isShift = false;
let area = document.createElement('textarea');
document.body.append(area);
area.placeholder = 'Click here';
area.classList.add('input-field');


let area_infoEn = document.createElement('div');
document.body.append(area_infoEn);
area_infoEn.classList.add('area_info');
area_infoEn.innerText = 'English Ctrl+Z, Sound Ctrl+x';

let area_infoR = document.createElement('div');
document.body.append(area_infoR);
area_infoR.classList.add('area_info');
area_infoR.innerText = 'Russian Ctrl+Z, Sound Ctrl+x';

let btn = document.createElement('button');
document.body.append(btn);
btn.innerHTML = '&#9660;';

let keyboard_key = [];

for (let i = 0; i < 4; i++) {
    keyboard_key[i] = document.createElement('div');
    document.body.append(keyboard_key[i]);
    keyboard_key[i].classList.add('keyboard');

}
const mas_which = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191,
    17, 32, 37, 39
];

const mas_key = [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 708,
        9, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 7046,
        7020, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 13,
        7016, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47,
        7017, 32, 7037, 7039
    ],
    [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 708,
        9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 91, 93, 92, 7046,
        7020, 65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 39, 13,
        7016, 90, 88, 67, 86, 66, 78, 77, 44, 46, 47,
        7017, 32, 7037, 7039
    ],
    [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 708,
        9, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 7046,
        7020, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 13,
        7016, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46,
        7017, 32, 7037, 7039
    ],
    [1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43, 708,
        9, 1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 92, 7046,
        7020, 1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069, 13,
        7016, 1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 46,
        7017, 32, 7037, 7039
    ]
];
let special_symbols = {
    708: 'Backspace',
    9: 'Tab',
    7046: 'Delete',
    7020: 'CapsLock',
    13: 'Enter',
    7016: 'Shift',
    7017: 'Control',
    7037: 'ArrowLeft',
    7039: 'ArrowRight',
    32: 'Space'
};
let symbols_icon = {
    708: 'Backspace',
    9: 'Tab',
    7046: 'Del',
    7020: 'CapsLock',
    13: 'Enter',
    7016: 'Shift',
    7017: 'Control',
    7037: '⇐',
    7039: '⇒',
    32: 'Space'
};

for (let i = 0; i < 4; i++) {
    let out = '';
    out += '<div class="row">';
    for (let j = 0; j < mas_key[i].length; j++) {
        if (special_symbols.hasOwnProperty(mas_key[i][j])) {
            out += '<div class="k-key sp_symbol ' + special_symbols[mas_key[i][j]].toLowerCase() +
                '" data="' + mas_key[i][j] + '" datacode="' + special_symbols[mas_key[i][j]] + '">' + symbols_icon[mas_key[i][j]] + '</div>';
        } else {
            out += '<div class="k-key" data="' + mas_key[i][j] + '">' +
                String.fromCharCode(mas_key[i][j]) + '</div>';
        }
        if (j == 13 || j == 28 || j == 41 || j == 52 || j == 56) { out += '</div><div class="row">'; }
    }
    if (i <= 1) { out += `<button class='btnl k-key'>ENG</button>`; } else { out += `<button class='btnl k-key'>RU</button>`; }
    out += `<button class='btns k-key'>NoSound</button>`;
    out += `<button class='btnshow k-key'>&#9660;</button>`;
    out += `<button class='btnvoice k-key'>voice text input</button></div>`;

    keyboard_key[i].innerHTML = out;
}

let btnl = document.querySelectorAll('.btnl');
let btns = document.querySelectorAll('.btns');
let btnshow = document.querySelectorAll('.btnshow');
let btnvoice = document.querySelectorAll('.btnvoice');
for (let i = 0; i < 4; i++) {
    btnvoice[i].disabled = false;
}
if (isEng == 0) {
    keyboard_key[2].classList.add('keyboard-visibility');
    keyboard_key[2].classList.add('keyboard-hidden');
    area_infoR.classList.add('vis');
} else {
    keyboard_key[0].classList.add('keyboard-visibility');
    keyboard_key[0].classList.add('keyboard-hidden');
    area_infoEn.classList.add('vis');
}

let text = '';
let mas = [];
let selected = '';
let hiddenKeyboard = true;

//======================================keydown==============
function ev_keydown(event) {
    if (hiddenKeyboard) { return; }
    area.focus();
    event.preventDefault();
    if (isAudio == true) { audio.play(); }
    removeClassActive();
    let index = mas_which.indexOf(event.which);
    if (((isEng == 1) && (!isCapsLock)) || ((isEng == 1) && (!isShift))) mas = mas_key[0];
    if (((isEng == 1) && (isCapsLock)) || ((isEng == 1) && (isShift))) mas = mas_key[1];
    if (((isEng == 0) && (!isCapsLock)) || ((isEng == 0) && (!isShift))) mas = mas_key[2];
    if (((isEng == 0) && (isCapsLock)) || ((isEng == 0) && (isShift))) mas = mas_key[3];
    let k_active = document.querySelector('.keyboard-visibility .k-key[data="' + mas[index] + '"]');
    k_active.classList.add('active');
    let text = '';
    text = k_active.innerText;

    if (event.code === 'Space') {
        text = ' ';
        area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
        return;
    }
    //======================Ctrl+z===language================
    if (event.ctrlKey && event.which === 90) {
        event.preventDefault();
        langChange();
        return;
    }
    //=============Ctrl+x==sound============================
    if (event.ctrlKey && event.which === 88) {
        soundChange();
        return;
    }
    // ============выделение текста===================

    if (event.ctrlKey && event.which === 67) {
        if (area.selectionStart === area.selectionEnd) {
            return; // ничего не выделено
        }
        selected = area.value.slice(area.selectionStart, area.selectionEnd);
        return;
    }
    //==========вставка текста=====================
    if (event.ctrlKey && event.which === 86) {
        area.setRangeText(selected, area.selectionStart, area.selectionEnd, "end");
        area.focus();
        return;
    }
    //===============================
    switch (event.key) {
        case 'Enter':
            if (isAudio === true) { document.querySelector('.audio-enter').play(); }
            text = '\n';
            area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
            break;
        case 'Backspace':
            if (isAudio === true) { document.querySelector('.audio-backspace').play(); }
            area.setRangeText('', area.selectionStart - 1, area.selectionEnd);
            break;
        case 'Delete':
            if (isAudio === true) { document.querySelector('.audio-backspace').play(); }
            area.setRangeText('', area.selectionStart, area.selectionEnd + 1);
            break;
        case 'Tab':
            if (isAudio === true) { audio.play(); }
            text = '    ';
            area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
            break;
        case 'Shift':
            if (isAudio === true) { document.querySelector('.audio-shift').play(); }
            k_active.classList.remove('active');
            area.value += '';
            if (!isCapsLock) {
                isShift = !isShift;
                changeKeyboard(isShift, 7016);
            }
            break;
        case 'CapsLock':
            if (isAudio === true) { document.querySelector('.audio-num').play(); }
            k_active.classList.remove('active');
            area.value += '';
            if (!isShift) {
                isCapsLock = !isCapsLock;
                changeKeyboard(isCapsLock, 7020);
            }
            break;
        case 'Control':
            if (isAudio === true) { audio.play(); }
            area.value += '';
            break;
        case 'ArrowLeft':
            if (isAudio === true) { audio.play(); }
            area.value += '';
            area.selectionStart = area.selectionEnd -= 1;
            area.focus();
            break;
        case 'ArrowRight':
            if (isAudio === true) { audio.play(); }
            area.value += '';
            area.selectionStart = area.selectionEnd += 1;
            area.focus();
            break;
        default:
            if (isAudio === true) { audio.play(); }
            area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
            break;
    }
}


//===============================mousedown================================
function ev_mousedown(event) {
    if ((hiddenKeyboard) && event.target.classList.contains('input-field')) {
        showKeyboard();
        return;
    }
    if (event.target.classList.contains("k-key") && document.activeElement.classList.contains('input-field')) {
        event.preventDefault();
        const area = document.activeElement;
        removeClassActive();
        let item = event.toElement;
        item.classList.add('active');
        let item_data = item.getAttribute('datacode');
        for (let i = 0; i < 4; i++) { if (item === btnl[i] || item === btns[i] || item === btnshow[i] || item === btnvoice[i]) return; }
        switch (item_data) {
            case 'Space':
                if (isAudio === true) { audio.play(); }
                text = ' ';
                area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
                break;
            case 'Enter':
                if (isAudio === true) {
                    document.querySelector('.audio-enter').play();
                }
                text = '\n';
                area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
                break;
            case 'Backspace':
                if (isAudio === true) { document.querySelector('.audio-backspace').play(); }
                area.setRangeText('', area.selectionStart - 1, area.selectionEnd);
                area.focus();
                break;
            case 'Delete':
                if (isAudio === true) { document.querySelector('.audio-backspace').play(); }
                area.setRangeText('', area.selectionStart, area.selectionEnd + 1);
                break;
            case 'Tab':
                if (isAudio === true) { audio.play(); }
                text = '    ';
                area.setRangeText(`${text}`, area.selectionStart, area.selectionEnd, "end");
                break;
            case 'Shift':
                item.classList.remove('active');
                area.value += '';
                if (isAudio === true) { document.querySelector('.audio-shift').play(); }
                if (!isCapsLock) {
                    isShift = !isShift;
                    changeKeyboard(isShift, 7016);
                }
                break;
            case 'CapsLock':
                item.classList.remove('active');
                area.value += '';
                if (isAudio === true) { document.querySelector('.audio-num').play(); }
                if (!isShift) {
                    isCapsLock = !isCapsLock;
                    changeKeyboard(isCapsLock, 7020);
                }
                break;
            case 'Control':
                if (isAudio === true) { audio.play(); }
                area.value += '';
                break;
            case 'ArrowLeft':
                if (isAudio === true) { audio.play(); }
                area.value += '';
                area.selectionStart = area.selectionEnd -= 1;
                break;
            case 'ArrowRight':
                if (isAudio === true) { audio.play(); }
                area.value += '';
                area.selectionStart = area.selectionEnd += 1;
                break;

            default:
                if (isAudio === true) {
                    audio.currentTime = 0;
                    audio.play();
                }
                area.setRangeText(`${item.innerText}`, area.selectionStart, area.selectionEnd, "end");
                break;
        }
    } /* else { return; } */
}
//=================================function======================
function removeClassActive() {
    document.querySelectorAll('.keyboard-visibility .k-key').forEach(element => {
        element.classList.remove('active');
    });
}

function changeKeyboard(isKey, isCode) {
    if (isEng == 0) {
        if (!isKey) {
            document.querySelector('.keyboard-visibility .k-key[data="' + isCode + '"]').classList.remove('capslock_active');
        }
        keyboard_key[2].classList.toggle('keyboard-visibility');
        keyboard_key[3].classList.toggle('keyboard-visibility');
        if (isKey) {
            document.querySelector('.keyboard-visibility .k-key[data="' + isCode + '"]').classList.add('capslock_active');
        }
    } else {
        if (!isKey) {
            document.querySelector('.keyboard-visibility .k-key[data="' + isCode + '"]').classList.remove('capslock_active');
        }
        keyboard_key[0].classList.toggle('keyboard-visibility');
        keyboard_key[1].classList.toggle('keyboard-visibility');
        if (isKey) {
            document.querySelector('.keyboard-visibility .k-key[data="' + isCode + '"]').classList.add('capslock_active');
        }
    }

}

function langChange() {
    removeClassActive();
    if ((!isCapsLock) && (!isShift)) {
        keyboard_key[0].classList.toggle('keyboard-visibility');
        keyboard_key[2].classList.toggle('keyboard-visibility');
    } else {
        if (isCapsLock) {
            document.querySelector('.keyboard-visibility .k-key[data="' + 7020 + '"]').classList.remove('capslock_active');
        }
        if (isShift) {
            document.querySelector('.keyboard-visibility .k-key[data="' + 7016 + '"]').classList.remove('capslock_active');
        }
        keyboard_key[1].classList.toggle('keyboard-visibility');
        keyboard_key[3].classList.toggle('keyboard-visibility');
        if (isCapsLock) {
            document.querySelector('.keyboard-visibility .k-key[data="' + 7020 + '"]').classList.add('capslock_active');
        }
        if (isShift) {
            document.querySelector('.keyboard-visibility .k-key[data="' + 7016 + '"]').classList.add('capslock_active');
        }
    }
    area_infoEn.classList.toggle('vis');
    area_infoR.classList.toggle('vis');
    isEng == 1 ? isEng = 0 : isEng = 1;
    localStorage.isEng = isEng;
    if (isEng == 1) { audio = audioEn; } else { audio = audioRu; }
    return;
}

function showKeyboard() {
    for (let i = 0; i < 4; i++) {
        if (keyboard_key[i].classList.contains('keyboard-visibility')) {
            keyboard_key[i].classList.toggle('keyboard-hidden');
        }
    }
    if (hiddenKeyboard) { hiddenKeyboard = false; } else { hiddenKeyboard = true; }
    btn.classList.toggle('rotate-btn');
}

function soundChange() {
    if (isAudio == false) {
        isAudio = true;
        for (let i = 0; i < 4; i++) { btns[i].textContent = "Sound"; }
    } else { isAudio = false; for (let i = 0; i < 4; i++) { btns[i].textContent = "NoSound"; } }
    return;
}
document.addEventListener('keydown', ev_keydown);
document.addEventListener('mousedown', ev_mousedown);
btn.addEventListener('click', showKeyboard);
for (let i = 0; i < 4; i++) { btnl[i].addEventListener('click', langChange); }
for (let i = 0; i < 4; i++) { btns[i].addEventListener('click', soundChange); }
for (let i = 0; i < 4; i++) { btnshow[i].addEventListener('click', showKeyboard); }
for (let i = 0; i < 4; i++) {
    btnvoice[i].addEventListener("click", function() {
        if (this.innerHTML == "voice text input") {
            this.innerHTML = "LISTENING...";
            rec.start();
            rec.addEventListener("end", rec.start);
        } else {
            this.innerHTML = "voice text input";
            rec.stop();
            rec.removeEventListener("end", rec.start);
        }
    });
}

rec.addEventListener("result", e => {
    const t = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    if (e.results[0].isFinal) { area.value += ' ' + t; }

});
'use strict';
const appRoot = document.getElementById('app-root');

const heading = document.createElement(`h1`);
heading.innerHTML = `Countries Search`;
appRoot.appendChild(heading);


const form = document.createElement(`form`);

const fildsetTypeSerch = document.createElement(`fieldset`);
fildsetTypeSerch.setAttribute('class', 'field-radio')
fildsetTypeSerch.innerHTML = `<legend>Please choose the type of search:</legend>`;

const fildsetSearcQuery = document.createElement(`fieldset`);
fildsetSearcQuery.innerHTML = `<legend>Please choose search query:</legend>`;

const byRegion = document.createElement(`input`);
byRegion.setAttribute(`type`, `radio`);
byRegion.setAttribute(`name`, `radio-button`);
byRegion.setAttribute(`id`, `ByRegion`);
byRegion.setAttribute(`value`, `ByRegion`);

const labaleByRegion = document.createElement(`label`);
labaleByRegion.setAttribute(`for`,`ByRegion`);
labaleByRegion.innerHTML = `By Region`;

const byLang = document.createElement(`input`);
byLang.setAttribute(`type`, `radio`);
byLang.setAttribute(`name`, `radio-button`);
byLang.setAttribute(`id`, `ByLang`);
byLang.setAttribute(`value`, `ByLanguage`);

const labaleByLang = document.createElement(`label`);
labaleByLang.setAttribute(`for`, `ByLang`);
labaleByLang.innerHTML= `By Language`;


const selection = document.createElement(`select`);
selection.setAttribute(`name`, `select`);
selection.setAttribute(`id`, `select`);
selection.setAttribute(`size`, `1`);
selection.setAttribute(`disabled`, `disabled`);
let opt1 = document.createElement(`option`);
opt1.setAttribute(`value`, `Select value`)
opt1.innerHTML = `Select value`;
selection.appendChild(opt1);

let div1 = document.createElement('div');
div1.setAttribute('class', 'input-wrap')
let div2 = document.createElement('div');
div2.setAttribute('class', 'input-lang');

// ***
labaleByRegion.appendChild(byRegion);
// div1.appendChild(byRegion);
div1.appendChild(labaleByRegion);

labaleByLang.appendChild(byLang);
// div1.appendChild(byLang);
div1.appendChild(labaleByLang);
fildsetTypeSerch.appendChild(div1);
// labaleByRegion.appendChild(byRegion);
// fildsetTypeSerch.appendChild(labaleByRegion);
// fildsetTypeSerch.appendChild(byLang);
// labaleByLang.appendChild(byLang);
// fildsetTypeSerch.appendChild(labaleByLang);

fildsetSearcQuery.appendChild(selection);


form.appendChild(fildsetTypeSerch);
form.appendChild(fildsetSearcQuery);
appRoot.appendChild(form);


function createOptions(arr){
    arr.forEach(function (el){
        let tmp = document.createElement(`option`)
        tmp.setAttribute(`value`, `${el}`);
        tmp.innerHTML = `${el}`;
        selection.appendChild(tmp);
    })
}

const firstRow = {
    'name': 'Country name',
    'capital': 'Capital',
    'region':'World Region',
    'languages':'Languages',
    'area':'Area',
    'flagURL': 'Flag',
}

function createTd(elm){
    let valTd ='';
    if (typeof elm === 'object'){
        for (let key in elm){
            valTd = valTd + ` ${elm[key]}`;
        }
        return valTd;
    } else {
        valTd = elm;
        return valTd
    }
}

function createRowTh(obj){
    const orderKey = ['name', 'capital', 'region', 'languages', 'area', 'flagURL',];
    let row = document.createElement('tr');
    row.setAttribute('class', 'heading-table');
    orderKey.forEach(function (key){
        let td = document.createElement(`th`);
        let valTd = createTd(obj[key]);
        if (valTd === 'Country name') {
            let button = document.createElement(`button`);
            button.setAttribute(`type`,`button` );
            button.setAttribute(`id`,`btCountry` );
            button.setAttribute(`class`,`arrow-both` );
            td.setAttribute(`class`, `country-sort`);
            td.innerHTML = `${valTd}`;
            td.appendChild(button);
        } else if (valTd === 'Area') {
            let button = document.createElement(`button`);
            button.setAttribute(`type`,`button` );
            button.setAttribute(`id`,`btLang` );
            button.setAttribute(`class`,`arrow-both` );
            td.setAttribute(`class`, `lang-sort`);
            td.innerHTML = `${valTd}`;
            td.appendChild(button);
        } else {
            td.innerHTML = `${valTd}`;
        }
        row.appendChild(td);
    })
    document.querySelector('.table').appendChild(row);
}

function createRow(obj){
    const orderKey = ['name', 'capital', 'region', 'languages', 'area', 'flagURL',];
    let row = document.createElement('tr');
    row.setAttribute('class', 'tr-val');
    orderKey.forEach(function (key){
        let td = document.createElement(`td`);
        let valTd = createTd(obj[key]);
        if(/^http/.test(valTd)) {
            const img = document.createElement(`img`);
            img.setAttribute('alt', 'image of flag');
            img.setAttribute('src', `${valTd}`);
            td.appendChild(img);
        } else {
            td.innerHTML = `${valTd}`;
        }
        row.appendChild(td);
    })
    document.querySelector('.table').appendChild(row);
}
let flagBtCou = true;
let flagBtLang = true;

function createTable(arr) {
    arr = arr.sort(function(prev,next){
        if ( prev.name < next.name ){
            return -1;
        } else{
            return 1;
        }
    })
    if(document.querySelector('table')) {
        document.querySelector('table').remove();
    }
    const table = document.createElement(`table`);
    table.setAttribute(`class`, `table`);
    appRoot.appendChild(table);
    createRowTh(firstRow);
    if(typeof arr[0].tagName !== 'undefined'){
        arr.forEach(function (it){
            document.querySelector('.table').appendChild(it);
        })
    }else {
        arr.forEach(function(itemObg){
            createRow(itemObg);
        })
    }

    let tr = document.querySelectorAll('.tr-val');
    let btSortCou = document.querySelector('#btCountry');
    let btSortArea = document.querySelector('#btLang');
    if(btSortCou) {
        btSortCou.addEventListener('click', function () {
            let sorted;
            const f1 = 1;
            const f2 = -1;
            if (flagBtCou){
                let bt = document.querySelector('#btCountry');
                console.log(bt);
                bt.classList.remove('arrow-both','arrow-up');
                bt.classList.add('arrow-down');
                sorted = [...tr].sort(function (a, b) {
                    if (a.children[0].innerHTML < b.children[0].innerHTML) {
                        return f1;
                    } else {
                        return f2;
                    }
                })
            } else{
                let bt = document.querySelector('#btCountry');
                bt.removeAttribute('class');
                bt.setAttribute('class', 'arrow-up');
                sorted = [...tr].sort(function (a, b) {
                    if (a.children[0].innerHTML >= b.children[0].innerHTML) {
                        return f1;
                    } else {
                        return f2;
                    }
                })
            }
            flagBtCou = !flagBtCou;
            createTable(sorted);
        })
    }
    if(btSortArea) {
        btSortArea.addEventListener('click', function () {
            let sorted;
            const column = 4;
            if (flagBtLang){
                sorted = [...tr].sort(function (a, b) {
                    return a.children[column].innerHTML - b.children[column].innerHTML
                })
            }else {
                sorted = [...tr].sort(function (a, b) {
                    return b.children[column].innerHTML - a.children[column].innerHTML
                })
            }
            flagBtLang = !flagBtLang;
            createTable(sorted);
        })
    }
}
const str = document.createElement('p');
str.setAttribute('style','display: none');
str.innerHTML = 'No items, please choose search query';
appRoot.appendChild(str);
const radio = document.getElementsByName(`radio-button`);
let flagForSelect = false;
for (let i = 0; i<radio.length; i++){
    radio[i].onchange = function (){
        selection.removeAttribute(`disabled`);
        if(document.querySelector('table')) {
            document.querySelector('table').remove();
        }
        str.removeAttribute('style');
        str.setAttribute('style','display: block');

        if (this.value === 'ByRegion'){
            flagForSelect = false;
            selection.innerHTML = '';
            opt1.setAttribute(`value`, `Select value`)
            opt1.innerHTML = `Select value`;
            selection.appendChild(opt1);
            createOptions(externalService.getRegionsList());
        } else {
            flagForSelect = true;
            selection.innerHTML = '';
            opt1.setAttribute(`value`, `Select value`)
            opt1.innerHTML = `Select value`;
            selection.appendChild(opt1);
            createOptions(externalService.getLanguagesList());
        }
    }
}

selection.addEventListener(`change`, function (){
    str.removeAttribute('style');
    str.setAttribute('style', 'display:none');
    if (flagForSelect) {
        createTable(externalService.getCountryListByLanguage(this.value));
    } else {
        createTable(externalService.getCountryListByRegion(this.value));
    }
})








//===================================================================================
function createTd(elm){
    let valTd ='';
    if (typeof elm === 'object'){
        for (let key in elm){
            valTd = valTd + ` ${elm[key]}`;
        }
        return valTd;
    } else {
        valTd = elm;
        return valTd
    }
}
function createRow(obj){
    let newRow = document.createElement('tr');
    orderKey.forEach(function (key){
        let td = document.createElement(`td`);
        let valTd = createTd(obj[key]);
        if(/^http/.test(valTd)) {
            const img = document.createElement(`img`);
            img.setAttribute('alt', 'image of flag');
            img.setAttribute('src', `${valTd}`);
            td.appendChild(img);
        } else {
            td.innerHTML = `${valTd}`;
        }
        newRow.appendChild(td);
    })
    // document.querySelector('tbody').appendChild(newRow);
    console.log(document.querySelector('tbody'));
    // console.log(newRow)
};
function createTbody(obj){
    let tbody;
    if(document.querySelector('tbody')){tbody.innerHTML = ''};
    tbody = document.createElement('tbody');
    document.querySelector('table').appendChild(tbody);
    if(obj instanceof HTMLElement){
        obj.forEach(function (el){
            tbody.appendChild(el);
        })
    }else{
        obj = obj.sort(function(prev,next){
            if ( prev.name < next.name ){
                return negativeNumber;
            } else{
                return pozitiveNumber;
            }
        })
        obj.forEach(function(itemObg){
            createRow(itemObg);
        })
    }
    document.querySelector('table').appendChild(tbody);
};
function createTable(obj){
    let table;
    let thead;
    if(!document.querySelector('table')){
        table  = document.createElement('table');
        thead = document.createElement('thead');
        thead.innerHTML = `${createThead()}`;
        table.appendChild(thead);
    }
    createTbody(obj);
    let tbody = document.querySelector('tbody');
    table.appendChild(tbody);
    appRoot.appendChild(table);
};
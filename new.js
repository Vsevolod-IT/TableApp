'use strict';
const appRoot = document.getElementById('app-root');
const getLangList = externalService.getLanguagesList();
const getRegList = externalService.getRegionsList();
const orderKey = ['name', 'capital', 'region', 'languages', 'area', 'flagURL',];

appRoot.innerHTML = `
<header class="header">
<h1>Countries Search</h1>
</header>
<form name="form">
<fieldset name="fieldRadioButtons" class="field-radio">
<legend>Please choose the type of search:</legend>
<div class="input-wrap">
<label for="ByRegion">By Region<input type="radio" name="radioButtons" id="ByRegion" value="ByRegion"></label>
<label for="ByLang">By Language<input type="radio" name="radioButtons" id="ByLang" value="ByLanguage"></label>
</div>
</fieldset>
<fieldset name="fieldSelect" class="field-select">
<legend>Please choose search query:</legend>
<select name="selections" disabled id="select" size="1">
<option id="disable" value="Select value">Select value</option>
</select>
</fieldset>
</form>`;

const form = document.forms.form;
const fieldRadioButtons = form.elements.fieldRadioButtons;
const fieldSelect = form.elements.fieldSelect;
const radio = form.elements.radioButtons;
const selections = form.elements.selections;
const optionsList = selections.options;
const pozitiveNumber = 1;
const negativeNumber = -1;


function sortByLet(arr,flag){

    if(arr[0] instanceof HTMLElement){

        if(flag === 'up'){
            arr = arr.sort(function (a, b) {
                if (a.children[0].innerHTML >= b.children[0].innerHTML) {
                    return pozitiveNumber;
                } else {
                    return negativeNumber;
                }
            })
            return arr;
        }else{
            arr = arr.sort(function (a, b) {
                if (a.children[0].innerHTML < b.children[0].innerHTML) {
                    return pozitiveNumber;
                } else {
                    return negativeNumber;
                }
            })
            return arr;
        }
    }else{
        if(flag === 'up'){
            arr = arr.sort(function(prev,next){
                if ( prev.name < next.name ){
                    return negativeNumber;
                } else{
                    return pozitiveNumber;
                }
            })
            return arr;
        }else{
            arr = arr.sort(function(prev,next){
                if ( prev.name > next.name ){
                    return negativeNumber;
                } else{
                    return pozitiveNumber;
                }
            })
            return arr;
        }
    }
}

function sortByArea(arr, flag){
    const column = 4;
    if(flag === 'up'){
        arr = arr.sort(function (a, b) {
            return b.children[column].innerHTML - a.children[column].innerHTML})
        return arr;
    }else{
        arr = arr.sort(function (a, b) {
            return a.children[column].innerHTML - b.children[column].innerHTML})
        return arr;
    }
}

function removeTable(){
    let table = document.querySelector('table');
    if(table){
        appRoot.removeChild(table);
    }
}

function createOptions(arr){
    if(optionsList[1]){
        const len = optionsList.length;
        for(let i = 1; i <= len; i++){
                selections.remove(optionsList[i])
            }
        const option1 = new Option('Select value', 'Select value');
        selections.add(option1);
        }
    removeTable();
    arr.forEach(function (el){
        let option = new Option(el,el);
        selections.add(option);
    })
}
function createThead(){
    let tableHead = document.createElement('thead');
    let table = document.querySelector('table');
    tableHead.innerHTML = `
    <tr class="head-tr"><th>Country name<button class="up" type="button" id="btSortCountry"></button></th>
    <th>Capital</th>
    <th>World Region</th>
    <th>Languages</th>
    <th>Area<button class=" up arrow-both" type="button" id="btSortArea"></button>
    <th>Flag</th></tr>`
    table.appendChild(tableHead);
}

function insertRow(obj){
    let tbody = document.querySelector('tbody');
    let row = document.createElement('tr');
    let textTd = '';
    let td;
    orderKey.forEach(function (el){
        textTd = ``;
        td = document.createElement('td');
        if(typeof obj[el] === 'object'){
            let lang = obj[el];
            for (let key in lang){
                textTd = textTd + ` ${lang[key]}`;
            }
        }else {
            textTd = `${obj[el]}`
        }
        if(/^http/.test(textTd)){
            td.insertAdjacentHTML('afterbegin',`<img src="${textTd}" alt="Flag">`)
        }else{
            td.innerHTML = `${textTd}`;
        }
        row.append(td);
    })
    tbody.append(row);
}

function insertTbody(obj){
    let table = document.querySelector('table');
    let tbody = table.lastChild;
    if(obj[0] instanceof HTMLElement){
        obj.forEach(function (el){
            tbody.append(el);
        })
    } else {
        obj = sortByLet(obj,'up');
        obj.forEach(function (el){
            insertRow(el);
        })
    }
}

function main(obj){
    removeTable();
    let table = document.createElement('table');
    appRoot.appendChild(table);
    createThead();
    table.createTBody();
    insertTbody(obj);

    let rows = table.lastChild.rows;
    let buttonCountry = document.querySelector('#btSortCountry');
    let buttonArea = document.querySelector('#btSortArea');
    let thead = table.firstChild;
    let tbody = table.lastChild;

    thead.addEventListener('click', function (event) {
        let id = event.target.id;
        let className = event.target.className;
        rows = [...rows];
        if(id === 'btSortCountry'){
            buttonCountry.classList.toggle('up');
            buttonCountry.classList.toggle('down');
            buttonCountry.classList.toggle('arrow-both', false);
            buttonArea.classList.toggle('arrow-both', true);
            className = event.target.className;
            rows = sortByLet(rows, className);
        } else {
            buttonArea.classList.toggle('up');
            buttonArea.classList.toggle('down');
            buttonArea.classList.toggle('arrow-both', false);
            buttonCountry.classList.toggle('arrow-both', true);
            className = event.target.className;
            rows = sortByArea(rows, className);
        }
        tbody.remove();
        table.createTBody();
        insertTbody(rows);
    })
}

fieldRadioButtons.addEventListener('click',function (event){
    selections.removeAttribute('disabled');
    const idRadioBt = event.target.id;
    if(idRadioBt === 'ByRegion'){
        createOptions(getRegList);
    } else {
        createOptions(getLangList);
    }
});

fieldSelect.addEventListener('change', function (){
    const ind = selections.selectedIndex;
    const data = selections[ind].value;
    if(data === 'Select value'){
        removeTable();
    } else if(radio[0].checked){
        main(externalService.getCountryListByRegion(data));
    } else {
        main(externalService.getCountryListByLanguage(data));
    }
})


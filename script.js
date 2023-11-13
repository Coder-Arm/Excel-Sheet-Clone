const thead = document.getElementById('thead');
const theadRow = document.getElementById('thead-row');
const tbody = document.getElementById('tbody');

let currCell = null;
let cutCell = {};

for(let i = 0; i < 26; i++){
    const th = document.createElement('th');
    th.innerText = String.fromCharCode(i+65);
    theadRow.appendChild(th);
}

for(let i = 1; i <= 100; i++){
    const numRow = document.createElement('tr');
    numRow.innerHTML = `<th>${i}</th>`;
    for(let j = 0; j < 26; j++){
        const cell = document.createElement('td');
        cell.setAttribute('contenteditable','true');
        cell.setAttribute('id',`${String.fromCharCode(j+65)}${i}`);
        cell.addEventListener('focus',() => focusFn(cell));
        cell.addEventListener('input',(event) => updateMatrix(event.target));
       numRow.appendChild(cell);   
    }
    tbody.appendChild(numRow);   
}
let numSheets = 1;
const sheetsBox = document.getElementById('sheets-box');
const addSheetBtn = document.getElementById('add-sheet');
addSheetBtn.addEventListener("click",()=>{
    numSheets++;
    const sheetBtn = document.createElement('button');
    sheetBtn.innerText = `Sheet ${numSheets}`;
    sheetBtn.setAttribute('id',`sheet-${numSheets}`);
    sheetsBox.appendChild(sheetBtn);
})

let matrix = [];
for(let i = 0; i < 100; i++){
    matrix.push([]);
    for(let j = 0; j < 26; j++){
        matrix[i].push({});
    }
}

function updateMatrix(cell){
   let tempObj = {
    id : cell.id,
    text : cell.innerText,
    style : cell.style.cssText
   }
  const row = cell.id.substr(1)-1;
  const col = cell.id.charCodeAt(0)-65;
   matrix[row][col] = tempObj;
//    console.log(matrix[row][col]);
}

function focusFn(cell){
    currCell = cell;
    document.getElementById('curr-cell').innerText = cell.id;
}
const fontStyleDropdown = document.getElementById('font-style-dropdown');
fontStyleDropdown.addEventListener('change',(e)=>{
    currCell.style.fontFamily = e.target.value;
    updateMatrix(currCell);
})
const fontSizeDropdown = document.getElementById('font-size-dropdown');
fontSizeDropdown.addEventListener('change',(e)=>{
    currCell.style.fontSize = e.target.value;
    updateMatrix(currCell);
})
const boldBtn = document.getElementById('bold-btn');
boldBtn.addEventListener('click',()=>{
    currCell.style.fontWeight = currCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
    updateMatrix(currCell);
})

const italicBtn = document.getElementById('italic-btn');
italicBtn.addEventListener('click',()=>{
    currCell.style.fontStyle = currCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
    updateMatrix(currCell);
})

const underlineBtn = document.getElementById('underline-btn');
underlineBtn.addEventListener('click',()=>{
    currCell.style.textDecoration = currCell.style.textDecoration === 'underline' ? 'none' : 'underline';
    updateMatrix(currCell);
})

const alignLeftBtn = document.getElementById('aligner-left');
alignLeftBtn.addEventListener('click',()=>{
    currCell.style.textAlign = currCell.style.textAlign === 'start' ? 'none' : 'start';
    updateMatrix(currCell);
})

const alignCenterBtn = document.getElementById('aligner-center');
alignCenterBtn.addEventListener('click',()=>{
    currCell.style.textAlign = currCell.style.textAlign === 'center' ? 'none' : 'center';
    updateMatrix(currCell);
})

const alignRightBtn = document.getElementById('aligner-right');
alignRightBtn.addEventListener('click',()=>{
    currCell.style.textAlign = currCell.style.textAlign === 'right' ? 'none' : 'right';
    updateMatrix(currCell);
})

const textColorChange = document.getElementById('text-color-change');
textColorChange.addEventListener('input',(e)=>{
       currCell.style.color = e.target.value;
       updateMatrix(currCell);
})

const bgColorChange = document.getElementById('bg-color-change');
bgColorChange.addEventListener('input',(e)=>{
       currCell.style.background = e.target.value;
       updateMatrix(currCell);
})

const cutBtn = document.getElementById('cut-btn');
cutBtn.addEventListener("click",()=>{
    cutCell = {
        style : currCell.style.cssText,
        text : currCell.innerText
    }
    currCell.innerText = '';
    currCell.style.cssText = '';
    updateMatrix(currCell);
})
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener("click",()=>{
    cutCell = {
        style : currCell.style.cssText,
        text : currCell.innerText
    }
})
const pasteBtn = document.getElementById('paste-btn');
pasteBtn.addEventListener("click",()=>{
    currCell.innerText = cutCell.text;
    currCell.style.cssText = cutCell.style;
    updateMatrix(currCell);
})

const downloadBtn = document.getElementById("dwnld-btn");
downloadBtn.addEventListener("click",()=>{
    const stringMatrix = JSON.stringify(matrix);

    const blob = new Blob([stringMatrix],{type : 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Table.json';
    link.click();
})
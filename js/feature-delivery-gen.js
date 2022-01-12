// Tables generation
function createTable(items) {
    let columns = Object.keys(items[0]);

    let table = composeTable(items[0]);
    let tr = table.tBodies[0].insertRow(0);
    tr.insertCell(0).setAttribute('class', 'm-0');

    for (let item of items) {
        let tr = table.tBodies[0].insertRow(-1);

        for (let column of columns) {
            let td;
            
            if (item[column] instanceof Object) {
                for (let subCol of Object.keys(item[column])) {
                    td = tr.insertCell(-1);
                    td.innerText = item[column][subCol];
                    setIconCell(td);
                }
            } else {
                th = document.createElement('th');
                th.setAttribute('scope', 'row');
                th.innerText = item[column];
                tr.appendChild(th);
            }
        }
    }

    let pagination = document.getElementsByClassName('table-pagination')[0];
    let container = pagination.parentElement;
    container.insertBefore(table, pagination);
}

function setIconCell(td) {
    let tdType = (td.cellIndex % 4) + 1;
    let value = td.innerText.toLowerCase();
    console.log(tdType)
    td.classList.add('text-center')
    
    switch (tdType) {
        case 1:
        case 2:
        case 3:
        case 4:
            if (value == 'n/a') {
                td.classList.add('warning-icon');
            } else if (parseInt(value[0]) >= 2) {
                td.classList.add('yes-icon');
            } else {
                td.classList.add('no-icon');
            }
            break;
    }
}

function composeTable(item) {
    let tr;
    let th;
    let hr;

    let columns = Object.keys(item);

    let table = document.createElement('table');
    table.id = 'generated-table';
    table.setAttribute('class', 'generated-table table table-hover'); //show
    table.createTHead();
    table.createTBody();

    // columns = [...columns.slice(0, 4), { 'Status': columns.slice(3, 6) }, { 'Metrics': columns.slice(6) }]

    // first lvl columns
    tr = table.tHead.insertRow(-1);
    for (let column of columns.slice(0, 2)) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('rowspan', '2');
        th.innerText = column;
        tr.appendChild(th);
    }

    // Component columns fail Column
    
    for (let column of columns.slice(2)) {
        th = document.createElement('th');
        th.setAttribute('colspan', 4);
        th.setAttribute('class', 'text-center');
        hr = document.createElement('hr');
        hr.setAttribute('class', 'mb-2 mt-2');
        th.append(document.createTextNode(column), hr);
        tr.appendChild(th);
    }

    // Second lvl column
    tr = table.tHead.insertRow(-1);
    for (let column of columns.slice(2)) {
        for (let innerCol of Object.keys(item[column])) {
            th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.setAttribute('class', 'text-center');
            th.innerText = innerCol;
            tr.appendChild(th);
        }
    }

    return table;
}
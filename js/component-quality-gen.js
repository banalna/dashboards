// Tables generation
function createTable(items) {
    let columns = Object.keys(items[0]);

    let table = composeTable(columns);
    let tr = table.tBodies[0].insertRow(0);
    tr.insertCell(0).setAttribute('class', 'm-0');

    for (let item of items) {
        let tr = table.tBodies[0].insertRow(-1);

        for (let column of columns) {
            let td = tr.insertCell(-1);
            td.innerText = item[column];

            // set icon
            setIconCell(td);
        }
    }

    let pagination = document.getElementsByClassName('table-pagination')[0];
    let container = pagination.parentElement;
    container.insertBefore(table, pagination);
}

function setIconCell(td) {
    let value = parseInt(td.innerText.toLowerCase().replace('%', ''));
    switch (td.cellIndex) {
        case 3:
            if (value > 35) {
                td.classList.add('yes-icon');
            } else {
                td.classList.add('warning-icon');
            }
            td.classList.add('text-left')
            break;
        case 4:
            td.classList.add('class', 'text-center');
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            if (value > 50 && value < 80) {
                td.classList.add('warning-icon');
            } else if (value > 50) {
                td.classList.add('yes-icon');
            } else {
                td.classList.add('no-icon');
            }
            break;
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            // if (value > 5 && value < 15) {
            //     td.classList.add('warning-icon');
            // } else if (value > 15) {
            //     td.classList.add('yes-icon');
            // } else {
            //     td.classList.add('no-icon');
            // }
            td.classList.add('text-center')
            break;
    }
}

function composeTable(columns) {
    let tr;
    let th;
    let hr;

    let table = document.createElement('table');
    table.id = 'generated-table';
    table.setAttribute('class', 'generated-table table table-hover'); //show
    table.createTHead();
    table.createTBody();

    // columns = [...columns.slice(0, 4), { 'Status': columns.slice(3, 6) }, { 'Metrics': columns.slice(6) }]

    // first lvl columns
    tr = table.tHead.insertRow(-1);
    for (let column of columns.slice(0, 5)) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('rowspan', '2');
        th.innerText = column;
        tr.appendChild(th);
    }

    // Pipeline fail Column
    th = document.createElement('th');
    th.setAttribute('colspan', 4);
    th.setAttribute('class', 'text-center');
    hr = document.createElement('hr');
    hr.setAttribute('class', 'mb-2 mt-2');
    th.append(document.createTextNode('Pipeline Failures'), hr);
    tr.appendChild(th);

    // Defects Column
    th = document.createElement('th');
    th.setAttribute('colspan', 3);
    th.setAttribute('class', 'text-center');
    hr = document.createElement('hr');
    hr.setAttribute('class', 'mb-2 mt-2');
    th.append(document.createTextNode('Defects'), hr);
    tr.appendChild(th);

    // Test cases Column
    th = document.createElement('th');
    th.setAttribute('colspan', 2);
    th.setAttribute('class', 'text-center');
    hr = document.createElement('hr');
    hr.setAttribute('class', 'mb-2 mt-2');
    th.append(document.createTextNode('Test cases'), hr);
    tr.appendChild(th);

    // Second lvl column
    tr = table.tHead.insertRow(-1);
    for (let column of columns.slice(5)) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('class', 'text-center');
        th.innerText = column;
        tr.appendChild(th);
    }

    return table;
}
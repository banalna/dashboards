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
            td.classList.add('text-left')
            setIconCell(td);
        }
    }

    let pagination = document.getElementsByClassName('table-pagination')[0];
    let container = pagination.parentElement;
    container.insertBefore(table, pagination);
}


function composeTable(columns) {
    let tr;
    let th;

    let table = document.createElement('table');
    table.id = 'generated-table';
    table.setAttribute('class', 'generated-table table table-hover head-padding');
    table.createTHead();
    table.createTBody();

    // first lvl columns
    tr = table.tHead.insertRow(-1);
    for (let column of columns) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerText = column;
        tr.appendChild(th);
    }

    return table;
}

function setIconCell(td) {
    switch (td.cellIndex) {
        case 1:
            // if (td.innerText.toLowerCase() == 'completed') {
            //     td.classList.add('yes-icon');
            // } else {
            //     td.classList.add('warning-icon');
            // }
            // break;
    }
}
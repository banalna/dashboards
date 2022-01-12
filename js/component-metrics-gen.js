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
    switch (td.cellIndex) {
        case 2:
            td.setAttribute('class', td.innerText.toLowerCase() + '-icon text-left');
            td.textContent = '';
            break;
        case 3:
            td.setAttribute('class', 'text-center');
            break;
        case 4:
        case 5:
            td.setAttribute('class', td.innerText.toLowerCase() + '-icon');
            td.textContent = '';
            break;
        case 6:
            if (parseInt(td.innerText.toLowerCase()) >= 30) {
                td.setAttribute('class', 'yes-icon');
            } else {
                td.setAttribute('class', 'no-icon');
            }
            break;
        case 7:
            if (parseInt(td.innerText.toLowerCase()) >= 25) {
                td.setAttribute('class', 'yes-icon');
            } else {
                td.setAttribute('class', 'no-icon');
            }
            break;
        case 8:
            if (parseInt(td.innerText.toLowerCase()) >= 50) {
                td.setAttribute('class', 'yes-icon');
            } else {
                td.setAttribute('class', 'no-icon');
            }
            break;
        case 9:
            if (parseInt(td.innerText.toLowerCase()) >= 30 && parseInt(td.innerText.toLowerCase()) <= 80) {
                td.setAttribute('class', 'warning-icon');
            } else if (parseInt(td.innerText.toLowerCase()) >= 90) {
                td.setAttribute('class', 'yes-icon');
            }
            else {
                td.setAttribute('class', 'no-icon');
            }
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
    for (let column of columns.slice(0, 3)) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('rowspan', '2');
        th.innerText = column;
        tr.appendChild(th);
    }

    // Status Column
    th = document.createElement('th');
    th.setAttribute('colspan', 3);
    th.setAttribute('class', 'text-center');
    hr = document.createElement('hr');
    hr.setAttribute('class', 'mb-2 mt-2');
    th.append(document.createTextNode('Status'), hr);
    tr.appendChild(th);

    // Metrics Column
    th = document.createElement('th');
    th.setAttribute('colspan', 4);
    th.setAttribute('class', 'text-center');
    hr = document.createElement('hr');
    hr.setAttribute('class', 'mb-2 mt-2');
    th.append(document.createTextNode('Metrics'), hr);
    tr.appendChild(th);

    // Second lvl column
    tr = table.tHead.insertRow(-1);
    for (let column of columns.slice(3)) {
        th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('class', 'text-center');
        th.innerText = column;
        tr.appendChild(th);
    }

    return table;
}


// Generating charts

function getRandomColors(count) {
    colors = [];
    let letters = '0123456789ABCDEF';
    for (let i = 0; i < count; i++) {
        let color = '#';
        for (var j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
    }
    return colors
}

function getNumericData(items) {
    let columns = [];
    for (let item of items) {
        for (let column of Object.keys(item)) {
            if (!isNaN(parseFloat(item[column])) && !columns.includes(column)) {
                columns.push(column);
            }
        }
    }
    return columns;
}

function toFlatData(jsonData) {
    let flatObjects = [];

    for (let item of jsonData) {
        let obj = {};

        for (let key of Object.keys(item)) {
            if (item[key] instanceof Object) {
                for (let subItem of item[key]) {
                    for (let subKey of Object.keys(subItem)) {
                        obj[subKey] = subItem[subKey];
                    }
                }
            } else {
                obj[key] = item[key];
            }
        }
        flatObjects.push(obj);
    }
    return flatObjects;
}

function composeChartsData(jsonData) {
    jsonData = toFlatData(jsonData);

    let columns = getNumericData(jsonData);

    let chartData = {
        legends: [],
        xAxisName: [],
        series: []
    };

    for (let item of jsonData) {
        chartData.xAxisName.push(item['Component']);

        let series = [];
        let legend = [];

        for (let column of columns) {
            series.push([item[column]]);
            legend.push(column);
        }

        chartData.series.push(series);
        chartData.legends.push(legend);

    }

    return chartData;
}
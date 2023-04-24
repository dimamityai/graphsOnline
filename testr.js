let checkOnMouseClick = false;
let activeAlgorithm = false;
let visitedNode = [];
//класс Граф для алгоритмов
class Graph {
    constructor() {
        this.vertices = {}; // список смежности графа
    }

    //Методы
    addVertex(value) {
        if (!this.vertices[value]) {
            this.vertices[value] = {};
        }
    }

    addEdge(vertex1, vertex2, weight, orient) {
        if (orient === false) {
            if (this.vertices[vertex1][vertex2] === undefined) {
                let vert = this.vertices[vertex1];
                vert[vertex2] = weight;
            }
            if (this.vertices[vertex2][vertex1] === undefined) {
                let vert = this.vertices[vertex2];
                vert[vertex1] = weight;
            }
        } else {
            if (this.vertices[vertex1][vertex2] === undefined) {
                let vert = this.vertices[vertex1];
                vert[vertex2] = weight;
            }
        }
    }

    dfs(startVertex ,callback) {
        let list = this.vertices; // список смежности
        let stack = [startVertex]; // стек вершин для перебора
        let visited = {[startVertex]: 1}; // посещенные вершины
        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);
            // console.log(vertex);
            // получаем список смежных вершин
            // console.log(list[vertex]);
            let listNode = [];
            Object.keys(list[vertex]).forEach(node => {
                listNode.push(node);
            });
            let reversedNeighboursList = [...listNode].reverse();
            for (let i = 0; i < reversedNeighboursList.length; i++) {
                let val = reversedNeighboursList[i];
                if (!visited[val]) {
                    // отмечаем вершину как посещенную
                    visited[val] = 1;
                    // добавляем в стек
                    stack.push(val);
                }
            }
        }

        // перебираем вершины из стека, пока он не опустеет
        while (stack.length) {
            let activeVertex = stack.pop();
            handleVertex(activeVertex[0]);
        }

        // проверка на изолированные фрагменты
        stack = Object.keys(this.vertices);

        while (stack.length) {
            let activeVertex = stack.pop();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex[0]);
            }
        }
    }
    bfs (startVertex, callback) {
        let list = this.vertices; // список смежности
        let queue = [startVertex]; // очередь вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины

        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);

            // получаем список смежных вершин
            let neighboursList = list[vertex];
            Object.keys(neighboursList).forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                }
            });
        }

        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex[0]);
        }

        queue = Object.keys(this.vertices);

        // Повторяем цикл для незатронутых вершин
        while(queue.length) {
            let activeVertex = queue.shift();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex[0]);
            }
        }
    }
     findNearestVertex(distances, visited) {
        let minDistance = Infinity;
        let nearestVertex = null;

        Object.keys(distances).forEach(vertex => {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                nearestVertex = vertex;
            }
        });

        return nearestVertex;
    }

    //  dijkstra(graphh, startVertex) {
    //     let visited = {};
    //     let distances = {}; // кратчайшие пути из стартовой вершины
    //     let previous = {}; // предыдущие вершины

    //     let vertices = graphh.vertices; // список вершин графа
    //     // по умолчанию все расстояния неизвестны (бесконечны)
    //      Object.keys(vertices).forEach(vertex => {
    //         distances[vertex] = Infinity;
    //         previous[vertex] = null;
    //     });

    //     // расстояние до стартовой вершины равно 0
    //     distances[startVertex] = 0;

    //     function handleVertex(vertex) {
    //         // расстояние до вершины
    //         let activeVertexDistance = distances[vertex];

    //         // смежные вершины (с расстоянием до них)
    //         // let neighbours = vertices[activeVertex];
    //         // console.log(graphh);
    //         // console.log(graphh.vertices);
    //         // console.log(graphh.vertices[activeVertex]);
    //         let neighbours = graphh.vertices[activeVertex];
    //         // console.log(distances);
    //         // для всех смежных вершин пересчитать расстояния
    //             Object.keys(neighbours).forEach(neighbourVertex => {
    //                 // известное на данный момент расстояние
    //                 let currentNeighbourDistance = distances[neighbourVertex];
    //                 // console.log(currentNeighbourDistance);
    //                 // console.log(distances);
    //                 // console.log(neighbours[neighbourVertex]);
    //                 // вычисленное расстояние
    //                 let newNeighbourDistance = parseInt(activeVertexDistance) + parseInt(neighbours[neighbourVertex]);
    //                 // console.log(newNeighbourDistance);
    //                 if (newNeighbourDistance < currentNeighbourDistance) {
    //                     distances[neighbourVertex] = newNeighbourDistance;
    //                     previous[neighbourVertex] = vertex;
    //                 }
    //             });

    //         // пометить вершину как посещенную
    //         visited[vertex] = 1;
    //         visitedNode.push(vertex);
    //     }

    //     // ищем самую близкую вершину из необработанных
    //     let activeVertex = this.findNearestVertex(distances, visited);
    //     // продолжаем цикл, пока остаются необработанные вершины
    //     while(activeVertex) {
    //         handleVertex(activeVertex);
    //         activeVertex = this.findNearestVertex(distances, visited);
    //     }

    //     return { distances, previous };
    // }
}

// Получить модальный
const modal = document.getElementById("myModal");

// // Получить кнопку, которая открывает модальный
// const btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
const span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
    modal.style.display = "none";
}

// Получить модальный
const modal1 = document.getElementById("myModal1");

// // Получить кнопку, которая открывает модальный
// const btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
const span1 = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span1.onclick = function() {
    modal1.style.display = "none";
}

let visitedNodeBackColor = [];
let yyy = []
let edd = []
let V;
let U;
let options = {};
let check1 = false;
let check2 = false;
let check3 = false; let check4 = false;

let checkBtn1 = false;
let checkBtn2 = false;
let checkBtn3 = false;
let checkBtn4 = false;
let checkBtn5 = false;
let checkBtn6 = false;
let checkBtn7 = false;

let container = document.getElementById('mynetwork');

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}




const MAX_INTEGER = Infinity; // Нет ребер или недоступен в ориентированном графе
const MIN_INTEGER = 0; // Нет самоконтроля

const btnDefault = document.getElementById('default');
const btnClear = document.getElementById('clear');
const btnStart = document.getElementById('startButton');
const btnAddEdge = document.getElementById('addEdge');
const BtnOrient = document.getElementById('btnOrient');
const BtnNoOrient = document.getElementById('btnNoOrient');
const BtnOrient1 = document.getElementById('btnOrient1');
const BtnNoOrient1 = document.getElementById('btnNoOrient1');
const BtnWeight1 = document.getElementById('btnWeight1');
const BtnNoWeight1 = document.getElementById('btnNoWeight1');
const btnTest1 = document.getElementById('testBtn1');
const btnTest2 = document.getElementById('testBtn2');
const btnTest3 = document.getElementById('testBtn3');
const btnTest4 = document.getElementById('testBtn4');
const btnTest5 = document.getElementById('testBtn5');
const btnTest6 = document.getElementById('testBtn6');
const btnTest7 = document.getElementById('testBtn7');
const btnDelNode = document.getElementById('delNodeBtn');

function ToggleDisable() {
    btnTest1.setAttribute("disabled","disable");
    btnTest2.setAttribute("disabled","disable");
    btnTest3.setAttribute("disabled","disable");
    btnTest4.setAttribute("disabled","disable");
    btnTest5.setAttribute("disabled","disable");
    btnTest6.setAttribute("disabled","disable");
    btnTest7.setAttribute("disabled","disable");
    btnDefault.setAttribute("disabled","disable");
    btnClear.setAttribute("disabled","disable");

    //     if(el.getAttribute("disabled") === "disable") {
    //         el.removeAttribute("disabled");
    //     } else {
    //         el.setAttribute("disabled","disable");
    //     }
    // }
}

function ToggleEnable() {
    btnTest1.removeAttribute("disabled");
    btnTest2.removeAttribute("disabled");
    btnTest3.removeAttribute("disabled");
    btnTest4.removeAttribute("disabled");
    btnTest5.removeAttribute("disabled");
    btnTest6.removeAttribute("disabled");
    btnTest7.removeAttribute("disabled");
    btnDefault.removeAttribute("disabled");
    btnClear.removeAttribute("disabled");

    //     if(el.getAttribute("disabled") === "disable") {
    //         el.removeAttribute("disabled");
    //     } else {
    //         el.setAttribute("disabled","disable");
    //     }
    // }
}

// container.addEventListener("click", e => {
//     console.log('Координаты клика: ${e.offsetX}, ${e.offsetY}. ');
// });

document.addEventListener('keydown', function keyPress(e) {
    if (e.key === "Escape") {
        checkBtn1 = false;
        checkBtn2 = false;
        checkBtn3 = false;
        checkBtn4 = false;
        checkBtn5 = false;
        checkBtn6 = false;
        checkBtn7 = false;
    }
});


btnTest1.onclick = function() {
    checkBtn1 = true;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn6 === true) checkBtn6 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    if (getLenYYY() === 0) {
        draw();
    }
    deleteTable();
}

btnTest2.onclick = function() {
    checkBtn2 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn6 === true) checkBtn6 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    deleteTable();
}

btnTest3.onclick = function() {
    checkBtn3 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn6 === true) checkBtn6 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    deleteTable();
}

btnTest4.onclick = function() {
    checkBtn4 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn6 === true) checkBtn6 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    deleteTable();
}


btnTest5.onclick = function() {
    checkBtn5 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn6 === true) checkBtn6 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    deleteTable();
}

btnTest6.onclick = function() {
    checkBtn6 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn7 === true) checkBtn7 = false;
    deleteTable();
}

btnTest7.onclick = function() {
    checkBtn7 = true;
    if (checkBtn1 === true) checkBtn1 = false;
    if (checkBtn2 === true) checkBtn2 = false;
    if (checkBtn3 === true) checkBtn3 = false;
    if (checkBtn4 === true) checkBtn4 = false;
    if (checkBtn5 === true) checkBtn5 = false;
    if (checkBtn6 === true) checkBtn6 = false;
}

btnDefault.onclick = function() {
    modal1.style.display = "block";
    BtnOrient1.onclick = function () {
        yyy = [{
            id: '1',
            label: '1',
            borderWidth: 2,
            size: 50,
            color: {border: '#222222', background: 'grey'},
            font: {color: 'black', size: 40, face: 'arial',},
            margin: {top: 20, bottom: 20, left: 20, right: 20}
        },
            {
                id: '2',
                label: '2',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '3',
                label: '3',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '4',
                label: '4',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '5',
                label: '5',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },]

        edd = [{id:'1', from: 1, to: 2, label: "7", font: { align: "horizontal" }, arrows: "to" },
            { id:'2', from: 1, to: 3, label: "3", font: { align: "horizontal" }, arrows: "to" },
            { id:'3', from: 2, to: 4, label: "5", font: { align: "horizontal" }, arrows: "to" },
            { id:'4', from: 2, to: 5, label: "9", font: { align: "horizontal" }, arrows: "to" },
            { id:'5', from: 3, to: 4, label: "1", font: { align: "horizontal" }, arrows: "to" }]
        modal1.style.display = "none";
        draw();
    }
    BtnNoOrient1.onclick = function () {
        yyy = [{
            id: '1',
            label: '1',
            borderWidth: 2,
            size: 50,
            color: {border: '#222222', background: 'grey'},
            font: {color: 'black', size: 40, face: 'arial',},
            margin: {top: 20, bottom: 20, left: 20, right: 20}
        },
            {
                id: '2',
                label: '2',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '3',
                label: '3',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '4',
                label: '4',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '5',
                label: '5',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },]

        edd = [{id: '1', from: 1, to: 2, label: "7", font: {align: "horizontal"}},
            {id: '2', from: 1, to: 3, label: "3", font: {align: "horizontal"}},
            {id: '3', from: 2, to: 4, label: "5", font: {align: "horizontal"}},
            {id: '4', from: 2, to: 5, label: "9", font: {align: "horizontal"}},
            {id: '5', from: 3, to: 4, label: "1", font: {align: "horizontal"}}]
        modal1.style.display = "none";
        draw();
    }
    BtnWeight1.onclick = function () {
        yyy = [{
            id: '1',
            label: '1',
            borderWidth: 2,
            size: 50,
            color: {border: '#222222', background: 'grey'},
            font: {color: 'black', size: 40, face: 'arial',},
            margin: {top: 20, bottom: 20, left: 20, right: 20}
        },
            {
                id: '2',
                label: '2',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '3',
                label: '3',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '4',
                label: '4',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '5',
                label: '5',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },]

        edd = [{id:'1', from: 1, to: 2, font: { align: "horizontal" }, arrows: "to" },
            { id:'2', from: 1, to: 3, font: { align: "horizontal" }, arrows: "to" },
            { id:'3', from: 2, to: 4, font: { align: "horizontal" }, arrows: "to" },
            { id:'4', from: 2, to: 5, font: { align: "horizontal" }, arrows: "to" },
            { id:'5', from: 3, to: 4, font: { align: "horizontal" }, arrows: "to" }]
        modal1.style.display = "none";
        draw();
    }
    BtnNoWeight1.onclick = function () {
        yyy = [{
            id: '1',
            label: '1',
            borderWidth: 2,
            size: 50,
            color: {border: '#222222', background: 'grey'},
            font: {color: 'black', size: 40, face: 'arial',},
            margin: {top: 20, bottom: 20, left: 20, right: 20}
        },
            {
                id: '2',
                label: '2',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '3',
                label: '3',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '4',
                label: '4',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },
            {
                id: '5',
                label: '5',
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            },]

        edd = [{id: '1', from: 1, to: 2, font: {align: "horizontal"}},
            {id: '2', from: 1, to: 3, font: {align: "horizontal"}},
            {id: '3', from: 2, to: 4, font: {align: "horizontal"}},
            {id: '4', from: 2, to: 5, font: {align: "horizontal"}},
            {id: '5', from: 3, to: 4, font: {align: "horizontal"}}]
        modal1.style.display = "none";
        draw();
    }
}
function createTable(i, num, n, a) {
// добавим шапку
    for (let i = 0; i < n + 1; i = i + 1) {
        $('body > table').append(
            '<th>' + (i + 1) + '</th>'
        );
    }

    for (let i = 0; i < n + 1; i = i + 1) {
        if (i === 0) {
            $('body > table').append(
                '<tr>'
            );
        }
        $('body > table').append(
            '<td>' + a[i + 1] + '</td>'
        );
    }

}

// function createTable1(i, num, n, a) {
// $('body').append('<table id = "table1" class = "table"></table>');
// // добавим шапку
//     for (let i = 0; i < n + 1; i = i + 1) {
//         $('body > table').append(
//             '<th>' + (i + 1) + '</th>'
//         );
//     }
//
//     for (let i = 0; i < n + 1; i = i + 1) {
//         if (i === 0) {
//             $('body > table').append(
//                 '<tr>'
//             );
//         }
//         $('body > table').append(
//             '<td>' + a[i + 1] + '</td>'
//         );
//     }
//
// }
function deleteTable() {
    // const handlerAll = () => {
    const table1 = document.getElementById('table');
    table1.innerHTML = '';
    const table2 = document.getElementById('table1');
    if (table2 !== null) {
        table2.innerHTML = '';
    }
    // const table2 = document.getElementById('table1');
    // table2.innerHTML = '';
    // }
}

btnClear.onclick = function () {
    window.location.reload();
}

function addNode(num) {
    if (num === '') return;
    let check = 0;
    for (let i = 0; i < getLenYYY(); i++) {
        if (num === yyy[i]['id']) return;
    }
    yyy = yyy.concat({
        id: num,
        label: num,
        borderWidth: 2,
        size: 50,
        color: {border: '#222222', background: 'grey'},
        font: {color: 'black', size: 40, face: 'arial',},
        margin: {top: 20, bottom: 20, left: 20, right: 20}
    });
}

// btnStart.onclick = function () {
//     let num = document.getElementById('numNodes').value;
//     addNode(num);
//     draw();
//     // for (let i = 0; i < getLenYYY(); i++) {
//     //     createTable(yyy[i]['id']);
//     // }
// }
function getLenYYY() {
    let arrLength = 0;
    yyy.forEach(function () {
        arrLength++
    })

    return arrLength;
}
function getLenList(lst) {
    let arrLength = 0;
    lst.forEach(function () {
        arrLength++
    })

    return arrLength;
}

function getLenEdge() {
    let arrLength = 0;
    edd.forEach(function () {
        arrLength++
    })

    return arrLength;
}
function lastElIdinNode(){
    let i;
    if (getLenYYY() === 0) {
        i = 1;
    }
    else {
        i = parseInt(yyy[getLenYYY() - 1]['id']);
        i = i + 1;
    }
    return String(i);
}

function lastElIdinEndge(){
    let i;
    if (getLenEdge() === 0) {
        i = 1;
    }
    else {
        i = parseInt(edd[edd.length - 1]['id']) + 1;
    }
    return String(i);
}

// //обход в глубину
// function dfs(adj, v, t) {
//     // adj - смежный список
//     // v - посещенный узел (вершина)
//     // t - пункт назначения
//
//     // это общие случаи
//     // либо достигли пункта назначения, либо уже посещали узел
//     if(v === t) return true
//     if(v.visited) return false
//
//     // помечаем узел как посещенный
//     v.visited = true
//     // исследуем всех соседей (ближайшие соседние вершины) v
//     for(let neighbor of adj[v]) {
//         // если сосед не посещался
//         if(!neighbor.visited) {
//             // двигаемся по пути и проверяем, не достигли ли мы пункта назначения
//             let reached = dfs(adj, neighbor, t)
//             // возвращаем true, если достигли
//             if(reached) return true
//         }
//     }
//     // если от v до t добраться невозможно
//     return false
// }
function handleClick(e){
    checkOnMouseClick = true;
}
let blueRect = document.getElementById("tail");
blueRect.addEventListener("click", handleClick);
function draw() {
    let nodes = new vis.DataSet(yyy);
    let edges = new vis.DataSet(edd);
    let data = {
        nodes: nodes,
        edges: edges
    };
    let container = document.getElementById('mynetwork');
    let options = {
        nodes: {
            borderWidth: 2,
            size: 80,
            color: {
                border: '#ffffff',
                background: 'grey'
            },
            font: {
                color: 'black',
                size: 40,
                face: 'arial',
            },
            margin: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            },
            // fixed: {
            //     x:true,
            //     y:true
            // },
            heightConstraint: false
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 100,
                springConstant: 0.01,
                nodeDistance: 40,
                damping: 0.09,
                avoidOverlap: 0
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            solver: 'hierarchicalRepulsion',
            stabilization: {
                enabled: true,
                iterations: 1000,
                updateInterval: 100,
                onlyDynamicEdges: false,
                fit: true
            },
            timestep: 0.5,
            adaptiveTimestep: true,
            wind: {x: 0, y: 0}
        },
        interaction: {
            multiselect: true,
            dragView: true
        },
        edges: {
            physics: false,
            selectionWidth: 5,
            width: 3,
        }
    };
    network = new vis.Network(container, data, options);

    function addElemToLSt(){
        for (let i = 0; i < visitedNode.length; i++) {
            visitedNodeBackColor.push(visitedNode[i]);
        }
    }
    function changeNodeColor() {
        let time = 500;
        for (let i = 0; i < visitedNode.length; i++) {
            let val = visitedNode[i];
            let clickedNodes = nodes.get(val);
            clickedNodes.color = {
                border: '#277dea',
                background: '#d3e6ff',
            }
            setTimeout(function () {
                nodes.update(clickedNodes);
            }, time);
            time = time + 500;
        }
        visitedNode = []
    }

    function changeNodeColorLater() {
        for (let i = 0; i < visitedNodeBackColor.length; i++) {
            let val = visitedNodeBackColor[i];
            let clickedNodes = nodes.get(val);
            clickedNodes.color = {
                border: '#222222',
                background: 'grey'
            }
            activeAlgorithm = false;
            ToggleEnable();
            nodes.update(clickedNodes);
        }
        visitedNodeBackColor = [];
    }
    // network.on("selectEdge", function (properties) {
    //     console.log(yyy[0]);
    //     console.log(edd[0]['id']);
    //     // console.log("selectEdge Event:", properties.edges['endPointOffset']);
    //     // console.log("selectEdge Event:", properties.edges['endPointOffset']);
    // });

    network.on('click', function (properties) {
        if (checkBtn1 === true) {
            let maxElement = lastElIdinNode();
            addNode(maxElement);
            yyy = yyy.concat({
                id: maxElement,
                label: maxElement,
                borderWidth: 2,
                size: 50,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            });
            let updatedIds = nodes.add([{
                id: maxElement,
                x: properties.pointer.canvas.x,
                y: properties.pointer.canvas.y,
                borderWidth: 2,
                size: 50,
                label: maxElement,
                color: {border: '#222222', background: 'grey'},
                font: {color: 'black', size: 40, face: 'arial',},
                margin: {top: 20, bottom: 20, left: 20, right: 20}
            }]);
            let nodeStoUpdate = nodes.get(maxElement);
            delete nodeStoUpdate.x;
            delete nodeStoUpdate.y;
            nodes.update(nodeStoUpdate);
            check1 = false;
            check2 = false;
        }
        if (checkBtn2 === true) {
            let ids = properties.nodes;
            if (getLenList(ids) !== 0) {
                let clickedNodes = nodes.get(ids);
                if (check1 === false && getLenList(clickedNodes) !== 0) {
                    V = clickedNodes[0]['id'];
                    check1 = true;
                } else if (check2 === false && getLenList(clickedNodes) !== 0) {
                    U = clickedNodes[0]['id'];
                    check2 = true;
                }
                if (check1 === true && check2 === true && checkBtn2 === true && clickedNodes !== 0) {
                    modal.style.display = "block";
                    BtnOrient.onclick = function () {
                        let w = document.getElementById('EdgeWeight').value;
                        let addElem = lastElIdinEndge();
                        edd = edd.concat({
                            id: addElem,
                            from: V,
                            to: U,
                            label: w,
                            font: {align: "horizontal"},
                            arrows: "to"
                        });
                        modal.style.display = "none";
                        let updatedIds = edges.add([{
                            id: addElem,
                            from: V,
                            to: U,
                            label: w,
                            x: properties.pointer.canvas.x,
                            y: properties.pointer.canvas.y,
                            font: {color: 'black', size: 40, face: 'arial',},
                            arrows: "to"
                        }]);
                        let eddsStoUpdate = edges.get(addElem);
                        delete eddsStoUpdate.x;
                        delete eddsStoUpdate.y;
                        edges.update(eddsStoUpdate);
                    }
                    BtnNoOrient.onclick = function () {
                        let w = document.getElementById('EdgeWeight').value;
                        let addElem = lastElIdinEndge();
                        edd = edd.concat({
                            id: addElem,
                            from: V,
                            to: U,
                            label: w,
                            font: {align: "horizontal"}
                        });
                        modal.style.display = "none";
                        let updatedIds = edges.add([{
                            id: addElem,
                            from: V,
                            to: U,
                            label: w,
                            x: properties.pointer.canvas.x,
                            y: properties.pointer.canvas.y,
                            font: {color: 'black', size: 40, face: 'arial',}
                        }]);
                        let eddsStoUpdate = edges.get(addElem);
                        delete eddsStoUpdate.x;
                        delete eddsStoUpdate.y;
                        edges.update(eddsStoUpdate);
                    }
                    check1 = false;
                    check2 = false;
                    // draw()
                }
            }
        }
        if (checkBtn3 === true) {
            let ids = properties.nodes;
            if (getLenList(ids) !== 0) {
                let clickedNodes = nodes.get(ids);
                if (check1 === false && clickedNodes !== undefined) {
                    V = clickedNodes[0]['id'];
                    check1 = true;
                }
                let temp = [];
                for (let i = 0; i < yyy.length; i += 1) {
                    if (yyy[i]['id'] !== V) {
                        temp = temp.concat(yyy[i]);
                    }
                }
                yyy = temp;

                let tempEdges = [];
                for (let i = 0; i < edd.length; i += 1) {
                    if (edd[i]['from'] !== V && edd[i]['to'] !== V) {
                        tempEdges = tempEdges.concat(edd[i]);
                    }
                }
                edd = tempEdges;

                // for (let i = 0; i < getLenYYY(); i++) {
                //     createTable(yyy[i]['id']);
                // }
                network.deleteSelected();
                check1 = false;
                check2 = false;
                // draw()
            }
        }
        if (checkBtn4 === true) {
            let ids = properties.nodes;
            let idsEd = properties.edges;
            let clickedEdges = edges.get(idsEd);
            let V;
            let U;
            // console.log(clickedEdges);
            if (getLenList(ids) === 0 && getLenList(clickedEdges) !== 0) {
                V = clickedEdges[0]['from'];
                U = clickedEdges[0]['to']
                let tempEdges = [];
                for (let i = 0; i < edd.length; i += 1) {
                    if (edd[i]['from'] !== V || edd[i]['to'] !== U) {
                        tempEdges = tempEdges.concat(edd[i]);
                    }
                }
                edd = tempEdges;
                // for (let i = 0; i < getLenYYY(); i++) {
                //     createTable(yyy[i]['id']);
                // }
                check1 = false;
                check2 = false;
                network.deleteSelected();
            }
        }
            if (checkBtn5 === true && checkOnMouseClick === true && activeAlgorithm !== true) {
                const graph = new Graph();
                for(let i = 0; i < yyy.length; i++){
                    if (yyy[i]['id'] !== null) graph.addVertex(yyy[i]['id']);
                }
                for(let i = 0; i < edd.length; i++){
                    let V = edd[i]['from'];
                    let U = edd[i]['to'];
                    let W = edd[i]['label'];
                    let check = edd[i]['arrows'];
                    if (check === 'to'){
                        graph.addEdge(V, U, W, true);
                    }
                    else{
                        graph.addEdge(V, U, W, false);
                    }
                }
                let ids = properties.nodes;
                let clickedNodes = nodes.get(ids);
                if (getLenList(clickedNodes) !== 0) {
                    activeAlgorithm = true;
                    V = clickedNodes[0]['id'];
                    ToggleDisable();
                    graph.dfs(V, U => visitedNode.push(U));
                    check3 = false;
                    check4 = false;
                    addElemToLSt();
                    // console.log(countNodeInAlgorithm);
                    let time;
                    if (visitedNodeBackColor.length < 10) time = visitedNodeBackColor.length * 600;
                    else if (visitedNodeBackColor.length < 20) time = visitedNodeBackColor.length * 550;
                    else if (visitedNodeBackColor.length < 30) time = visitedNodeBackColor.length * 530;
                    else if (visitedNodeBackColor.length < 40) time = visitedNodeBackColor.length * 520;
                    else time = visitedNodeBackColor.length * 515;
                    changeNodeColor();
                    setTimeout(function () {
                        changeNodeColorLater();
                    }, time);
                    // console.log(visitedNodeBackColor);
                    // }
                }
            }
        if (checkBtn6 === true && checkOnMouseClick === true && activeAlgorithm !== true) {
            const graph = new Graph();
            for(let i = 0; i < yyy.length; i++){
                if (yyy[i]['id'] !== null) graph.addVertex(yyy[i]['id']);
            }
            for(let i = 0; i < edd.length; i++){
                let V = edd[i]['from'];
                let U = edd[i]['to'];
                let W = edd[i]['label'];
                let check = edd[i]['arrows'];
                if (check === 'to'){
                    graph.addEdge(V, U, W, true);
                }
                else{
                    graph.addEdge(V, U, W, false);
                }
            }
            let ids = properties.nodes;
            let clickedNodes = nodes.get(ids);
            // console.log(clickedEdges);
            if (getLenList(clickedNodes) !== 0) {
                activeAlgorithm = true;
                V = clickedNodes[0]['id'];
                // check3 = true;
                // } else if (check2 === false && getLenList(clickedNodes) !== 0) {
                //     U = clickedNodes[0]['id'];
                //
                //     // console.log(clickedNodes[0]['color']);
                //     check4 = true;
                // }
                // if (check3 === true && check4 === true && checkBtn5 === true && clickedNodes !== 0) {
                ToggleDisable();
                graph.bfs(V, U => visitedNode.push(U));
                addElemToLSt();
                // console.log(countNodeInAlgorithm);
                let time;
                if (visitedNodeBackColor.length < 10) time = visitedNodeBackColor.length * 600;
                else if (visitedNodeBackColor.length < 20) time = visitedNodeBackColor.length * 550;
                else if (visitedNodeBackColor.length < 30) time = visitedNodeBackColor.length * 530;
                else if (visitedNodeBackColor.length < 40) time = visitedNodeBackColor.length * 520;
                else time = visitedNodeBackColor.length * 515;
                changeNodeColor();
                setTimeout(function () {
                    changeNodeColorLater();
                }, time);
                // console.log(visitedNodeBackColor);
                // }
            }
        }
        // if (checkBtn7 === true && checkOnMouseClick === true && activeAlgorithm !== true) {
        //     deleteTable();
        //     const graph = new Graph();
        //     for(let i = 0; i < yyy.length; i++){
        //         if (yyy[i]['id'] !== null) graph.addVertex(yyy[i]['id']);
        //     }
        //     for(let i = 0; i < edd.length; i++){
        //         let V = edd[i]['from'];
        //         let U = edd[i]['to'];
        //         let W = edd[i]['label'];
        //         let check = edd[i]['arrows'];
        //         if (check === 'to'){
        //             graph.addEdge(V, U, W, true);
        //         }
        //         else{
        //             graph.addEdge(V, U, W, false);
        //         }
        //     }
        //     let ids = properties.nodes;
        //     let clickedNodes = nodes.get(ids);
        //     // console.log(clickedEdges);
        //     if (getLenList(clickedNodes) !== 0) {
        //         activeAlgorithm = true;
        //         V = clickedNodes[0]['id'];
        //         // check3 = true;
        //         // } else if (check2 === false && getLenList(clickedNodes) !== 0) {
        //         //     U = clickedNodes[0]['id'];
        //         //
        //         //     // console.log(clickedNodes[0]['color']);
        //         //     check4 = true;
        //         // }
        //         // if (check3 === true && check4 === true && checkBtn5 === true && clickedNodes !== 0) {
        //         ToggleDisable();
        //         console.log(graph.dijkstra(graph, V));
        //         addElemToLSt();
        //         activeAlgorithm = true;

        //         ToggleDisable();
        //         // console.log(countNodeInAlgorithm);
        //         let time;
        //         if (visitedNodeBackColor.length < 10) time = visitedNodeBackColor.length * 600;
        //         else if (visitedNodeBackColor.length < 20) time = visitedNodeBackColor.length * 550;
        //         else if (visitedNodeBackColor.length < 30) time = visitedNodeBackColor.length * 530;
        //         else if (visitedNodeBackColor.length < 40) time = visitedNodeBackColor.length * 520;
        //         else time = visitedNodeBackColor.length * 515;
        //         changeNodeColor();
        //         setTimeout(function () {
        //             changeNodeColorLater();
        //         }, time);

        //         console.log(yyy[yyy.length - 1]['id']);
        //         console.log("111111111111");
        //         // for (let i = V; i < yyy[yyy.length - 1]['id'] + 1; i++) {
        //         //     if (graph.dijkstra(graph, V)['distances'][i] !== undefined) {
        //         //         // console.log(i);
        //         //         console.log(graph.dijkstra(graph, V)['distances'][i]);
        //         //         // createTable(i, graph.dijkstra(graph, V)['distances'][i], yyy[yyy.length - 1]['id'] + 1);
        //         //     }
        //         // }
        //         let resDistance = graph.dijkstra(graph, V)['distances']
        //         let resPrevious = graph.dijkstra(graph, V)['previous']
        //         console.log(resDistance);
        //         createTable(1, graph.dijkstra(graph, V)['distances'][1], yyy.length - 1, resDistance);
        //         // createTable1(1, graph.dijkstra(graph, V)['previous'][1], yyy.length - 1, resPrevious);
        //         // for (let i = 0; i < getLenYYY(); i++) {
        //         //     createTable(yyy[i]['id']);
        //         // }
        //         // alert(graph.dijkstra(graph, V));
        //         // console.log(visitedNodeBackColor);
        //     }
        // }
    });
}

// network.onclick("stabilizationIterationsDone", function () {
//     network.setOptions({
//         physics: {enabled:false}
//     });
// });

// $("#stabilize").click(e => {
//     network.stabilize()
// })

// network.onclick = function (params) {
//     if (params.nodes[0] == 2) {
//         console.log('click event on 2!');
//     }
// }


//
// function getLenEDD() {
//     let edgLength = 0;
//     edd.forEach(function () {
//         edgLength++
//     })
//
//     return edgLength;
// }
//
// function createTable(num) {
//     let temp = [];
//     temp[0] = [];
//
//     let arrLength = getLenYYY();
//
//     let idFindNode;
//     for (let i = 0; i < arrLength; i += 1) {
//         if (yyy[i]['id'] == parseInt(num)) {
//             idFindNode = i;
//         }
//     }
//
//     let edgLength = getLenEDD();
//
//     for (let i = 0; i < arrLength; i += 1) {
//         temp[i] = [];
//     }
//
//     for (let i = 0; i < arrLength; i += 1) {
//         for (let j = 0; j < arrLength; j += 1) {
//             temp[i][j] = MAX_INTEGER;
//         }
//         temp[i][i] = MIN_INTEGER;
//     }
//
//     for (let q = 0; q < edgLength; q += 1) {
//         let t1 = edd[q]['from'];
//         let t2 = edd[q]['to'];
//         for (let i = 0; i < arrLength; i += 1) {
//             for (let j = 0; j < arrLength; j += 1) {
//                 if (yyy[i]['id'] == t1 && yyy[j]['id'] == t2) {
//                     temp[i][j] = parseInt(edd[q]['label']);
//                 }
//
//             }
//         }
//     }
//
//     const table = document.getElementById('table');
//
//     if (table.rows.length > 0) {
//         for (i = table.tBodies[0].rows.length - 1; i >= 0; i--) { table.tBodies[0].deleteRow(i); }
//     }
//
//     let rowHeader = table.insertRow();
//     let cell = rowHeader.insertCell(-1);
//     cell.innerHTML = " ";
//     for (let prop in temp[0]) {
//         let cell = rowHeader.insertCell();
//         cell.innerText = yyy[prop]['label'];
//         console.log(yyy[prop]['label']);
//     }
//
//     for (let i = 0; i < temp.length; i++) {
//         let row = table.insertRow();
//         let cell = row.insertCell(-1);
//         cell.innerHTML = yyy[i]['label'];
//         for (let prop in temp[i]) {
//             let cell = row.insertCell();
//
//             cell.innerText = temp[i][prop];
//
//         }
//     }
// }

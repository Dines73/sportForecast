 
window.onload=function(){

const natalChartImg = document.getElementById('natalChartImg');
const searchForm = document.getElementById('searchForm');
const searchBar = document.getElementById('searchBar');
const ctx = document.getElementById('myChart').getContext('2d');
const personalData = document.getElementById('personalData');
const textField = document.getElementById('introText')
var filteredData;
const loadText = async () => {
    try {
        const res = await fetch('random.txt');
        introTxt = await res.text();
        textField.innerHTML = introTxt
    } catch (err) {
        console.error(err);
    }
};
loadText()

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = document.getElementById('searchBar').value
    const inputValueLowerCase = inputValue.toLowerCase()
    let searchAllData = allData

    filteredData = searchAllData.filter((character) => {
        return (
            character.name.toLowerCase().includes(inputValueLowerCase)
        );
    });

    displayNatal();
    personData();
    drawTable();
    chartData();
    $(".currentChart").show();
    $("#introText").hide();
});


const loadAllData = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/Dines73/getdata_v2/master/astroNba');
        allData = await res.json();
        console.log(allData)
    } catch (err) {
        console.error(err);
    }
};


function displayNatal() {
    const natalImg = filteredData
        .map((character) => {
            let natalImage = character.natalImage
            return `<img src="${natalImage}"></img>`
        });
    natalChartImg.innerHTML = natalImg;
};


function drawTable() {
    document.getElementById("tabelle").innerHTML = ""
    const tableData = filteredData.map((char) => {
        let radix = char.radix
        let myArray = [];
        for (let i = 0; i <= radix.length - 1; i++) {
            let z = 0;
            myArray[i] = [];
            for (key in radix[i]) {
                if (radix[i].hasOwnProperty(key)) {
                    myArray[i][z] = radix[i][key];
                }
                z++;
            }
        }

        let tab = document.querySelector("#tabelle");
        let table = document.createElement("TABLE");
        let ml = myArray.length;
        for (let i = 0; i < ml; i++) {
            let tr = document.createElement("TR");
            for (let j = 0; j < myArray[i].length; j++) {
                let td = document.createElement("TD");
                td.appendChild(document.createTextNode(myArray[i][j]));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        tab.appendChild(table)
    })
}

function personData() {
    const globalData = filteredData
        .map((valPd) => {
            let name = valPd.name;
            let born = valPd.born;
            let birthCity = valPd.birthCity;
            personalData.innerHTML = `${name}, ${born}, ${birthCity}`
        })
}
function chartData() {
    const chartsData = filteredData
        .map((valCha) => {
            let stats = valCha.stats
            let statsPkt = stats.map(item => item.pkt)
            let statsDate = stats.map(item => item.date)
            let statsOpp = stats.map(item => item.opp)
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: statsDate,
                    datasets: [
                        {
                            label: 'Points',
                            data: statsPkt,
                            data1:statsOpp,
                            fill: false,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    tooltips: {
                        mode: 'label',
                        callbacks: {
                    
                            title: function(tooltipItem, data) {
                                return data.labels[tooltipItem[0].index];
                            },
                    
                            beforeLabel: function(tooltipItem, data) {
                                return 'Versus: ' + data.datasets[tooltipItem.datasetIndex].data1[tooltipItem.index];
                            },
                    
                        },
                    }
                }
            });
        })

}

loadAllData();


}


var http = require('http');
var request = require('request');

function doRequest(endereco, callback){
    request(endereco, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            callback(importedJSON);
        }
    })
}

function retornaTimeline(endereco){
    var t = {
        timeline: []
    };

    doRequest(endereco, function(arquivo){
        
        arquivo.events.forEach(element => {
            element.custom_data.sort((a,b) => (a.key > b.key) ? 1 : 0);
        });

        arquivo.events.forEach(element => {
            
            if(element.event == "comprou"){
                var valores = {
                    timestamp: element.timestamp,
                    revenue: element.revenue.toFixed(1),
                    transaction_id: element.custom_data[1].value,
                    store_name:element.custom_data[0].value,
                    products: []
                }

                t.timeline.push(valores);

                arquivo.events.forEach(element2 => {
                    if(element2.event == "comprou-produto"){
                        //console.log("element2.custom_data");
                        //console.log(element2.custom_data);
                        if(element.custom_data[1].value == element2.custom_data[2].value){
                            var produto = {
                                name: element2.custom_data[0].value,
                                price: element2.custom_data[1].value
                            }

                            t.timeline[t.timeline.length - 1].products.push(produto);
                        }
                    }
                });
            }
        });
        t.timeline.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : 0);
        console.log(JSON.stringify(t));
        return t;
    });
}

retornaTimeline('https://storage.googleapis.com/dito-questions/events.json');

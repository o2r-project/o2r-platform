(function(){
    'use strict';
    angular
        .module('starter.o2rUiBindingCreator')
        .factory('o2rUiBindingExamples', o2rUiBindingExamples);
    
        o2rUiBindingExamples.$inject = ['$log'];
    function o2rUiBindingExamples($log){
        var logger = $log.getInstance('o2rUiBindingExamples');
        var service = {
            findPaper: findPaper
        };

        return service;
        
        

        function findPaper(title, figure){

            var papers = [
                {
                'title': 'Geochronological database and classification system for age uncertainties in Neotropical pollen records',
                'figure': 'Figure 2',
                'lines' : '[{"start":29,"end":285}, {"start":290,"end":1352}, {"start":1357,"end":1372}, {"start":1377,"end":1377}]'
                },
                {
                'title': 'A Bayesian posterior predictive framework for weighting ensemble regional climate models',
                'figure': 'Figure 4',
                'lines' : '[{"start":27,"end":32}, {"start":36,"end":42}, {"start":51,"end":57}, {"start":64,"end":64}, {"start":66,"end":117}, {"start":123,"end":179}, {"start":192,"end":195}]'
                },
                {
                'title': 'A question driven socio-hydrological modeling process',
                'figure': 'Figure 6',
                'lines': '[{"start":28,"end":34}, {"start":36,"end":144}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 1',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":118,"end":143}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 2',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":63}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":101,"end":112}, {"start":118,"end":119}, {"start":2447,"end":2447}, {"start":2618,"end":2638}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 3',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":2007,"end":2168}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1394,"end":1394}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2351,"end":2377}, {"start":2554,"end":2559}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 4',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":827}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 5',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":509}, {"start":805,"end":812}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1480,"end":1492}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 6',
                'lines': '[{"start":24,"end":27}, {"start":46,"end":47}, {"start":60,"end":63}, {"start":98,"end":112}, {"start":711,"end":711}, {"start":805,"end":812}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2328,"end":2344}]'
                },/*Figure 8a
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 8',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2675,"end":2686}]'
                },*/                        
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 8',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2687,"end":2698}]'
                },
                /*Figure9a{
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 9',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2792}]'
                }Figure9b*/{
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 9',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2774}, {"start":2799,"end":2823}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2701,"end":2712}]'
                },/*Figure 10b
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2713,"end":2724}]'
                },/*Figure 10c
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2725,"end":2736}]'
                },*/
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
    '                    figure': 'Figure 11',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":2450,"end":2450}, {"start":2499,"end":2547}]'
                },
                {
                'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                'figure': 'Figure 3',
                'lines': '[{"start":40,"end":46}, {"start":57,"end":57}, {"start":78,"end":80}, {"start":1056,"end":1080}, {"start":1148,"end":1150}, {"start":1086,"end":1086}, {"start":1160,"end":1160}, {"start":1162,"end":1163}, {"start":1186,"end":1223}]'
                },
                {
                'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                'figure': 'Figure 9',
                'lines': '[{"start":58,"end":73}, {"start":94,"end":278}, {"start":347,"end":348}, {"start":350,"end":352}, {"start":361,"end":361}, {"start":363,"end":364}, {"start":367,"end":367}]'
                },
                {
                'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                'figure': 'Figure 10',
                'lines': '[{"start":58,"end":73}, {"start":94,"end":352}, {"start":370,"end":370}, {"start":372,"end":372}, {"start":379,"end":381}]'
                },
                {
                'title': 'Development of a new gas-flaring emission dataset for southern West Africa',
                'figure': 'Figure 2',
                'lines': '[{"start":23,"end":45}, {"start":52,"end":89}, {"start":94,"end":109}]'
                },
                {
                'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                'figure': 'Figure 1',
                'lines': '[{"start":39,"end":39}, {"start":49,"end":72}]'
                },
                {
                'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                'figure': 'Figure 2',
                'lines': '[{"start":39,"end":45}, {"start":79,"end":111}]'
                },
                {
                'title': 'INSYDE: a synthetic, probabilistic flood damage model based on explicit cost analysis',
                'figure': 'Figure 2',
                'lines': '[{"start":28,"end":28}, {"start":36,"end":336}, {"start":341,"end":367}, {"start":371,"end":422}]'
                },
                {
                'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                'figure': 'Figure 2',
                'lines': '[{"start":31,"end":31}, {"start":42,"end":85}]'
                },
                {
                'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                'figure': 'Figure 3',
                'lines': '[{"start":31,"end":31}, {"start":99,"end":146}]'
                },
                {
                'title': 'Technical note: Estimating unbiased transfer-function performances in spatially structured environments',
                'figure': 'Figure 4',
                'lines': '[{"start":20,"end":26}, {"start":37,"end":80}]'
                },
                {
                'title': 'Technical note: Fourier approach for estimating the thermal attributes of streams',
                'figure': 'Figure 2',
                'lines': '[{"start":48,"end":59}, {"start":75,"end":77}, {"start":81,"end":111}]'
                },
                {
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 1',
                'lines': '[{"start":32,"end":33}, {"start":39,"end":40}, {"start":55,"end":55}, {"start":101,"end":121}]'
                },
                {
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 3',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":386,"end":408}, {"start":417,"end":417}]'
                },
                {
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":386,"end":408}, {"start":420,"end":434}, {"start":467,"end":491}]'
                },
                {
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 5',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":55,"end":55}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":420,"end":434}, {"start":497,"end":512}]'
                }
            ];

            for(let i=0; i<papers.length;i++){
                if(papers[i].title==title && papers[i].figure==figure){
                    return JSON.parse(papers[i].lines);
                }
            }  
        }
    }
})();
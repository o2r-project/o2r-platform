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
                {//
                'title': 'Geochronological database and classification system for age uncertainties in Neotropical pollen records',
                'figure': 'Figure 2',
                'lines' : '[{"start":29,"end":1350}, {"start":1355,"end":1369}, {"start":1375,"end":1375}]'
                },
                {
                'title': 'Geochronological database and classification system for age uncertainties in Neotropical pollen records',
                'figure': 'All',
                'lines' : '[{"start":29,"end":1350}, {"start":1355,"end":1369}, {"start":1375,"end":1378}]'
                },
                {//
                'title': 'A Bayesian posterior predictive framework for weighting ensemble regional climate models',
                'figure': 'Figure 3',
                'lines' : '[{"start":27,"end":32}, {"start":36,"end":39}, {"start":41,"end":42}, {"start":51,"end":57}, {"start":64,"end":78}, {"start":81,"end":96}, {"start":99,"end":117}, {"start":123,"end":179}, {"start":192,"end":195}]'
                },
                {//
                'title': 'A Bayesian posterior predictive framework for weighting ensemble regional climate models',
                'figure': 'Figure 6',
                'lines' : '[{"start":27,"end":32}, {"start":36,"end":39}, {"start":41,"end":42}, {"start":51,"end":78}, {"start":81,"end":96}, {"start":99,"end":124}, {"start":195,"end":225}, {"start":228,"end":237}, {"start":247,"end":247}, {"start":283,"end":283}, {"start":286,"end":295}, {"start":301,"end":348}, {"start":350,"end":354}, {"start":356,"end":358}]'
                },
                {
                'title': 'A Bayesian posterior predictive framework for weighting ensemble regional climate models',
                'figure': 'All',
                'lines' : '[{"start":27,"end":32}, {"start":36,"end":42}, {"start":51,"end":247}, {"start":251,"end":275}, {"start":283,"end":358}]'
                },
                {//
                'title': 'A question driven socio-hydrological modeling process',
                'figure': 'Figure 6',
                'lines': '[{"start":28,"end":53}, {"start":59,"end":144}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 1',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":36}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":70,"end":77}, {"start":81,"end":84}, {"start":86,"end":93}, {"start":98,"end":112}, {"start":118,"end":143}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 2a',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":63}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":2447,"end":2447}, {"start":2618,"end":2622}, {"start":2625,"end":2638}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 2b',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":63}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":2447,"end":2447}, {"start":2618,"end":2622},{"start":2645,"end":2666}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 3a',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":2007,"end":2168}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1394,"end":1394}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2351,"end":2377}, {"start":2554,"end":2559}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 3b',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":82,"end":82}, {"start":98,"end":112}, {"start":2447,"end":2447}, {"start":2477,"end":2492}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 4',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":827}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 5',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":509}, {"start":805,"end":812}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1480,"end":1492}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 6',
                'lines': '[{"start":24,"end":27}, {"start":46,"end":47}, {"start":60,"end":63}, {"start":98,"end":112}, {"start":711,"end":711}, {"start":805,"end":812}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2328,"end":2344}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 8a',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2675,"end":2686}]'
                },                        
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 8b',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2687,"end":2698}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 9a',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2792}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 9b',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2799,"end":2823}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10a',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2701,"end":2712}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10b',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2713,"end":2724}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 10c',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":69}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2618}, {"start":2725,"end":2736}]'
                },
                {//
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'Figure 11',
                'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":2450,"end":2450}, {"start":2499,"end":2547}]'
                },
                {
                'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                'figure': 'All',
                'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":118,"end":143}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":827}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1480,"end":1492}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2291,"end":2303}, {"start":2310,"end":2321}, {"start":2328,"end":2344}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2467}, {"start":2474,"end":2492}, {"start":2499,"end":2547}, {"start":2554,"end":2561}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2610}, {"start":2617,"end":2638}, {"start":2645,"end":2668}, {"start":2675,"end":2736}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2792}, {"start":2799,"end":2825}]'
                },
                {//
                'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                'figure': 'Figure 3a',
                'lines': '[{"start":40,"end":46}, {"start":1056,"end":1080}, {"start":1086,"end":1086}, {"start":1149,"end":1149}, {"start":1160,"end":1163}, {"start":1186,"end":1186}, {"start":1190,"end":1201}]'
                },
                {//
                'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                'figure': 'Figure 3b',
                'lines': '[{"start":40,"end":46}, {"start":1056,"end":1080}, {"start":1086,"end":1086}, {"start":1149,"end":1149}, {"start":1160,"end":1163}, {"start":1187,"end":1187}, {"start":1203,"end":1214}]'
                },
                {//
                'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                'figure': 'Figure 3c',
                'lines': '[{"start":40,"end":46}, {"start":1056,"end":1080}, {"start":1086,"end":1086}, {"start":1149,"end":1149}, {"start":1160,"end":1163}, {"start":1187,"end":1187}, {"start":1215,"end":1223}]'
                }, 
                {
                'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                'figure': 'All',
                'lines': '[{"start":39,"end":80}, {"start":112,"end":1036}, {"start":1047,"end":1080}, {"start":1084,"end":1150}, {"start":1160,"end":1176}, {"start":1186,"end":1223}, {"start":1235,"end":1272}, {"start":1282,"end":1313}, {"start":1331,"end":1355}, {"start":1365,"end":1394}, {"start":1402,"end":1411}, {"start":1420,"end":1445}, {"start":1452,"end":1466}]'
                },
                {//
                'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                'figure': 'Figure 9a',
                'lines': '[{"start":58,"end":73}, {"start":94,"end":122}, {"start":126,"end":149}, {"start":158,"end":162}, {"start":169,"end":189}, {"start":201,"end":204}, {"start":208,"end":208}, {"start":212,"end":228}, {"start":236,"end":238}, {"start":249,"end":252}, {"start":255,"end":257}, {"start":263,"end":266}, {"start":271,"end":278}, {"start":347,"end":348}, {"start":361,"end":361}, {"start":363,"end":364}, {"start":367,"end":367}]'
                },
                {//
                'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                'figure': 'Figure 9b',
                'lines': '[{"start":58,"end":73}, {"start":94,"end":122}, {"start":126,"end":149}, {"start":158,"end":162}, {"start":169,"end":189}, {"start":201,"end":204}, {"start":208,"end":208}, {"start":212,"end":228}, {"start":236,"end":238}, {"start":249,"end":252}, {"start":255,"end":257}, {"start":263,"end":266}, {"start":271,"end":278}, {"start":347,"end":348}, {"start":360,"end":360}, {"start":362,"end":362}, {"start":364,"end":365}]'
                },
                {
                'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                'figure': 'All',
                'lines': '[{"start":58,"end":77}, {"start":94,"end":352}, {"start":360,"end":392}]'
                },
                {//
                'title': 'Development of a new gas-flaring emission dataset for southern West Africa',
                'figure': 'Figure 2',
                'lines': '[{"start":23,"end":26}, {"start":44,"end":45}, {"start":54,"end":55}, {"start":94,"end":109}]'
                },
                {
                'title': 'Development of a new gas-flaring emission dataset for southern West Africa',
                'figure': 'All',
                'lines': '[{"start":23,"end":45}, {"start":52,"end":89}, {"start":94,"end":114}]'
                },
                {//
                'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                'figure': 'Figure 1a',
                'lines': '[{"start":39,"end":39}, {"start":49,"end":72}]'
                },
                {//
                'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                'figure': 'Figure 1b',
                'lines': '[{"start":39,"end":45}, {"start":79,"end":111}]'
                },
                {
                'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                'figure': 'All',
                'lines': '[{"start":39,"end":111}]'
                },
                {//Demoversion
                'title': 'INSYDE: a synthetic, probabilistic flood damage model based on explicit cost analysis',
                'figure': 'Figure 3',
                'lines': '[{"start":45,"end":53}, {"start":59,"end":87}, {"start":93,"end":98}, {"start":103,"end":131}, {"start":139,"end":154}]'
                },
                {//
                'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                'figure': 'Figure 2a',
                'lines': '[{"start":31,"end":31}, {"start":42,"end":85}]'
                },
                {//
                'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                'figure': 'Figure 2b',
                'lines': '[{"start":31,"end":31}, {"start":99,"end":146}]'
                },
                {
                'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                'figure': 'All',
                'lines': '[{"start":31,"end":85}, {"start":99,"end":146}]'
                },
                {//
                'title': 'Technical note: Estimating unbiased transfer-function performances in spatially structured environments',
                'figure': 'Figure 4',
                'lines': '[{"start":20,"end":26}, {"start":64,"end":78}, {"start":80,"end":80}]'
                },
                {//
                'title': 'Technical note: Estimating unbiased transfer-function performances in spatially structured environments',
                'figure': 'Figure 5',
                'lines': '[{"start":20,"end":26}, {"start":37,"end":39}, {"start":64,"end":71}, {"start":85,"end":87}, {"start":93,"end":125}, {"start":128,"end":143}, {"start":153,"end":160}]'
                },
                {
                'title': 'Technical note: Estimating unbiased transfer-function performances in spatially structured environments',
                'figure': 'All',
                'lines': '[{"start":20,"end":26}, {"start":37,"end":80}, {"start":85,"end":88}, {"start":93,"end":145}, {"start":153,"end":160}]'
                },
                {//
                'title': 'Technical note: Fourier approach for estimating the thermal attributes of streams',
                'figure': 'Figure 2a',
                'lines': '[{"start":48,"end":58}, {"start":75,"end":86}, {"start":92,"end":92}, {"start":97,"end":97}, {"start":109,"end":109}]'
                },
                {//
                'title': 'Technical note: Fourier approach for estimating the thermal attributes of streams',
                'figure': 'Figure 2b',
                'lines': '[{"start":48,"end":58}, {"start":75,"end":75}, {"start":81,"end":83}, {"start":87,"end":88}, {"start":93,"end":93}, {"start":98,"end":98}, {"start":110,"end":110}]'
                },
                {//
                'title': 'Technical note: Fourier approach for estimating the thermal attributes of streams',
                'figure': 'All',
                'lines': '[{"start":48,"end":117}, {"start":148,"end":229}]'
                },    
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 1',
                'lines': '[{"start":32,"end":39}, {"start":101,"end":121}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 2',
                'lines': '[{"start":32,"end":40}, {"start":48,"end":53}, {"start":101,"end":112}, {"start":149,"end":237}, {"start":242,"end":339}, {"start":346,"end":377}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 3',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":386,"end":408}, {"start":417,"end":417}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4a',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":420,"end":420}, {"start":424,"end":424}, {"start":428,"end":428}, {"start":468,"end":470}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4b',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":420,"end":424}, {"start":432,"end":432}, {"start":472,"end":474}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4c',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":421,"end":421}, {"start":425,"end":425}, {"start":429,"end":429}, {"start":476,"end":478}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4d',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":421,"end":421}, {"start":425,"end":425}, {"start":433,"end":433}, {"start":480,"end":482}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4e',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":422,"end":422}, {"start":426,"end":426}, {"start":430,"end":430}, {"start":484,"end":486}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 4f',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":422,"end":422}, {"start":426,"end":426}, {"start":434,"end":434}, {"start":488,"end":490}]'
                },
                {//
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'Figure 5',
                'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":55,"end":55}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":420,"end":434}, {"start":497,"end":512}]'
                },
                {
                'title': 'Interactions among temperature moisture and oxygen conventrations',
                'figure': 'All',
                'lines': '[{"start":32,"end":40}, {"start":48,"end":96}, {"start":101,"end":121}, {"start":126,"end":141}, {"start":149,"end":237}, {"start":242,"end":339}, {"start":346,"end":378}, {"start":386,"end":410}, {"start":417,"end":434}, {"start":438,"end":457}, {"start":462,"end":491}, {"start":497,"end":512}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 1',
                'lines': '[{"start":22,"end":22}, {"start":283,"end":283}, {"start":299,"end":299}, {"start":309,"end":313}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 2a',
                'lines': '[{"start":20,"end":20},{"start":22,"end":22}, {"start":283,"end":283}, {"start":299,"end":299}, {"start":304,"end":308}, {"start":317,"end":326}, {"start":340,"end":342}, {"start":350,"end":350}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 2b',
                'lines': '[{"start":22,"end":22}, {"start":283,"end":284}, {"start":299,"end":299}, {"start":304,"end":304}, {"start":307,"end":308}, {"start":317,"end":326}, {"start":340,"end":348}, {"start":352,"end":352}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 3',
                'lines': '[{"start":20,"end":20}, {"start":22,"end":22}, {"start":283,"end":284}, {"start":299,"end":299}, {"start":304,"end":308}, {"start":317,"end":326}, {"start":340,"end":346}, {"start":355,"end":355}, {"start":357,"end":358}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 4a',
                'lines': '[{"start":20,"end":20}, {"start":22,"end":22}, {"start":283,"end":284}, {"start":299,"end":299}, {"start":304,"end":308}, {"start":317,"end":326}, {"start":340,"end":342}, {"start":355,"end":355}, {"start":361,"end":363}, {"start":367,"end":368}]'
                },
                {//
                'title': 'Tidy Data',
                'figure': 'Figure 4b',
                'lines': '[{"start":20,"end":20}, {"start":22,"end":22}, {"start":283,"end":284}, {"start":299,"end":299}, {"start":304,"end":308}, {"start":317,"end":326}, {"start":340,"end":342}, {"start":355,"end":355}, {"start":361,"end":370}]'
                },                
                {
                'title': 'Tidy Data',
                'figure': 'All',
                'lines': '[{"start":18,"end":371}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 8',
                'lines': '[{"start":20,"end":23}, {"start":43,"end":46}, {"start":58,"end":58}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 9',
                'lines': '[{"start":20,"end":23}, {"start":43,"end":46}, {"start":51,"end":52}, {"start":59,"end":59}, {"start":80,"end":91}, {"start":103,"end":105}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 13a',
                'lines': '[{"start":20,"end":23}, {"start":165,"end":166}, {"start":177,"end":177}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 13b',
                'lines': '[{"start":20,"end":23}, {"start":165,"end":165}, {"start":167,"end":178}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 14a',
                'lines': '[{"start":20,"end":23}, {"start":165,"end":169}, {"start":183,"end":185}, {"start":196,"end":196}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 14b',
                'lines': '[{"start":20,"end":23}, {"start":165,"end":165}, {"start":167,"end":169}, {"start":183,"end":185}, {"start":197,"end":197}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 17a',
                'lines': '[{"start":19,"end":25}, {"start":165,"end":165}, {"start":167,"end":169}, {"start":183,"end":183}, {"start":202,"end":203}, {"start":209,"end":211}, {"start":223,"end":223}, {"start":225,"end":229}, {"start":273,"end":273}, {"start":275,"end":287}]'
                },
                {//
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'Figure 17b',
                'lines': '[{"start":19,"end":25}, {"start":165,"end":165}, {"start":167,"end":169}, {"start":183,"end":183}, {"start":202,"end":203}, {"start":209,"end":211}, {"start":223,"end":223}, {"start":225,"end":229}, {"start":273,"end":273}, {"start":275,"end":281}, {"start":288,"end":289}]'
                },
                {
                'title': 'The Split-Apply-Combine Strategy for Data Analysis',
                'figure': 'All',
                'lines': '[{"start":19,"end":289}]'
                },
                {//
                'title': 'Dates and Times Made Easy with lubridate',
                'figure': 'Figure 4',
                'lines': '[{"start":22,"end":22}, {"start":144,"end":144}, {"start":147,"end":147}, {"start":150,"end":152}, {"start":154,"end":154}, {"start":156,"end":161}]'
                },
                {//
                'title': 'Dates and Times Made Easy with lubridate',
                'figure': 'Figure 5',
                'lines': '[{"start":22,"end":22}, {"start":144,"end":144}, {"start":147,"end":147}, {"start":150,"end":152}, {"start":154,"end":154}, {"start":156,"end":156}, {"start":162,"end":168}]'
                },
                {
                'title': 'Dates and Times Made Easy with lubridate',
                'figure': 'All',
                'lines': '[{"start":22,"end":168}]'
                },
                {//
                'title': 'Conducting Meta-Analyses in R with the metafor Package',
                'figure': 'Figure 6a',
                'lines': '[{"start":24,"end":25}, {"start":31,"end":32}, {"start":37,"end":41}, {"start":107,"end":109}, {"start":183,"end":184}]'
                },
                {//
                'title': 'Conducting Meta-Analyses in R with the metafor Package',
                'figure': 'Figure 6b',
                'lines': '[{"start":24,"end":25}, {"start":31,"end":32}, {"start":37,"end":41}, {"start":107,"end":109}, {"start":185,"end":186}]'
                },
                {//
                'title': 'Conducting Meta-Analyses in R with the metafor Package',
                'figure': 'Figure 8',
                'lines': '[{"start":24,"end":25}, {"start":31,"end":32}, {"start":37,"end":41}, {"start":107,"end":109}, {"start":205,"end":206}, {"start":208,"end":208}]'
                },
                {//
                'title': 'Conducting Meta-Analyses in R with the metafor Package',
                'figure': 'Figure 10',
                'lines': '[{"start":24,"end":25}, {"start":31,"end":32}, {"start":37,"end":41}, {"start":107,"end":109}, {"start":230,"end":231}, {"start":234,"end":242}]'
                },
                {
                'title': 'Conducting Meta-Analyses in R with the metafor Package',
                'figure': 'All',
                'lines': '[{"start":18,"end":256}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 1a',
                'lines': '[{"start":23,"end":28}, {"start":35,"end":35}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 1b',
                'lines': '[{"start":23,"end":27}, {"start":29,"end":29}, {"start":36,"end":36}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 1c',
                'lines': '[{"start":23,"end":27}, {"start":30,"end":30}, {"start":37,"end":37}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 1d',
                'lines': '[{"start":23,"end":27}, {"start":31,"end":31}, {"start":38,"end":38}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 2a',
                'lines': '[{"start":23,"end":24}, {"start":61,"end":62}, {"start":76,"end":76}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 2c',
                'lines': '[{"start":23,"end":24}, {"start":64,"end":64}, {"start":78,"end":78}]'
                },
                {//
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'Figure 2d',
                'lines': '[{"start":23,"end":24}, {"start":65,"end":65}, {"start":79,"end":79}]'
                },
                {
                'title': 'Automatic Time Series Forecasting: The forecast Package for R',
                'figure': 'All',
                'lines': '[{"start":19,"end":83}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 5',
                'lines': '[{"start":30,"end":46}, {"start":71,"end":71}, {"start":187,"end":187}, {"start":195,"end":196}, {"start":203,"end":203}, {"start":334,"end":344}, {"start":352,"end":359}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 6',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":399,"end":405}, {"start":437,"end":447}, {"start":454,"end":463}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 8',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":556,"end":560}, {"start":574,"end":583}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 9',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":590,"end":590}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 10',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":597,"end":597}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 11',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":366,"end":366}, {"start":517,"end":536}, {"start":556,"end":556}, {"start":574,"end":574}, {"start":604,"end":622}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 12',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":366,"end":366}, {"start":517,"end":536}, {"start":556,"end":556}, {"start":574,"end":574}, {"start":604,"end":616}, {"start":638,"end":638}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 13',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":366,"end":366}, {"start":517,"end":536}, {"start":556,"end":556}, {"start":574,"end":574}, {"start":604,"end":616}, {"start":645,"end":655}]'
                },
                {//
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'Figure 14',
                'lines': '[{"start":46,"end":46}, {"start":71,"end":71}, {"start":308,"end":313}, {"start":320,"end":320}, {"start":366,"end":366}, {"start":517,"end":536}, {"start":556,"end":556}, {"start":574,"end":574}, {"start":604,"end":616}, {"start":645,"end":647}, {"start":662,"end":669}]'
                },
                {
                'title': 'mice: Multivariate Imputation by Chained Equations in R',
                'figure': 'All',
                'lines': '[{"start":30,"end":829}]'
                },
                {
                'title': 'Support Vector Machines in R',
                'figure': 'Figure 1',
                'lines': '[{"start":25,"end":25}, {"start":43,"end":46}]'
                },
                {
                'title': 'Support Vector Machines in R',
                'figure': 'Figure 2',
                'lines': '[{"start":25,"end":25}, {"start":48,"end":49}, {"start":54,"end":54}]'
                },
                {
                'title': 'Support Vector Machines in R',
                'figure': 'All',
                'lines': '[{"start":22,"end":58}]'
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
# Search View

The searchView contains logic and visualisations for spatio-temporal searches. See a list of all search parameters below.

## List of Search Parameters

  - `Keyword Search` - search for a keyword within all data of an ERC
  - `Library Search` - search for library names exclusively
  - `Spatial Search` - search for ERC that are within a spatial extend
  - `Temporal Search` - search for ERC that were created in a specific time range

All search parameters can be combined. Only keyword and library search are exclusive. However, when doing a keyword search, also the libraries will be parsed.


## Retrieving Search Results

The ui-router uses url queries to perform a search when the page is loaded and injects the results into the controller before the controller is loaded. The results are accessible in `search.controller.js` as `searchAll` and `searchResults`, where the former contains all ERC and the latter contains only the results of a parameter based search.

## URL Queries

The ui-router takes url queries to perform a search when the page is loaded and injects the results into the controller before the controller is loaded. To perform a search with new queries the page must be reloaded with the changed parameter values as queries. This will be done with the `callingsearch()` function in `search.controller.js`.

Following query names are used so far:

  - `q` - keyword for keyword or library search
  - `coords` - coordinates of spatial search
  - `from` - starting date of time range
  - `to` - end date of time range
  - `start` - starting index of results (for pagination)
  - `size` - number of returned results (for pagination)
  - `libraries` - boolean, if true library search will be used instead of keyword search

## Adding Search Parameters

Search parameters can be added. This can be done in three steps:

  1. Integrate inputs in the view
  2. Update `prepareQuery()`
  3. Send new Parameters to `prepareQuery()`

### Integrate inputs in the view

Inputs for the new parameter need to be integrated into the view and bind to `search.controller.js`.

### Update `prepareQuery()`

 `search.factory.js` contains two functions: `prepareQuery()` and `search()`, where the latter takes all parameter values and puts them into an elasticSearch readable structure, and the former calls the http-request to the search endpoint. In order to add a parameter, `prepareQuery()` needs to be extended with the new parameter. More information can be found in the [elasticSearch API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html).

### Sending new Parameters to `prepareQuery()`

To send a new parameter to `prepareQuery()`, the function `callingsearch()` within the `search.controller.js` needs to be updated.
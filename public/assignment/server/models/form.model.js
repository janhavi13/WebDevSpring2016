var mock = require("./user.mock.json");

module.exports= function(){

    var api = {
        findFormByTitle: findFormByTitle

    }
    return api;

    function findFormByTitle(title) {
        for(var u in mock) {
            if( mock[u].title === title) {
                return mock[u];
            }
        }
        return null;
    }


}



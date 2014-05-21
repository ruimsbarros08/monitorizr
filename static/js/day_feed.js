'use strict';

app.factory("day_feed", function($q, $http){
                        var deferred = $q.defer();
                        var url = BASE_URL + "/emoncms/feed/data.json?&id="+feedId_dayly_energy+"&start="+start+"&end="+end+"&dp=500&apikey="+apiKey;
                        $http.get(url).success(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    });

app.controller('mainCtrl', function ($scope, $route) {
    //All data from routes (norms, profiles and steels)
    $scope.data = $route.current.locals.getProfiles.data;

    //Profiles to be displayed in first place
    $scope.profiles_showed = $scope.data.Profiles.HE;

    //Preventing blank option
    $scope.norm = $scope.data.SectionTypes[0];
    $scope.profile = $scope.profiles_showed[0];
    $scope.steel = $scope.data.SteelGrades[0];

    //Norm change
    $scope.change_profile = function (type) {
        if (type=='HE'){
            $scope.profiles_showed = $scope.data.Profiles.HE;
        }
        else if (type=='IPE'){
            $scope.profiles_showed = $scope.data.Profiles.IPE;    
        }
        else if (type=='UC'){
            $scope.profiles_showed = $scope.data.Profiles.UC;    
        }
        else if (type=='UB'){
            $scope.profiles_showed = $scope.data.Profiles.UB;    
        }
        else if (type=='W'){
            $scope.profiles_showed = $scope.data.Profiles.W;    
        }
    };

    //Set the URL for the AJAX request on a change event
    $scope.set_URL = function (profile, steel) {
        var fy = parseInt(steel.slice(2,5));
        var URL_request = BASE_URL+"/api/sections/commercial/"+profile+"?fy="+fy;
        //console.log(URL_request);
    }
});
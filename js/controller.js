//app.controller('loginController', ['$scope', 'Data', '$localStorage', '$location', '$state','checkUserLoginStatus', function($scope, Data, $localStorage, $location, $state,checkUserLoginStatus){
app.controller('loginController', ['$scope', 'Data', '$localStorage', '$location', '$state', function($scope, Data, $localStorage, $location, $state){
     
      
      // $scope.viewid = checkUserLoginStatus.data.userid;
      // console.log('checkUserLoginStatus');
      // console.log(checkUserLoginStatus);

      //if($scope.viewid == 0){

        $scope.submitLogin = function(form){
            var username = $scope.employee.email;
            var password = $scope.employee.password;
            $scope.dataLoading = true;

            Data.User(username, password)
            .success(function(response){
              $scope.user_data = response.datasets;
              
              $scope.userId = response.datasets[0]['id'];
              $localStorage.storeid = $scope.userId;
              
              $location.path('/view/');
            }).error(function(response){
              alert("Error in First Call"+response);
              $scope.dataLoading = false;
            });


            // Data.User(username, password)
            //   .success(function (response){
            //     $scope.user_data = response.datasets;
            //     console.log('inside');
            //     //$scope.loggedin =true;
            //     //console.log(response.datasets[0]['id']);
            //     $scope.userId = response.datasets[0]['userid'];
            //     $localStorage.storeid = $scope.userId;
            //     $location.path('/view');
            //     //$state.go('.home');
                
            //     console.log("user id  = "+$scope.userId);

            //   })
            //   .error(function(response){
            //     alert("Error in First Call")             
            //   }); 

            //console.log($scope.loggedin);  
          }   
    // }else{

    //   $localStorage.storeid = $scope.viewid;
    //   $location.path('/view');
    // }

}]);

app.controller('logoutController',['$scope', 'Data', '$localStorage', '$location',function($scope,Data,$localStorage,$location){

  //$scope.logoutId = checkUserLogout.data.logout;
  //location.path('/');

}])

app.controller('mainController', ['$scope', 'userdetails', '$localStorage', '$location', '$stateParams', '$state', function($scope, userdetails, $localStorage, $location, $stateParams, $state){
  
  
        $scope.userdetail = userdetails.data.datasets;     
        var range = $scope.userdetail.length;
        
        $scope.name = $scope.userdetail[0].name;
        $scope.id = $scope.userdetail[0].id;
      
        $scope.matchpermission = [];   
        for(var i = 0; i< range; i++){
         
          var abc = $scope.userdetail[i].permissions;
          
          $scope.matchpermission.push(abc);
        } 

}]);


app.controller('bulkCtrl', ['$scope', 'Data', function($scope, Data){

  $scope.itemorderrequest = [];

  Data.BulkOrder()
  .success(function(response){
    $scope.bulkorder = response.datasets;
    //console.log($scope.bulkorder[0]);
  }).error(function(response){
    console.log("Bulk order error");
  });


  Data.CallBackRequest()
  .success(function(response){
    $scope.callbackrequest = response.datasets;
    //console.log($scope.callbackrequest[0]);
  }).error(function(response){
    console.log("Call back request error");
  });

  Data.DesignerRequest()
  .success(function(response){
    $scope.designerrequest = response.datasets;
  }).error(function(response){
    console.log("Designer request error");
  });


  Data.ItemRequest()
  .success(function(response){
    $scope.itemrequest = response.datasets;
  }).error(function(response){
    console.log("Item Request error");
  });

  Data.PackageRequest()
  .success(function(response){
    $scope.packagerequest = response.datasets;
  }).error(function(response){
    console.log("Package request error");
  });

  Data.ItemOrderRequest()
  .success(function(response){
    $scope.itemorderrequest1 = response.datasets;

    angular.forEach($scope.itemorderrequest1, function(value, key) {
        $scope.itemorderrequest.push({
            index: parseInt(key),
            data: value
        });
    });

    
  }).error(function(response){
    console.log("Item Order Details error");
  });

}]);


app.controller('empCtrl', ['$scope', 'allemployees', '$state', '$stateParams', function($scope, allemployees, $state, $stateParams){

  
    $scope.employees = allemployees.data.datasets;
    
    $scope.empid = allemployees.data.datasets[0]['id'];


}]);

app.controller('empmangeCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data){

  $scope.empid = $stateParams.manageid;

  $scope.allpermissionsname = [];

  // get all employees details
  Data.employeesAllManageDetails($scope.empid)
  .success(function(response){
    $scope.employeesmanagedetails = response.datasets;
  }).error(function(response){
    console.log("Error in getting employees manage Details");
  });

  // get all roles of employees
  Data.getallRoles()
  .success(function(response){
    $scope.roles = response.datasets;
    console.log($scope.roles);

  }).error(function(response){
    console.log("Eroor in finding employee roles");
  });

  // get all employees permissions
  Data.employeesAllPermissionsroles($scope.empid)
  .success(function(response){
    $scope.allpermissions = response.datasets;
    
    for(i = 0; i<$scope.allpermissions.length; i++){
      $scope.allpermissionsname.push($scope.allpermissions[i].display_name);
    }

  }).error(function(response){
    console.log("Error in getting all employees permissions roles");
  });


// change employees password
  $scope.submitPassword = function(form){

    var pass = $scope.pw1;
    var conpass = $scope.pw2;
    var checkstat = false;

    if(!pass){
      checkstat = false;
    }else{
      checkstat = true;
    }

    if(checkstat){
    Data.changePassword(pass, $scope.empid)
    .success(function(response){
      $scope.submitmessage = response.datasets;
      $scope.pw1 = '';
      $scope.pw2 = '';
      alert("password changed Successfully!!!");
    }).error(function(response){
      console.log("Error in changing password")
    });
  }else{
    alert("password should not be blanked");
  }

  }

  $scope.roleSubmit = function(form){
    var empid = $scope.empid;
    var rolid = $scope.rolid;
    console.log(empid+" "+rolid);
  }
  

}]);


app.controller('packageCtrl', ['$scope', 'Data', '$state', function($scope, Data, $state){

  Data.adminPackageDetails()
  .success(function(response){
    $scope.allpackages = response.datasets;
  }).error(function(response){
    console.log("All packages error");
  });


      $scope.isPackageHome = function(){
        return $state.is("home.packages");
        }

        $scope.ispackurlcostom = function(){
          return $state.is("home.packages.urlcustomize");
        }

        $scope.ispackagedetails = function(){
          return $state.is("home.packages.packagedetails");
        }


    Data.packageUrlCustomizeSection()
    .success(function(response){
      $scope.packageurlsections = response.datasets;
    }).error(function(response){
      console.log("Error in package Url custom section");
    });

    Data.packageUrlCustomize()
    .success(function(response){
      $scope.packagecustomurls = response.datasets;
    }).error(function(response){
      console.log("Error in package Custom Url");
    });

    Data.packageUrlCustomizeStyle()
    .success(function(response){
      $scope.packageurlstyle = response.datasets
    }).error(function(response){
      console.log("Error in package url custom style");
    });


}]);


app.controller('packagedetailsCtrl', ['$scope', '$stateParams', '$state', 'Data', function($scope, $stateParams, $state, Data){

    $scope.packageid = $stateParams.packageid;


    Data.getallpackgeImages($scope.packageid)
    .success(function(response){
      $scope.allpacakgeimages = response.datasets
    }).error(function(response){
      console.log("Error in getting all package images");
    });


    Data.getpackageDetailsbyId($scope.packageid)
    .success(function(response){
      $scope.packageiddetails = response.datasets;
    }).error(function(response){
      console.log("Error in package url custom style");
    });

    Data.getcivilworkDetails($scope.packageid)
    .success(function(response){
      $scope.civilworks = response.datasets;
    }).error(function(success){
      console.log("Error in getting civil works of pacakges");
    });

    Data.getpackagefurnituresDetails($scope.packageid)
    .success(function(response){
      $scope.furnitures = response.datasets;
    }).error(function(response){
      console.log("Error in getting package furnitures");
    });

    Data.getpackgesImages($scope.packageid)
    .success(function(response){
      $scope.images = response.datasets;
    }).error(function(response){
      console.log("Error in getting packages images");
    });

    Data.getpackgesImagesTags($scope.packageid)
    .success(function(response){
      $scope.imagestags = response.datasets;
    }).error(function(response){
      console.log("Error in getting packages images");
    });

    Data.getAllCategories()
    .success(function(response){
      $scope.categories = response.datasets;
    }).error(function(response){
      console.log("Error in getting all categories");
    });

    Data.getallVendors()
  .success(function(response){
    $scope.vendors = response.datasets;
  }).error(function(response){
    console.log("Error in getting vendors");
  });


}]);


app.controller('packageOrderingCtrl', ['$scope', 'Data', '$state', function($scope, Data, $state){

  Data.packageGoldDetails()
  .success(function(response){
    $scope.goldpackages = response.datasets;
  }).error(function(response){
    console.log("gold package error");
  });

  Data.packagePlatinumDetails()
  .success(function(response){
    $scope.platinumpackages = response.datasets;
  }).error(function(response){
    console.log("platinum package error");
  });

  Data.packageSilverDetails()
  .success(function(response){
    $scope.silverpackages = response.datasets;
  }).error(function(response){
    console.log("silver packages error");
  });


        $scope.isPackageHome = function(){
        return $state.is("home.packageordering");
        }

        $scope.ispackdetails = function(){
          return $state.is("home.packageordering.package");
        }

}]);

app.controller('projectCtrl', ['$scope', 'Data', '$state', '$stateParams', '$localStorage',  function($scope, Data, $state, $stateParams, $localStorage){

  Data.projectAdminDetails()
  .success(function(response){
    $scope.allprojects = response.datasets;
  }).error(function(response){
    console.log("gold package error");
  });


  $scope.createProject = function(form){
    var client_email = $scope.client_email;
    var society = $scope.society;
    var name = $scope.pro_name;
    var contact_person = $scope.contact_person;
    var mobile = $scope.mobile;
    var pin = $scope.pin;
    var address = $scope.address;
    var city = $scope.city;
    var state = $scope.state;
    var user_id = $localStorage.storeid;

    Data.createProjectService(client_email, society, name, contact_person, mobile, pin, address, city, state, user_id)
    .success(function(response){
      $scope.projectcreationsuccess = response.datasets;
      alert("successfully created projects with id "+$scope.projectcreationsuccess);
      $state.go('home.project.details');
    }).error(function(response){
      console.log("Error in project creation");
    });

  }


}]);


app.controller('projectdetailsCtrl', ['$scope', 'Data', '$state', '$stateParams', '$localStorage', function($scope, Data, $state, $stateParams, $localStorage){

  $scope.pidata = [];
  $scope.timelineslist = [];
  $scope.society = '';
  $scope.projectname = '';
  $scope.contact_person = '';
  $scope.mobile = '';
  $scope.address = '';


  $scope.projectid = $stateParams.id;
  $localStorage.proledgerid = $stateParams.id;

  $scope.addProjectTeam = function(form){
    var data = {};
    data.existingEmployee = [];
    data.newEmployees = [];

    data.existingRole = $("#role").find(":selected").val();

    // evt.preventDefault();
    $.each($('.chip'), function(index, chip){
      if($(chip).attr('emp-id') == 0){
        data.newEmployees.push($($(chip).find('span')).text());
      }
      else{
        data.existingEmployee.push($(chip).attr('emp-id'));

      }
    });
    
    Data.postProjectTeam($scope.projectid, $localStorage.storeid, data)
    .success(function(response){
      console.log("Adding project team");
    }).error(function(response){
      console.log("Error in adding project team");
    });
  }


  Data.getprojectDetails($stateParams.id)
  .success(function(response){
    $scope.projectdetails = response.datasets;
    $scope.teams = response.datasets2;

    //console.log($scope.projectdetails[0]['society']);
    $scope.originalData = {
      society: $scope.projectdetails[0]['society'],
      projectname: $scope.projectdetails[0]['name'],
      contact_person: $scope.projectdetails[0]['contact_person'],
      mobile: $scope.projectdetails[0]['mobile'],
      address: $scope.projectdetails[0]['address']
    }
    

    $scope.basic = angular.copy($scope.originalData);
    
  }).error(function(response){
    console.log("Error in getting project details");
  });

  Data.getprojectTimelines($stateParams.id)
  .success(function(response){
    $scope.timelines = response.datasets;


    angular.forEach($scope.timelines[0], function(value, key) {
      $scope.timelineslist.push({
          index: new Date(key),
          data: value
      });
  });
    
  }).error(function(response){
    console.log("Error in getting project timelines");
  });

  Data.projectpidata()
  .success(function(response){
    for(i = 0; i<response.datasets.length; i++){
      $scope.pidata.push(response.datasets[i]['timeline_attachment_id'])
    }

  }).error(function(response){
    console.log("Error in getting pidata")
  });

  Data.getTimelineComment($stateParams.id)
  .success(function(response){
    $scope.timelinecomment = response.datasets;
    
  }).error(function(response){
    console.log("Error in getting timelines comment");
  });

  Data.getProjectStatus($localStorage.storeid, $stateParams.id)
  .success(function(response){
    $scope.project_status = response.datasets;
    
  }).error(function(response){
    console.log("Error in getting projects status");
  });

   $scope.EditBasicInfo = function(){
     
      var id = $stateParams.id;
      var society = $scope.basic.society;
      var projectname = $scope.basic.projectname;
      var contact_person = $scope.basic.contact_person;
      var mobile = $scope.basic.mobile;
      var address = $scope.basic.address;

      Data.updateBasicInfo(id, society, projectname, contact_person, mobile, address)
        .success(function(response){
          $scope.result = response.datasets;
        }).error(function(response){
          console.log("Error in updating basic info");
        });

    }


}]);

app.controller('projectledgerCtrl', ['$scope', 'Data', '$state', '$stateParams', '$localStorage', '$filter', '$http', function($scope, Data, $state, $stateParams, $localStorage, $filter, $http){

  $scope.proid = $localStorage.proledgerid;
  console.log($scope.proid);

  Data.getLedgerClient($scope.proid)
  .success(function(response){
    $scope.clients = response.datasets;
    $scope.installments = response.datasets1;
    $scope.project_payments = response.datasets2;
    $scope.expenses = response.datasets3;
  }).error(function(response){
    console.log("Error in getting ledger clients");
  });



  $scope.ledgerStore = function(form){

    var userid = $localStorage.storeid;
    var payee_name = $scope.payee_name;
    var particulars = $scope.particulars;
    var amount  = $scope.amount;
    var tax_amount = $scope.tax_amount;
    var bank = $scope.bank;
    var check_no = $scope.check_no;
    var concern_person = $scope.concern_person;
    //var date = $scope.date;
    var bill_no = $scope.bill_no;
    var type_of_transaction = $scope.type_of_transaction;
    var mode_of_transaction = $scope.mode_of_transaction;
    var remarks = $scope.remarks;
    var files = $scope.files;
    var jsdate = document.getElementById('pay_date').value;
    $scope.myDate = new Date(jsdate);
    var type = '';
    var path = '';
    console.log(jsdate);

    var file = $scope.myFile;
    alert(file.size);
    console.log(file.size);
    if(file.type == 'application/pdf'){
      path = 'projectfile/'+file.name;
      type = 'PDF';
    }
    if(file.type == 'image/jpeg' || 'image/png' || 'image/gif'){
      path = 'project/'+file.name;
      type = 'IMAGE';
    }
     
  
    Data.ledger_store(userid, $scope.proid, payee_name, particulars, amount, tax_amount, bank, check_no, concern_person, jsdate, bill_no, type_of_transaction, mode_of_transaction, remarks, type, path, file)
    .success(function(response){

    }).error(function(error){
      console.log("Error in storing ledger projects");
    });

  }

  $scope.storeProjectInstallement = function(form){
    var userid = $localStorage.storeid;
    var amount = $scope.amount;
    var due = $scope.due;
    var due_date = document.getElementById('due_date').value;
    var paid_date = document.getElementById('paid_date').value;
    var mot = $scope.mot;
    var tax = $scope.tax;

    alert(mot);
    
    Data.installments_store(userid, $scope.proid, amount, due, due_date, paid_date, mot, tax)
    .success(function(response){
      $state.go($state.current, $state.params, { reload: true });
    }).error(function(response){
      console.log("Error in storing installments");
    });
  }

}]);



app.controller('empRegistrationCtrl', ['$scope', 'Data', '$location', '$state', '$localStorage', function($scope, Data, $location, $state, $localStorage){

//console.log("added_by = "+$localStorage.storeid);

    $scope.submitRegister = function(form){
          var username = $scope.employee.email;
          //var dob = $scope.employee.dob;
          var dob = new Date(document.getElementById('dob').value);
          dob = dob.getFullYear()+"-"+(dob.getMonth()+1)+"-"+dob.getDate()
          var addressline1 = $scope.employee.address_line1;
          var addressline2 = $scope.employee.address_line2;
          var pin = $scope.employee.pin;
          //var joiningdate = new Date($scope.employee.dob);
          var joiningdate = new Date(document.getElementById('doj').value);
          joiningdate = joiningdate.getFullYear()+"-"+(joiningdate.getMonth()+1)+"-"+joiningdate.getDate()
          var alt_email = $scope.employee.alt_email;
          var mobile = $scope.employee.mobile;

          //console.log(username+" "+dob+" "+addressline1+" "+addressline2+" "+pin+" "+joiningdate+" "+alt_email+" "+mobile);

          Data.employeeRegister(username, dob, addressline1, addressline2, pin, joiningdate, alt_email, mobile, $localStorage.storeid)
          .success(function(response){
            $scope.empdetails = response.datasets;

              
             alert("Registered Successfully");

             $location.path('/employeeregistration');
              
          }).error(function(response){
            console.log("Error in employee registration");
            alert("")
          });     
        } 

         $scope.isEmpRegistration = function(){
        return $state.is("home.employeeregistration");
        }

        $scope.isSuccessEmpRegistration = function(){
          return $state.is("home.employeeregistration.success");
        }

}]);


app.controller('panoramaCtrl', ['$scope', 'Data', function($scope, Data){

  Data.panoramaDetails()
  .success(function(response){
    $scope.allpanoramas = response.datasets;
  }).error(function(response){
    console.log("Error in Panorama Images");
  })

}]);


app.controller('compaignCtrl', ['$scope', 'Data', function($scope, Data){

  Data.campaignDetails()
  .success(function(response){
    $scope.allcompaign = response.datasets;
    $scope.campaigns = response.datasets;
    $scope.maillists = response.datasets1;
  }).error(function(response){
    console.log("Error in Campaign Data");
  });

}]);


app.controller('couponCtrl', ['$scope', 'Data', function($scope, Data){

  Data.couponDetails()
  .success(function(response){
    $scope.allCoupons = response.datasets;
  }).error(function(response){
    console.log("Error in Coupons")
  });

}]);


app.controller('manageroleNpermissionsCtrl', ['$scope', 'Data', function($scope, Data){


  Data.getallRoles()
  .success(function(response){
    $scope.roles = response.datasets;

  }).error(function(response){
    console.log("Error in getting role");
  });

  Data.getAllroleNPermissions()
  .success(function(response){
    $scope.rolepermissions = response.datasets;
  }).error(function(response){
    console.log("Errror in getting role permissions");
  });

}]);

app.controller('vendorCtrl', ['$scope', 'Data', function($scope, Data){



  Data.getallVendors()
  .success(function(response){
    $scope.selectvendors = response.datasets;
  }).error(function(response){
    console.log("Error in getting vendors");
  });

  $scope.selectedvendor = null;

  $scope.selectSubmission = function(selectedvendor){
    //alert(selectedvendor);
  }

}]);


app.controller('cashondeliveryCtrl', ['$scope', 'Data', function($scope, Data){

  $scope.allcoderoles = [];

  Data.getallcodusers()
  .success(function(response){
    $scope.allcodusers = response.datasets;
  }).error(function(response){
    console.log("Error in getting all cod users");
  });

  Data.getallcodusersroles()
  .success(function(response){
    $scope.allcodeuserroles = response.datasets;

    for(i = 0; i<$scope.allcodeuserroles.length; i++){
      $scope.allcoderoles.push($scope.allcodeuserroles[i].id);
    }
  }).error(function(response){
    console.log("Error in getting all code users roles");
  });



}]);



app.controller('itemsCtrl', ['$scope', 'Data', '$state', '$stateParams' ,function($scope, Data, $state, $stateParams){


  $scope.isHome = function(){
    return $state.is("home.items");
  }

  $scope.isItem = function(){
    return $state.is("home.items.itemid");
  }

  $scope.allitems = [];

  Data.AllItemSearch()
  .success(function(response){
    //$scope.allitems = response.datasets;
    for(i = 0; i<response.datasets.length; i++){
      $scope.allitems.push(response.datasets[i]);
    }
  }).error(function(response){
    console.log("Error in getting all search items");
  });

  //console.log($scope.allitems);

  var items = $scope.allitems;
  //var items = $('[ng-controller="itemsCtrl"]').allitems;
  

  var suggested_clients = [];
  var specialKeys = [9, 16, 17, 20, 37, 38, 39, 40];
  $scope.search = function($event){
    if($event.keyCode === 13){
        $event.preventDefault(); // Ensure it is only this code that rusn
        var x = document.getElementById("search").value;
        $('.search-result').empty();
        items.forEach(function(items, index){
          if(items.name.toLowerCase().indexOf($('#search').val().toLowerCase()) < 0){
            return;
          }
          markup ='<div style="padding-top:10px" ><div class="col s12 l1">  <b><a ui-sref="home.items.itemid({itemid:'+items["id"]+'})" >' +items.id + '</a></b></div><div class="col s12 l5"><p>' +items.name + '</p></div> </div>';
         $('.search-result').append($(markup));
        });

        items.forEach(function(items, index){
          if(items.url.toLowerCase().indexOf($('#search').val().toLowerCase()) < 0){
            return;
          }
          markup ='<div class="col s12 l1">  <b><a ui-sref=".itemid({itemid: '+items.id+'})">' +items.id + '</a></b></div><div class="col s12 l5"><p>' +items.name + '</p></div>';
         $('.search-result').append($(markup));
        });

    }
  }


}]);

app.controller('itemdetailsCtrl', ['$state', '$scope', function($state, $scope){

  console.log($state.this); 
  
}]);


app.controller('categoriesCtrl', ['$scope', 'Data', function($scope, Data){

  Data.getAllsupersection()
  .success(function(response){
    $scope.supersections = response.datasets;
    //console.log($scope.supersections.sections.subsections.categories);
  }).error(function(response){
    console.log("Error in getting superssections");
  });

  Data.getAllCategories()
  .success(function(response){
    $scope.categories = response.datasets;
  }).error(function(response){
    console.log("Error in getting all categories");
  });

  Data.getAllCoupons()
  .success(function(response){
    $scope.coupons = response.datasets;
  }).error(function(response){
    console.log("Error in getting all coupons");
  });

}]);
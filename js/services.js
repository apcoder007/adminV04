app.service("Data", function($http){
  this.User = function(username, password){
    var sendData={
      'username':username,
      'password':password
    }
    
    return $http({
      method: 'POST',
      data: sendData,
      //url: '/api/getlogin/'
      url:'http://web.cafe-indica-163107.appspot.com/api/getlogin/'
      
    });
  }
//start session handle

// this.isLoggedIn = function(){
//     if($window.localStorage.loggedin){
//       return true;
//     }else{
//       return false;
//     }
//   }

//   this.sessionCreate = function(username,id){

//     var sendData={
//       'username':username,
//       'userid':id
//     }
//     return $http({
//       method: 'POST',
//       data: sendData,
//       url: '/api/rest/session/'
//     });

//   }

//   this.checkUser = function(){
//     return $http({
//       method: 'GET',
//       url: '/api/rest/check/status/'
//     });
//   }



//session handling end
  this.UserDetail = function(id){
    var sendData={
      'id':id
    }
     return $http({
      method: 'POST',
      data:sendData,
      url: 'http://web.cafe-indica-163107.appspot.com/api/getusersdetails/'
    }).success(function(response){
      return response.datasets;
    }).error(function(response){
      console.log("Error in getting user details")
    });
  }

  this.BulkOrder = function(){
    return $http({
      method: 'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getbulkorderdetails'
    });
  }

  this.CallBackRequest = function(){
    return $http({
      method: 'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getcallbackrequestdetails'
    });
  }

  this.DesignerRequest = function(){
    return $http({
      method:'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getdesignerrequestdetails'
    });
  }

  this.ItemRequest = function(){
    return $http({
      method:'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getitemrequestdetails'
    });
  }

  this.AllItemSearch = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getallsearchitems'
    });
  }

  this.updateBasicinfo = function(id, society, projectname, contact_person, mobile, address){
    var sendData = {
      'id':id,
      'society':society,
      'projectname':projectname,
      'contact_person':contact_person,
      'mobile':mobile,
      'address':address
    }
    return $http({
      method:'POST',
      url:'http://web.cafe-indica-163107.appspot.com/api/basic/edit',
      data:sendData
    });
  }

  this.PackageRequest = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackagerequestdetails'
    });
  }

  this.ItemOrderRequest = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getitemorderdetails'
    });
  }

  this.employeeAllRequest = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getemployeesalldetails'
    }).success(function(response){
      return response.datasets;
    }).error(function(response){
      console.log("Error in getting employess details");
    });
  }

  this.employeesAllManageDetails = function(id){
    var sendData={
      'id':id
    }
    return $http({
      method:'POST',
      data: sendData,
      url: 'http://web.cafe-indica-163107.appspot.com/api/getemployeesallmanagedetails'
    })
  }

  this.employeesAllPermissionsroles = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getemployeesallpermissionsroles'
    })
  }

  this.changePassword = function(pass, id){
    var sendData = {
      'pass':pass,
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/change/employeespassword'
    })
  }

  this.employeeRegister = function(username, dob, addressline1, addressline2, pin, joiningdate, alt_email, mobile, added_by){
    
    var sendData={
      'username':username,
      'dob':dob,
      'addressline1':addressline1,
      'addressline2':addressline2,
      'pin':pin,
      'joiningdate':joiningdate,
      'alt_email':alt_email,
      'mobile':mobile,
      'added_by':added_by
    }

    console.log("sendData = "+sendData.username+" "+sendData.dob);

    return $http({
      method:'POST',
      data: sendData,
      url: 'http://web.cafe-indica-163107.appspot.com/api/empregitration'

    });
  }
  
  this.adminPackageDetails = function(){
    return $http({
      method: 'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getadminpackagedetails'
    });
  }

  this.getpackageDetailsbyId = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackagesdetailsbyID'
    })
  }

  this.getcivilworkDetails = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackagescivilworks'
    })
  }

  this.getpackagefurnituresDetails = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackagesfurnitures'
    })
  }

  this.getpackgesImages = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackageimagesbyid'
    });
  }

  this.getallpackgeImages = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getallpackagesimagesbyid'
    });
  }

  this.getpackgesImagesTags = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackageimagestagsbyid'
    });
  }

  this.getprojectDetails = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getallprojectdetails'
    });
  }

  this.getTimelineComment = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/get/all/timeline/comments'
    });
  }

  this.getprojectTimelines = function(id){
    var sendData = {
      'id':id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/getallprojecttimelins'
    });
  }

this.projectpidata = function(){
    return $http({
      method: 'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/get/all/pi/data'
    });
  }

this.getProjectStatus = function(uid, pid){
  var sendData = {
    'uid':uid,
    'pid':pid
  }
  return $http({
    method:'POST',
    data:sendData,
    url:'http://web.cafe-indica-163107.appspot.com/api/getprojectstatus'
  });
}

this.getLedgerClient = function(proid){
  var sendData = {
    'proid': proid
  }
  return $http({
    method:'POST',
    data:sendData,
    url:'http://web.cafe-indica-163107.appspot.com/api/getledgerclient'
  });
}

  this.packageGoldDetails = function(){
    return $http({
      method: 'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getpackagegold'
    });
  }

  this.packagePlatinumDetails = function(){
    return $http({
      method:'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getpackageplatinum'
    });
  }

  this.packageSilverDetails = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackagesilver'
    });
  }

  this.projectAdminDetails = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getallprojects'
    });
  }

  this.createProjectService = function(client_email,society,name,contact_person,mobile,pin,address,city,state,user_id){
    var sendData = {
      'client_email':client_email,
      'society':society,
      'name':name,
      'contact_person':contact_person,
      'mobile':mobile,
      'pin':pin,
      'address':address,
      'city':city,
      'state':state,
      'user_id':user_id
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/creteproject'
    });
  }

  this.ledger_update = function(userid, proid, payee_name, particulars, amount, tax_amount, bank, check_no, concern_person, date, bill_no, type_of_transaction, mode_of_transaction, remarks){    
    var sendData = {
      'userid':userid,
      'proid':proid,
      'payee_name':payee_name,
      'particulars':particulars,
      'amount':amount,
      'tax_amount':tax_amount,
      'bank':bank,
      'check_no':check_no,
      'concern_person':concern_person,
      'date':date,
      'bill_no':bill_no,
      'type_of_transaction':type_of_transaction,
      'mode_of_transaction':mode_of_transaction,
      'remarks':remarks
    }
    return $http({
      method:'POST',
      data:sendData,
      url:'http://web.cafe-indica-163107.appspot.com/api/update/ledgers'
    });
  }

  this.panoramaDetails = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getallpanorama'
    });
  }


  this.campaignDetails = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getcampaign'
    });
  }

  this.couponDetails = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getallcoupon'
    });
  }

  this.packageUrlCustomizeSection = function(){
    return $http({
      method:'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getpackagesectionurlcustom'
    });
  }

  this.packageUrlCustomize = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getpackageurlcustom'
    });
  }

  this.packageUrlCustomizeStyle = function(){
    return $http({
      method:'GET',
      url: 'http://web.cafe-indica-163107.appspot.com/api/getpackagestyleurlcustom'
    });
  }

  this.getallRoles = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allemployerroles'
    });
  }


  this.getAllroleNPermissions = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allroleNpermissions'
    });
  }

  this.getallVendors = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getselectvendor'
    });
  }

  this.getallcodusers = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allcodusers'
    });
  }

  this.getallcodusersroles = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allcodroles'
    });
  }

  this.getAllsupersection = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/getall/sections/categories/'
    });
  }

  this.getAllCategories = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allcategories'
    });
  }

  this.getAllCoupons = function(){
    return $http({
      method:'GET',
      url:'http://web.cafe-indica-163107.appspot.com/api/allcoupons'
    });
  }

});








//////////////////////////////////////////////share Data Services//////////////////////////////
app.service('shareDataService', function() {
    var myList = [];

    this.addList = function(newObj) {
        myList.push(newObj);
    }

    this.getList = function(){
        return myList;
    }

    
});

app.service('dataservice',function($http){
      return {
          getAvengers: getAvengers,
          doLogoutProcess: doLogoutProcess
      };

      function getAvengers() {
          return $http.get('/api/rest/check/status/')
              .then(getAvengersComplete)
              .catch(getAvengersFailed);

          function getAvengersComplete(response) {
              return response;
          }

          function getAvengersFailed(error) {
              console.log('XHR Failed for getAvengers.' + error);
          }
      }

      function doLogoutProcess(){

        return $http.post('/api/logout/session/')
              .then(getLogoutComplete)
              .catch(getLogoutFailed);

          function getLogoutComplete(response) {
              return response;
          }

          function getLogoutFailed(error) {
              console.log('XHR Failed for getAvengers.' + error);
          }

      }
  })

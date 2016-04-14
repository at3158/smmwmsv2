var mysql = require("mysql");
function connection(){
  this.pool = null;
  this.init = function(){
    this.pool = mysql.createPool({
      host:'localhost',
      user:'root',
      password:'qwerchinese',
      database:'smmwmsv2'
    });
  };
  this.acquire = function(callback){
    this.getConnection(function(err,connection){
      callback(err,connection);
    });
  };
}

module.exports = new connection();

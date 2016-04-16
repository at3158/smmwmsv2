var mysql = require("mysql");

function Connection(){
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
    this.pool.getConnection(function(err,connection){
      callback(err,connection);
    });
  };
}

module.exports = new Connection();

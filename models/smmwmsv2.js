var connection = require('../connection');

function SmmWMSv2(){
  //regin 測試用
  this.getTest = function(req,res){
    connection.acquire(function(err, con) {
      con.query('select NOW();', function(err, result) {
        con.release();
        var result = JSON.stringify(result);
        console.log(result);
        return result;
      });
    });
  };
  //endregin

  //regin 部門使用
  //選擇全部
  this.getDepartments = function(res){
    connection.acquire(function(err, con) {
      con.query('select * from department;', function(err, result) {
        con.release();
        var result = JSON.stringify(result);
        console.log(result);
        return result;
      });
    });
  };
  //建立一筆
  this.setDepartmentCreate = function(req,res){
    var Department = {
      code: req.body.code,
      name: req.body.name,
      upper_sn: (req.body.upper_sn=='')?0:req.body.upper_sn,
      note: (req.body.note=='')?"無":req.body.note,
    };
    connection.acquire(function(err, con) {
      var query = con.query('insert into department set ?;',Department, function(err, result) {
        if(err){ console.log(err);return "false"; }
        con.release();
        return "true";
      });
      console.log(query.sql);
    });
  };
  //刪除一筆
  this.setDepartmentDelete = function(req,res){
    var Department = {
      _sn: (req.body._sn=='')?0:req.body._sn
    };
    connection.acquire(function(err, con) {
      var query = con.query('delete from department where _sn=?;',[Department._sn], function(err, result) {
        if(err){ console.log(err);return "false"; }
        con.release();
        return "true";
      });
      console.log(query.sql);
    });
  };
  //異動一筆
  this.setDepartmentUpdate = function(req,res){
    var sn = { _sn: (req.body._sn=='')?0:req.body._sn };
    var Department = {
      code: req.body.code,
      name: req.body.name,
      upper_sn: (req.body.upper_sn=='')?0:req.body.upper_sn,
      note: (req.body.note=='')?"無":req.body.note,
    };
    connection.acquire(function(err, con) {
      var query = con.query('update  department set ? where _sn=?;',[Department,sn], function(err, result) {
        if(err){ console.log(err);return "false"; }
        con.release();
        return "true";
      });
      console.log(query.sql);
    });
  };
  //endregin


  this.extend = function(target) {
      var sources = [].slice.call(arguments, 1);
      sources.forEach(function (source) {
          for (var prop in source) {
              target[prop] = source[prop];
          }
      });
      return target;
  };
}
module.exports = new SmmWMSv2();

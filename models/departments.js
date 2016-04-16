var connection = require('../connection');

function Departments() {
    //regin 測試用
    this.getTest = function(req, res) {
        connection.acquire(function(err, con) {
            con.query('select NOW();', function(err, result) {
                con.release();
                var result = JSON.stringify(result);
                console.log(result);
                res.json(result);
            });
        });
    };
    //endregin

    //regin 部門使用
    //選擇全部
    this.getDepartments = function(res) {
        connection.acquire(function(err, con) {
            var query = con.query('select * from department;', function(err, result) {
                con.release();
                res.json(result);
            });
            console.log(query.sql);
        });
    };
    //建立一筆
    this.setDepartmentCreate = function(req, res) {
        var Department = {
            code: req.body.code,
            name: req.body.name,
            upper_sn: (typeof req.body.upper_sn != 'undefined' && req.body.upper_sn) ? req.body.upper_sn : 0,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into department set ?;', Department, function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.json(result.insertId);
                }
                con.release();
            });
            console.log(query.sql);
        });
    };
    //刪除一筆
    this.setDepartmentDelete = function(req, res) {
        var Department = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from department where _sn=?;', [Department._sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                }
                con.release();
                res.send("true");
            });
            console.log(query.sql);
        });
    };
    //異動一筆
    this.setDepartmentUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var Department = {
            code: req.body.code,
            name: req.body.name,
            upper_sn: (typeof req.body.upper_sn != 'undefined' && req.body.upper_sn) ? req.body.upper_sn : 0,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('update  department set ? where _sn=?;', [Department, sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                }
                con.release();
                res.send("true");
            });
            console.log(query.sql);
        });
    };
    //endregin

    this.extend = function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };
}
module.exports = new Departments();

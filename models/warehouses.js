var connection = require('../connection');

function WareHouses() {
    //regin 倉別使用
    //選擇全部
    this.getWareHouses = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from warehouse;', function(err, result) {
                con.release();
                res.json(result);
            });
        });
    };
    //建立一筆
    this.setWareHouseCreate = function(req, res) {
        var WareHouse = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into warehouse set ?;', WareHouse, function(err, result) {
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
    this.setWareHouseDelete = function(req, res) {
        var WareHouse = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from warehouse where ?;', [WareHouse._sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.send("true");
                }
                con.release();
            });
            console.log(query.sql);
        });
    };
    //異動一筆
    this.setWareHouseUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var WareHouse = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
        };
        connection.acquire(function(err, con) {
            var query = con.query('update warehouse set ? where _sn=?;', [WareHouse, sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.send("true");
                }
                con.release();
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
module.exports = new WareHouses();

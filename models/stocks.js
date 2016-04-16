var connection = require('../connection');

function Stocks() {
    //regin 庫存位使用
    //選擇全部
    this.getStocks = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from stock;', function(err, result) {
                con.release();
                res.json(result);
            });
        });
    };
    //建立一筆
    this.setStockCreate = function(req, res) {
        var Stock = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
            warehouse_sn: (typeof req.body.warehouse_sn != 'undefined' && req.body.warehouse_sn) ? req.body.warehouse_sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into stock set ?;', Stock, function(err, result) {
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
    this.setStockDelete = function(req, res) {
        var Stock = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from stock where _sn=?;', [Stock._sn], function(err, result) {
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
    this.setStockUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var Stock = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
        };
        connection.acquire(function(err, con) {
            var query = con.query('update stock set ? where _sn=?;', [Stock, sn], function(err, result) {
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
module.exports = new Stocks();

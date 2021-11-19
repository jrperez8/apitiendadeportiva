const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database.js');

router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT id_pro, name_pro, descrip_pro, amount_pro,price_pro FROM productos', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
});

router.get('/:id',(req,res)=>{
    const { id_pro } = req.params;
    mysqlConnection.query('SELECT id_pro, name_pro, descrip_pro, amount_pro,price_pro FROM productos WHERE id_pro = ?', [id_pro],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }
        else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req,res)=>{
    const { id_pro } = req.params;
    mysqlConnection.query('DELETE FROM productos WHERE id_pro = ?', [id_pro], (err,rows,fields)=>{
        if(!err){
            res.json({status:'Producto Eliminado'});
        }
        else {
            console.log(err);
        }
    });
});

router.post('/',(req,res)=>{
    const {id_pro, name_pro, descrip_pro, amount_pro, price_pro} = req.body;
    console.log(id_pro, name_pro, descrip_pro, amount_pro,price_pro);
    const query = `
        SET @id_pro = ?;
        SET @name_pro = ?;
        SET @descrip_pro = ?;
        SET @amount_pro = ?;
        SET @price_pro = ?;
        CALL productAddOrEdit(@id_pro,@name_pro,@descrip_pro,@amount_pro,@price_pro);
    `;
    mysqlConnection.query(query,[id_pro, name_pro, descrip_pro, amount_pro,price_pro],(err,rows,fields)=>{
        if(!err){
            res.json({status:'Producto Guardado'});
        }
        else{
            console.log(err);
        }
    });
});

router.put('/:id',(req, res) => {
    const { name_pro, descrip_pro, amount_pro, price_pro } = req.body;
    const { id_pro } = req.params;
    const query = `
    SET @id_pro = ?;
    SET @name_pro = ?;
    SET @descrip_pro = ?;
    SET @amount_pro = ?;
    SET @price_pro = ?;
    CALL productAddOrEdit(@id_pro,@name_pro,@descrip_pro,@amount_pro,@price_pro);
    `;
    mysqlConnection.query(query,[id_pro, name_pro, descrip_pro, amount_pro,price_pro], (err, rows, fields) => {
        if (!err){
            res.json({status:'Producto Actualizado'});
        }
        else{
            console.log(err);
        }
    });
});

module.exports = router;


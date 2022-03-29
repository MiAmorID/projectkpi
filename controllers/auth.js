const Employee = require("../models/employee");
const CryptoJS = require("crypto-js");
const authLib = require("../lib/auth");

module.exports = {
    login: async (req, res) => {
        let {
            username, password
        } = req.body;
        try {
            if(!username || !password) throw new Error("required");
            let employee = await Employee.findOne({ 
                username : username 
            }, 
            { 
                password : { 
                    privateKey: 0, 
                    publicKey: 0 
                } 
            })
            .populate({
                path : "tribe",
                select : "name"
            });
            if(!employee) throw new Error("Username not found");
            if(CryptoJS.MD5(password).toString() != employee.password) throw new Error("Password salah");
            token = await authLib.getToken(JSON.stringify(employee))
            return res.json({
                token
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    updatePassword: async (req, res) => {
        let {
            username, password
        } = req.body;
        try {
            if(!username || !password) throw new Error("required");
            let employee = await Employee.findOne({ username : username });
            if(!employee) throw new Error("Username not found");
            await Employee.findOneAndUpdate(
                { username : username }, 
                { password : CryptoJS.MD5(password).toString() }
            )
            res.json("updated");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    getUser: async(req, res) => {
        try {
            res.json(req.user);
        } catch (error) {
            res.status(401);
        }
    },
    generate: async(req, res) => {
        try {
            const newEmp = new Employee({
                "assignee_id" : 0,
                "role": "ADMIN",
                "name": "Admin",
                "password" : CryptoJS.MD5("123456").toString(),
                "username" : "admin"
            });
            await newEmp.save();
            return res.send("ok");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
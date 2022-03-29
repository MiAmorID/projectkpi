const Tribe = require("../models/tribe");
const axios = require("axios");
const async = require("async");


module.exports = {
    index: async (req, res) => {
        try {
            let { limit, page, search } = req.query
            limit = limit || 10;
            page = page || 1;
            search = search || "";
            let skip = (page - 1) * limit;
            let query = { 
                "name" : {
                    $regex : search,
                    $options : "i"
                }
            };
            const tribe = await Tribe.find(
                query, 
                null, 
                { skip, limit }
            )
            .populate({
                path : "employee",
                select : "name"
            });
            let rows = await Tribe.find(query).count();
            res.json({
                data : tribe,
                rows,
                pages : Math.ceil(rows/limit)
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    create: async(req, res) => {
        try {
            let {
                name
            } = req.body;
            if(!name) throw new Error("name required");
            const newEmp = new Tribe(req.body);
            await newEmp.save();
            res.json(newEmp);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    update: async(req, res) => {
        try {
            let { name } = req.body;
            let { id } = req.params;
            let d = await Tribe.findOneAndUpdate({'_id' : id}, {name});
            if(!d) throw new Error("Update Failed");
            res.json("OK");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    detail: async(req, res) => {
        try {
            let { id } = req.params;
            let data = await Tribe.findOne({ _id : id });
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
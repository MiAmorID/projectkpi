const Employee = require("../models/employee");
const Tribe = require("../models/tribe");
const Title = require("../models/title");

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
            let employee = await Employee.find(
                query, 
                null,
                { skip, limit }
            )
            .select("-password")
            .populate("tribe")
            .populate("title");
            let rows = await Employee.find(query).count();
            res.json({
                data : employee,
                rows,
                pages : Math.ceil(rows/limit)
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    detail: async(req, res) => {
        try {
            let { id } = req.params;
            let data = await Employee.findOne({ _id : id })
            .select("-password")
            .populate("tribe")
            .populate("title");
            res.json(data)      
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    create: async(req, res) => {
        try {
            let {
                assignee_id, name, username, tribe_id, title_id
            } = req.body;

            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");

            let title = await Title.findOne({ _id : title_id });
            if(!title) throw new Error("Title not found");

            const newEmp = new Employee({
                assignee_id, name, username, tribe, title
            });
            await newEmp.save();
            res.json(newEmp);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    update: async(req, res) => {
        try {
            let {
                name, tribe_id, title_id
            } = req.body;
            let { id } = req.params;

            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");

            let title = await Title.findOne({ _id : title_id });
            if(!title) throw new Error("Title not found");

            let d = await Employee.findOneAndUpdate({ _id : id }, {
                name, tribe, title 
            })
            res.json("ok");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
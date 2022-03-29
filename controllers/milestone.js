const Milestone = require("../models/milestone");
const axios = require("axios");
const async = require("async");


module.exports = {
    index: async (req, res) => {
        try {
            const milestone = await Milestone.find({}).sort("-start_date");
            res.json(milestone);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    create: async(req, res) => {
        try {
            const newEmp = new Milestone(req.body);
            await newEmp.save();
            res.json(newEmp);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    gitlab: async(req, res) => {
        try {
            let milestone = await axios.get("/projects/21304083/milestones");
            let { data, headers } = milestone;
            async.forEachOf(data, async d => {
                let m = await Milestone.findOneAndUpdate({ id : d.id }, d);
                if(!m){
                    await Milestone.create(d);
                }
            });
            res.json({
                data, headers
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
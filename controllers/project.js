const Project = require("../models/project");
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
            const project = await Project.find(
                query, 
                null, 
                { skip, limit }
            )
            .populate({
                path : "tribe",
                select : "name"
            });
            let rows = await Project.find(query).count();
            res.json({
                data: project,
                rows,
                pages : Math.ceil(rows/limit)
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    gitlab: async(req, res) => {
        try {
            let { project_id, tribe_id } = req.body;
            if(!project_id) throw new Error("project_id required");
            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");
            let project = await axios.get("/projects/" + project_id);
            let { data, headers } = project;
            let new_data = {
                id : data.id,
                name : data.name,
                tribe : tribe
            }
            let m = await Project.findOneAndUpdate({ id : data.id }, new_data);
            if(!m){
                await Project.create(new_data);
            }
            res.json({
                new_data
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            let { id } = req.params;
            let { tribe_id } = req.body;
            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");
            await Project.findOneAndUpdate({ _id : id }, { tribe });
            res.json("ok");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    detail: async(req, res) => {
        try {
            let { id } = req.params;
            let data = await Project.findOne({ _id : id }).populate({
                path : "tribe",
                select : ["name", "__v"]
            });
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
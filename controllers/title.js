const Title = require("../models/title");
const Tribe = require("../models/tribe");

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
            let title = await Title.find(
                query, 
                null,
                { skip, limit }
            )
            .populate({
                path : "tribe",
                select : "name"
            });
            let rows = await Title.find(query).count();
            res.json({
                data : title,
                rows,
                pages : Math.ceil(rows/limit)
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    detail: async (req, res) => {
        try {
            let { id } = req.params;
            let data = await Title.findOne({ _id : id}).populate("tribe");
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    create: async(req, res) => {
        try {
            let {
                name, point, tribe_id
            } = req.body;
            if(!name || point === undefined) throw new Error("item required");
            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");
            const t = new Title({
                name, point, tribe
            });
            await t.save();
            res.json(t);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    update: async(req, res) => {
        try {
            let {
                name, point, tribe_id
            } = req.body;
            let { id } = req.params;
            if(!name || point === undefined || !tribe_id) throw new Error("item required");
            let tribe = await Tribe.findOne({ _id : tribe_id });
            if(!tribe) throw new Error("Tribe not found");
            const t = await Title.findOneAndUpdate({
                _id : id
            },
            {
                name, point, tribe
            });
            res.json("ok");
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
}
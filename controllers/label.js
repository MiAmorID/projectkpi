const Label = require("../models/label");
const axios = require("axios");
const async = require("async");


module.exports = {
    index: async (req, res) => {
        try {
            const label = await Label.find({});
            res.json(label);
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    gitlab: async(req, res) => {
        try {
            let label = await axios.get("/projects/21304083/labels");
            let { data, headers } = label;
            async.forEachOf(data, async d => {
                let m = await Label.findOneAndUpdate({ id : d.id }, d);
                if(!m){
                    await Label.create(d);
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
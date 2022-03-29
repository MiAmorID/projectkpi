const Issue = require("../models/issue");
const Milestone = require("../models/milestone");
const Employee = require("../models/employee");
const axios = require("axios");
const async = require("async");
const Project = require("../models/project");


module.exports = {
    index: async (req, res) => {
        try {
            const issue = await Issue.where("assignee.id").ne(req.query.assignee_id )
            .populate({
                path : "project",
                select : "name"
            });
            res.json({
                data : issue,
                total : issue.length
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    },
    sync: async(req, res) => {
        let { milestone_id, project_id } = req.body;
        try {
            if(!milestone_id || !project_id) throw new Error("required");
            let milestone = await Milestone.findById(milestone_id);
            let project = await Project.findById(project_id);
            if(!milestone || !project) throw new Error("not found");
            let employee = [];
            let params = {
                milestone: milestone.title,
                per_page: 50
            }
            let issue = await axios.get( `/projects/${project.id}/issues?milestone=` + encodeURIComponent(milestone.title), { params } );
            let { data, headers } = issue;
            await async.forEachOf(data, async d => {
                d.project = project._id;
                let events = await axios.get( `/projects/${project.id}/issues/${d.iid}/resource_label_events`);
                d.events = events.data;
                let m = await Issue.findOneAndUpdate({ id : d.id }, d);
                if(!m){
                    await Issue.create(d);
                }
            });
            res.json({
                data, headers, employee
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}
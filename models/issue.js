const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: null
  },
  iid: {
    type: Number,
    default: null
  },
  project_id: {
    type: Number,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  },
  due_date: {
    type: Date,
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  expired: {
    type: Boolean,
    default: false
  },
  web_url : {
    type: String,
    default: null
  },
  milestone: new mongoose.Schema({
    id: {
      type: Number,
      default: null
    },
    iid: {
      type: Number,
      default: null
    },
    project_id: {
      type: Number,
      default: null
    },
  }),
  assignee: new mongoose.Schema({
    id: {
      type: Number,
      default: null
    },
    username : {
      type: String,
      default: null
    },
    name : {
      type: String,
      default: null
    }
  }),
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null
  },
  events : [ 
    new mongoose.Schema({
      id: {
        type: Number,
        default: null,
      },
      user: new mongoose.Schema({
        id: {
          type: Number,
          default: null,
        },
        username: {
          type: String,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
      }),
      created_at: {
        type: Date,
        default: null,
      },
      label: new mongoose.Schema({
        id: {
          type: Number,
          default: null,
        },  
        name : {
          type: String,
          default: null,
        },
        color : {
          type: String,
          default: null,
        },
        text_color : {
          type: String,
          default: null,
        }
      }),
      action: {
        type: String,
        default: null,
      },
    })
  ]
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;

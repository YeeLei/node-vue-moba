const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    items: [
      {
        image: {
          type: String
        },
        url: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ad", schema);

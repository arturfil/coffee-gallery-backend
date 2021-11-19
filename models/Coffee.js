const { model, Schema } = require('mongoose');

const CoffeSchema = Schema(
  {
    name: {type: String, required: true, trim: true},
    bean: {
      type: Schema.Types.ObjectId, 
      required: true, 
      trim: true,
      ref: "Bean"
    },
    roast: {
      type: String, 
      enum: ["LIGHT", "MEDIUM", "HEAVY"],
      required: true
    },
    grind: {type: Number},
    image: {type: String}
  }
) 

module.exports = model("Coffee", CoffeSchema);
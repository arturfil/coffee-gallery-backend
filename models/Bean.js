const { model, Schema } = require('mongoose');

const BeanSchema = Schema(
  {
    name: {type: String}
  }
)

module.exports = model("Bean", BeanSchema);
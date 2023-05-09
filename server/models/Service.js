const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
    service_name: { type: String, required: true },
    service_para: { type: String, required: true },
    service_tags: { type: [String], required: true },
    isPricing: { type: Boolean, required: false },
    pricing: {
      service_currency: {
        type: String,
        required: function () {
          return this.isPricing === true;
        }
      },
      service_amount: {
        type: Number,
        required: false
      },
      service_plan_type: {
        type: String,
        required: function () {
          return this.isPricing === true;
        }
      },
      isPriceRange: {
        type: Boolean,
        default: false
      },
      min_amount: {
        type: Number,
        default: null,
        required: function () {
            return this.isPriceRange === true;
        }
      },
      max_amount: {
        type: Number,
        default: null,
        required: function () {
            return this.isPriceRange === true;
        }
      },
      isDiscountPrice: {
        type: Boolean,
        default: false
      },
      pre_discount_price: {
        type: Number,
        default: null,
        required: function () {
            return this.isDiscountPrice === true;
        }
      }
    }
  });

const User = mongoose.model('Service', serviceSchema);

module.exports = User;

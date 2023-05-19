const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  quotation_no: {
    type: String,
    required: true
  },
  quotation_date: {
    type: String,
    required: true
  },
  business_details: {
    your_business: {
      name: String,
      address: String
    },
    client: {
      name: String,
      address: String
    }
  },
  gst: {
    tax_type: String,
    gst_type: String
  },
  currency: {
    short_form: String,
    symbol: String
  },
  number_format: {
    format: String,
    decimal_digits: String
  },
  item_wise_discount: {
    discount_type: String,
    discount_value: String
  },
  hideTotals: {
    discount_on_total: {
      key: String,
      value: String,
      discount_type: String
    },
    additional_charges: {
      key: String,
      value: String,
      discount_type: String
    },
    total_in_words: String
  },
  terms_and_conditions: [{
    id: String,
    value: String
  }],
  notes: String,
  attachments: [{
    filename: String,
    url: String
  }],
  signature: {
    signature: String,
    label: String
  },
  additional_info: {
    key: String,
    value: String
  },
  contact_info: {
    email: String,
    phone: String
  }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;

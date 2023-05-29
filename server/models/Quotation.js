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
  q_top_add_more_field: [{
    fieldName: String,
    value: String
  }],
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
  table: [{
    key: {
      type: String,
      required: true
    },
    Item: {
      type: String,
      required: true
    },
    Quantity: {
      type: String,
      required: true
    },
    Rate: {
      type: String,
      required: true
    },
    Amount: {
      type: String,
      required: true
    },
    Discount: String
  }],
  item_wise_discount: {
    discount :{
      discount_type: String,
      discount_value: String
    },
    subtotal: String,
    amount: String
  },
  hideTotals: {
    discount_on_total: {
      field: String,
      value: String,
      discount_type: String
    },
    additional_charges: {
      field: String,
      value: String,
      discount_type: String
    },
    total: String,
    total_in_words: String
  },
  q_bottom_add_more_field: [{
    fieldName: String,
    value: String
  }],
  terms_and_conditions: [{
    id: String,
    value: String
  }],
  notes: String,
  attachments: [{
    file: String,
  }],
  signature: {
    file: String,
    label: String
  },
  additional_info: [{
    fieldName: String,
    value: String
  }],
  contact_info: {
    email: String,
    phone: String
  }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;


// const mongoose = require('mongoose');

// const quotationSchema = new mongoose.Schema({
//   quotation_no: {
//     type: String,
//     required: true
//   },
//   quotation_date: {
//     type: String,
//     required: true
//   },
//   q_top_add_more_field: [{
//     fieldName: String,
//     value: String
//   }],
//   business_details: {
//     your_business: {
//       name: String,
//       address: String
//     },
//     client: {
//       name: String,
//       address: String
//     }
//   },
//   gst: {
//     tax_type: String,
//     gst_type: String
//   },
//   currency: {
//     short_form: String,
//     symbol: String
//   },
//   number_format: {
//     format: String,
//     decimal_digits: String
//   },
//   table: [{
//     key: {
//       type: String,
//       required: true
//     },
//     Item: {
//       type: String,
//       required: true
//     },
//     Quantity: {
//       type: String,
//       required: true
//     },
//     Rate: {
//       type: String,
//       required: true
//     },
//     Amount: {
//       type: String,
//       required: true
//     },
//     Discount: String
//   }],
//   item_wise_discount: {
//     discount :{
//       discount_type: String,
//       discount_value: String
//     },
//     subtotal: String,
//     amount: String
//   },
//   hideTotals: {
//     discount_on_total: {
//       key: String,
//       value: String,
//       discount_type: String
//     },
//     additional_charges: {
//       key: String,
//       value: String,
//       discount_type: String
//     },
//     total: String,
//     total_in_words: String
//   },
//   q_bottom_add_more_field: [{
//     fieldName: String,
//     value: String
//   }],
//   terms_and_conditions: [{
//     id: String,
//     value: String
//   }],
//   notes: String,
//   additional_info: [{
//     key: String,
//     value: String
//   }],
//   contact_info: {
//     email: String,
//     phone: String
//   }
// });

// const Quotation = mongoose.model('Quotation', quotationSchema);

// module.exports = Quotation;

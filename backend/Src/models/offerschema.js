const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

//schema
const OfferSchema = new mongoose.Schema({
    offer_id: { type: String, required: true },
    offer_title: { type: String, required: true },
    offer_description: { type: String, required: true },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: Number, required: true },
    content: [{
        quantity: Number,
    }],
    schedule: {
        days_of_week: [{ type: Number }],
        dates_of_month: [{ type: Number }],
        months_of_year: [{ type: Number }]
    },
    target: { type: String, required: true },
    pricing: [{
        currency: { type: String, required: true },
        cost: { type: Number, required: true }
    }]
});

// creating model
const Offer = new mongoose.model("Offer", OfferSchema)
module.exports = Offer;

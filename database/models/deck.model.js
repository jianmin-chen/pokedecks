import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    pokemon: [
        {
            id: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            supertype: {},
            subtype: {},
            qty: {
                type: Number,
                default: 1,
                max: 4,
                required: true
            }
        }
    ],
    trainer: [{}],
    energy: [{}],
    profile: [{}]
});

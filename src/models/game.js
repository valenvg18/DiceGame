const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

//const mongooseSoftDelete = require('mongoose-delete');

const gameSchema = new Schema({
     id: { 
        type: ObjectId
    }, 
    type: {
        type: String
    },
    gamers: [{
        name: {
            type: String,
            trim: true,
            required: [
                true, "Nombre requerido"
            ]
        },
        bet: {
            type: Number,
            default: 0,
            require: [
                true, "Apuesta requerida"
            ]
        }
    }],
    inProgress: {
        type: Boolean,
        default: false
    },
    winner: {
        name: {
          type: String,
          default: ''
        }
    }
}, { 
    timestamps: true 
});

//gameSchema.plugin(mongooseSoftDelete);

module.exports = model('Game', gameSchema);


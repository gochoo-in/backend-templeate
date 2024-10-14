// import mongoose from 'mongoose';
// import Destination from './destination.js';

// const CitySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   iataCode: { type: String, required: true },
//   destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
//   imageUrls: {
//     type: [{
//         type: {
//             type: String,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     }],
//     default: []
// },
//   country: { type: String, required: true },
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   bestTimeToVisit: { type: String },
//   isMajorHub: { type: Boolean, default: false },
//   pointsOfInterest: [{ type: String }],
//   climate: { type: String },
//   languageSpoken: { type: String, required: true },
//   travelTimeFromHub: { type: Number },
//   isActive: { type: Boolean, default: false },
// }, { versionKey: false });

// export default mongoose.model('City', CitySchema);
import mongoose from 'mongoose';
import Destination from './destination.js';


// Define the Counter schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

// Check if the 'Counter' model is already defined, and reuse it if it exists
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  iataCode: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  imageUrls: {
    type: [{
        type: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    default: []
},
  country: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  bestTimeToVisit: { type: String },
  isMajorHub: { type: Boolean, default: false },
  pointsOfInterest: [{ type: String }],
  climate: { type: String },
  languageSpoken: { type: String, required: true },
  travelTimeFromHub: { type: Number },
  isActive: { type: Boolean, default: false },
  smallId: {
    type: String,
    unique: true,
  },
}, { versionKey: false });


CitySchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find and increment the counter for 'city' collection
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'city' },  // Using 'city' as the counter ID
        { $inc: { seq: 1 } },
        { new: true, upsert: true }  // Upsert in case counter doesn't exist
      );

      // Generate the smallId in the format 'C00001'
      const sequenceNumber = String(counter.seq).padStart(5, '0');  // Pad with zeros to get 5 digits
      this.smallId = `C${sequenceNumber}`;

      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


export default mongoose.model('City', CitySchema);

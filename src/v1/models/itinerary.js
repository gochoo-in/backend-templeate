import mongoose from 'mongoose';
import ItineraryVersion from './itineraryVersion.js'; // Import ItineraryVersion model

const activitySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: { type: Date, required: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GptActivity', required: true }]
}, { _id: false });

const transportSchema = new mongoose.Schema({
  mode: { type: String, required: true, enum: ['Flight', 'Car', 'Ferry'] },
  modeDetails: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'transport.modeDetailsModel',
    default: null
  },
  modeDetailsModel: {
    type: String,
    enum: ['Flight', 'Taxi', 'Ferry']
  }
}, { _id: false });

const itineraryDaySchema = new mongoose.Schema({
  currentCity: { type: String, required: true },
  nextCity: { type: String, default: null },
  stayDays: { type: Number, required: true },
  transport: { type: transportSchema, default: null },
  transferCostPerPersonINR: { type: Number, default: null },
  transferDuration: { type: String, default: null },
  days: [activitySchema],
  hotelDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', default: null }
}, { _id: false });

const enrichedItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  destination: { type: String, required: true },
  itinerary: [itineraryDaySchema],
  totalDays: { type: Number, required: true },
  totalNights: { type: Number, required: true }
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrichedItinerary: { type: enrichedItinerarySchema, required: true }
}, { timestamps: true, versionKey: false });

itinerarySchema.pre(['findOneAndUpdate', 'findByIdAndUpdate'], async function (next) {
  try {
    const query = this;
    const itineraryId = query.getQuery()._id || query.getQuery().itineraryId;

    if (!itineraryId) {
      return next(); // No itinerary ID, nothing to track
    }

    // Fetch the original itinerary document before making the update
    const original = await Itinerary.findById(itineraryId).lean();
    if (original) {
      const { changedBy, comment } = query.options;

      // Ensure that `changedBy` is properly formatted and only extracts the userId
      const userId = changedBy && typeof changedBy === 'object' && changedBy.userId ? changedBy.userId : null;

      // Determine the current version number
      const latestVersion = await ItineraryVersion.findOne({ itineraryId }).sort({ version: -1 });
      const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;

      // Create a new version of the itinerary before the update
      await ItineraryVersion.create({
        itineraryId,
        version: newVersionNumber,
        enrichedItinerary: original.enrichedItinerary, // Save the current state before any changes
        changedBy: {
          userId: userId || null, // Assign userId if present
        },
        comment: comment || '', // Store the comment separately
        createdAt: new Date()
      });
    }

    next();
  } catch (error) {
    console.error('Error in pre-update hook:', error);
    next(error);
  }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;

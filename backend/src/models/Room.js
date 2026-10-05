import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  roomName: { type: String, required: true },
  floor: { type: String, required: true },
  facilities: [{ type: String }],
  capacity: { type: Number, default: 30 }
});

export const Room = mongoose.model('Room', roomSchema);

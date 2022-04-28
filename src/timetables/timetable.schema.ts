import * as mongoose from 'mongoose';

export const timetableSchema = new mongoose.Schema(
  {
    classNo: {
      required: true,
      type: String,
    },
    year: {
      required: true,
      type: String,
    },
    color: {
      required: true,
      type: String,
    },
    school: {
      type: String,
      required: true,
    },
    program: {
      required: true,
      type: String,
      minlength: 5,
      maxlength: 5,
    },
    timetableContent: {
      monday: [
        {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 3,
        },
      ],
      tuesday: [
        {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 3,
        },
      ],
      wednesday: [
        {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 3,
        },
      ],
      thursday: [
        {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 3,
        },
      ],
      friday: [
        {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 3,
        },
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

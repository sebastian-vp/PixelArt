import mongoose from "mongoose";

interface DrawingData {
  userId: mongoose.Types.ObjectId;
  title?: string;
  width: number;
  height: number;
  pixels: (string | null)[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const drawingSchema = new mongoose.Schema<DrawingData>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    width: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => Number.isInteger(value) && value > 0,
        message: "width must be a positive integer",
      },
    },
    height: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => Number.isInteger(value) && value > 0,
        message: "height must be a positive integer",
      },
    },
    pixels: {
      type: [String],
      validate: {
        validator: function (pixels: (string | null)[]) {
          if (this instanceof mongoose.Query) {
            return false;
          }
          return (
            pixels.length === this.width * this.height &&
            pixels.every(
              (pixel) => pixel === null || /^#[0-9a-fA-F]{6}$/.test(pixel),
            )
          );
        },
        message: "pixels must contain width * height hex colors or null cells",
      },
    },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true },
);

drawingSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
    },
  ) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Drawing = mongoose.model("Drawing", drawingSchema);

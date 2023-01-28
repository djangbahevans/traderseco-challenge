import mongoose from "mongoose";

interface IShoeAttrs {
  name: string;
  description: string;
  manufacturer: string;
  sizes: Number[];
  price: Number;
  ownerId: string;
}

interface IShoeDocument extends mongoose.Document {
  name: string;
  description: string;
  manufacturer: string;
  sizes: Number[];
  price: Number;
  ownerId: string;
}

interface IShoeModel extends mongoose.Model<IShoeDocument> {
  build(attrs: IShoeAttrs): IShoeDocument;
}

// Define the schema for the Shoe model
const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    sizes: {
      type: [Number],
      required: false,
      // Sizes must be a set of numbers between 15 and 49
      validate: {
        validator: function (v: Number[]) {
          return v.every((size) => size >= 15 && size <= 49);
        },
      },
      message: "Sizes must be a set of numbers between 15 and 49",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Index name, description and manufacturer fields for text search
shoeSchema.index({ name: "text", description: "text", manufacturer: "text" });

// Before saving the shoe, sort sizes in ascending order and remove duplicates
shoeSchema.pre("save", async function (done) {
  if (this.isModified("sizes")) {
    this.set("sizes", [...new Set(this.get("sizes").sort())]);

    // Set updatedAt to current date
    this.set("updatedAt", Date.now());
  }

  done();
});

// Build method for creating a new Shoe instance
shoeSchema.statics.build = (attrs: IShoeAttrs) => {
  return new Shoe(attrs);
};

// Create the Shoe model and export it
const Shoe = mongoose.model<IShoeDocument, IShoeModel>("Shoe", shoeSchema);

export { Shoe };

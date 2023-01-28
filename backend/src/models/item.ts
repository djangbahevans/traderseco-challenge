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
      min: [0, "Price must be greater than 0"]
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

shoeSchema.index({ name: "text", description: "text", manufacturer: "text" });

shoeSchema.pre("save", async function (done) {
  if (this.isModified("sizes")) {
    // Sort sizes in ascending order and remove duplicates
    this.set("sizes", [...new Set(this.get("sizes").sort())]);
  }

  done();
});

shoeSchema.statics.build = (attrs: IShoeAttrs) => {
  return new Shoe(attrs);
};

const Shoe = mongoose.model<IShoeDocument, IShoeModel>("Shoe", shoeSchema);

export { Shoe };

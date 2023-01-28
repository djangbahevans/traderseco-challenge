import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describe the properties required to produce a new user
interface IUserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// An interface that describes the properties that a user model has
interface IUserModel extends mongoose.Model<IUserDocument> {
  build(attrs: IUserAttrs): IUserDocument;
}

// An interface that describes the properties that a user document has
interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export { User };

import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes a User object  
// that is going to be inserted in the database
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes a User document 
// that is going to be fetched from the database
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that has a build() method that describes
// how to build a user document from a user object 
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  toJSON:{
    transform(doc,ret){
      ret.id=ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

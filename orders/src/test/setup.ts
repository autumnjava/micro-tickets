import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

jest.mock('../nats-wrapper'); // fake nats wrapper implementation

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'random';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => await collection.deleteMany({}));
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  // build a jwt payload { id, email }
  const payload = { id, email: 'test@test.com' };

  // create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // return a string that the cookie with encoded data
  return [`access_token=${token}`];
};

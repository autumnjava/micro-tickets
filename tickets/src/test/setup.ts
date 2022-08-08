import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var getAuthCookie: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdasada';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => await collection.deleteMany({}));
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.getAuthCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};

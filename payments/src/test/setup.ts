import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose'
import {app} from '../app'
import request from 'supertest';
import jwt from 'jsonwebtoken'
jest.mock('../nats-wrapper')

declare global {
  function signup(): Promise<string[]>;
  function createCookie(id?:string): string[];
}

//process.env.STRIPE_KEY='sk_test_51I3m4IBVs8AXmCxDeyRw4KI2s2TOIXRNSH8Bx5vG3d6efUOozWaKFdnPy5wrFVvOOSrdaROKuxs0w7Q42mb62XJI000hAk34Ou';

let mongo:any;

beforeAll(async ()=>{
  process.env.JWT_KEY='asdf';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {

    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });

  global.signup = async () => {
    const email = 'test@test.com';
    const password = 'password';
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
  };

  global.createCookie = (id?:string) => {
    const payload={
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: 'ali@ali.com'
    };
    const password = '123456';
    const token=jwt.sign(payload,process.env.JWT_KEY!);
    const session={jwt:token};
    const sessionJSON=JSON.stringify(session);
    const base64=Buffer.from(sessionJSON).toString('base64');
    return [`express:sess=${base64}`]
  };
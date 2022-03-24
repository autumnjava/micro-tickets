import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on a successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'asda',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'asda',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.se"
    })
    .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'oookej'
        })
        .expect(400);
});

it('dissalows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.se',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.se',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.se',
            password: 'password'
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});
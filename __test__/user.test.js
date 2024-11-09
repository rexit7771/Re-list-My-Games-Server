const { beforeAll, afterAll, expect, describe, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { hashing, compare } = require("../helpers/bcrypt");
const { signPayload, verifyToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");

beforeAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
    let dataUsers = require("../data/users.json").map(e => {
        e.password = hashing(e.password);
        e.createdAt = e.updatedAt = new Date();
        return e;
    });

    await sequelize.queryInterface.bulkInsert('Users', dataUsers);
});



// *Testing Login
let accountLogin = {
    email: "pramaskoro@gmail.com",
    password: "123456",
};

test('POST /login Success', async () => {
    const response = await request(app)
        .post('/login').send(accountLogin);

    console.log("Response.status:", response.status);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
    // console.log(error);
});

describe('POST /login Failed', () => {
    test('empty email/password should be response email/password required', async () => {
        const response = await request(app)
            .post('/login').send({ "email": "", "password": "" });
        // console.log("Response.status :", response.status);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', "Email and Password are required")

        // console.log(error);
    });

    test('invalid email/password, should be response ', async () => {
        const response = await request(app)
            .post('/login').send({ "email": "idk", "password": "idk" });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid Email/Password');
        // console.log(error);
    });
});

// *Testing Register
let accountRegister = { "email": "test@mail.com", "password": "123456" }
test('POST /register success', async () => {
    const response = await request(app)
        .post('/register').send(accountRegister);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', `User with email ${accountRegister.email} has been created`);
    // console.log(error);
});

describe('POST /register failed', () => {
    test('unique email: should be response Email has been used', async () => {
        const response = await request(app)
            .post('/register').send(accountLogin);
        // console.log(response.status, response.body, '<<<<das')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email has been used');
    });

    test('email format: should be response Invalid email format', async () => {
        const response = await request(app)
            .post('/register').send({ "email": "test", "password": "123456" });
        // console.log(response.status, response.body, '<==');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid email format');
        // console.log(error);
    });

    test('email / password required', async () => {
        const response = await request(app)
            .post('/register').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email and Password are required');

    })
});
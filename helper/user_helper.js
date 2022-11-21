import supertest from "supertest";
const faker = require('faker');
const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = '5986e01153039fe076da3b94b1bcefa1d18f925cc54f3c9e9fced3244f90576f';

export async function createRandomUser() {
    let randInt = Math.floor(Math.random() * 9999);
    const userData = {
        "email": faker.internet.email(),
        "name": faker.name.firstName(),
        "gender": "male",
        "status": "active"
    }

    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData);
        
    console.log(res.body.data)
    return await res.body.data.id;
}
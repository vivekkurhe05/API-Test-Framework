/**
 * using async/await keyword
 */

import { expect } from "chai";
import { describe } from "mocha";
import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '5986e01153039fe076da3b94b1bcefa1d18f925cc54f3c9e9fced3244f90576f';

describe('Users', function() {

    let userId;

    describe('POST', () => {
        
        it('/users', async function() {
            let randInt = Math.floor(Math.random() * 999);
            const data = {
                "email": `test-${randInt}@mail.com`,
                "name": `test - ${randInt}`,
                "gender": "male",
                "status": "active"
            };

            const res = await request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data);

            expect(res.body.data).to.deep.include(data);
            userId = res.body.data.id;
            
        });
    });

    describe('GET', () => {

        it('/users', async function() {

            const res = await request
            .get(`users?access-token=${TOKEN}`);
            
            expect(res.body.data).to.not.be.empty;
        });

        it('/users/:id', async function() {

            const res = await request
            .get(`users/${userId}?access-token=${TOKEN}`);
            
            expect(res.body.data.id).to.be.eq(userId);
        });

        it('/users with query params', async function() {
            const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;

            const res = await request
            .get(url)
            
            res.body.data.forEach(obj => {
                expect(obj.gender).to.eq('female');
                expect(obj.status).to.eq('active');
            });
        });
    });

    describe('PUT', () => {
        it('PUT /users/:id', async function() {
            const data = {
                "status": "active",
                "gender": "male"
            };

            const res = await request
            .put(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
            
            expect(res.body.data).to.deep.include(data);
        });
    })
    
    describe('DELETE', () => {
        it('DELETE /users/:id', async function() {
            const res = await request
            .delete(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`);
            
            expect(res.body.data).to.eq(null);
        });
    });
}); 
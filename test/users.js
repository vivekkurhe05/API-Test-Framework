import { expect } from "chai";
import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '5986e01153039fe076da3b94b1bcefa1d18f925cc54f3c9e9fced3244f90576f';

describe('Users', function() {

    it('GET /users', function() {

        return request
            .get(`users?access-token=${TOKEN}`)
            .then((res) => {
                expect(res.body.data).to.not.be.empty;
            });
    });

    it('GET /users/:id', function() {

        return request
            .get(`users/1?access-token=${TOKEN}`)
            .then((res) => {
                expect(res.body.data.id).to.be.eq(1);
            })
    });

    it('GET /users with query params', function() {
        const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;

        return request
        .get(url)
        .then((res) => {
            res.body.data.forEach(obj => {
                expect(obj.gender).to.eq('male');
                expect(obj.status).to.eq('active');
            });
        });
    });

    it('POST /users', function() {
        const data = {
            "email": "test@mail.com",
            "name": "test1",
            "gender": "male",
            "status": "active"
        };

        return request
        .post('users')
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
            expect(res.body.data).to.deep.include(data);
        });
    });

    it('PUT /users/:id', function() {
        const data = {
            "status": "active",
            "gender": "male"
        };

        return request
        .put('users/127')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
            expect(res.body.data).to.deep.include(data);
        });
    });

    it('DELETE /users/:id', function() {
        return request
        .delete('users/2')
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(res => {
            expect(res.body.data).to.eq(null);
        });
    });
}); 
/**
 * Using async/await keywords 
 */

require('dotenv').config();
import request from "../config/common";
const faker = require('faker');
import { expect } from "chai";
import { describe } from "mocha";

import { createRandomUser } from "../helper/user_helper";


const TOKEN = process.env.USER_TOKEN;

describe('User Posts', () => {

    let postId, userId;

    before(async () => {
        userId = await createRandomUser();
    });
        

    it('/posts', async () => {
        
        const data = {
            "user_id": userId,
            "title": faker.lorem.sentence(),
            "body": faker.lorem.paragraphs()
        }

        const postRes = await request
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);

        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
    });
    
    it('GET /posts/:id', async () => {
        
        await request
        .get(`posts/${postId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(200);

    });

    describe('Negative Tests', () => {
        
        it('401 Authentication Failed', async () => {
            const data = {
                user_id: userId,
                title: 'My title',
                body: 'My blog post'
            }

            const postRes = await request.post('posts').send(data);

            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');
        });

        it('422 Validation Failed', async () => {
            const data = {
                user_id: userId,
                title: 'My title',
            }

            const postRes = await request.post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

            expect(postRes.body.code).to.eq(422);
            expect(postRes.body.data[0].field).to.eq("body");
            expect(postRes.body.data[0].message).to.eq("can't be blank");
        });
    });
});
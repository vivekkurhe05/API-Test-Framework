/**
 * Using async/await keywords 
 */

import { expect } from "chai";
import { describe } from "mocha";
import supertest from "supertest";
import { createRandomUser } from "../helper/user_helper";
const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = '5986e01153039fe076da3b94b1bcefa1d18f925cc54f3c9e9fced3244f90576f';

describe('User Posts', () => {

    let postId, userId;

    before(async () => {
        userId = await createRandomUser();
    });
        

    it('/posts', async () => {
        
        const data = {
            "user_id": userId,
            "title": "My title",
            "body": "my blog post"
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
});
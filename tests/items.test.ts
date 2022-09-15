import supertest from 'supertest';
import { createItem, createRandomItem }from './factories/itemFactory'
import app from '../src/app';
import { prisma } from "../src/database";

const agent=supertest(app);

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items;`;
});
let id;
describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto',async ()=>{
    const item= await createItem();
    const response = await agent.post('/items').send(item);
    id=response.body.id
    expect(response.status).toBe(201)
    const randomItem=await createRandomItem();
    const response2 = await agent.post('/items').send(randomItem);
    expect(response2.status).toBe(201)
  });
    

  it('Deve retornar 409, ao tentar cadastrar um item que exista',async ()=>{
    const item= await createItem();
    const response = await agent.post('/items').send(item);
    expect(response.status).toBe(409)
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array',async ()=>{
    const response = await agent.get('/items');
    expect(response.status).toBe(200)
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado',async ()=>{
    const response = await agent.get('/items/'+id);
    const item= await createItem();
    console.log(response.body)
    console.log(item.title)
    expect(response.body.title).toEqual(item.title)
    expect(response.body.url).toBe(item.url)
    expect(response.body.description).toBe(item.description)
    expect(response.body.amount).toBe(item.amount)
    expect(response.status).toBe(200)
  });
  it('Deve retornar status 404 caso não exista um item com esse id',async ()=>{
    const wrongId=id+10
    const response = await agent.get('/items/'+wrongId);
    expect(response.status).toBe(404)
  });

});

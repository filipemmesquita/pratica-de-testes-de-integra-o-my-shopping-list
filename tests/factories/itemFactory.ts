import { prisma } from "../../src/database";
import { faker } from '@faker-js/faker';

export async function createRandomItem () {
    const item = {
      title: faker.lorem.words(3),
      url: faker.internet.url(),
      description: faker.lorem.sentences(3),
      amount: faker.mersenne.rand(20,1)
    };
    return item;
  } 
  export async function createItem () {
    const item = {
      title: "this is a title",
      url: "https://www.thisisanurl.com",
      description: "this is a description. with two sentences.",
      amount: 2
    };
  

    return item;
  } 


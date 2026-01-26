import { test, expect } from '@playwright/test';

//https://dummyjson.com/ - Free Fake REST API for Placeholder JSON Data
test('should successfully create a new user via API POST request', async ({ request }) => {
  const newUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: "test@example.com"
  };

  const response = await request.post('https://dummyjson.com/users/add', {
    data: newUser,
  });

  // Verify the response status code is 201 Created
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  // Verify the response body contains the submitted data
  expect(responseBody.firstName).toBe(newUser.firstName);
  expect(responseBody.lastName).toBe(newUser.lastName);
  expect(responseBody.email).toBe(newUser.email);
  expect(responseBody).toHaveProperty('id');
});


// https://dummyjson.com/image/SIZE
test('should fetch an image as binary and validate content-type and size', async ({ request }) => {
  const url = 'https://dummyjson.com/image/150';
  const response = await request.get(url);

  // Verify successful response
  expect(response.ok()).toBeTruthy();
  //OR expect(response.status()).toBe(200);

  // Verify content-type is an image
  const contentType = response.headers()['content-type'] || response.headers()['Content-Type'];
  expect(contentType).toMatch(/image\//);

  // Read body as Buffer and assert non-empty
  const body = await response.body();
  console.log('Fetched image size (bytes):', body.length);
  expect(body.length).toBeGreaterThan(0);
});
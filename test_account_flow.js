const BASE_URL = 'http://localhost:4000/api';

async function makeRequest(method, url, data = null, headers = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function testAccountFlow() {
  console.log('=== Testing Account Flow for Test Test ===\n');

  let userId;
  let token;

  try {
    // 1. Register the user
    console.log('1. Registering user...');
    const registerResponse = await makeRequest('POST', `${BASE_URL}/auth/register`, {
      name: 'Test Test',
      email: 'test@test.com',
      password: 'password123',
      mobile: '1234567890',
      companyName: 'Test Company',
      companyAddress: 'Test Address'
    });
    userId = registerResponse.user.id;
    token = registerResponse.token;
    console.log('Registration successful. User ID:', userId);
    console.log('Token:', token.substring(0, 20) + '...');
    console.log('User data:', registerResponse.user);
    console.log();

    // 2. Login to verify
    console.log('2. Logging in...');
    const loginResponse = await makeRequest('POST', `${BASE_URL}/auth/login`, {
      email: 'test@test.com',
      password: 'password123'
    });
    console.log('Login successful. Token matches:', loginResponse.token === token);
    console.log();

    // 3. Deactivate account
    console.log('3. Deactivating account...');
    const deactivateResponse = await makeRequest('PUT', `${BASE_URL}/users/${userId}`, {
      isActive: false
    }, {
      Authorization: `Bearer ${token}`
    });
    console.log('Deactivation response:', deactivateResponse);
    console.log('User isActive:', deactivateResponse.user.isActive);
    console.log();

    // 4. Try to login after deactivation
    console.log('4. Attempting login after deactivation...');
    try {
      await makeRequest('POST', `${BASE_URL}/auth/login`, {
        email: 'test@test.com',
        password: 'password123'
      });
      console.log('Login succeeded - ERROR: Should have failed!');
    } catch (error) {
      console.log('Login failed as expected:', error.message);
    }
    console.log();

    // 5. Reactivate account
    console.log('5. Reactivating account...');
    const reactivateResponse = await makeRequest('PUT', `${BASE_URL}/users/${userId}`, {
      isActive: true
    }, {
      Authorization: `Bearer ${token}`
    });
    console.log('Reactivation response:', reactivateResponse);
    console.log('User isActive:', reactivateResponse.user.isActive);
    console.log();

    // 6. Login after reactivation
    console.log('6. Logging in after reactivation...');
    const loginAfterReactivate = await makeRequest('POST', `${BASE_URL}/auth/login`, {
      email: 'test@test.com',
      password: 'password123'
    });
    console.log('Login successful after reactivation.');
    console.log();

    // 7. Delete account
    console.log('7. Deleting account...');
    const deleteResponse = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Delete response status:', deleteResponse.status);
    console.log();

    // 8. Try to login after deletion
    console.log('8. Attempting login after deletion...');
    try {
      await makeRequest('POST', `${BASE_URL}/auth/login`, {
        email: 'test@test.com',
        password: 'password123'
      });
      console.log('Login succeeded - ERROR: Should have failed!');
    } catch (error) {
      console.log('Login failed as expected:', error.message);
    }
    console.log();

    // 9. Try to access /me after deletion
    console.log('9. Attempting to access /me after deletion...');
    try {
      await makeRequest('GET', `${BASE_URL}/auth/me`, null, {
        Authorization: `Bearer ${token}`
      });
      console.log('/me succeeded - ERROR: Should have failed!');
    } catch (error) {
      console.log('/me failed as expected:', error.message);
    }
    console.log();

  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testAccountFlow();

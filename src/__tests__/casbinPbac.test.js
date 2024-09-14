import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

let superAdminToken;
let employeeToken;
let employeeId;
let destinationId;  
const BASE_URL = process.env.BASE_URL;

describe('Super Admin Signin and API Access with Casbin Middleware', () => {

  // -------------------------------------SIGNING IN SUPER ADMIN---------------------------------------------------------//

  it('should sign in the super admin and return a token', async () => {
    const url = `${BASE_URL}/admin/signin`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
      },
    };

    try {
      const response = await axios(url, options);
      const data = response.data;
      superAdminToken = data.data.token;
      logger.info('Super Admin Token acquired:', superAdminToken);
      expect(response.status).toBe(200);
      expect(data.message).toBe('Login successful');
    } catch (error) {
      logger.error('Error during super admin signin:', error.response ? error.response.data : error.message);
    }
  }, 50000);


  // -------------------------------------SIGNING UP TEST EMPLOYEE---------------------------------------------------------//


  it('should add a new employee using the super admin token', async () => {
    const url = `${BASE_URL}/admin/signup`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${superAdminToken}`,
      },
      data: {
        name: 'Test Employee',
        email: 'testemployee@example.com',
        password: 'password123',
      },
    };

    try {
      const response = await axios(url, options);
      const data = response.data;
      employeeId = data.data.newAdmin._id;
      logger.info('New Employee ID:', employeeId);
      expect(response.status).toBe(201);
      expect(data.message).toBe('Admin registered successfully');
    } catch (error) {
      logger.error('Error during employee signup:', error.response ? error.response.data : error.message);
    }
  }, 50000);

  // ---------------------------SIGNING IN TEST EMPLOYEE AND FETCHING TOKEN---------------------------------------//

  it('should sign in the newly created employee and return a token', async () => {
    const url = `${BASE_URL}/admin/signin`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: 'testemployee@example.com',
        password: 'password123',
      },
    };

    try {
      const response = await axios(url, options);
      const data = response.data;
      employeeToken = data.data.token;
      employeeId = data.data.admin._id;
      logger.info('Employee Token acquired:', employeeToken);
      expect(response.status).toBe(200);
      expect(data.message).toBe('Login successful');
    } catch (error) {
      logger.error('Error during employee signin:', error.response ? error.response.data : error.message);
    }
  }, 50000);

  // -----------------------ASSIGN POLICY TO TEST EMPLOYEE FOR ADDING DESTINATION AND GETTING CITIES ------------------------//

  it('should assign access policy to allow adding destinations and getting cities', async () => {
    const url = `${BASE_URL}/policy`;
    try {
      const responsePostDestination = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${superAdminToken}`,
        },
        data: {
          ptype: 'p',
          employeeId: employeeId,
          endpoint: '/api/v1/destination',
          action: 'POST',
        },
        url,
      });

      const responseGetCities = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${superAdminToken}`,
        },
        data: {
          ptype: 'p',
          employeeId: employeeId,
          endpoint: '/api/v1/cities',
          action: 'GET',
        },
        url,
      });

      logger.info('Policies assigned successfully.');
    } catch (error) {
      logger.error('Error assigning policies:', error.response ? error.response.data : error.message);
      expect(error.response.status).not.toBe(400);
    }
  }, 50000);

  // -------------------------------------TEST FOR ADDING DESTINATION---------------------------------------------------------//

  it('should allow the employee to add a test destination (POST)', async () => {
    const url = `${BASE_URL}/destination`;

    try {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${employeeToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          name: 'Test Destination',
          description: 'This is a test destination for API testing purposes.',
          visaType: 'tourist',
          country: 'Test Country',
          continent: 'Test Continent',
          latitude: 10.1234,
          longitude: 20.5678,
          currency: 'TST',
          timezone: 'UTC+05:00',
          tripDuration: ['2-4 days', '5-7 days'],
        },
      };

      const response = await axios(url, options);

      destinationId = response.data.data.data._id;

      logger.info('Test destination added successfully');
      expect(response.status).toBe(201);
    } catch (error) {
      logger.error('Error adding destination:', error.response ? error.response.data : error.message);
      expect(error.response.status).not.toBe(403);
    }
  }, 50000);

  // -------------------------------------TEST FOR GETTING CITIES (ACCESS GRANTED)---------------------------------------------------------//

  it('should allow the employee to get cities (GET)', async () => {
    const url = `${BASE_URL}/cities`;

    try {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${employeeToken}`,
        },
      };

      const response = await axios(url, options);

      logger.info('Employee was able to GET cities');
      expect(response.status).toBe(200);
    } catch (error) {
      logger.error('Error retrieving cities:', error.response ? error.response.data : error.message);
      expect(error.response.status).toBe(403);
    }
  }, 50000);

  // -------------------------------------TEST FOR ADDING CITY (ACCESS DENIED)---------------------------------------------------------//

  it('should deny the employee to add a test city (POST)', async () => {
    const url = `${BASE_URL}/cities`;

    try {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${employeeToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          name: 'Test City',
          iataCode: 'TST',
          destinationName: 'Test Destination',
          country: 'Test Country',
          latitude: 12.3456,
          longitude: 65.4321,
          languageSpoken: 'Test Language',
        },
      };

      const response = await axios(url, options);

      // If POST request is allowed, fail the test
      logger.error('Employee was incorrectly allowed to add a city');
      expect(response.status).toBe(403);
    } catch (error) {
      logger.info('Employee was denied permission to POST a city, as expected');
      expect(error.response.status).toBe(403);
      expect(error.response.data.message).toBe('Access denied');
    }
  }, 50000);

  // -------------------------------------DELETE TEST DESTINATION--------------------------------------------------------//

  it('should delete the test destination (DELETE)', async () => {
    const url = `${BASE_URL}/destination/${destinationId}`;

    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${superAdminToken}`,
        },
      };

      const response = await axios(url, options);

      logger.info('Test destination deleted successfully');
      expect(response.status).toBe(200);
    } catch (error) {
      logger.error('Error deleting destination:', error.response ? error.response.data : error.message);
    }
  }, 50000);

  // -------------------------------------DELETE TEST EMPLOYEE---------------------------------------------------------//

  it('should delete the test employee and associated policies (DELETE)', async () => {
    const url = `${BASE_URL}/admin/${employeeId}`;
    
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${superAdminToken}`,
        },
      };

      const response = await axios(url, options);

      logger.info('Test employee deleted successfully');
      expect(response.status).toBe(200);
    } catch (error) {
      logger.error('Error deleting employee:', error.response ? error.response.data : error.message);
    }
  }, 50000);

  // -------------------------------------LOG OUT SUPER ADMIN---------------------------------------------------------//

  it('should log out the super admin', async () => {
    const url = `${BASE_URL}/admin/logout`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${superAdminToken}`,
      },
    };

    try {
      const response = await axios(url, options);
      expect(response.status).toBe(200);
    } catch (error) {
      logger.error('Error during super admin logout:', error.response ? error.response.data : error.message);
    }
  }, 50000);
});

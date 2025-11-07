# Toy Robot Simulator

The frontend is React and was setup with Vite. The backend uses the nestjs framework with a sqlite database and the Sequelize ORM.

## To run the application:
In a terminal, 
1. Navigate to the frontend directory and run `npm run dev` and then 
2. Navigate to the backend directory and run `npm run start:dev` (you might have to do this in another terminal window). 
3. In a browser, navigate to http://127.0.0.1:5173/

## Unit tests
I did not have time to add unit tests for either the frontend or backend. At a minimum, I would add the following given more time:
- tests for each endpoint in the backend
- tests to make sure all of the react components rendered on the page
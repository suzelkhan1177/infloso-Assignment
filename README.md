# infloso Assignment

# User Management API

This project is a User Management API, providing functionalities such as user registration, login, forgot password, and password reset. The API is built using Node.js, Express, and MySQL.

## Features

- **User Signup**: Register new users.
- **User Login**: Authenticate registered users.
- **Forgot Password**: Request a password reset link.
- **Reset Password**: Update password using the reset link.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MySQL
- **Libraries**: Nodemailer, Bcrypt, JWT, Crypto
- **Logging**: Custom Logger Configuration (`winston` or other logger)
- **Email Service**: Nodemailer (configured for sending password reset emails)


## Start the Server
To start the server, run the following command:
### `cd Backend`
### `npm install`
### `npm start`

The server should be running on Open [http://localhost:5000](http://localhost:5000).


## API Endpoints

- **Create a new user account**: `POST /api/v1/signup`	
- **Authenticate user and return a JWT**: `POST /api/v1/login`
- **Initiate password reset process**: `GET /api/v1/forgot_password/:email`	
- **Reset the user's password**: `POST /api/v1/resetPassword/:token`


 # Getting Started  React App
### `cd FrontEnd`
### `npm install`
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Frontend Routes

The application includes the following frontend routes:

- **Login Page**: `/`  
  - Redirects to the login page if the user is not authenticated, otherwise navigates to the dashboard.
- **Signup Page**: `/signup`
  - Redirects to the signup page if the user is not authenticated, otherwise navigates to the dashboard.
- **Dashboard**: `/dashboard`
  - Displays the dashboard for authenticated users.
- **Forgot Password Page**: `/forgot_password`
  - Allows users to initiate the password reset process.
- **Reset Password Page**: `/reset_password/:token`
  - Allows users to reset their password using a token.




## Login And SignUp Pages

<div> 
  <img src="https://github.com/user-attachments/assets/f4d3065d-c69b-4fe8-99ba-3cb1dbc3f907" width="390" height="300px">
    <img src="https://github.com/user-attachments/assets/d6f89f0e-f4d5-4d27-a04c-a2177088ea33" width="370" height="300px">
</div>

## DashBoard Page 
<div> 
  <img src="https://github.com/user-attachments/assets/262c6775-1f3f-4088-9e1a-4dae526b527f" width="800" height="250px">
</div>

## Forgot Password And Reset Password Pages

<div> 
  <img src="https://github.com/user-attachments/assets/7d7b39b9-e78c-40c0-913f-eeebbd51e495" width="390" height="300px">
    <img src="https://github.com/user-attachments/assets/add69ac6-498e-4d85-a26f-f9dd7cd58896" width="370" height="300px">
</div>

## Environment Setup

Create a `.env` file in the root directory of the project and add the following variables:
<div> 
  <img src="https://github.com/user-attachments/assets/9cb3421f-7eec-46e1-baa7-9a2303cfaacd" width="800" height="250px">
</div>

## Send Forgot Password Email

To send a forgot password email, please provide your email ID:

<div> 
  <img src="https://github.com/user-attachments/assets/3427eed9-6bf6-4ce2-b935-60dfba5d6981" width="800" height="250px" alt="Forgot Password Email Interface">
</div>


## DB MySQL Table: User
The following image provides an overview of the `User` table in the MySQL database:
<div> 
  <img src="https://github.com/user-attachments/assets/0e085f18-32a0-4c9c-902d-89f6fdefab51" width="1000" height="250px" alt="User Table Structure">
</div>


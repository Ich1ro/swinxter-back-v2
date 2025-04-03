const mailHtml = (data, link, text) => {
	console.log(data, '=================================');
	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Hot Date Couple Matching!</title>
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color:#333333;
                }
                .container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #FFFFFF;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #F79220;
                }
                .header h1 {
                    color: #FFFFFF;
                }
                .content {
                    padding: 20px;
                }
                .button-container {
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #F79220;
                    color: #FFFFFF;
                    text-decoration: none;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
            <h1>Welcome to Swinxter!</h1>
        </div>
                <div class="content">
                    <p><h4>Hello ${data.name},</h4></p>
                    <p>${text}</p>
                    <p><h4>Your registration details:</h4></p>
                    <ul>
                        <li><strong>Name:</strong> ${data.name}</li>
                        <li><strong>Email:</strong> ${data.email}</li>
                    </ul>
                    <p><h4>We look forward to helping you find your perfect match. Get started by completing your profile and exploring potential matches on our platform.</h4></p>
                    <p><h4>If you have any questions or need assistance, feel free to contact our support team.</h4></p>
                    <div class="button-container">
                        <a class="button" href=${link} target="_blank">Verify Email</a>
                    </div>
                </div>
                <div class="footer">
                    <p>&copy; 2023 Hot Date Couple. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
const forgetMail = (name, OTP) => {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Hot Date Couple Matching!</title>
      <style>
          /* Add your custom CSS styles here */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #333333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #FFFFFF;
              border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 20px 0;
              background-color: #F79220;
          }
          .header h1 {
              color: #FFFFFF;
          }
          .content {
              padding: 20px;
          }
          .button-container {
              text-align: center;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #F79220;
              color: #FFFFFF;
              text-decoration: none;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
      <div class="header">
      <h1>Welcome to Swinxter!</h1>
  </div>
          <div class="content">
              <h1>Password Reset OTP</h1>
              <p><h4>Hello ${name},</h4></p>
              <p><h4>Your requested OTP for password reset is:</h4></p>
              <h2>${OTP}</h2>
              <p><h4>This OTP is valid for a limited time. Please use it to reset your password.</h4></p>
              <p><h4>If you didn't request this OTP, please ignore this email.</h4></p>
              <p>Best regards,<br>https://hot-date.vercel.app/</p>
              </div>`;
};
const change_passMail = (title, name, text) => {
	return `<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Welcome to Hot Date Couple Matching!</title>
     <style>
         /* Add your custom CSS styles here */
         body {
             font-family: Arial, sans-serif;
             margin: 0;
             padding: 0;
             background-color:#333333;
         }
         .container {
            max-width: 600px;
            margin: 30px auto;
            border: 1px solid #ccc; /* Add a border around the container */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         }
         .header {
             text-align: center;
             padding: 20px 0;
             background-color: #F79220;
         }
         .header h1 {
             color: #FFFFFF;
         }
         .content {
             padding: 20px;
         }
         .button-container {
             text-align: center;
         }
         .button {
             display: inline-block;
             padding: 10px 20px;
             background-color: #F79220;
             color: #FFFFFF;
             text-decoration: none;
         }
         .footer {
             text-align: center;
             padding: 10px 0;
         }
     </style>
 </head>
 <body>
     <div class="container">
     <div class="header">
     <!-- Check the image source URL and make sure it's correct -->
     <h1>Welcome to Swinxter!</h1>
 </div>
         <div class="content">
         <h1>${title}</h1>
         <p><h4>Hello ${name},</h4></p>
         <p><h4>${text}</h4></p>
         <p>Best regards,<br>https://hot-date.vercel.app/</p>
         </div>
         `;
};
const payment_reminder = name => {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swinxter - The world's largest dating and social network for adults!</title>
      <style>
          /* Add your custom CSS styles here */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color:#333333;
          }
          .container {
             max-width: 600px;
             margin: 30px auto;
             /* border: 1px solid #ccc; Add a border around the container */
             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
             background-color: #fff
          }
          .header {
              padding: 20px ;
              background-color: #000;
              display: flex;
              align-items: center;
          }
          .header h1 {
              color: #FFFFFF;
          }
          .content {
              padding: 20px;
          }
          .button-container {
              text-align: center;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #F79220;
              color: #FFFFFF;
              text-decoration: none;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
      <div class="header">
         <img style="width:60px; margin-right:10px" src="https://swinxter-v2.vercel.app/landingPage/images/SwinxterLogo-bg.png">
         <h1>Swinxter Inc.</h1>
     </div>
     <div class="content">
         <!-- <h2 style="text-align: center">Welcome to Swinxter</h2><p style="margin-top: -15px; color: #999; text-align: center; margin-bottom: 20px">Best adult dating site.</p> -->
         <p>Dear Member,
         <p>We hope you are enjoying your 1-month membership at <a href="https://swinxter-v2.vercel.app/">Swinxter.com</a>. We are writing to remind you that your membership will end in 3 days, and you will be automatically charged according to your chosen membership plan.</p>
         <p><b>Membership Details:</b></p>
         <div style="line-height: .5">
          <p><b>Plan Name:</b> 1-Month Membership Package</p>
          <p><b>Duration:</b> 1 Month</p>
          <p><b>Amount:</b> $24.99</p>
         </div>
         <p>If you wish to cancel or change your plan, please visit your account settings before the end of the plan. Otherwise, no action is required from your side.</p>
         <p>Sincerely,<br>
         <b>The Swinxter Team</b></p>
     </div>
     <div style="padding: 20px; background-color: #eee">
       <h3>Contact Us:</h3>
       <p>To talk to us, drop an email to help@swinxter.com</p>
     </div>
     <div style="width: 100%; background-color: #000; text-align: center; color: #fff; padding: 7px 0">
       <p>Copyright © 2023-present SWINXTER Inc. All Rights Reserved.</p>
     </div>
      </div>
         `;
};
const welcome_user = name => {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swinxter - The world's largest dating and social network for adults!</title>
      <style>
          /* Add your custom CSS styles here */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color:#333333;
          }
          .container {
             max-width: 600px;
             margin: 30px auto;
             /* border: 1px solid #ccc; Add a border around the container */
             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
             background-color: #fff
          }
          .header {
              padding: 20px ;
              background-color: #000;
              display: flex;
              align-items: center;
          }
          .header h1 {
              color: #FFFFFF;
          }
          .content {
              padding: 20px;
          }
          .button-container {
              text-align: center;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #F79220;
              color: #FFFFFF;
              text-decoration: none;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
      <div class="header">
         <img style="width:60px; margin-right:10px" src="https://swinxter-v2.vercel.app/landingPage/images/SwinxterLogo-bg.png">
         <h1>Swinxter Inc.</h1>
     </div>
     <div class="content">
        <div style="line-height: 0.4">
            <h1 style="text-align: center; font-size: 38px; margin: 0; line-height: 1">Welcome to Swinxter</h1>
            <p style="color: #999; text-align: center; margin-bottom: 20px">Best adult dating site.</p>
        </div>
         <p>Dear ${name},
         <p>We are thrilled to have you on board, and we hope you're as excited as we are to explore the fantastic features and benefits that await you.</p>
         <p>Please enjoy your 3-week FREE trial membership and explore our website's features. After the trial period, your chosen membership will activate automatically, providing uninterrupted access to our premium features</p>
         <p><b>Your chosen membership details:</b></p>
         <ul>
             <li><b>Membership Plan:</b> 1-month membership package</li>
             <li><b>Renewal Date:</b> 21 Feb, 2024</li>
             <li><b>Renewal Amount:</b> $24.99</li>
         </ul>
         <p>To give you a quick overview, here are the membership plans we offer mentioned below:</p>
     </div>
     <div style="width: 100%; gap: 20px; background-color:#000; color: #fff;padding: 20px 0">
       <h2 style="text-align: center">Membership Plans</h2> 
       <p style="text-align:center">Check out all our membership plans available.</p>
       <div style="margin-top: 30px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; padding: 0 20px">
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>3 Day Package</p>
           <h1 style="color: orange; font-size: 22px">Free</h1>
           <p>All services included</p>
         </div>
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>1 Week Package</p>
           <h1 style="color: orange; font-size: 22px">$14.99</h1>
           <p>All services included</p>
         </div>
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>1 Month Package</p>
           <h1 style="color: orange; font-size: 22px">$24.99</h1>
           <p>All services included</p>
         </div>
         </div>
        <div style="margin-top: 30px; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding: 0 20px; margin-bottom: 20px">
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>3 Month Package</p>
           <h1 style="color: orange; font-size: 22px">$46.99</h1>
           <p>All services included</p>
         </div>
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>6 Month Package</p>
           <h1 style="color: orange; font-size: 22px">$77.99</h1>
           <p>All services included</p>
         </div>
         <div style="background-color: #2A2D37; border-radius: 10px; padding: 10px; text-align:center">
           <p>9 Month Package</p>
           <h1 style="color: orange; font-size: 22px">$119.99</h1>
           <p>All services included</p>
         </div>
        </div>
       </div>
    <div class="content">
         <p><b>What you need to know:</b></p>
         <ol>
             <li>Your membershiip will renew automatically on the specified renewal date.</li>
             <li>We will charge the renewal amount to the payment method we have on file.</li>
             <li>You will receive a detailed invoice for the renewal transaction by email.</li>
             <li>You can manage your account settings on our website or contact our support team if you have any questions.</li>
         </ol>
         <p>Thank you for choosing <a href="https://swinxter-v2.vercel.app/">Swinxter.com</a>. We value your continued support and look forward to serving you for another membership cycle.</p>
         <p>Have fun,<br><b>The Swinxter Team</b></p>
     </div>
     <div style="padding: 20px; background-color: #eee">
       <h3>Contact Us:</h3>
       <p>To talk to us, drop an email to help@swinxter.com</p>
     </div>
     <div style="width: 100%; background-color: #000; text-align: center; color: #fff; padding: 7px 0">
       <p>Copyright © 2023-present SWINXTER Inc. All Rights Reserved.</p>
     </div>
      </div>
         `;
};
module.exports = {
	mailHtml,
	forgetMail,
	change_passMail,
	welcome_user,
	payment_reminder,
};

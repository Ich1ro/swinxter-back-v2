const userModel = require("../Model/usersModel");
const nodemailer = require("nodemailer");
const Mailsend = require("../helper/mail");
const bcrypt = require("bcrypt");
const admin = process.env.Admin_email;
module.exports = {
  async addModel(req, res) {
    try {
      const {
        firstName,
        lastName,
        DOB,
        lookingFor,
        marital_status,
        booking_price,
        body_type,
        username,
        email,
        password,
        language,
      } = req.body;
      console.log(req.body);
      if (
        (!firstName,
        !lastName,
        !DOB,
        !lookingFor,
        !email,
        !password,
        !booking_price,
        !marital_status,
        !username,
        !body_type,
        !language)
      ) {
        return res.status(400).send("Required data is missing.");
      }
      let images = [];
      let videos = [];
      // Check if images were uploaded
      if (req.files["images"]) {
        for (const image of req.files["images"]) {
          images.push(`${process.env.Backend_URL_Image}${image.filename}`);
        }
      }
      // Check if videos were uploaded
      if (req.files["videos"]) {
        for (const video of req.files["videos"]) {
          videos.push(`${process.env.Backend_URL_Image}${video.filename}`);
        }
      }
      const hash = await bcrypt.hashSync(password, 10);
      const data = await userModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        username: username,
        DOB: DOB,
        lookingFor: lookingFor,
        booking_price: booking_price,
        marital_status: marital_status,
        body_type: body_type,
        language: language,
        role: "model",
        images: images,
        videos: videos,
      });
      if (!data) {
        return res.status(400).send("something went wrong");
      } else {
        const verificationLink = `${process.env.EmailVerify_link}${data._id}`;
        let emailHtml = `
        <!doctype html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Email Verification</title>
            <meta name="description" content="Email Verification Template.">
            <style type="text/css">
                a:hover { text-decoration: underline !important; }
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #F2F3F8;" leftmargin="0">
            <!-- 100% body table -->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#F2F3F8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700%7COpen+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #F2F3F8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height: 80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height: 20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height: 40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Email Verification</h1>
                                                <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #CECECE; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Thank you for signing up. Please verify your email address by clicking the button below.</p>
                                                <a  href="${verificationLink}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height: 40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height: 80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!-- /100% body table -->
        </body>
        
        </html>
        `;
        var mailOptions = {
          from: process.env.Nodemailer_id,
          to: email,
          subject: "model verify",
          html: emailHtml,
        };
        Mailsend(req, res, mailOptions);

        return res
          .status(201)
          .json({ message: "Model request submitted for approval." });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async find(req, res) {
    try {
      const { q } = req.query;
      const data = await userModel.find({ role: "model" });
      const total = await userModel.count();
      console.log(total, "total");
      if (q) {
        let result = await userModel.find({
          $or: [
            { role: "model" },
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
            { username: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } },
          ],
          role: "model",
        });
        console.log(q, result);
        return res.status(200).send({ data: result, total: total });
      }
      return res.status(200).send({ data, total: total });
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async booking_model(req, res) {
    try {
      const { modelId } = req.params;
      const { userId } = req.body;
      const exist = await userModel.findOne({ _id: modelId });
      if (exist.booking_by !== undefined) {
        return res.status(404).send("model already booked");
      }
      const update = await userModel.findOneAndUpdate(
        { _id: modelId },
        { booking_by: userId },
        { new: true },
      );

      let html = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Model Book </title>
            </head>
            <body>
                <p>Hello Model</p>
                <p>Your booking has been confirmed. We look forward to seeing you soon!</p>
            </body>
            </html>
            `;
      const mailOptions = {
        from: process.env.Nodemailer_id,
        to: update.email,
        subject: "Book Model",
        html: html,
      };
      Mailsend(req, res, mailOptions);
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async update_wallet(req, res) {
    try {
      const { modelId } = req.params;
      const { userId, amount } = req.body;
      if ((!modelId, !amount)) {
        return res.status(400).send("required the data");
      }

      const get = await userModel.findOne({ _id: modelId });
      if (!get) {
        return res.status(400).send("model not exist");
      }
      const data = await userModel.findOneAndUpdate(
        { _id: modelId },
        { paymentUser: userId, wallet: get.wallet + amount },
        { new: true },
      );
      const user = await userModel.findOneAndUpdate(
        { _id: userId },
        { wallet: req.user.wallet - amount },
        { new: true },
      );
      if (!data) {
        return res.status(400).send("something went wrong");
      } else {
        return res.status(200).send("data update successfully");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  },
  async is_modelverify(req, res) {
    try {
      const { modelId } = req.params;
      const { status } = req.body;
      const exist = await userModel.findOne({ _id: modelId });
      if (!exist) {
        return res.status(404).send("model not found");
      }

      let text = "";
      if (status == "approve") {
        text = "Congratulations! Your account registration has been approved.";
      } else {
        text = "Your account registration has been rejected.";
      }
      const mailOptions = {
        from: process.env.Nodemailer_id,
        to: exist.email, // Make sure exist.email contains a valid email address
        subject: "Account registration", // Subject of the email
        html: `<h4>${text}</h4>`, // Email content in HTML format
      };

      if (!exist.email) {
        return res.status(400).send("Email address not found for the model");
      }

      if (status == "approve") {
        const data = await userModel.findByIdAndUpdate(
          { _id: exist._id },
          { modelVerify: true },
          { new: true },
        );
        Mailsend(req, res, mailOptions);
        return res.status(200).send("approved your model account");
      } else if (status == "reject") {
        const data = await userModel.findByIdAndDelete(
          { _id: exist._id },
          { new: true },
        );
        Mailsend(req, res, mailOptions);
      } else {
        return res.status(500).send("something went wrong");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async isLive(req, res) {
    try {
      const data = await userModel.find({ isLive: true });
      if (!data) {
        return res.status(400).send("data not found");
      } else {
        return res.status(200).send(data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async verify_mail(req, res) {
    try {
      const { modelId } = req.params;
      if (!modelId) {
        return res.status(400).send("model Id is required");
      }
      const exist = await userModel.findOne({ _id: modelId });
      if (!exist) {
        return res.status(404).send("model not found");
      }
      console.log(exist.isVerify);
      if (exist.isVerify === true) {
        const mailOptions = {
          from: process.env.Nodemailer_id,
          to: admin,
          subject: "New Model Created",
          html: `<h4>
        Dear Admin,
        A new Model request has been submitted for approval. The Model name is ${exist.username}.
        Please review the request and take appropriate action.
        Best regards,
        The Model Management Team</h4>`,
        };
        console.log("Notification email sent to admin");
        Mailsend(req, res, mailOptions);
      } else {
        return res.status(400).send("model not verified");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};

// const MERCHANT_ID = "YOUR_MERCHANT_ID";
// const MERCHANT_KEY = "YOUR_MERCHANT_KEY";
// const WEBSITE = "YOUR_WEBSITE";
// const CHANNEL_ID = "YOUR_CHANNEL_ID";
// const INDUSTRY_TYPE_ID = "YOUR_INDUSTRY_TYPE_ID";
// const CALLBACK_URL = "YOUR_CALLBACK_URL";

//  async update_wallet (req, res) => {
//   const { modelId, userId, amount } = req.body;
//   try {
//     const existingModel = await model.findById(modelId);
//     if (!existingModel) {
//       return res.status(404).json({ error: "Model not found" });
//     }

//     const existingUser = await userModel.findById(userId);
//     if (!existingUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Generate unique order ID
//     const orderId = `ORDER${Date.now()}`;
//     // Create the request data for Paytm
//     const requestData = {
//       MID: MERCHANT_ID,
//       ORDER_ID: orderId,
//       CUST_ID: modelId,
//       INDUSTRY_TYPE_ID,
//       CHANNEL_ID,
//       TXN_AMOUNT: amount.toString(),
//       WEBSITE,
//       CALLBACK_URL,
//       CHECKSUMHASH: "", // Placeholder for the checksum
//     };

//     // Generate checksum using Paytm merchant key
//     requestData.CHECKSUMHASH = generateChecksum(requestData, MERCHANT_KEY);

//     // Save the transaction details in the model
//     existingModel.wallet += amount;
//     existingModel.paymentUser = userId;
//     await existingModel.save();

//     // Deduct the amount from the user's wallet
//     existingUser.wallet -= amount;
//     await existingUser.save();

//     // Make the payment request to Paytm
//     const response = await axios.post("https://securegw.paytm.in/order/process", requestData);

//     // Redirect the user to the Paytm payment page
//     return res.json(response.data);
//   } catch (error) {
//     console.error("Error making payment:", error.message);
//     return res.status(500).json({ error: "Error making payment" });
//   }
// });

// // Generate the checksum using Paytm merchant key
// function generateChecksum(data, key) {
//   const sortedData = Object.keys(data)
//     .sort()
//     .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});

//   const checksumString = Object.keys(sortedData)
//     .map((key) => `${key}=${sortedData[key]}`)
//     .join("&");

//   return crypto.createHmac("sha256", key).update(checksumString).digest("hex");
// }

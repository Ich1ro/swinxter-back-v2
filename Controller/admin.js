const adminUser = require("../Model/adminUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bannerModel = require('../Model/bannerModel')
const { S3Manager } = require('../utils/s3')

module.exports = {
  async get_users(req, res) {
    try {
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async login(req,res){
    try {
      const {username,password} = req.body;
      const user = await adminUser.findOne({username:username});
      if(!user){
        return res.status(400).send("User not found");
      }
      const passCheck = await bcrypt.compare(password,user.password);
      if(passCheck){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRETKEY);
        const {password: pass, ...rest} = user._doc;
        const options = {
					expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
					httpOnly: true,
					sameSite: 'none',
					secure: true,
				};
        return res.cookie('access_token', token, options).status(200).send(rest);
      }
      else{
        return res.status(400).send("Invalid Credentials");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async signup(req, res) {
    try {
      const {name,username,password,events,clubs,situationships,users,admins} = req.body;
      const exist = await adminUser.findOne({username:username});
      if(exist){
        return res.status(400).send("username already exist");
      }
      const hash_password = await bcrypt.hash(password,10);
      console.log(hash_password);
      const data = await adminUser.create({
        ...req.body,
      });
      data.password = hash_password;
      await data.save();
      if(!data){
        return res.status(400).send("Failed to create the user");
      }
      else{
        return res.status(201).send(data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async create_banner(req, res) {
		try {
			if (!req.file) {
				return res.status(400).send({ message: 'Image required' });
			}
      console.log(req.file);
			const file = req.file;

			const imageUrl = await S3Manager.put(`${req.body.page}_banners`, file);

			const imgUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageUrl}`;

			const banner = new bannerModel({
				title: req.body.title || '',
				page: req.body.page || '',
				active: req.body.active ? true : false || false,
				imgUrl: imgUrl,
			});

			await banner.save();

			return res.status(201).send(banner);
		} catch (e) {
			console.error(e);
			res.status(500).send({ message: 'Internal server error' });
		}
	},
	async update_banner(req, res) {
		try {
			const { id } = req.params;
			const { title, page, active } = req.body;

			const banner = await bannerModel.findById(id);
			if (!banner) {
				return res.status(404).json({ message: 'Banner not found' });
			}

			banner.title = title || banner.title;
			banner.page = page || banner.page;
			banner.active = active || banner.active;

			await banner.save();

			return res.status(200).send(banner);
		} catch (e) {
			console.error(e);
			return res
				.status(500)
				.send({ message: 'Internal server error'});
		}
	},
  async getBanners(req,res){
    try {
      const data = await bannerModel.find({});
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async getBannersByPage(req,res){
    try {
      const { page } = req.params;
      const data = await bannerModel.find({page});
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async getBannerById(req,res){
    try {
      const { id } = req.params;
      const data = await bannerModel.findById(id);
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async adminUsers(req,res){
    try {
      const data = await adminUser.find({});
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body.data;
      console.log(req.body);
      
  
      const updatedAdmin = await adminUser.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (!updatedAdmin) {
        return res.status(404).send({ message: "Admin not found" });
      }
  
      return res.status(200).send(updatedAdmin);
    } catch (e) {
      return res.status(500).send({ message: "Error updating admin", error: e });
    }
  },
  async deleteBanner(req,res){
    try {
      const data = await bannerModel.findOneAndDelete({ _id: req.params.id });
      return res.status(200).send("Banner delete successfully");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async deleteUsers(req,res){
    try {
      const data = await adminUser.findOneAndDelete({ _id: req.params.id });
      return res.status(200).send("User delete successfully");
    } catch (e) {
      return res.status(500).send(e);
    }
  }
};

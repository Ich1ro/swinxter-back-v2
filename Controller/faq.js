const faq = require("../Model/faq");
const faqModel = require("../Model/faq");

module.exports = {
  async create_faq(req, res) {
    try {
      const { question, answer } = req.body;
      if ((!question, !answer)) {
        return res.status(400).send("required the data");
      }
      const data = await faqModel.create({ ...req.body });
      if (!data) {
        return res.status(400).send("something went wrong");
      } else {
        return res.status(200).send("data create successfully");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async get_faq(req, res) {
    try {
      const data = await userModel.find({});
      if (!data) {
        return res.status(400).send("something went wrong");
      } else {
        return res.status(200).send(data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async update_faq(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send("required faq id");
      }
      const data = await faqModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true },
      );
      if (!data) {
        return res.status(404).send("faq is not exist");
      } else {
        return res.status(200).send("data update successfully");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async delete_faq(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send("required faq id");
      }
      const data = await faqModel.findOneAndDelete({ _id: id });
      if (!data) {
        return res.status(404).send("faq is not exist");
      } else {
        return res.status(200).send("data delete successfully");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
};

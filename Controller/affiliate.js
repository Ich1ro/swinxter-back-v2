const affiliateModel = require("../Model/affiliateModel");
const crypto = require('crypto')

function generateCode() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(8, (err, buffer) => {
        if (err) return reject(err);
        const code = buffer.toString('hex');
        affiliateModel.findOne({ code }).then(existingLink => {
          if (existingLink) {``
            return resolve(generateCode());
          }
          resolve(code);
        }).catch(error => reject(error));
      });
    });
  }

module.exports = {
    async create_affiliate(req, res) {
        const {
            discountByPrice,
            discountByPerc,
            discount,
            expiry,
            usedByUser,
        } = req.body;
        try {
            const code = await generateCode();
            const data = await affiliateModel.create({
                code,
                discountByPrice,
                discountByPerc,
                discount,
                expiry,
                usedByUser,
            });
            return res.status(201).send("Affiliate link created successfully");
        } catch (error) {
            res.status(500).send("Error creating affinity link: " + error);
        }
    },
    async get_all_affiliate(req, res) {
        try {
            const data = await affiliateModel.find({});
            return res.status(200).send(data);
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    async get_affiliate(req,res){
        const { id } = req.params;
        try {
            const doc = await affiliateModel.findById(id);
            if (!doc) {
            return res.status(404).json({ message: 'Affiliate link not found' });
            }
            return res.status(200).send(doc);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    },
    async redeem_affiliate(req,res){
        const { id, userId } = req.params;
        try {
            const link = await affiliateModel.findById(id);
            if (!link) {
                return res.status(404).send("Affiliate link not found");
            }

            if (link.usedByUser.includes(userId)) {
                return res.status(400).send("This link has already been used by this user");
            }
            link.usedByUser.push(userId);
            await link.save();
            res.send("Affiliate link marked successfully");

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error marking affiliate link as used' });
        }
    }
}
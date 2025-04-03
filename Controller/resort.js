const resort = require('../Model/resortModel');

module.exports = {
	async get_resorts(req, res) {
		try {
			const data = await resort.find();
			if (!data) {
				return res.status(400).send('something went wrong');
			} else {
				return res.status(200).send(data);
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async get_resort_by_id(req, res) {
		try {
			const { id } = req.params;
			const data = await resort.findById(id);
			if (!data) {
				return res.status(400).send('something went wrong');
			} else {
				return res.status(200).send(data);
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async create_resort(req, res) {
		const { data } = req.body;
		try {
			const resortData = await resort.create(data);
			if (!resortData) {
				return res.status(400).send('something went wrong');
			} else {
				return res.status(200).send(data);
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},

	async update_resort(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).send('required resort id');
			}
			const data = await resort.findOneAndUpdate(
				{ _id: id },
				{ ...req.body },
				{ new: true }
			);
			if (!data) {
				return res.status(404).send('resort is not exist');
			} else {
				return res.status(200).send('data update successfully');
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async delete_resort(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).send('required resort id');
			}
			const data = await resort.findOneAndDelete({ _id: id });
			if (!data) {
				return res.status(404).send('resort is not exist');
			} else {
				return res.status(200).send('data delete successfully');
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
};

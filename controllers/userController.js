const User = require("../models/userModel");
const constants = require("../constants/constants");

const findUsers = async (req, res) => {
    try {
        const { skip = 0, limit = 10, selectionKeys, searchKeys } = req.query;

        // Input validations
        const parsedSkip = parseInt(skip);
        const parsedLimit = parseInt(limit);

        if (isNaN(parsedSkip) || isNaN(parsedLimit) || parsedSkip < 0 || parsedLimit <= 0) {
            return res.status(400).json({ error: constants.INVALID_VALUES_ERROR });
        }

        const searchString = searchKeys || "";

        let selectionString;
        if (selectionKeys) {
            selectionString = selectionKeys.split(',').join(" ");
        }

        const query = {};

        if (searchString.length > 0) {
            const regex = new RegExp(`^${searchString}`, "i");
            query.$or = [{ name: regex }, { email: regex }];
        }

        const users = await User.find(query)
            .skip(parsedSkip)
            .limit(parsedLimit)
            .select(selectionString)
            .exec();

        return res.status(200).json(users);
    } catch (error) {
        console.error(constants.ERROR_FINDING_USERS, error);
        return res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR  });
    }
};

module.exports = findUsers;

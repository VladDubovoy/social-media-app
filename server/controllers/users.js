import User from '../models/User.js';

// Read
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).send({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        const formattedFriends = friends.map((friend) => {
            const { _id, firstName, lastName, occupation, location, picturePath } = friend;
            return { _id, firstName, lastName, occupation, location, picturePath };
        });
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
}

// Update
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends.filter((friend) => friend !== friendId);
            friend.friends.filter((friend) => friend !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        const formattedFriends = friends.map((friend) => {
            const { _id, firstName, lastName, occupation, location, picturePath } = friend;
            return { _id, firstName, lastName, occupation, location, picturePath };
        });
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).send({ message: err.message });
    }
}

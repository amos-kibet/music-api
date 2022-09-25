export const deleteDocument = model => async (req, res) => {
    const { userID } = req.params

    try {
        const doc = await model.findOneAndDelete({ _id: userID }).exec()
        if (!doc) {
            return res.status(204).json({ message: 'user does not exist' })
        }
        return res.status(200).json(doc)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}
export const getAllDocuments = model => async (req, res) => {
    try {
        const data = await model.find({}).exec();
        if (!data) {
            return res.status(500).json({ message: "no songs found" });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

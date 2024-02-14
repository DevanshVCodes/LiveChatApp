const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} = require("../Controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/createGroup").post(protect, createGroupChat);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/groupExit").put(protect, groupExit);
router.delete("/:id", async (req, res) => {
  try {
    const chatId = req.params.id;
    // Delete the chat document from MongoDB Atlas
    await Chat.findByIdAndDelete(chatId);
    res.status(204).send(); // Respond with no content for successful deletion
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;

const express = require("express");

const router = express.Router();
const conversationModel = require("../Models/Conversation");

//create conversation

//check if conversatin exists

router.get("/:senderId/:recieverId", async (req, res) => {
  try {
    const checkResponse = await conversationModel.findOne({
      $and: [
        { members: { $in: [req.params.senderId] } },
        { members: { $in: [req.params.recieverId] } },
      ],
    });
    if(!checkResponse){
        res.status(200).json("Does not exist");
    }else{
        res.status(200).json(checkResponse)
    }
   
  } catch (error) {
    res.status(500).json(null);
  }
});

router.post("/", async (req, res) => {
  //create
  const newConversation = new conversationModel({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conversations

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await conversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

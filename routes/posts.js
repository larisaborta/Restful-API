//Routes
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Get back all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific post(copy the id on the url in Postman and send the request and you'll see details about this specific post)

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a post

router.delete("/:postID", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post

router.patch("/:postId", async (req, res) => {
  try {
    const updated = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );

    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

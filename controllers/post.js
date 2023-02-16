const { Post } = require("../database/Post");
const { all } = require("../routes/auth");

async function createPost(req, res) {
  try {
    const user = req.user;

    const { title, content, device } = req.body;

    const post = await Post.create({
      title,
      content,
      device,
      author: {
        userId: user._id,
        name: user.name,
      },
    });

    return res.send({
      data: post,
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getBlogs(req, res) {
  try {
    let { device1, device2 } = req.query;

    let blogs;
    if (device1 && device2) {
      blogs = await Post.find({ device: { $in: [device1, device2] } });
    } else if (device1) {
      blogs = await Post.find({ device: device1 });
    } else if (device2) {
      blogs = await Post.find({ device: device2 });
    } else {
      blogs = await Post.find();
    }

    return res.send({
      data: {
        blogs,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getBlogById(req, res) {
  try {
    const { id } = req.params;

    let blog = await Post.findByIdAndUpdate({ _id: id }, req.body);

    if (blog) {
      return res.send({
        data: blog,
      });
    } else {
      return res.status(404).send({
        error: "Blog does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteByBlogID(req, res) {
  try {
    const { id } = req.params;

    let blog = await Post.findByIdAndDelete(id);

    if (blog) {
      return res.send({
        data: blog,
      });
    } else {
      return res.status(404).send({
        error: "Blog does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPost,
  getBlogs,
  getBlogById,
  deleteByBlogID,
};

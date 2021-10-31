const Course = require("../models/CourseModel");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

exports.uploadAvatar = function (req, res) {
  upload(req, res, function (err) {
    console.log(req.body);
    console.log(req.file);

    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.file);
  });
};

// create new cause
exports.createCourse = (req, res) => {
  console.log(req.body);
  const course = new Course({
    Name: req.body.name,
    Description: req.body.description,
    DateIn: req.body.datein,
    Price: req.body.price,
    Sex: req.body.sex,
    Discount: req.body.discount,
    Image: req.body.image,
    enteringQuantity: req.body.enteringQuantity,
    size: req.body.size,
    age: req.body.age,
    materials: req.body.materials,
    colors: req.body.colors,
    tag: req.body.tag,
  });

  return course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        Course: newCourse,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
exports.getColor = (req, res) => {
  var colorss = [];
  var sizeee = [];
  var result = [];

  Course.find()
    .then((allCourse) => {
      allCourse.map((item, index) => {
        colorss.push(item.colors);
      });
      colorss.sort();
      let amountcolor = 1;
      for (let i = 0; i < colorss.length; i++) {
        if (colorss[i] === colorss[i + 1]) amountcolor++;
        else {
          result.push({ colors: colorss[i], amountcolor: amountcolor });
          amountcolor = 1;
        }
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
/*size*/
exports.getSize = (req, res) => {
  var sizeee = [];
  var result = [];

  Course.find()
    .then((allCourse) => {
      allCourse.map((item, index) => {
        sizeee.push(item.size);
      });
      sizeee.sort();
      let amountSize = 1;
      for (let i = 0; i < sizeee.length; i++) {
        if (sizeee[i] === sizeee[i + 1]) amountSize++;
        else {
          result.push({ size: sizeee[i], amountSize: amountSize });
          amountSize = 1;
        }
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

// Retrieve all Courses from the database.
exports.getCourse = (req, res) => {
  console.log(req.query);
  const keyword = req.query.keyword;
  if (keyword)
    Course.find({ Name: { $regex: keyword } })
      .then((allCourse) => {
        let result = allCourse.filter(
          (item) =>
            (req.query.color == null ||
              item.colors.includes(req.query.color)) &&
            (req.query.size == null || item.size.includes(req.query.size)) &&
            (req.query.age == null || item.age === req.query.age) &&
            (req.query.materials == null ||
              item.materials.includes(req.query.material)) &&
            (req.query.sex == null || item.Sex.includes(req.query.sex)) &&
            ((req.query.lowPrice == null && req.query.upPrice == null) ||
              (item.Price >= req.query.lowPrice &&
                item.Price <= req.query.upPrice))
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  else {
    Course.find()
      .then((allCourse) => {
        let result = allCourse.filter(
          (item) =>
            (req.query.color == null ||
              item.colors.includes(req.query.color)) &&
            (req.query.size == null || item.size.includes(req.query.size)) &&
            (req.query.age == null || item.age === req.query.age) &&
            (req.query.materials == null ||
              item.materials.includes(req.query.material)) &&
            (req.query.sex == null || item.Sex.includes(req.query.sex)) &&
            ((req.query.lowPrice == null && req.query.upPrice == null) ||
              (item.Price >= req.query.lowPrice &&
                item.Price <= req.query.upPrice))
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};
exports.getRelativeCourses = (req, res) => {
  console.log(req.query);
  const keyword = req.query.keyword;
  if (keyword)
    Course.find({ Name: { $regex: keyword } })
      .then((allCourse) => {
        let result = allCourse.filter(
          (item) =>
            (req.query.age == null || item.age === req.query.age) &&
            (req.query.sex == null || item.Sex.includes(req.query.sex)) &&
            ((req.query.lowPrice == null && req.query.upPrice == null) ||
              (item.Price >= req.query.lowPrice &&
                item.Price <= req.query.upPrice))
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  else {
    Course.find()
      .then((allCourse) => {
        let result = allCourse.filter(
          (item) =>
            (req.query.age == null || item.age === req.query.age) &&
            (req.query.sex == null || item.Sex.includes(req.query.sex)) &&
            ((req.query.lowPrice == null && req.query.upPrice == null) ||
              (item.Price >= req.query.lowPrice &&
                item.Price <= req.query.upPrice))
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};
exports.getCourseWithDateRange = (req, res) => {
  Course.find()
    .then((allCourse) => {
      var x = new Date(req.query.startDate);
      var y = new Date(req.query.endDate);
      let result = allCourse.filter(
        (item) => item.DateIn >= x && item.DateIn <= y
      );
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCoursesOrderByTopSale = (req, res) => {
  if (req.query.esc) {
    Course.aggregate([{ $sort: { soldQuantity: -1 } }])
      .then((allCourse) => {
        return res.status(200).json(allCourse);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  } else {
    Course.aggregate([{ $sort: { soldQuantity: 1 } }])
      .then((allCourse) => {
        return res.status(200).json(allCourse);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};
exports.getCourseTop3LatestOfMale = (req, res) => {
  Course.aggregate([
    { $sort: { DateIn: -1 } },
    { $match: { Sex: "Nam", age: "Adult" } },
  ])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseTop3LatestOfFemale = (req, res) => {
  Course.aggregate([
    { $sort: { DateIn: -1 } },
    { $match: { Sex: "Nữ", age: "Adult" } },
  ])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseTop3LatestOfKid = (req, res) => {
  Course.aggregate([{ $sort: { DateIn: -1 } }, { $match: { age: "Kid" } }])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseTopSalerForMale = (req, res) => {
  Course.aggregate([
    { $sort: { soldQuantity: -1 } },
    { $match: { Sex: "Nam", age: "Adult" } },
  ])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseTopSalerForFemale = (req, res) => {
  Course.aggregate([
    { $sort: { soldQuantity: -1 } },
    { $match: { Sex: "Nữ", age: "Adult" } },
  ])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseTopMostSalerForKid = (req, res) => {
  Course.aggregate([
    { $sort: { soldQuantity: -1 } },
    { $match: { age: "Kid" } },
  ])
    .then((allCourse) => {
      return res.status(200).json(allCourse);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
exports.getCourseById = (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((singleArticle) => {
      res.status(200).json(singleArticle);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

exports.deleteCourse = (req, res) => {
  const id = req.params.id;
  Course.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(204).json({
        success: true,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.updateCourse = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Course.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.postComment = (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  Course.updateOne({ _id: id }, { $push: { Comments: updateObject } })
    .exec()
    .then(() => {
      Course.findById(id).then((singleArticle) => {
        res.status(200).json({ Status: "comment successed", singleArticle });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
exports.deleteComments = (req, res) => {
  const id = req.params.id;
  const cmtId = parseInt(req.params.commentId);
  Course.updateOne({ _id: id }, { $pull: { Comments: { commentId: cmtId } } })
    .then(() => {
      Course.findById(id).then((singleArticle) => {
        res.status(200).json({ Status: "comment successed", singleArticle });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again." + err,
      });
    });
};

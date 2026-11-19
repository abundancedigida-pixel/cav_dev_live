import mongoose from "mongoose";
import slugify from "slugify";

const ContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "heading",
        "text",
        "list",
        "image",
        "quote",
        "code",
        "link",
        "proTip",
        "button",
        "table",
      ],
      required: true,
    },

    text: String,

    href: String,

    level: {
      type: String,
      enum: ["h1", "h2", "h3", "h4"],
    },

    style: {
      type: String,
      enum: ["bullet", "number"],
    },

    items: [String],

    imageurl: {
      url: String,
      publicId: String,
    },

    buttonTarget: {
      type: String,
      enum: ["_self", "_blank"],
      default: "_self",
    },

    // Comparison table: first header is the criteria column,
    // the other headers are the options being compared.
    tableCaption: String,
    tableHeaders: [String],
    tableRows: [[String]],
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    author: {
      type: String,
      required: true,
    },

    // Short summary shown in lists and at the top of the article
    excerpt: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    heroimage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    content: [ContentSchema],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    // Release controls
    publishedAt: {
      type: Date,
      default: null,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // SEO
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

  const Blog = mongoose.model("Blog");

  let slug = slugify(this.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let uniqueSlug = slug;
  let counter = 1;

  while (
    await Blog.findOne({
      slug: uniqueSlug,
      _id: { $ne: this._id },
    })
  ) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  this.slug = uniqueSlug;
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
const mongoose = require('mongoose')

// Définir les schémas
const auteurShema = new mongoose.Schema({
  nom: String,
  adresse: String,
})

const blogSchema = new mongoose.Schema({
  titre:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100,

    // validation personalisée -> pour que le premier caractere soit pas en majuscule
    validate: {
      validator: (v) => {
        return v.charAt(0) === v.charAt(0).toUpperCase();
      },
      message: props => "Le premier caractère n'est pas en majuscule"
    }

  },
  contenu: { type: String, required: true },
  estAchive: Boolean,
  nbreLecture: Number,
  categories: {
    type: [String],
    enum: ["decouverte", "sport", "geure"]
  },
  featureBlog: mongoose.Types.ObjectId,
  auteur: auteurShema,
  datePublication: {
    type: Date,
    default: new Date()
  }
});

blogSchema.statics.findMemeCategories = function (categories) {
  return this.find({ categories: { $in: categories } });
};

blogSchema.statics.find2premierBlog = function () {
  return this.find().limit(2);
};

blogSchema.virtual('libelleLecture').get(function () {
  return "Ce blog a deja ete virsualise par : " + this.nbreLecture + " fois"
});

blogSchema.pre('save', function (next) {
  const now = new Date();
  this.datePublication = now;
  next();
});

blogSchema.pre('create', function (next) {
  console.log("instruction avant execution")
  next();
});




// Créer le modèle pour la collection 
const Blog = mongoose.model('Blogs', blogSchema);


module.exports = Blog;


const mongoose = require('mongoose');
const Blog = require('./blog');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/testmongoose')
        console.log('Connexion réussie à MongoDB')

        // Enregistrer le nouvel blog dans la base de données
        const result = await Blog.create(
            {
                titre: 'Titre 20',
                contenu: 'Contenu 1',
                estAchive: true,
                nbreLecture: 24,
                categories: ["decouverte", "sport"],
                featureBlog: "642db91b1f631d8fcc6528bc",
                auteur: {
                    nom: "CHARLOTIN",
                    adresse: "Hinche",
                },
                datePublication: new Date()
            }
        )
       
        // const result= await (await Blog.findOne().where("nbreLecture").gt(0)) 
        // console.log(result.libelleLecture);

        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
})()
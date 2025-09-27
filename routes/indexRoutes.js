const express = require('express');
const router = express.Router();
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

exports.getSearchPosts = async (req, res) => {
    const { title } = req.query; // query posts?title=hero
    if (!title) {
        return res.redirect('/');
    }
    try {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
        });
        res.render('index', { posts, title: 'Search Results' });
    } catch (error) {
        res.status(500).send('An error occurred while searching for posts.');
    }
};

router.get('/', async (req, res) => {
    // res.send("hello")
    // http://localhost:5000?page=1&perPage=8
    try {
        const { page = 1, perPage = 8 } = req.query;
        const skip = (page - 1) * perPage;
        const posts = await prisma.post.findMany({
            // ****
            skip,
            take: Number(perPage),
            //**** */
            // orderBy: {
            //     createdAt: 'desc'
            // }
        });
        const totalPosts = await prisma.post.count();
        console.log(totalPosts,posts)
        res.render('index2', { title: 'Home', posts, page: parseInt(page), perPage: parseInt(perPage), totalPosts, totalPages: Math.ceil(totalPosts / perPage) }); //view(ui=>index.ejs)
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
});
router.get('/search', exports.getSearchPosts);
module.exports = router;

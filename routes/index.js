const express = require('express');
const router = express.Router();
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();


exports.getSearchPosts = async (req, res) => {
    const { title } = req.query;
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
    try {
        const posts = await prisma.post.findMany();
        res.render('index', { title: 'Home', posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
});
router.get('/search', exports.getSearchPosts);
module.exports = router;

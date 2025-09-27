const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postsRoutes');
const indexRoutes = require('./routes/indexRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {
        secret: process.env.SECRET,
        // resave: false,
        // saveUninitialized: false
    }
));
app.use(expressLayouts) // layout.ejs
app.use((req, res, next) => {
    res.locals.userId = req.session.userId; // pass userId to ejs
    res.locals.name = req.session.name;
    res.locals.role = req.session.role;
    next();
});
// app.use("/",(req,res)=>{
//     res.end("Hello World")
// })
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/posts', authMiddleware, postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

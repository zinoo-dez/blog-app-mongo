const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');



async function seedUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
        });
    }

    try {
        await prisma.user.createMany({
            data: users,
            // skipDuplicates: true,
        });
        console.log(`Successfully seeded ${count} users!`);
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}

async function seedPosts(count) {
    const posts = [];

    for (let i = 0; i < count; i++) {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
            },
        });

        if (!user) {
            throw new Error('No users found');
        }

        posts.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            authorId: user.id,
        });
    }

    try {
        await prisma.post.createMany({
            data: posts,
            // skipDuplicates: true,
        });
        console.log(`Successfully seeded ${count} posts!`);
    } catch (error) {
        console.error('Error seeding posts:', error);
    }
}

// Run the seeding sequentially
async function runSeed() {
    try {
        await seedUsers(50); // Wait for users to be seeded
        await seedPosts(50); // Then seed posts
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect(); // Disconnect once at the end
    }
}

runSeed();
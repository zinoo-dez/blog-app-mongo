
// Prisma ဆိုတာ database အတွက် ORM (Object-Relational Mapping) tool တစ်ခုဖြစ်ပါတယ်။
// Prisma queries တွေကို အောက်မှာ ရှင်းပြထားပါတယ်။

// အားလုံးကို ရှာဖွေခြင်း
// ဒီ query က Note model ထဲက record အားလုံးကို ပြန်ထုတ်ပေးပါတယ်
const allNotes = await prisma.note.findMany()

// တစ်ခုတည်းကို ရှာဖွေခြင်း
// ဒီ query က ID နဲ့ တိုက်ဆိုင်တဲ့ Note တစ်ခုကို ပြန်ထုတ်ပေးပါတယ်
const singleNote = await prisma.note.findUnique({
    where: {
        id: 1
    }
})

// အသစ်ထည့်သွင်းခြင်း
// ဒီ query က Note အသစ်တစ်ခုကို database ထဲ ထည့်သွင်းပေးပါတယ်
const newNote = await prisma.note.create({
    data: {
        title: 'New Note',
        content: 'This is a new note'
    }
})

// ပြင်ဆင်ခြင်း
// ဒီ query က ရှိပြီးသား Note တစ်ခုကို ပြင်ဆင်ပေးပါတယ်
const updatedNote = await prisma.note.update({
    where: {
        id: 1
    },
    data: {
        title: 'Updated Title'
    }
})

// ဖျက်ခြင်း
// ဒီ query က Note တစ်ခုကို ဖျက်ပေးပါတယ်
const deletedNote = await prisma.note.delete({
    where: {
        id: 1
    }
})

// ရှာဖွေခြင်းနှင့် စီစစ်ခြင်း
// ဒီ query က သတ်မှတ်ထားတဲ့ စည်းကမ်းချက်နဲ့ ကိုက်ညီတဲ့ Note တွေကို ပြန်ထုတ်ပေးပါတယ်
const filteredNotes = await prisma.note.findMany({
    where: {
        title: {
            contains: 'Important'
        }
    },
    orderBy: {
        createdAt: 'desc'
    },
    take: 5
})

// ဆက်စပ်နေသော data တွေကို ရှာဖွေခြင်း
// ဒီ query က Note နဲ့ ဆက်စပ်နေတဲ့ User ကိုပါ တစ်ခါတည်း ထုတ်ပေးပါတယ်
const noteWithUser = await prisma.note.findUnique({
    where: {
        id: 1
    },
    include: {
        user: true
    }
})


// ဆက်နွယ်မှုများကို ရှင်းပြခြင်း

// Note နှင့် User ကြား ဆက်နွယ်မှု
// Note တစ်ခုသည် User တစ်ယောက်နှင့် ဆက်နွယ်နေပါသည်။ ဤဆက်နွယ်မှုကို "One-to-Many" ဟု ခေါ်ပါသည်။
// တစ်နည်းအားဖြင့် User တစ်ယောက်သည် Note အများအပြားကို ပိုင်ဆိုင်နိုင်ပြီး၊ Note တစ်ခုသည် User တစ်ယောက်နှင့်သာ ဆက်နွယ်နိုင်ပါသည်။

// ဤဆက်နွယ်မှုကို Prisma schema တွင် အောက်ပါအတိုင်း ဖော်ပြနိုင်ပါသည်:
// model User {
//   id    Int     @id @default(autoincrement())
//   name  String
//   notes Note[]
// }

// model Note {
//   id      Int    @id @default(autoincrement())
//   title   String
//   content String
//   userId  Int
//   user    User   @relation(fields: [userId], references: [id])
// }

// ဤဆက်နွယ်မှုကြောင့် အောက်ပါလုပ်ဆောင်ချက်များ ပြုလုပ်နိုင်ပါသည်:
// 1. User တစ်ယောက်၏ Note အားလုံးကို ရယူခြင်း
// 2. Note တစ်ခု၏ ပိုင်ရှင် User ကို ရယူခြင်း
// 3. User တစ်ယောက်အတွက် Note အသစ်ဖန်တီးခြင်း
// 4. Note တစ်ခုကို ဖျက်လိုက်သောအခါ ၎င်းနှင့်ဆက်နွယ်နေသော User ကို မထိခိုက်စေခြင်း

// ဤဆက်နွယ်မှုကို အသုံးပြု၍ data ကို ရယူရာတွင် Prisma ၏ include သို့မဟုတ် select option များကို အသုံးပြုနိုင်ပါသည်။
// ဥပမာအနေဖြင့် အထက်တွင် ဖော်ပြထားသော noteWithUser query သည် Note တစ်ခုနှင့်အတူ ၎င်း၏ User ကိုပါ တစ်ပါတည်း ရယူပါသည်။

// Many-to-Many ဆက်နွယ်မှု

// Many-to-Many ဆက်နွယ်မှုသည် entity နှစ်ခုကြားတွင် အပြန်အလှန် ဆက်နွယ်မှုဖြစ်ပါသည်။
// ဥပမာအနေဖြင့် Tag နှင့် Note ကြား ဆက်နွယ်မှုကို ကြည့်ကြပါစို့။
// Note တစ်ခုသည် Tag အများအပြားရှိနိုင်သလို၊ Tag တစ်ခုသည်လည်း Note အများအပြားနှင့် ဆက်နွယ်နိုင်ပါသည်။

// Prisma schema တွင် Many-to-Many ဆက်နွယ်မှုကို အောက်ပါအတိုင်း ဖော်ပြနိုင်ပါသည်:

// model Note {
//   id    Int     @id @default(autoincrement())
//   title String
//   tags  Tag[]
// }

// model Tag {
//   id    Int     @id @default(autoincrement())
//   name  String
//   notes Note[]
// }

// ဤဆက်နွယ်မှုကြောင့် အောက်ပါလုပ်ဆောင်ချက်များ ပြုလုပ်နိုင်ပါသည်:
// 1. Note တစ်ခု၏ Tag အားလုံးကို ရယူခြင်း
// 2. Tag တစ်ခုနှင့် ဆက်နွယ်နေသော Note အားလုံးကို ရယူခြင်း
// 3. Note တစ်ခုအတွက် Tag အသစ်များ ထည့်သွင်းခြင်း
// 4. Tag တစ်ခုကို Note အများအပြားနှင့် ချိတ်ဆက်ခြင်း

// Many-to-Many ဆက်နွယ်မှုကို အသုံးပြု၍ data ကို ရယူသည့် ဥပမာ:

const noteWithTags = await prisma.note.findUnique({
    where: {
        id: 1
    },
    include: {
        tags: true
    }
})

const tagWithNotes = await prisma.tag.findUnique({
    where: {
        id: 1
    },
    include: {
        notes: true
    }
})

// Note တစ်ခုအတွက် Tag အသစ်များ ထည့်သွင်းခြင်း ဥပမာ:

const updatedNote2 = await prisma.note.update({
    where: {
        id: 1
    },
    data: {
        tags: {
            connect: [{ id: 2 }, { id: 3 }]
        }
    }
})

// Many-to-Many ဆက်နွယ်မှုသည် ပိုမိုရှုပ်ထွေးသော data structure များအတွက် အသုံးဝင်ပြီး၊
// entity များကြား ပိုမိုပြည့်စုံသော ဆက်နွယ်မှုများကို ဖန်တီးရန် ခွင့်ပြုပါသည်။

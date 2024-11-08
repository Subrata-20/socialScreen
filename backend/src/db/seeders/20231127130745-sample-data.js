const db = require('../models');
const Users = db.users;

const Achievements = db.achievements;

const Rewards = db.rewards;

const ScreenTimeRecommendations = db.screen_time_recommendations;

const SentimentCheckIns = db.sentiment_check_ins;

const Tasks = db.tasks;

const AchievementsData = [
  {
    // type code here for "relation_one" field

    title: 'Math Whiz',

    description: 'Completed all math assignments for the week',

    achieved_on: new Date('2023-10-05T10:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    title: 'Bookworm',

    description: 'Read 3 books in a month',

    achieved_on: new Date('2023-10-04T10:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    title: 'Helper',

    description: 'Assisted in household chores',

    achieved_on: new Date('2023-10-03T10:00:00Z'),
  },
];

const RewardsData = [
  {
    // type code here for "relation_one" field

    points: 50,

    description: 'For completing all tasks this week',

    earned_on: new Date('2023-10-05T11:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    points: 30,

    description: 'For reading extra books',

    earned_on: new Date('2023-10-04T11:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    points: 20,

    description: 'For helping with chores',

    earned_on: new Date('2023-10-03T11:00:00Z'),
  },
];

const ScreenTimeRecommendationsData = [
  {
    // type code here for "relation_one" field

    recommended_minutes: 120,

    date: new Date('2023-10-01T08:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    recommended_minutes: 90,

    date: new Date('2023-10-02T08:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    recommended_minutes: 100,

    date: new Date('2023-10-03T08:00:00Z'),
  },
];

const SentimentCheckInsData = [
  {
    // type code here for "relation_one" field

    response: 'I had a great day!',

    sentiment: 'positive',

    check_in_date: new Date('2023-10-01T09:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    response: 'It was okay.',

    sentiment: 'positive',

    check_in_date: new Date('2023-10-02T09:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    response: 'I felt a bit sad.',

    sentiment: 'negative',

    check_in_date: new Date('2023-10-03T09:00:00Z'),
  },
];

const TasksData = [
  {
    // type code here for "relation_one" field

    description: 'Complete math homework',

    status: 'pending',

    due_date: new Date('2023-10-06T17:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    description: 'Read a chapter of a book',

    status: 'pending',

    due_date: new Date('2023-10-05T17:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    description: 'Help with dinner preparation',

    status: 'pending',

    due_date: new Date('2023-10-07T17:00:00Z'),
  },
];

// Similar logic for "relation_many"

async function associateAchievementWithChild() {
  const relatedChild0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement0 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Achievement0?.setChild) {
    await Achievement0.setChild(relatedChild0);
  }

  const relatedChild1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement1 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Achievement1?.setChild) {
    await Achievement1.setChild(relatedChild1);
  }

  const relatedChild2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement2 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Achievement2?.setChild) {
    await Achievement2.setChild(relatedChild2);
  }
}

async function associateRewardWithChild() {
  const relatedChild0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Reward0 = await Rewards.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Reward0?.setChild) {
    await Reward0.setChild(relatedChild0);
  }

  const relatedChild1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Reward1 = await Rewards.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Reward1?.setChild) {
    await Reward1.setChild(relatedChild1);
  }

  const relatedChild2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Reward2 = await Rewards.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Reward2?.setChild) {
    await Reward2.setChild(relatedChild2);
  }
}

async function associateScreenTimeRecommendationWithChild() {
  const relatedChild0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeRecommendation0 = await ScreenTimeRecommendations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ScreenTimeRecommendation0?.setChild) {
    await ScreenTimeRecommendation0.setChild(relatedChild0);
  }

  const relatedChild1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeRecommendation1 = await ScreenTimeRecommendations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ScreenTimeRecommendation1?.setChild) {
    await ScreenTimeRecommendation1.setChild(relatedChild1);
  }

  const relatedChild2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeRecommendation2 = await ScreenTimeRecommendations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ScreenTimeRecommendation2?.setChild) {
    await ScreenTimeRecommendation2.setChild(relatedChild2);
  }
}

async function associateSentimentCheckInWithChild() {
  const relatedChild0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SentimentCheckIn0 = await SentimentCheckIns.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SentimentCheckIn0?.setChild) {
    await SentimentCheckIn0.setChild(relatedChild0);
  }

  const relatedChild1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SentimentCheckIn1 = await SentimentCheckIns.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SentimentCheckIn1?.setChild) {
    await SentimentCheckIn1.setChild(relatedChild1);
  }

  const relatedChild2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SentimentCheckIn2 = await SentimentCheckIns.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SentimentCheckIn2?.setChild) {
    await SentimentCheckIn2.setChild(relatedChild2);
  }
}

async function associateTaskWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssigned_to) {
    await Task0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssigned_to) {
    await Task1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssigned_to) {
    await Task2.setAssigned_to(relatedAssigned_to2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Achievements.bulkCreate(AchievementsData);

    await Rewards.bulkCreate(RewardsData);

    await ScreenTimeRecommendations.bulkCreate(ScreenTimeRecommendationsData);

    await SentimentCheckIns.bulkCreate(SentimentCheckInsData);

    await Tasks.bulkCreate(TasksData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateAchievementWithChild(),

      await associateRewardWithChild(),

      await associateScreenTimeRecommendationWithChild(),

      await associateSentimentCheckInWithChild(),

      await associateTaskWithAssigned_to(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('achievements', null, {});

    await queryInterface.bulkDelete('rewards', null, {});

    await queryInterface.bulkDelete('screen_time_recommendations', null, {});

    await queryInterface.bulkDelete('sentiment_check_ins', null, {});

    await queryInterface.bulkDelete('tasks', null, {});
  },
};

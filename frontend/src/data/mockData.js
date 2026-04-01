// Mock courses data
export const mockCourses = [
  {
    id: 1,
    title: 'ASL Basics',
    subtitle: 'Learn fundamental American Sign Language',
    description: 'Start your journey with the fundamentals of American Sign Language. Learn basic greetings, everyday phrases, and essential vocabulary.',
    language: 'ASL',
    difficulty: 'Beginner',
    duration: '4 weeks',
    instructor: 'Sarah Johnson',
    thumbnail: '🤲',
    students: 1250,
    rating: 4.8,
    lessons: [
      { id: 1, title: 'Introduction to ASL', duration: '15 min', videoUrl: 'asl-intro' },
      { id: 2, title: 'Basic Greetings', duration: '20 min', videoUrl: 'asl-greetings' },
      { id: 3, title: 'Numbers 1-10', duration: '18 min', videoUrl: 'asl-numbers' },
      { id: 4, title: 'Family Members', duration: '22 min', videoUrl: 'asl-family' },
    ],
  },
  {
    id: 2,
    title: 'ISL Intermediate',
    subtitle: 'Progress your Indian Sign Language skills',
    description: 'Build on your ISL foundation with intermediate vocabulary, sentence structure, and conversational practice.',
    language: 'ISL',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    instructor: 'Raj Kumar',
    thumbnail: '🇮🇳',
    students: 850,
    rating: 4.6,
    lessons: [
      { id: 5, title: 'Sentence Structure', duration: '25 min', videoUrl: 'isl-structure' },
      { id: 6, title: 'Business Vocabulary', duration: '30 min', videoUrl: 'isl-business' },
      { id: 7, title: 'Conversational Practice', duration: '28 min', videoUrl: 'isl-conversation' },
      { id: 8, title: 'Advanced Expressions', duration: '32 min', videoUrl: 'isl-expressions' },
    ],
  },
  {
    id: 3,
    title: 'BSL Essentials',
    subtitle: 'Master British Sign Language fundamentals',
    description: 'Comprehensive course covering British Sign Language essentials, cultural context, and practical communication.',
    language: 'BSL',
    difficulty: 'Beginner',
    duration: '5 weeks',
    instructor: 'Emma Roberts',
    thumbnail: '🇬🇧',
    students: 920,
    rating: 4.7,
    lessons: [
      { id: 9, title: 'BSL Fundamentals', duration: '20 min', videoUrl: 'bsl-fundamentals' },
      { id: 10, title: 'Cultural Context', duration: '18 min', videoUrl: 'bsl-culture' },
      { id: 11, title: 'Daily Conversations', duration: '24 min', videoUrl: 'bsl-daily' },
      { id: 12, title: 'BSL Fingerspelling', duration: '21 min', videoUrl: 'bsl-finger' },
    ],
  },
  {
    id: 4,
    title: 'Advanced ASL',
    subtitle: 'Master complex ASL concepts',
    description: 'Advanced American Sign Language course for learners ready to deepen their skills and understanding.',
    language: 'ASL',
    difficulty: 'Advanced',
    duration: '8 weeks',
    instructor: 'Michael Chen',
    thumbnail: '🎓',
    students: 420,
    rating: 4.9,
    lessons: [
      { id: 13, title: 'Complex Grammatical Structures', duration: '35 min', videoUrl: 'asl-grammar' },
      { id: 14, title: 'Storytelling in ASL', duration: '40 min', videoUrl: 'asl-stories' },
      { id: 15, title: 'Specialized Vocabulary', duration: '38 min', videoUrl: 'asl-specialized' },
      { id: 16, title: 'Interpreting Techniques', duration: '42 min', videoUrl: 'asl-interpreting' },
    ],
  },
];

// Mock dictionary data
export const mockDictionary = [
  {
    id: 1,
    word: 'Hello',
    signType: 'Gesture',
    description: 'A friendly greeting made by waving your hand',
    videoUrl: 'sign-hello',
    category: 'Greetings',
    difficulty: 'Beginner',
  },
  {
    id: 2,
    word: 'Thank you',
    signType: 'Hand Sign',
    description: 'Express gratitude by touching your chin and moving your hand down and forward',
    videoUrl: 'sign-thankyou',
    category: 'Expressions',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    word: 'Family',
    signType: 'Hand Sign',
    description: 'Create a circle around the body signature area',
    videoUrl: 'sign-family',
    category: 'Family',
    difficulty: 'Beginner',
  },
  {
    id: 4,
    word: 'School',
    signType: 'Hand Sign',
    description: 'Clap hands twice, moving them in a circle',
    videoUrl: 'sign-school',
    category: 'Places',
    difficulty: 'Beginner',
  },
  {
    id: 5,
    word: 'Love',
    signType: 'Hand Sign',
    description: 'Cross both hands over your heart',
    videoUrl: 'sign-love',
    category: 'Emotions',
    difficulty: 'Beginner',
  },
  {
    id: 6,
    word: 'Work',
    signType: 'Hand Sign',
    description: 'Tap the back of one hand with the fist of the other',
    videoUrl: 'sign-work',
    category: 'Activities',
    difficulty: 'Beginner',
  },
];

// Mock user progress data
export const mockUserProgress = {
  totalLessonsCompleted: 12,
  currentStreak: 5,
  totalPoints: 450,
  enrolledCourses: [1, 2],
  lessonProgress: {
    1: 75, // Course 1: 75% complete
    2: 40, // Course 2: 40% complete
  },
};

// Mock lesson data
export const getLesson = (lessonId) => {
  const allLessons = [
    {
      id: 1,
      title: 'Introduction to ASL',
      courseId: 1,
      description: 'Learn the basics of American Sign Language and its cultural significance.',
      duration: '15 minutes',
      difficulty: 'Beginner',
      videoUrl: 'asl-intro',
      subtitles: true,
      transcript: 'In this lesson, we will explore the fundamentals...',
      exercises: [
        { id: 1, text: 'Practice the greeting sign', type: 'practice' },
        { id: 2, text: 'Quiz: Identify 5 basic signs', type: 'quiz' },
      ],
      nextLessonId: 2,
      previousLessonId: null,
    },
    {
      id: 2,
      title: 'Basic Greetings',
      courseId: 1,
      description: 'Master common ASL greetings used in everyday communication.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      videoUrl: 'asl-greetings',
      subtitles: true,
      transcript: 'Let\'s learn how to greet people in sign language...',
      exercises: [
        { id: 3, text: 'Practice 5 greeting variations', type: 'practice' },
        { id: 4, text: 'Create your own greeting combination', type: 'challenge' },
      ],
      nextLessonId: 3,
      previousLessonId: 1,
    },
  ];
  return allLessons.find((l) => l.id === lessonId);
};

// Get course by ID
export const getCourseById = (courseId) => {
  return mockCourses.find((c) => c.id === courseId);
};

// Get courses by language
export const getCoursesByLanguage = (language) => {
  return mockCourses.filter((c) => c.language === language);
};

// Search dictionary
export const searchDictionary = (query) => {
  const lowerQuery = query.toLowerCase();
  return mockDictionary.filter(
    (item) =>
      item.word.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
};

// Get dictionary by category
export const getDictionaryByCategory = (category) => {
  return mockDictionary.filter((item) => item.category === category);
};

// Get unique categories from dictionary
export const getDictionaryCategories = () => {
  const categories = new Set(mockDictionary.map((item) => item.category));
  return Array.from(categories);
};

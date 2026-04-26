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
  {
    id: 5,
    title: 'ISL Basics',
    subtitle: 'Learn fundamental Indian Sign Language',
    description: 'Start your journey with the fundamentals of Indian Sign Language. Learn the ISL alphabet, numbers, greetings, and family vocabulary. Comprehensive introduction to India\'s primary sign language.',
    language: 'ISL',
    difficulty: 'Beginner',
    duration: '6 weeks',
    instructor: 'Priya Sharma',
    thumbnail: '🇮🇳',
    students: 3200,
    rating: 4.9,
    lessons: [
      { id: 17, title: 'Introduction to ISL', duration: '15 min', videoUrl: 'isl-intro' },
      { id: 18, title: 'ISL Alphabet A-M', duration: '25 min', videoUrl: 'isl-alpha-am' },
      { id: 19, title: 'ISL Alphabet N-Z', duration: '25 min', videoUrl: 'isl-alpha-nz' },
      { id: 20, title: 'Numbers 1-20', duration: '20 min', videoUrl: 'isl-numbers' },
      { id: 21, title: 'Basic Greetings', duration: '22 min', videoUrl: 'isl-greetings' },
      { id: 22, title: 'Family Members', duration: '24 min', videoUrl: 'isl-family' },
    ],
  },
  {
    id: 6,
    title: 'ISL Daily Life',
    subtitle: 'Learn signs for everyday situations',
    description: 'Master essential ISL vocabulary for daily life situations including market interactions, transportation, healthcare, and workplace communication. Perfect for intermediate learners.',
    language: 'ISL',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    instructor: 'Arjun Mehta',
    thumbnail: '🛒',
    students: 1800,
    rating: 4.7,
    lessons: [
      { id: 23, title: 'Market Signs', duration: '28 min', videoUrl: 'isl-market' },
      { id: 24, title: 'Transportation Vocabulary', duration: '30 min', videoUrl: 'isl-transport' },
      { id: 25, title: 'Healthcare Communication', duration: '32 min', videoUrl: 'isl-healthcare' },
      { id: 26, title: 'Workplace Signs', duration: '35 min', videoUrl: 'isl-workplace' },
    ],
  },
  {
    id: 7,
    title: 'ISL Advanced Grammar',
    subtitle: 'Master complex ISL linguistic structures',
    description: 'Deepen your understanding of ISL through advanced grammatical concepts including topic-comment structure, classifiers, and spatial grammar. Ideal for advanced learners and aspiring ISL teachers.',
    language: 'ISL',
    difficulty: 'Advanced',
    duration: '10 weeks',
    instructor: 'Dr. Sunita Rao',
    thumbnail: '📚',
    students: 620,
    rating: 4.8,
    lessons: [
      { id: 27, title: 'Topic-Comment Structure', duration: '40 min', videoUrl: 'isl-topic-comment' },
      { id: 28, title: 'Classifiers in ISL', duration: '42 min', videoUrl: 'isl-classifiers' },
      { id: 29, title: 'Spatial Grammar', duration: '45 min', videoUrl: 'isl-spatial' },
      { id: 30, title: 'Complex Discourse', duration: '48 min', videoUrl: 'isl-discourse' },
    ],
  },
  {
    id: 8,
    title: 'ASL Intermediate',
    subtitle: 'Advance your American Sign Language skills',
    description: 'Build on your ASL foundation with intermediate vocabulary, sentence structure, and conversational practice. Perfect for continuing learners ready to expand their signing abilities.',
    language: 'ASL',
    difficulty: 'Intermediate',
    duration: '7 weeks',
    instructor: 'David Williams',
    thumbnail: '🤝',
    students: 980,
    rating: 4.6,
    lessons: [
      { id: 31, title: 'Intermediate Vocabulary', duration: '28 min', videoUrl: 'asl-vocab-int' },
      { id: 32, title: 'Sentence Structure & Grammar', duration: '32 min', videoUrl: 'asl-structure' },
      { id: 33, title: 'Conversational Practice', duration: '30 min', videoUrl: 'asl-convo' },
      { id: 34, title: 'Question Formation', duration: '26 min', videoUrl: 'asl-questions' },
    ],
  },
  {
    id: 9,
    title: 'BSL Intermediate',
    subtitle: 'Progress your British Sign Language',
    description: 'Continue your BSL journey with intermediate vocabulary, sentence structures, and practical communication scenarios. Designed for learners progressing beyond basics.',
    language: 'BSL',
    difficulty: 'Intermediate',
    duration: '7 weeks',
    instructor: 'Olivia Thompson',
    thumbnail: '💬',
    students: 740,
    rating: 4.5,
    lessons: [
      { id: 35, title: 'Intermediate Vocabulary', duration: '28 min', videoUrl: 'bsl-vocab-int' },
      { id: 36, title: 'BSL Grammar & Structure', duration: '32 min', videoUrl: 'bsl-structure' },
      { id: 37, title: 'Practical Conversations', duration: '30 min', videoUrl: 'bsl-practical' },
      { id: 38, title: 'Expressions & Idioms', duration: '28 min', videoUrl: 'bsl-idioms' },
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

// Sign language metadata
export const SIGN_LANGUAGES = {
  ISL: {
    code: 'ISL',
    name: 'Indian Sign Language',
    country: 'India',
    flag: '🇮🇳',
    color: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FB923C',
    textColor: '#9A3E09',
    description: 'The primary sign language of the Indian Deaf community, recognized as an official language.',
    speakers: '5 million+',
    region: 'India',
  },
  ASL: {
    code: 'ASL',
    name: 'American Sign Language',
    country: 'United States',
    flag: '🇺🇸',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#3B82F6',
    textColor: '#1E40AF',
    description: 'The most widely used sign language in North America, with its own distinct grammar.',
    speakers: '2 million+',
    region: 'North America',
  },
  BSL: {
    code: 'BSL',
    name: 'British Sign Language',
    country: 'United Kingdom',
    flag: '🇬🇧',
    color: '#DC2626',
    bgColor: '#FFF1F2',
    borderColor: '#F87171',
    textColor: '#991B1B',
    description: 'The sign language of the British Deaf community, officially recognized in the UK since 2003.',
    speakers: '250,000+',
    region: 'United Kingdom',
  },
};

// Get courses by language (or all if language is null or 'ALL')
export const getLanguageCourses = (language = null) => {
  if (!language || language === 'ALL') return mockCourses;
  return mockCourses.filter(c => c.language === language);
};

// Get language statistics
export const getLanguageStats = () => {
  return Object.keys(SIGN_LANGUAGES).map(lang => ({
    ...SIGN_LANGUAGES[lang],
    courseCount: mockCourses.filter(c => c.language === lang).length,
    totalStudents: mockCourses
      .filter(c => c.language === lang)
      .reduce((sum, c) => sum + (c.students || 0), 0),
  }));
};

// Get courses by language (legacy function - kept for backward compatibility)
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

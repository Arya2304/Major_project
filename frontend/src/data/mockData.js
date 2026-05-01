// Comprehensive ISL Course Structure with Modules and Lessons
export const mockCourses = [
  {
    id: 1,
    title: 'ISL Basics',
    subtitle: 'Learn fundamental Indian Sign Language',
    description: 'Start your journey with the fundamentals of Indian Sign Language. Learn basic greetings, everyday phrases, and essential vocabulary.',
    language: 'ISL',
    difficulty: 'Beginner',
    duration: '4 weeks',
    instructor: 'Priya Sharma',
    thumbnail: 'hands',
    emoji: '🇮🇳',
    students: 2500,
    rating: 4.9,
    modules: [
      {
        id: 101,
        title: 'Module 1: Introduction to ISL',
        description: 'Learn the basics and cultural context of ISL',
        lessons: [
          { id: 1, title: 'What is ISL?', duration: '12 min', order: 1 },
          { id: 2, title: 'ISL Culture & History', duration: '18 min', order: 2 },
          { id: 3, title: 'Basic Hand Shapes', duration: '15 min', order: 3 },
        ],
      },
      {
        id: 102,
        title: 'Module 2: Greetings & Politeness',
        description: 'Master common ISL greetings',
        lessons: [
          { id: 4, title: 'Hello & Goodbye', duration: '14 min', order: 1 },
          { id: 5, title: 'Thank You & Please', duration: '16 min', order: 2 },
          { id: 6, title: 'How Are You?', duration: '13 min', order: 3 },
        ],
      },
      {
        id: 103,
        title: 'Module 3: Numbers & Dates',
        description: 'Learn to sign numbers and dates',
        lessons: [
          { id: 7, title: 'Numbers 1-10', duration: '16 min', order: 1 },
          { id: 8, title: 'Numbers 11-20 & Counting', duration: '18 min', order: 2 },
          { id: 9, title: 'Days & Months', duration: '15 min', order: 3 },
        ],
      },
      {
        id: 104,
        title: 'Module 4: Daily Communication',
        description: 'Common phrases for daily life',
        lessons: [
          { id: 10, title: 'My Name Is...', duration: '14 min', order: 1 },
          { id: 11, title: 'Family Members', duration: '17 min', order: 2 },
          { id: 12, title: 'Colors & Objects', duration: '16 min', order: 3 },
        ],
      },
      {
        id: 105,
        title: 'Module 5: Emotions & Expressions',
        description: 'Expressing feelings and emotions',
        lessons: [
          { id: 13, title: 'Happy, Sad, Angry', duration: '13 min', order: 1 },
          { id: 14, title: 'I Like / I Dislike', duration: '15 min', order: 2 },
          { id: 15, title: 'Common Expressions', duration: '14 min', order: 3 },
        ],
      },
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
    instructor: 'Rajesh Kumar',
    thumbnail: 'india',
    emoji: '🎓',
    students: 1200,
    rating: 4.8,
    modules: [
      {
        id: 201,
        title: 'Module 1: Sentence Formation',
        description: 'Learn ISL grammar and sentence structure',
        lessons: [
          { id: 16, title: 'Subject-Verb-Object Order', duration: '18 min', order: 1 },
          { id: 17, title: 'Questions in ISL', duration: '20 min', order: 2 },
          { id: 18, title: 'Negation & Affirmation', duration: '17 min', order: 3 },
        ],
      },
      {
        id: 202,
        title: 'Module 2: Workplace Communication',
        description: 'Professional ISL vocabulary',
        lessons: [
          { id: 19, title: 'Job Titles & Professions', duration: '16 min', order: 1 },
          { id: 20, title: 'Office Vocabulary', duration: '19 min', order: 2 },
          { id: 21, title: 'Meetings & Discussions', duration: '21 min', order: 3 },
        ],
      },
      {
        id: 203,
        title: 'Module 3: Healthcare & Wellness',
        description: 'Medical and health-related ISL terms',
        lessons: [
          { id: 22, title: 'Body Parts', duration: '14 min', order: 1 },
          { id: 23, title: 'Health Conditions', duration: '18 min', order: 2 },
          { id: 24, title: 'Medical Appointments', duration: '17 min', order: 3 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'ASL Basics',
    subtitle: 'Learn fundamental American Sign Language',
    description: 'American Sign Language fundamentals course for beginners.',
    language: 'ASL',
    difficulty: 'Beginner',
    duration: '4 weeks',
    instructor: 'Sarah Johnson',
    thumbnail: 'usa',
    emoji: '🇺🇸',
    students: 1800,
    rating: 4.7,
    modules: [
      {
        id: 301,
        title: 'Module 1: ASL Basics',
        description: 'Introduction to American Sign Language',
        lessons: [
          { id: 25, title: 'Introduction to ASL', duration: '15 min', order: 1 },
          { id: 26, title: 'Hand Shapes & Positions', duration: '17 min', order: 2 },
          { id: 27, title: 'Basic Signs', duration: '16 min', order: 3 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'BSL Essentials',
    subtitle: 'Master British Sign Language fundamentals',
    description: 'British Sign Language course for beginners.',
    language: 'BSL',
    difficulty: 'Beginner',
    duration: '5 weeks',
    instructor: 'Emma Roberts',
    thumbnail: 'uk',
    emoji: '🇬🇧',
    students: 950,
    rating: 4.6,
    modules: [
      {
        id: 401,
        title: 'Module 1: BSL Fundamentals',
        description: 'Learn the basics of British Sign Language',
        lessons: [
          { id: 28, title: 'BSL Basics', duration: '16 min', order: 1 },
          { id: 29, title: 'Cultural Context', duration: '14 min', order: 2 },
          { id: 30, title: 'Introductions', duration: '15 min', order: 3 },
        ],
      },
    ],
  },
];

// Comprehensive lesson data - ISL focused
export const allLessons = [
  // ISL Basics - Module 1
  {
    id: 1,
    courseId: 1,
    moduleId: 101,
    title: 'What is ISL?',
    description: 'Discover what Indian Sign Language is and its importance in communication.',
    duration: '12 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=What+is+ISL',
    subtitles: true,
    transcript: 'Indian Sign Language (ISL) is a visual language used by Deaf communities in India...',
    vocabulary: [
      { english: 'Sign Language', hindi: 'संकेत भाषा', marathi: 'संकेत भाषा' },
      { english: 'Deaf', hindi: 'बहरा', marathi: 'बहरा' },
      { english: 'Communication', hindi: 'संचार', marathi: 'संचार' },
    ],
    exercises: [
      { id: 1, text: 'Watch the introduction video', type: 'video' },
      { id: 2, text: 'Quiz: What is ISL?', type: 'quiz' },
    ],
    nextLessonId: 2,
    previousLessonId: null,
  },
  {
    id: 2,
    courseId: 1,
    moduleId: 101,
    title: 'ISL Culture & History',
    description: 'Learn about Deaf culture and the history of ISL.',
    duration: '18 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=ISL+Culture',
    subtitles: true,
    transcript: 'ISL has a rich history spanning centuries...',
    vocabulary: [
      { english: 'Culture', hindi: 'संस्कृति', marathi: 'संस्कृती' },
      { english: 'History', hindi: 'इतिहास', marathi: 'इतिहास' },
      { english: 'Community', hindi: 'समुदाय', marathi: 'समुदाय' },
    ],
    exercises: [
      { id: 3, text: 'Watch the cultural video', type: 'video' },
      { id: 4, text: 'Reflection: What did you learn?', type: 'reflection' },
    ],
    nextLessonId: 3,
    previousLessonId: 1,
  },
  {
    id: 3,
    courseId: 1,
    moduleId: 101,
    title: 'Basic Hand Shapes',
    description: 'Master the fundamental hand shapes used in ISL.',
    duration: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Hand+Shapes',
    subtitles: true,
    transcript: 'Hand shapes are the foundation of sign language...',
    vocabulary: [
      { english: 'Hand Shape', hindi: 'हाथ का आकार', marathi: 'हाताचा आकार' },
      { english: 'Open Hand', hindi: 'खुला हाथ', marathi: 'उघडा हात' },
      { english: 'Fist', hindi: 'मुट्ठी', marathi: 'मुठी' },
    ],
    exercises: [
      { id: 5, text: 'Practice hand shapes', type: 'practice' },
      { id: 6, text: 'Quiz: Identify hand shapes', type: 'quiz' },
    ],
    nextLessonId: 4,
    previousLessonId: 2,
  },
  // ISL Basics - Module 2
  {
    id: 4,
    courseId: 1,
    moduleId: 102,
    title: 'Hello & Goodbye',
    description: 'Learn the basic greeting and farewell signs.',
    duration: '14 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Hello+Goodbye',
    subtitles: true,
    transcript: 'Greetings are the first signs you should learn...',
    vocabulary: [
      { english: 'Hello', hindi: 'नमस्ते', marathi: 'नमस्कार' },
      { english: 'Goodbye', hindi: 'अलविदा', marathi: 'अलविदा' },
      { english: 'See you later', hindi: 'बाद में मिलते हैं', marathi: 'नंतर भेटू' },
    ],
    exercises: [
      { id: 7, text: 'Practice greeting sign', type: 'practice' },
      { id: 8, text: 'Record yourself greeting', type: 'video-submit' },
    ],
    nextLessonId: 5,
    previousLessonId: 3,
  },
  {
    id: 5,
    courseId: 1,
    moduleId: 102,
    title: 'Thank You & Please',
    description: 'Master polite signs for daily interactions.',
    duration: '16 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Thank+You+Please',
    subtitles: true,
    transcript: 'Politeness is essential in any language...',
    vocabulary: [
      { english: 'Thank you', hindi: 'धन्यवाद', marathi: 'धन्यवाद' },
      { english: 'Please', hindi: 'कृपया', marathi: 'कृपया' },
      { english: 'You\'re welcome', hindi: 'स्वागत है', marathi: 'स्वागत आहे' },
    ],
    exercises: [
      { id: 9, text: 'Practice polite signs', type: 'practice' },
      { id: 10, text: 'Create a polite conversation', type: 'challenge' },
    ],
    nextLessonId: 6,
    previousLessonId: 4,
  },
  {
    id: 6,
    courseId: 1,
    moduleId: 102,
    title: 'How Are You?',
    description: 'Learn to ask and answer "How are you?" in ISL.',
    duration: '13 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=How+Are+You',
    subtitles: true,
    transcript: 'A common question in any language is "How are you?"...',
    vocabulary: [
      { english: 'How are you?', hindi: 'आप कैसे हैं?', marathi: 'तुम कसे आहात?' },
      { english: 'I\'m fine', hindi: 'मैं ठीक हूँ', marathi: 'मी ठीक आहे' },
      { english: 'Good', hindi: 'अच्छा', marathi: 'चांगले' },
    ],
    exercises: [
      { id: 11, text: 'Learn "How are you?"', type: 'video' },
      { id: 12, text: 'Practice conversation', type: 'practice' },
    ],
    nextLessonId: 7,
    previousLessonId: 5,
  },
  // ISL Basics - Module 3
  {
    id: 7,
    courseId: 1,
    moduleId: 103,
    title: 'Numbers 1-10',
    description: 'Learn to sign numbers from 1 to 10.',
    duration: '16 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Numbers+1-10',
    subtitles: true,
    transcript: 'Numbers are fundamental in any language...',
    vocabulary: [
      { english: 'One', hindi: 'एक', marathi: 'एक' },
      { english: 'Two', hindi: 'दो', marathi: 'दोन' },
      { english: 'Number', hindi: 'संख्या', marathi: 'संख्या' },
    ],
    exercises: [
      { id: 13, text: 'Practice counting 1-10', type: 'practice' },
      { id: 14, text: 'Quiz: Identify numbers', type: 'quiz' },
    ],
    nextLessonId: 8,
    previousLessonId: 6,
  },
  {
    id: 8,
    courseId: 1,
    moduleId: 103,
    title: 'Numbers 11-20 & Counting',
    description: 'Learn numbers 11-20 and counting techniques.',
    duration: '18 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Numbers+11-20',
    subtitles: true,
    transcript: 'Once you master 1-10, learning 11-20 becomes easier...',
    vocabulary: [
      { english: 'Ten', hindi: 'दस', marathi: 'दहा' },
      { english: 'Twenty', hindi: 'बीस', marathi: 'वीस' },
      { english: 'Count', hindi: 'गिनती', marathi: 'गणना' },
    ],
    exercises: [
      { id: 15, text: 'Practice counting 1-20', type: 'practice' },
      { id: 16, text: 'Speed challenge', type: 'challenge' },
    ],
    nextLessonId: 9,
    previousLessonId: 7,
  },
  {
    id: 9,
    courseId: 1,
    moduleId: 103,
    title: 'Days & Months',
    description: 'Learn to sign days of the week and months.',
    duration: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Days+Months',
    subtitles: true,
    transcript: 'Time is an important part of daily communication...',
    vocabulary: [
      { english: 'Monday', hindi: 'सोमवार', marathi: 'सोमवार' },
      { english: 'January', hindi: 'जनवरी', marathi: 'जानेवारी' },
      { english: 'Day', hindi: 'दिन', marathi: 'दिवस' },
    ],
    exercises: [
      { id: 17, text: 'Learn days of week', type: 'video' },
      { id: 18, text: 'Practice months', type: 'practice' },
    ],
    nextLessonId: 10,
    previousLessonId: 8,
  },
  // ISL Basics - Module 4
  {
    id: 10,
    courseId: 1,
    moduleId: 104,
    title: 'My Name Is...',
    description: 'Learn to introduce yourself in ISL.',
    duration: '14 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=My+Name+Is',
    subtitles: true,
    transcript: 'One of the first things to learn is how to introduce yourself...',
    vocabulary: [
      { english: 'My name is', hindi: 'मेरा नाम है', marathi: 'माझे नाव आहे' },
      { english: 'Name', hindi: 'नाम', marathi: 'नाव' },
      { english: 'I', hindi: 'मैं', marathi: 'मी' },
    ],
    exercises: [
      { id: 19, text: 'Learn introduction', type: 'video' },
      { id: 20, text: 'Introduce yourself', type: 'video-submit' },
    ],
    nextLessonId: 11,
    previousLessonId: 9,
  },
  {
    id: 11,
    courseId: 1,
    moduleId: 104,
    title: 'Family Members',
    description: 'Learn signs for different family members.',
    duration: '17 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Family+Members',
    subtitles: true,
    transcript: 'Talking about family is a common topic...',
    vocabulary: [
      { english: 'Mother', hindi: 'माता', marathi: 'आई' },
      { english: 'Father', hindi: 'पिता', marathi: 'बाप' },
      { english: 'Sister', hindi: 'बहन', marathi: 'बहिण' },
      { english: 'Brother', hindi: 'भाई', marathi: 'भाऊ' },
    ],
    exercises: [
      { id: 21, text: 'Learn family signs', type: 'video' },
      { id: 22, text: 'Create family tree in ISL', type: 'challenge' },
    ],
    nextLessonId: 12,
    previousLessonId: 10,
  },
  {
    id: 12,
    courseId: 1,
    moduleId: 104,
    title: 'Colors & Objects',
    description: 'Learn to sign common colors and objects.',
    duration: '16 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Colors+Objects',
    subtitles: true,
    transcript: 'Colors and objects are part of everyday vocabulary...',
    vocabulary: [
      { english: 'Red', hindi: 'लाल', marathi: 'लाल' },
      { english: 'Blue', hindi: 'नीला', marathi: 'निळा' },
      { english: 'Book', hindi: 'किताब', marathi: 'पुस्तक' },
      { english: 'Table', hindi: 'मेज', marathi: 'टेबल' },
    ],
    exercises: [
      { id: 23, text: 'Learn colors', type: 'practice' },
      { id: 24, text: 'Quiz: Colors & objects', type: 'quiz' },
    ],
    nextLessonId: 13,
    previousLessonId: 11,
  },
  // ISL Basics - Module 5
  {
    id: 13,
    courseId: 1,
    moduleId: 105,
    title: 'Happy, Sad, Angry',
    description: 'Learn to express basic emotions in ISL.',
    duration: '13 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Emotions',
    subtitles: true,
    transcript: 'Emotions are conveyed through facial expressions and hand signs...',
    vocabulary: [
      { english: 'Happy', hindi: 'खुश', marathi: 'आनंदी' },
      { english: 'Sad', hindi: 'दुखी', marathi: 'दुःखी' },
      { english: 'Angry', hindi: 'गुस्से में', marathi: 'रागित' },
    ],
    exercises: [
      { id: 25, text: 'Learn emotion signs', type: 'video' },
      { id: 26, text: 'Express emotions', type: 'practice' },
    ],
    nextLessonId: 14,
    previousLessonId: 12,
  },
  {
    id: 14,
    courseId: 1,
    moduleId: 105,
    title: 'I Like / I Dislike',
    description: 'Learn to express preferences in ISL.',
    duration: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Like+Dislike',
    subtitles: true,
    transcript: 'Expressing preferences is essential for communication...',
    vocabulary: [
      { english: 'Like', hindi: 'पसंद करना', marathi: 'आवडते' },
      { english: 'Dislike', hindi: 'नापसंद करना', marathi: 'आवडत नाही' },
      { english: 'Love', hindi: 'प्यार', marathi: 'प्रेम' },
    ],
    exercises: [
      { id: 27, text: 'Learn preference signs', type: 'video' },
      { id: 28, text: 'Express your preferences', type: 'practice' },
    ],
    nextLessonId: 15,
    previousLessonId: 13,
  },
  {
    id: 15,
    courseId: 1,
    moduleId: 105,
    title: 'Common Expressions',
    description: 'Learn commonly used ISL expressions.',
    duration: '14 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Expressions',
    subtitles: true,
    transcript: 'These expressions are used frequently in ISL conversations...',
    vocabulary: [
      { english: 'Congratulations', hindi: 'बधाई हो', marathi: 'अभिनंदन' },
      { english: 'Sorry', hindi: 'माफी', marathi: 'क्षमा' },
      { english: 'Excuse me', hindi: 'क्षमा करें', marathi: 'माझ्या मार्गस्थ' },
    ],
    exercises: [
      { id: 29, text: 'Learn common expressions', type: 'video' },
      { id: 30, text: 'Final quiz', type: 'quiz' },
    ],
    nextLessonId: 16,
    previousLessonId: 14,
  },
  // ISL Intermediate lessons
  {
    id: 16,
    courseId: 2,
    moduleId: 201,
    title: 'Subject-Verb-Object Order',
    description: 'Understand ISL grammar and sentence structure.',
    duration: '18 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://via.placeholder.com/800x600?text=Grammar',
    subtitles: true,
    transcript: 'ISL sentence structure follows specific patterns...',
    vocabulary: [
      { english: 'Subject', hindi: 'कर्ता', marathi: 'विषय' },
      { english: 'Verb', hindi: 'क्रिया', marathi: 'क्रिया' },
      { english: 'Object', hindi: 'कर्म', marathi: 'वस्तू' },
    ],
    exercises: [
      { id: 31, text: 'Learn sentence structure', type: 'video' },
      { id: 32, text: 'Form sentences', type: 'practice' },
    ],
    nextLessonId: 17,
    previousLessonId: 15,
  },
  {
    id: 17,
    courseId: 2,
    moduleId: 201,
    title: 'Questions in ISL',
    description: 'Learn how to form and answer questions.',
    duration: '20 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://via.placeholder.com/800x600?text=Questions',
    subtitles: true,
    transcript: 'Asking and answering questions is crucial...',
    vocabulary: [
      { english: 'What', hindi: 'क्या', marathi: 'काय' },
      { english: 'Who', hindi: 'कौन', marathi: 'कोण' },
      { english: 'Where', hindi: 'कहाँ', marathi: 'कुठे' },
    ],
    exercises: [
      { id: 33, text: 'Question formation', type: 'practice' },
      { id: 34, text: 'Q&A practice', type: 'challenge' },
    ],
    nextLessonId: 18,
    previousLessonId: 16,
  },
  {
    id: 18,
    courseId: 2,
    moduleId: 201,
    title: 'Negation & Affirmation',
    description: 'Express negation and affirmation in ISL.',
    duration: '17 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://via.placeholder.com/800x600?text=Negation',
    subtitles: true,
    transcript: 'Showing agreement and disagreement...',
    vocabulary: [
      { english: 'No', hindi: 'नहीं', marathi: 'नाही' },
      { english: 'Yes', hindi: 'हाँ', marathi: 'हो' },
      { english: 'Maybe', hindi: 'शायद', marathi: 'कदाचित' },
    ],
    exercises: [
      { id: 35, text: 'Learn negation', type: 'video' },
      { id: 36, text: 'Practice agreement/disagreement', type: 'practice' },
    ],
    nextLessonId: 19,
    previousLessonId: 17,
  },
  // Additional lessons for other courses (abbreviated)
  {
    id: 25,
    courseId: 3,
    moduleId: 301,
    title: 'Introduction to ASL',
    description: 'Learn the basics of American Sign Language.',
    duration: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=ASL+Intro',
    subtitles: true,
    transcript: 'American Sign Language is...',
    vocabulary: [
      { english: 'Hello', hindi: 'नमस्ते', marathi: 'नमस्कार' },
    ],
    exercises: [
      { id: 37, text: 'Watch ASL introduction', type: 'video' },
    ],
    nextLessonId: 26,
    previousLessonId: null,
  },
  {
    id: 26,
    courseId: 3,
    moduleId: 301,
    title: 'Hand Shapes & Positions',
    description: 'Learn ASL hand shapes.',
    duration: '17 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Hand+Shapes',
    subtitles: true,
    transcript: 'Hand shapes are...',
    vocabulary: [
      { english: 'Hand', hindi: 'हाथ', marathi: 'हात' },
    ],
    exercises: [
      { id: 38, text: 'Practice hand shapes', type: 'practice' },
    ],
    nextLessonId: 27,
    previousLessonId: 25,
  },
  {
    id: 27,
    courseId: 3,
    moduleId: 301,
    title: 'Basic Signs',
    description: 'Learn basic ASL signs.',
    duration: '16 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Basic+Signs',
    subtitles: true,
    transcript: 'Basic signs include...',
    vocabulary: [],
    exercises: [
      { id: 39, text: 'Learn basic signs', type: 'practice' },
    ],
    nextLessonId: null,
    previousLessonId: 26,
  },
  {
    id: 28,
    courseId: 4,
    moduleId: 401,
    title: 'BSL Basics',
    description: 'Learn the basics of British Sign Language.',
    duration: '16 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=BSL+Basics',
    subtitles: true,
    transcript: 'British Sign Language...',
    vocabulary: [],
    exercises: [
      { id: 40, text: 'Watch BSL introduction', type: 'video' },
    ],
    nextLessonId: 29,
    previousLessonId: null,
  },
  {
    id: 29,
    courseId: 4,
    moduleId: 401,
    title: 'Cultural Context',
    description: 'Learn about BSL culture.',
    duration: '14 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=BSL+Culture',
    subtitles: true,
    transcript: 'BSL culture...',
    vocabulary: [],
    exercises: [
      { id: 41, text: 'Learn about culture', type: 'video' },
    ],
    nextLessonId: 30,
    previousLessonId: 28,
  },
  {
    id: 30,
    courseId: 4,
    moduleId: 401,
    title: 'Introductions',
    description: 'Learn BSL introductions.',
    duration: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://via.placeholder.com/800x600?text=Introductions',
    subtitles: true,
    transcript: 'Introductions in BSL...',
    vocabulary: [],
    exercises: [
      { id: 42, text: 'Practice introductions', type: 'practice' },
    ],
    nextLessonId: null,
    previousLessonId: 29,
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
  return allLessons.find((lesson) => lesson.id === lessonId) || null;
};

// Get all lessons for a course
export const getCourseLessons = (courseId) => {
  return allLessons.filter((lesson) => lesson.courseId === courseId);
};

// Get course by ID
export const getCourseById = (courseId) => {
  return mockCourses.find((c) => c.id === courseId) || null;
};

// Get module by ID
export const getModuleById = (courseId, moduleId) => {
  const course = getCourseById(courseId);
  return course ? course.modules.find((m) => m.id === moduleId) : null;
};

// Get all modules for a course
export const getModulesByCourse = (courseId) => {
  const course = getCourseById(courseId);
  return course ? course.modules : [];
};

// Get lessons for a module
export const getLessonsByModule = (courseId, moduleId) => {
  const module = getModuleById(courseId, moduleId);
  return module ? module.lessons : [];
};

// Get next lesson in course
export const getNextLesson = (lessonId) => {
  const lesson = getLesson(lessonId);
  return lesson && lesson.nextLessonId ? getLesson(lesson.nextLessonId) : null;
};

// Get previous lesson in course
export const getPreviousLesson = (lessonId) => {
  const lesson = getLesson(lessonId);
  return lesson && lesson.previousLessonId ? getLesson(lesson.previousLessonId) : null;
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

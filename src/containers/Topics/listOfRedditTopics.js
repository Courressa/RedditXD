import { TopicsIcons } from "../../features/svg_icons/TopicsIcons";
import { Games } from "../../features/svg_icons/Games";
import { QAndAs } from "../../features/svg_icons/QAndAs";
import { Technology } from "../../features/svg_icons/Technology";
import { PopCulture } from "../../features/svg_icons/PopCulture";
import { MoviesAndTV } from "../../features/svg_icons/MoviesAndTV";

export const redditTopics = [
    { mainTopic: "Internet Culture (Viral)",
        icon: <TopicsIcons />,
        subtopics: ["Amazing", "Animals & Pets", "Cringe & Facepalm", "Funny", "Interesting", "Memes", "Oddly Satisfying", "Reddit Meta", "Wholesome & Heartwarming"],
    },
    {mainTopic: "Games",
        icon: <Games />,
        subtopics: ["Action Games", "Adventure Games", "Esports", "Gaming Consoles & Gear", "Gaming News & Discussion", "Mobile Games", "Other Games", "Role-Playing Games", "Simulation Games", "Sports & Racing Games","Strategy Games", "Tabletop Games"],
    },
    {mainTopic: "Q&As",
        icon: <QAndAs />,
        subtopics: ["Q&As", "Stories & Confessions"],
    },
    {mainTopic: "Technology",
        icon: <Technology />,
        subtopics: ["3D Printing", "Artificial Intelligence & Machine Learning", "Computers & Hardware", "Consumer Electronics", "DIY Electronics", "Programming", "Software & Apps", "Streaming Services", "Tech News & Discussion", "Virtual & Augumented Reality"],
    },
    {mainTopic: "Pop Culture",
        icon: <PopCulture />,
        subtopics: ["Celebrities", "Creators & Influencers", "Generations & Nostalgia", "Podcasts", "Streamers", "Tarot & Astrology"],
    },
    {mainTopic: "Movies & TV",
        icon: <MoviesAndTV />,
        subtopics: ["Action Movies & Series", "Animated Movies & Series", "Comedy Movies & Series", "Crime, Mystery, & Thriller Movies & Series", "Documentary Movies & Series", "Drama Movies & Series", 
            "Fantasy Movies & Series", "Horror Movies & Series", "Movie News & Discussion", "Reality TV", "Romance Movies & Series", "Sci-Fi Movies & Series", "Superhero Movies & Series", "TV News & Discussion"
        ],
    },
    {mainTopic: "Anime",
    },
    {mainTopic: "Arts",
    },
    {mainTopic: "Businesss",
    },
    {mainTopic: "Collectibles & OtherHobbies",
    },
    {mainTopic: "Education & Career",
    },
    {mainTopic: "Fashion & Beauty",
    },
    {mainTopic: "Food & Drinks",
    },
    {mainTopic: "Home & Garden",
    },
    {mainTopic: "Humanities & Law",
    },
    {mainTopic: "Music",
    },
    {mainTopic: "Nature & Outdoors",
    },
    {mainTopic: "News & Politics",
    },
    {mainTopic: "Places & Travel",
    },
    {mainTopic: "Science",
    },
    {mainTopic: "Sports",
    },
    {mainTopic: "Spooky",
    },
    {mainTopic: "Vehicles",
    },
    {mainTopic: "Wellness",
    },
];

/*export const redditMainTopics = [
    {Grouped: {
        Internet_Culture: {
            0: "Amazing",
            1: "Animals & Pets",
            2: "Cringe & Facepalm",
            3: "Funny",
            4: "Interesting",
            5: "Memes",
            6: "Oddly Satisfying",
            7: "Reddit Meta",
            8: "Wholesome & Heartwarming",
        },
        Games: {
            0: "Action Games",
            1: "Adventure Games",
            2: "Esports",
            3: "Gaming Consoles & Gear",
            4: "Gaming News & Discussion",
            5: "Mobile Games",
            6: "Other Games",
            7: "Role-Playing Games",
            8: "Simulation Games",
            9: "Sports & Racing Games",
            10: "Strategy Games",
            11: "Tabletop Games",
        },
        QandAs: {
            0: "Q&As",
            1: "Stories & Confessions",
        },
        Technology: {
            0: "3D Printing",
            1: "Artificial Intelligence & Machine Learning",
            2: "Computers & Hardware",
            3: "Consumer Electronics",
            4: "DIY Electronics",
            5: "Programming",
            6: "Software & Apps",
            7: "Streaming Services",
            8: "Tech News & Discussion",
            9: "Virtual & Augumented Reality",
        },
        Pop_Culture: {
            0: "Celebrities",
            1: "Creators & Influencers",
            2: "Generations & Nostalgia",
            3: "Podcasts",
            4: "Streamers",
            5: "Tarot & Astrology",
        },
        MoviesandTV: {
            0: "Action Movies & Series",
            1: "Animated Movies & Series",
            2: "Comedy Movies & Series",
            3: "Crime, Mystery, & Thriller Movies & Series",
            4: "Documentary Movies & Series",
            5: "Drama Movies & Series",
            6: "Fantasy Movies & Series",
            7: "Horror Movies & Series",
            8: "Movie News & Discussion",
            9: "Reality TV",
            10: "Romance Movies & Series",
            11: "Sci-Fi Movies & Series",
            12: "Superhero Movies & Series",
            13: "TV News & Discussion",
        }}
    },
    {NonGrouped: {
        0: "Anime",
        1: "Arts",
        2: "Businesss",
        3: "Collectibles & OtherHobbies",
        4: "Education & Career",
        5: "Fashion & Beauty",
        6: "Food & Drinks",
        7: "Home & Garden",
        8: "Humanities & Law",
        9: "Music",
        10: "Nature & Outdoors",
        11: "News & Politics",
        12: "Places & Travel",
        13: "Science",
        14: "Sports",
        15: "Spooky",
        16: "Vehicles",
        17: "Wellness",
    }}
];



export const redditMainTopics = ["Internet Culture", "Games", "Q&As", "Technology", "Pop Culture", "Movies & TV", "Anime", "Arts", "Businesss", "Collectibles & OtherHobbies", "Education & Career", "Fashion & Beauty",
    "Food & Drinks", "Home & Garden", "Humanities & Law", "Music", "Nature & Outdoors", "News & Politics", "Places & Travel", "Science", "Sports", "Spooky", "Vehicles", "Wellness"
];

export const internetCultureSubTopics = ["Amazing", "Animals & Pets", "Cringe & Facepalm", "Funny", "Interesting", "Memes", "Oddly Satisfying", "Reddit Meta", "Wholesome & Heartwarming"];

export const gamesSubTopics = ["Action Games", "Adventure Games", "Esports", "Gaming Consoles & Gear", "Gaming News & Discussion", "Mobile Games", "Other Games", "Role-Playing Games", "Simulation Games", "Sports & Racing Games","Strategy Games", "Tabletop Games"];

export const qAndAsSubTopics = ["Q&As", "Stories & Confessions"];

export const technologySubTopics = ["3D Printing", "Artificial Intelligence & Machine Learning", "Computers & Hardware", "Consumer Electronics", "DIY Electronics", "Programming", "Software & Apps", "Streaming Services", "Tech News & Discussion", "Virtual & Augumented Reality"];

export const popCultureSubTopics = ["Celebrities", "Creators & Influencers", "Generations & Nostalgia", "Podcasts", "Streamers", "Tarot & Astrology"];

export const moviesAndTVSubTopics = ["Action Movies & Series", "Animated Movies & Series", "Comedy Movies & Series", "Crime, Mystery, & Thriller Movies & Series", "Documentary Movies & Series", "Drama Movies & Series", 
    "Fantasy Movies & Series", "Horror Movies & Series", "Movie News & Discussion", "Reality TV", "Romance Movies & Series", "Sci-Fi Movies & Series", "Superhero Movies & Series", "TV News & Discussion"
];

*/


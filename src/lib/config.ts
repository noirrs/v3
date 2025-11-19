// Portfolio Configuration
// Central place to manage all usernames and account names

const GITHUB_USERNAME = "noirrs";

export const config = {
  social: {
    github: GITHUB_USERNAME,
    linkedin: "tahakacmaz",
    email: "hi@noir.land",
  },
  data: {
    dataUrl: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/master/data.json`,
  },
  research: [
    {
      name: "Football Analyzer",
      emoji: "🔬",
      description:
        "YOLOv8-based computer vision system for tracking players, ball & referees, estimating speed, distance, team assignment & ball possession in football matches.",
      link: "https://github.com/noirrs/football-analyser",
      status: "In Publication",
      type: "Research",
      title: "Computer Vision",
      image: null,
    },
  ],
};

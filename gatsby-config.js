module.exports = {
  siteMetadata: {
    title: "Portfolio",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "tracker-portfolio",
      },
    },
  ],
};

module.exports = {
  siteMetadata: {
    title: "Portfolio",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-glslify",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/
        }
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "tracker-portfolio",
      },
    },
  ],
};

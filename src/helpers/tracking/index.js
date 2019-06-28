

module.exports = {
    trackPage: (page) => {
        if (window.ga) {
            window.ga('send', 'pageview', page);
        }
    }
};

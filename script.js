document.addEventListener('DOMContentLoaded', () => {
    // Scroll-based animation triggers
    function onScrollAnimate() {
        const problem = document.getElementById('problem');
        if (problem && isVisible(problem)) {
            problem.classList.add('visible');
        }
        document.querySelectorAll('.card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        document.querySelectorAll('.step').forEach(step => {
            if (isVisible(step)) {
                step.classList.add('visible');
            }
        });
        document.querySelectorAll('.recommendation-card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        document.querySelectorAll('.integration-card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        const footer = document.querySelector('footer');
        if (footer && isVisible(footer)) {
            footer.classList.add('visible');
        }
    }

    function isVisible(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight - 60 &&
            rect.bottom > 60
        );
    }

    window.addEventListener('scroll', onScrollAnimate);
    window.addEventListener('load', onScrollAnimate);
});

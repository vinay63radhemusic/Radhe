document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll("#starRating span");
    const hiddenStars = document.getElementById("selectedStars");
    const reviews = document.getElementById("reviews");
    const savedReviews = JSON.parse(localStorage.getItem("customerMusicReviews")) || [];

    savedReviews.forEach(addReview);

    stars.forEach(star => {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.value));
        star.addEventListener("click", () => {
            hiddenStars.value = star.dataset.value;
            highlightStars(star.dataset.value);
        });
    });

    document.getElementById("starRating").addEventListener("mouseleave", () => {
        highlightStars(hiddenStars.value);
    });

    document.getElementById("ratingForm").addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("customerName").value.trim();
        const feedback = document.getElementById("customerFeedback").value.trim();
        const stars = hiddenStars.value;

        if (name && feedback && stars > 0) {
            const review = { name, feedback, stars };
            savedReviews.push(review);
            localStorage.setItem("customerMusicReviews", JSON.stringify(savedReviews));
            addReview(review);
            e.target.reset();
            hiddenStars.value = 0;
            highlightStars(0);
        } else {
            alert("Please enter name, feedback, and select star rating!");
        }
    });

    function highlightStars(count) {
        stars.forEach(star => {
            star.classList.remove("selected");
            if (parseInt(star.dataset.value) <= count) {
                star.classList.add("selected");
            }
        });
    }

    function addReview({ name, feedback, stars }) {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${name}</strong>
            <div class="stars">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</div>
            <p>${feedback}</p>
        `;
        reviews.appendChild(li);
    }
});

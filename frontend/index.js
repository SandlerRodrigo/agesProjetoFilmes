document.querySelector(".header input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        const inputValue = event.target.value; // Get the input value
        fetch(`http://localhost:3004/movies/reviews/${inputValue}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data for now
                // You can now use the data
            })
            .catch(error => console.error('Error:', error));
    }
});
export default function filterMovies(movie, filterValue) {
    if (filterValue === "") {
        return true;
    }
    const searchAble = [
        movie.title,
        movie.description,
        movie.director,
        movie.stars,
        movie.writers,
        movie.genres,
    ];
    const searchAbleConcat = searchAble.join("");

    return searchAbleConcat.toLowerCase().includes(filterValue.toLowerCase());
}

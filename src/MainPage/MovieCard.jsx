import staricon from '../assets/MainPage/star.png'
function MovieCard(props) {
    return (
        <div key={props.movie.id} className="movie-card">
            <img src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}` : '/no-movie.png'} alt="title" />
            
          <div className="mt-4">
                <h4>{props.movie.title}</h4>
                </div>
                <div className="content">

                    <div className="rating">
                    <img src={staricon} alt="star Icon" />
                    <p>{props.movie.vote_average ? props.movie.vote_average.toFixed(1) : 'N/A'}</p>
                    <span className='dotted-border'>•</span>
                    <p className='lang'>{props.movie.original_language}</p>
                    <span className='dotted-border'>•</span>
                
                    <p className='year'>{ props.movie.release_date ? props.movie.release_date.split('-')[0]:'N/A'}</p>
                    </div>  
            </div>
        </div>
    )
}
export default MovieCard;
export function StarRating({ rating, onRate }) {
    const stars = [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => onRate(star)}
        style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
      >
        ★
      </span>
    ));
  
    return <div>{stars}</div>;
  }

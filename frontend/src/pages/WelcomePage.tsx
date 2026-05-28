import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ApiError, fetchNextDelivery } from '../api';
import { CAT_IMAGE_URL } from '../constants';

const GBP_FORMATTER = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function WelcomePage() {
  const { userId = '' } = useParams();

  const query = useQuery({
    queryKey: ['next-delivery', userId],
    queryFn: () => fetchNextDelivery(userId),
    retry: false,
  });

  if (query.isLoading) {
    return (
      <main className="page page-center">
        <p className="status-text">Loading your welcome message...</p>
      </main>
    );
  }

  if (query.isError) {
    const message =
      query.error instanceof ApiError &&
      (query.error.status === 400 || query.error.status === 404)
        ? "We couldn't load this welcome page."
        : "We couldn't reach the API. Check that the backend is running on port 3000.";

    return (
      <main className="page page-center">
        <section className="card card-compact">
          <h1>Welcome Page Unavailable</h1>
          <p>{message}</p>
        </section>
      </main>
    );
  }

  if (!query.data) {
    return (
      <main className="page page-center">
        <p className="status-text">No delivery data available.</p>
      </main>
    );
  }

  const { title, message, totalPrice, freeGift } = query.data;

  return (
    <main className="page page-welcome preview-page">
      <section className="welcome-preview">
        {freeGift ? <p className="gift-ribbon">FREE GIFT</p> : null}

        <aside className="welcome-image-panel">
          <img
            src={CAT_IMAGE_URL}
            alt="Cat"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </aside>

        <div className="welcome-content">
          <h1 className="welcome-title">{title}</h1>
          <p className="welcome-message">{message}</p>
          <p className="welcome-price">
            Total price: {GBP_FORMATTER.format(totalPrice)}
          </p>

          <div className="welcome-actions">
            <button
              type="button"
              className="welcome-button welcome-button-primary"
            >
              SEE DETAILS
            </button>
            <button
              type="button"
              className="welcome-button welcome-button-outline"
            >
              EDIT DELIVERY
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ApiError, fetchNextDelivery } from '../api';
import { CAT_IMAGE_URL, FREE_GIFT_THRESHOLD } from '../constants';

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
      query.error instanceof ApiError && (query.error.status === 400 || query.error.status === 404)
        ? "We couldn't load this welcome page."
        : 'Something went wrong. Please try again.';

    return (
      <main className="page page-center">
        <section className="card card-compact">
          <h1>Welcome Page Unavailable</h1>
          <p>{message}</p>
          <Link className="button button-secondary" to="/">
            Back to launcher
          </Link>
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
  const spendMore = Math.max(0, FREE_GIFT_THRESHOLD + 0.01 - totalPrice);

  return (
    <main className="page page-welcome">
      <section className="card">
        <p className="eyebrow">KatKin</p>
        <h1>{title}</h1>
        <p className="lede">{message}</p>

        <div className="price-panel">
          <p className="price-label">Total price</p>
          <p className="price-value">{GBP_FORMATTER.format(totalPrice)}</p>
        </div>

        {freeGift ? (
          <p className="gift-positive">Free gift included in your next delivery.</p>
        ) : totalPrice > 0 ? (
          <p className="gift-neutral">
            Spend {GBP_FORMATTER.format(spendMore)} more for a free gift.
          </p>
        ) : null}

        <Link className="button button-secondary" to="/">
          Try another user
        </Link>
      </section>

      <aside className="image-panel">
        <img
          src={CAT_IMAGE_URL}
          alt="Cat"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </aside>
    </main>
  );
}

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAT_IMAGE_URL, SAMPLE_USER_ID, UUID_REGEX } from '../constants';

export function HomePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [validationError, setValidationError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!UUID_REGEX.test(userId)) {
      setValidationError('Enter a valid user ID (UUID).');
      return;
    }

    setValidationError('');
    navigate(`/welcome/${userId}`);
  };

  return (
    <main className="page page-home">
      <section className="card">
        <p className="eyebrow">KatKin Tech Test</p>
        <h1>Personalized Welcome Messages</h1>
        <p className="lede">
          Test the delivery messaging flow with a sample user or enter any user ID from the dataset.
        </p>

        <div className="actions-row">
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigate(`/welcome/${SAMPLE_USER_ID}`)}
          >
            Try sample user
          </button>
        </div>

        <form className="id-form" onSubmit={onSubmit}>
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            name="userId"
            placeholder="ff535484-6880-4653-b06e-89983ecf4ed5"
            value={userId}
            onChange={(event) => setUserId(event.target.value.trim())}
          />
          {validationError ? <p className="error-text">{validationError}</p> : null}
          <button type="submit" className="button button-secondary">
            Go to welcome page
          </button>
        </form>
      </section>

      <aside className="image-panel">
        <img src={CAT_IMAGE_URL} alt="Cat" />
      </aside>
    </main>
  );
}

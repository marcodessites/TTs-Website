import { useEffect, useState } from 'react';

const books = [
  {
    id: '1',
    slug: 'eric-the-colorful-cricket-saves-christmas',
    title: 'Eric the Colorful Cricket Saves Christmas',
    price: '$16.99',
    label: 'Holiday Favorite',
    type: 'Holiday Favorite',
    description: 'A bright winter adventure full of laughter, friendship, and holiday cheer.',
    readingLevel: 'Ages 3–7',
    image: 'https://static.wixstatic.com/media/f636a0_ea024729eef14d8ea872d86985413eab~mv2.jpeg/v1/fill/w_1280,h_1280,al_c,q_85/f636a0_ea024729eef14d8ea872d86985413eab~mv2.jpeg',
  },
  {
    id: '2',
    slug: 'too-excited-to-sleep',
    title: 'Too Excited To Sleep!',
    price: '$18.99',
    label: 'Parent Favorite',
    type: 'Bedtime Story',
    description: 'A warm and soothing bedtime story for little readers who can’t wait for tomorrow.',
    readingLevel: 'Ages 3–6',
    image: 'https://static.wixstatic.com/media/f636a0_ba8632bed6044ce089eb4743c39f4492~mv2.jpg/v1/fill/w_902,h_832,al_c,q_85,usm_0.66_1.00_0.01/f636a0_ba8632bed6044ce089eb4743c39f4492~mv2.jpg',
  },
  {
    id: '3',
    slug: 'eric-the-colorful-cricket-starts-kindergarten',
    title: 'Eric the Colorful Cricket Starts Kindergarten',
    price: '$18.99',
    label: 'Back to School Pick',
    type: 'School Adventure',
    description: 'A gentle guide for first-day readers, full of confidence-building moments.',
    readingLevel: 'Ages 4–7',
    image: 'https://static.wixstatic.com/media/f636a0_d91a36217eaf48c9ab800b6119ce6b25~mv2.jpeg/v1/fill/w_832,h_832,al_c,q_85,usm_0.66_1.00_0.01/f636a0_d91a36217eaf48c9ab800b6119ce6b25~mv2.jpeg',
  },
];

const events = [
  {
    title: 'Countdown to Christmas in July 🎄',
    date: 'Fri, Jul 24',
    location: 'Fredericksburg Convention Center',
    url: 'https://www.tammycauthor.com/event-details/countdown-to-christmas-in-july-2026-07-24-11-00',
  },
  {
    title: '33rd Manassas African American Heritage Festival',
    date: 'Sat, Aug 01',
    location: 'Manassas',
    url: 'https://www.tammycauthor.com/event-details/33rd-manassas-african-american-heritage-festival',
  },
  {
    title: 'Back to School Bash & Craft Fair',
    date: 'Sat, Aug 08',
    location: 'Wilderness Presidential Resort',
    url: 'https://www.tammycauthor.com/event-details/back-to-school-bash-craft-fair',
  },
  {
    title: 'The Fredericksburg Independent Book Festival',
    date: 'Sat, Oct 03',
    location: 'Fredericksburg',
    url: 'https://www.tammycauthor.com/event-details/the-fredericksburg-independent-book-festival',
  },
  {
    title: 'Brooke Point Dance Team Fall Craft Fair',
    date: 'Sat, Nov 07',
    location: 'Brooke Point High School',
    url: 'https://www.tammycauthor.com/event-details/brooke-point-dance-team-fall-craft-fair',
  },
];

const updates = [
  { date: '2026-06-30', text: 'Added hidden /updates route and updates page.' },
  { date: '2026-06-29', text: 'Separated Home and Shop pages with distinct content.' },
  { date: '2026-06-28', text: 'Implemented events page with RSVP buttons and centered header.' },
  { date: '2026-06-27', text: 'Added book detail pages and cart functionality.' },
];

const buildBookPath = (book) =>
  `/${book.slug}-${book.id}-${book.price.replace('$', '')}-${book.type.replace(/\s+/g, '-').toLowerCase()}`;

const parseRoute = (path) => {
  if (path === '/' || path === '/home') {
    return { page: 'home', bookId: null };
  }

  if (path === '/shop') {
    return { page: 'shop', bookId: null };
  }

  if (path === '/events') {
    return { page: 'events', bookId: null };
  }

  if (path === '/updates') {
    return { page: 'updates', bookId: null };
  }

  const matched = books.find((book) => path.startsWith(`/${book.slug}-${book.id}`));
  if (matched) {
    return { page: 'book', bookId: matched.id };
  }

  return { page: 'home', bookId: null };
};

function App() {
  const [route, setRoute] = useState(parseRoute(window.location.pathname));
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialMessage, setSpecialMessage] = useState('');

  const currentBook = books.find((book) => book.id === route.bookId);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handlePopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route.page === 'book' && currentBook) {
      document.title = `${currentBook.title} | TC Books`;
    } else if (route.page === 'events') {
      document.title = 'Events | TC Books';
    } else if (route.page === 'updates') {
      document.title = 'Updates | TC Books';
    } else if (route.page === 'shop') {
      document.title = 'Shop TC Books';
    } else {
      document.title = 'Welcome to TC Books';
    }
  }, [route, currentBook]);

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setRoute({ page: 'home', bookId: null });
  };

  const goShop = () => {
    window.history.pushState({}, '', '/shop');
    setRoute({ page: 'shop', bookId: null });
  };

  const goEvents = () => {
    window.history.pushState({}, '', '/events');
    setRoute({ page: 'events', bookId: null });
  };

  const showBookPage = (bookId) => {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;
    setQuantity(1);
    setSpecialMessage('');
    window.history.pushState({}, '', buildBookPath(book));
    setRoute({ page: 'book', bookId });
  };

  const toggleCart = () => setCartOpen((open) => !open);

  const addToCart = (bookId, qty = 1, note = '') => {
    setCartItems((items) => {
      const existing = items.find((item) => item.bookId === bookId);
      if (existing) {
        return items.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + qty, note: note || item.note }
            : item
        );
      }
      return [...items, { bookId, quantity: qty, note }];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (bookId, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (bookId) => {
    setCartItems((items) => items.filter((item) => item.bookId !== bookId));
  };

  const cartDetails = cartItems.map((item) => {
    const book = books.find((bookItem) => bookItem.id === item.bookId);
    return { ...item, book };
  });

  return (
    <div className="page-shell">
      <header className="top-bar sticky-bar">
        <div className="top-left">
          <button className="brand-logo" type="button" onClick={goHome}>
            TC Books
          </button>
        </div>

        <div className="top-center">
          <button className="home-button" onClick={goHome}>
            Home Page
          </button>
          <button className="shop-button" onClick={goShop}>
            Shop Now
          </button>
          <button className="event-button" onClick={goEvents}>
            Events
          </button>
        </div>

        <button className="cart-button" onClick={toggleCart} aria-label="Open cart">
          <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 4h-2a1 1 0 1 0 0 2h1.18l1.72 8.4a3 3 0 0 0 2.96 2.6h7.28a1 1 0 1 0 0-2h-7.28a1 1 0 0 1-.99-.87L9.1 6H20a1 1 0 1 0 0-2H7z" fill="currentColor"/>
            <circle cx="9" cy="20" r="2" fill="currentColor"/>
            <circle cx="18" cy="20" r="2" fill="currentColor"/>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </header>

      {cartOpen && (
        <aside className="cart-panel">
          <div className="cart-panel-header">
            <h2>Your Cart</h2>
            <button className="tiny-close" onClick={toggleCart} aria-label="Close cart">
              ×
            </button>
          </div>

          {cartDetails.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <div className="cart-list">
              {cartDetails.map((item) => (
                <div key={item.bookId} className="cart-item">
                  <div>
                    <strong>{item.book.title}</strong>
                    <div className="cart-note">{item.note || 'No special message'}</div>
                    <div className="cart-price">{item.book.price}</div>
                  </div>
                  <div className="cart-controls">
                    <button onClick={() => updateCartQuantity(item.bookId, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.bookId, 1)}>+</button>
                    <button className="remove-button" onClick={() => removeFromCart(item.bookId)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}

      <main className="content">
        <div className="hero hero-page">
          <h1>
            {route.page === 'book' && currentBook
              ? currentBook.title
              : route.page === 'events'
              ? 'Events'
              : route.page === 'shop'
              ? 'Shop TC Books'
              : 'Welcome to TC Books'}
          </h1>
          {route.page === 'book' && currentBook ? (
            <p className="hero-copy">A polished children’s book page with clear details and easy ordering for families.</p>
          ) : route.page === 'events' ? (
            <p className="hero-copy">Browse upcoming appearances and RSVP for each family-friendly event.</p>
          ) : route.page === 'shop' ? (
            <p className="hero-copy">Browse selected children’s books for story time, bedtime, kindergarten, and home reading.</p>
          ) : (
            <p className="hero-copy">Welcome to TC Books — a playful collection of children’s stories for family reading, bedtime adventures, and classroom discovery.</p>
          )}
        </div>

        {route.page === 'book' && currentBook ? (
          <section className="book-detail-page fade-up">
            <div className="book-detail-card">
              <div className="book-artwork book-artwork-large" aria-hidden="true">
                <img src={currentBook.image} alt={`Cover of ${currentBook.title}`} className="book-image" />
              </div>
              <div className="book-label detail-label">{currentBook.label}</div>
              <h2>{currentBook.title}</h2>
              <p className="detail-tag">Children’s story for ages 3–7</p>
              <p className="book-price detail-price">{currentBook.price}</p>
              <p className="detail-tag">Designed for children ages 3–7 with thoughtful reading support.</p>
              <p className="book-description">{currentBook.description}</p>

              <div className="detail-controls">
                <div className="quantity-group">
                  <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((value) => value + 1)}>+</button>
                </div>
                <textarea
                  placeholder="Add special message to the book (optional)"
                  value={specialMessage}
                  onChange={(event) => setSpecialMessage(event.target.value)}
                />
                <button
                  className="action-button"
                  onClick={() => addToCart(currentBook.id, quantity, specialMessage)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        ) : route.page === 'events' ? (
          <section className="events-grid fade-up">
            <div className="event-card">
              <div className="book-label detail-label">Multiple Dates</div>
              <h2>Upcoming Events</h2>
              <p className="hero-copy">Browse upcoming appearances and RSVP for each event.</p>
            </div>
            {events.map((eventItem) => (
              <article key={eventItem.url} className="event-card fade-up">
                <div className="event-row">
                  <h3>
                    <a href={eventItem.url} target="_blank" rel="noreferrer" className="event-link">
                      {eventItem.title}
                    </a>
                  </h3>
                  <span className="event-date">{eventItem.date}</span>
                </div>
                <p className="event-location">{eventItem.location}</p>
                <a href={eventItem.url} target="_blank" rel="noreferrer" className="rsvp-button">
                  RSVP
                </a>
              </article>
            ))}
          </section>
        ) : route.page === 'updates' ? (
          <section className="updates-page fade-up">
            <div className="home-card">
              <h2>Updates</h2>
              <div className="updates-list">
                {updates.map((item) => (
                  <div key={item.date} className="update-item">
                    <strong>{item.date}</strong>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : route.page === 'shop' ? (
          <section className="books-grid">
            {books.map((book, index) => (
              <article
                key={book.id}
                className="book-card fade-up"
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => showBookPage(book.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    showBookPage(book.id);
                  }
                }}
              >
                <div className="book-artwork" aria-hidden="true">
                  <img src={book.image} alt={`Cover of ${book.title}`} className="book-image" />
                </div>
                <div className="book-label">{book.label}</div>
                <h2>{book.title}</h2>
                <p className="book-price">{book.price}</p>
                <button
                  className="card-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showBookPage(book.id);
                  }}
                >
                  View Book
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="home-welcome fade-up">
            <div className="home-card home-card-hero">
              <div className="home-card-content">
                <h2>Stories that spark imagination</h2>
                <p>
                  Explore colorful books designed for young readers, families, and teachers. TC Books brings
                  joyful characters, warm stories, and gentle lessons that make reading time extra special.
                </p>
                <p>
                  Use the Shop Now button to browse our featured books, or visit Events to RSVP for author
                  appearances and book fairs.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="page-footer fade-up">
        <div className="footer-grid">
          <div className="footer-block">
            <h3>TC Books</h3>
            <p>Children’s stories for family reading, gifts, and classroom moments.</p>
          </div>

          <div className="footer-block">
            <h3>Contact</h3>
            <a href="mailto:info@tammycauthor.com">info@tammycauthor.com</a>
          </div>

          <div className="footer-block socials-block">
            <h3>Follow</h3>
            <div className="footer-socials">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z"/></svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.055 1.97.246 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.35 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.246 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.35-2.43.41-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.246-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.35-1.26-.41-2.43C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.055-1.17.246-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.35 2.43-.41C8.416 2.172 8.8 2.16 12 2.16zm0 1.72c-3.16 0-3.534.012-4.78.07-.98.045-1.52.21-1.88.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.9-.35 1.88-.06 1.24-.07 1.62-.07 4.78s.012 3.534.07 4.78c.045.98.21 1.52.35 1.88.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.9.3 1.88.35 1.24.06 1.62.07 4.78.07s3.534-.012 4.78-.07c.98-.045 1.52-.21 1.88-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.9.35-1.88.06-1.24.07-1.62.07-4.78s-.012-3.534-.07-4.78c-.045-.98-.21-1.52-.35-1.88-.18-.47-.4-.8-.75-1.15-.35-.35-.68-.57-1.15-.75-.36-.14-.9-.3-1.88-.35-1.24-.06-1.62-.07-4.78-.07zm0 3.52a5.32 5.32 0 1 1 0 10.64 5.32 5.32 0 0 1 0-10.64zm0 1.72a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2zm5.46-1.94a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0z"/></svg>
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="social-icon tiktok">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.62 2H16.5v5.899c1.118.28 2.166.998 2.94 1.966a6.15 6.15 0 0 1 1.35 3.945c0 3.39-2.755 6.145-6.145 6.145a6.147 6.147 0 0 1-6.125-6.145c0-3.34 2.63-6.078 5.97-6.14V7.57a3.378 3.378 0 0 0-1.48.38 3.206 3.206 0 0 0-1.25 1.07 3.35 3.35 0 0 0-.49 1.56c0 1.04.43 2.03 1.19 2.74a3.865 3.865 0 0 0 3.74 1.04v-3.7a1.72 1.72 0 0 1-.92-.32 1.8 1.8 0 0 1-.62-.72 1.76 1.76 0 0 1-.18-.86V2z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bar">
          <span>TC Books</span>
          <span>info@tammycauthor.com</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

-- ── USERS
CREATE TABLE users (
    user_id       INT           NOT NULL AUTO_INCREMENT,
    username      VARCHAR(50)   NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,          -- bcrypt hash
    email         VARCHAR(255)  UNIQUE,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

-- ── GENRES
CREATE TABLE genres (
    genre_id   INT          NOT NULL AUTO_INCREMENT,
    name       VARCHAR(80)  NOT NULL UNIQUE,
    slug       VARCHAR(80)  NOT NULL UNIQUE,        -- URL-safe
    PRIMARY KEY (genre_id)
);

INSERT INTO genres (name, slug) VALUES
    ('Rock',       'rock'),
    ('Hip-Hop',    'hip-hop'),
    ('Jazz',       'jazz'),
    ('R&B / Soul', 'rnb-soul'),
    ('Electronic', 'electronic'),
    ('Pop',        'pop'),
    ('Metal',      'metal'),
    ('Classical',  'classical'),
    ('Country',    'country'),
    ('World',      'world');

-- ── ALBUMS
CREATE TABLE albums (
    album_id        INT            NOT NULL AUTO_INCREMENT,
    itunes_id       BIGINT         UNIQUE,           -- this is the iTunes collectionId
    title           VARCHAR(255)   NOT NULL,
    artist          VARCHAR(255)   NOT NULL,
    genre_id        INT,
    release_year    SMALLINT,
    artwork_url     VARCHAR(512),
    avg_rating      DECIMAL(4, 2)  DEFAULT 0.00,
    review_count    INT            DEFAULT 0,
    PRIMARY KEY (album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE SET NULL
);

-- Seed data — classic albums
INSERT INTO albums (itunes_id, title, artist, genre_id, release_year, artwork_url) VALUES
    (269572838,  'Thriller',                          'Michael Jackson', 6,  1982, NULL),
    (190758912,  'My Beautiful Dark Twisted Fantasy',  'Kanye West',      2,  2010, NULL),
    (1440834133, 'SOS',                                'SZA',             4,  2022, NULL),
    (1114636088, 'Process',                            'Sampha',          4,  2017, NULL),
    (310730204,  'To Pimp a Butterfly',                'Kendrick Lamar',  2,  2015, NULL),
    (250038575,  'Kind of Blue',                       'Miles Davis',     3,  1959, NULL);

-- ── REVIEWS
CREATE TABLE reviews (
    review_id   INT           NOT NULL AUTO_INCREMENT,
    album_id    INT           NOT NULL,
    user_id     INT           NOT NULL,
    rating      TINYINT       NOT NULL CHECK (rating BETWEEN 1 AND 10),
    body        TEXT,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE
);

-- ── FAVOURITES
CREATE TABLE favourites (
    fav_id      INT       NOT NULL AUTO_INCREMENT,
    user_id     INT       NOT NULL,
    album_id    INT       NOT NULL,
    saved_at    DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fav_id),
    UNIQUE KEY uq_user_album (user_id, album_id),
    FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);
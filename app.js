// ═══════════ CONSTANTS ═══════════
const CLASSIC_ALBUMS = [
  { id: 269572838,  title: 'Thriller',                          artist: 'Michael Jackson', genre: 'Pop',      year: 1982, classic: true },
  { id: 269572838,  title: 'Off the Wall',                      artist: 'Michael Jackson', genre: 'Pop',      year: 1979, classic: true },
  { id: 190758912,  title: 'My Beautiful Dark Twisted Fantasy',  artist: 'Kanye West',      genre: 'Hip-Hop',  year: 2010, classic: true },
  { id: 190758912,  title: 'Graduation',                         artist: 'Kanye West',      genre: 'Hip-Hop',  year: 2007, classic: true },
  { id: 190758912,  title: '808s & Heartbreak',                  artist: 'Kanye West',      genre: 'Hip-Hop',  year: 2008, classic: true },
  { id: 310730204,  title: 'To Pimp a Butterfly',               artist: 'Kendrick Lamar',  genre: 'Hip-Hop',  year: 2015, classic: true },
  { id: 1440834133, title: 'SOS',                               artist: 'SZA',             genre: 'R&B/Soul', year: 2022, classic: false },
  { id: 250038575,  title: 'Kind of Blue',                      artist: 'Miles Davis',     genre: 'Jazz',     year: 1959, classic: true },
];

const CLASSIC_BADGE_ALBUMS = new Set([
  'Thriller','Off the Wall','My Beautiful Dark Twisted Fantasy','Graduation','808s & Heartbreak'
]);

const ARTISTS = [
  { name:'Kanye West',         genre:'Hip-Hop',  stars:5, albums:['MBDTF','Graduation','808s'] },
  { name:'Michael Jackson',    genre:'Pop',       stars:5, albums:['Thriller','Off the Wall','Bad'] },
  { name:'Kendrick Lamar',     genre:'Hip-Hop',  stars:5, albums:['TPAB','DAMN.','Mr. Morale'] },
  { name:'SZA',                genre:'R&B/Soul', stars:4, albums:['SOS','Ctrl'] },
  { name:'Drake',              genre:'Hip-Hop',  stars:4, albums:['Take Care','Nothing Was…','Certified'] },
  { name:'Miles Davis',        genre:'Jazz',     stars:5, albums:['Kind of Blue','Bitches Brew'] },
  { name:'Beyoncé',            genre:'Pop',      stars:5, albums:['Lemonade','Renaissance','4'] },
  { name:'Tyler, the Creator', genre:'Hip-Hop',  stars:4, albums:['Igor','Flower Boy','Call Me If…'] },
  { name:'Frank Ocean',        genre:'R&B/Soul', stars:5, albums:['Blonde','Channel Orange'] },
  { name:'Radiohead',          genre:'Rock',     stars:4, albums:['OK Computer','Kid A','In Rainbows'] },
  { name:'J. Cole',            genre:'Hip-Hop',  stars:4, albums:['2014 FHD','KOD','The Off-Season'] },
  { name:'Billie Eilish',      genre:'Pop',      stars:3, albums:['HTE EOTWID','Happier Than Ever'] },
];

const TOP_RATED_STATIC = [
  { title:'My Beautiful Dark Twisted Fantasy', artist:'Kanye West',      score:9.7, genre:'Hip-Hop',  art:'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a4/14/72/a41472f7-5e37-e059-c0a3-710e8fccd5ea/source/600x600bb.jpg' },
  { title:'To Pimp a Butterfly',               artist:'Kendrick Lamar',  score:9.6, genre:'Hip-Hop',  art:'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/60/d3/47/60d347ac-5a59-7498-3c1e-e23e54c57c64/source/600x600bb.jpg' },
  { title:'Kind of Blue',                      artist:'Miles Davis',     score:9.5, genre:'Jazz',     art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b1/02/55/b10255e0-0f2b-3e8d-5f35-2a4d1ead97c3/source/600x600bb.jpg' },
  { title:'Thriller',                          artist:'Michael Jackson', score:9.4, genre:'Pop',      art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/50/64/39/506439cd-7742-fc3f-e3a2-37c49c94d4e3/source/600x600bb.jpg' },
  { title:'Graduation',                        artist:'Kanye West',      score:9.3, genre:'Hip-Hop',  art:'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bb/06/dd/bb06dd5a-0049-cce3-b2fc-c4f96da3e26a/source/600x600bb.jpg' },
  { title:'Off the Wall',                      artist:'Michael Jackson', score:9.1, genre:'Pop',      art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cc/a9/a2/cca9a237-71d0-1a55-9a21-d0f4c2e6ce7a/source/600x600bb.jpg' },
  { title:'808s & Heartbreak',                 artist:'Kanye West',      score:9.0, genre:'Hip-Hop',  art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/08/c3/5e/08c35e5d-e56b-6fc6-b8cc-f4e8f9dea5d9/source/600x600bb.jpg' },
  { title:'SOS',                               artist:'SZA',             score:8.9, genre:'R&B/Soul', art:'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/28/55/75/28557596-6d5c-a69a-74ff-4dd8278f81a7/source/600x600bb.jpg' },
  { title:'Channel Orange',                    artist:'Frank Ocean',     score:8.8, genre:'R&B/Soul', art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/20/65/98/206598f1-c1fc-b2a0-d5ea-29e0e2dc3a44/source/600x600bb.jpg' },
  { title:'OK Computer',                       artist:'Radiohead',       score:8.7, genre:'Rock',     art:'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/4c/22/3a/4c223a03-7efb-5bca-79a5-43be6da7b1db/source/600x600bb.jpg' },
];

let allTopRated = [...TOP_RATED_STATIC];
let currentAlbums = [];
let albumPreviewAudio = new Audio();
let activePreviewTrackId = null;
let activePlayButton = null;

// ═══════════ AUTH ═══════════
function getUser() { return localStorage.getItem('rmr_user'); }

function updateAccountIcon() {
  const btn = document.getElementById('accountBtn');
  const img = document.getElementById('accountIconImg');
  if (!btn) return;
  const user = getUser();
  if (user) {
    img.style.display = 'none';
    btn.textContent = 'Logout';
  } else {
    img.style.display = 'block';
    btn.textContent = '';
    btn.appendChild(img);
  }
}

function handleAccountClick() {
  if (getUser()) {
    localStorage.removeItem('rmr_user');
    updateAccountIcon();
    if (typeof updateReviewForm === 'function') updateReviewForm();
  } else {
    openModal();
  }
}

function openModal() {
  document.getElementById('loginModal').classList.add('open');
  document.getElementById('modalMsg').textContent = '';
}

function closeModal() {
  document.getElementById('loginModal').classList.remove('open');
}

function modalLogin() {
  const u = document.getElementById('modalUsername').value.trim();
  const p = document.getElementById('modalPassword').value;
  if (!u || !p) { document.getElementById('modalMsg').textContent = 'Fill all fields'; return; }
  const stored = localStorage.getItem('rmr_pw_' + u);
  if (stored === p) {
    localStorage.setItem('rmr_user', u);
    closeModal(); updateAccountIcon();
    if (typeof updateReviewForm === 'function') updateReviewForm();
  } else {
    document.getElementById('modalMsg').textContent = 'Incorrect username or password';
  }
}

function modalSignup() {
  const u = document.getElementById('modalUsername').value.trim();
  const p = document.getElementById('modalPassword').value;
  if (!u || !p) { document.getElementById('modalMsg').textContent = 'Fill all fields'; return; }
  localStorage.setItem('rmr_pw_' + u, p);
  localStorage.setItem('rmr_user', u);
  closeModal(); updateAccountIcon();
  if (typeof updateReviewForm === 'function') updateReviewForm();
}

// ═══════════ ALBUM HELPERS ═══════════
function getAlbumRating(album) {
  const seed = String(album.collectionId || album.collectionName).split('').reduce((t, c) => t + c.charCodeAt(0), 0);
  return (7 + (seed % 31) / 10).toFixed(1);
}
function getLargeArtwork(url) { return url ? url.replace('100x100bb', '600x600bb') : ''; }
function isClassicAlbum(name) { return CLASSIC_BADGE_ALBUMS.has(name); }
function getRatingLabel(r) {
  if (r >= 9.5) return 'PERFECT SCORE';
  if (r >= 9) return 'AMAZING';
  if (r >= 8) return 'GREAT';
  return 'SOLID';
}
function getTrackDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
  return m + ':' + String(s).padStart(2, '0');
}

// ═══════════ ALBUM RENDERING ═══════════
function renderAlbums(albums) {
  currentAlbums = albums.map(a => ({ ...a, rating: a.rating || getAlbumRating(a) }));
  const grid = document.getElementById('albumsGrid');
  const status = document.getElementById('albumStatus');
  grid.innerHTML = '';
  if (!currentAlbums.length) { status.textContent = 'No albums found.'; return; }
  status.textContent = '';
  currentAlbums.forEach(album => {
    const card = document.createElement('article');
    card.className = 'album-card';
    card.tabIndex = 0;
    if (isClassicAlbum(album.collectionName)) {
      const badge = document.createElement('div');
      badge.className = 'rmr-badge';
      badge.innerHTML = '<span class="rmr-text">RMR</span><span class="rmr-classic">CLASSIC</span><span class="rmr-star">★</span>';
      card.appendChild(badge);
    }
    const art = document.createElement('img'); art.className = 'album-art'; art.src = getLargeArtwork(album.artworkUrl100); art.alt = album.collectionName;
    const title = document.createElement('h3'); title.textContent = album.collectionName;
    const artist = document.createElement('p'); artist.className = 'album-artist'; artist.textContent = album.artistName;
    const genre = document.createElement('p'); genre.className = 'album-genre'; genre.textContent = album.primaryGenreName || 'Unknown';
    const rating = document.createElement('p'); rating.className = 'album-rating'; rating.textContent = album.rating + ' / 10';
    card.append(art, title, artist, genre, rating);
    card.addEventListener('click', () => openAlbumDetail(album.collectionId));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAlbumDetail(album.collectionId); } });
    grid.appendChild(card);
  });
}

function sortAlbums(val) {
  if (!currentAlbums.length) return;
  const sorted = [...currentAlbums].sort((a, b) => {
    if (val === 'scoreLow') return a.rating - b.rating;
    if (val === 'artist') return a.artistName.localeCompare(b.artistName);
    if (val === 'genre') return (a.primaryGenreName || '').localeCompare(b.primaryGenreName || '');
    return b.rating - a.rating;
  });
  renderAlbums(sorted);
}

async function searchAlbums(query) {
  const status = document.getElementById('albumStatus');
  const grid = document.getElementById('albumsGrid');
  status.textContent = 'Loading albums…'; grid.innerHTML = '';
  try {
    if (!query.trim()) {
      const searches = ['Michael Jackson Thriller', 'Kanye West MBDTF', 'Kanye West Graduation', '808s Heartbreak', 'Kendrick Lamar Butterfly', 'Drake'];
      const results = await Promise.allSettled(searches.map(q => fetch('https://itunes.apple.com/search?entity=album&limit=2&term=' + encodeURIComponent(q)).then(r => r.json())));
      let all = [];
      results.forEach(r => { if (r.status === 'fulfilled') all.push(...(r.value.results || [])); });
      const seen = new Set(); const deduped = [];
      all.forEach(a => { if (!seen.has(a.collectionId)) { seen.add(a.collectionId); deduped.push(a); } });
      renderAlbums(deduped.slice(0, 18));
      sortAlbums(document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'scoreHigh');
      status.textContent = '';
      return;
    }
    const res = await fetch('https://itunes.apple.com/search?entity=album&limit=12&term=' + encodeURIComponent(query.trim()));
    const data = await res.json();
    renderAlbums(data.results || []);
    sortAlbums(document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'scoreHigh');
  } catch { status.textContent = 'Could not load albums right now.'; }
}

function pausePreview() {
  albumPreviewAudio.pause();
  if (activePlayButton) { activePlayButton.innerHTML = '<i class="fa fa-play"></i>'; }
}

function showAlbumList() {
  pausePreview();
  document.getElementById('albumDetailSection').hidden = true;
  document.getElementById('albumSearchSectionEl').hidden = false;
  document.getElementById('sortToolbarEl').hidden = false;
}

function renderAlbumDetail(album, tracks) {
  pausePreview(); activePreviewTrackId = null;
  const previewTracks = tracks.filter(t => t.previewUrl);
  const highlight = previewTracks[0] || tracks[0];
  const rating = Number(album.rating);
  let selectedTrack = highlight, activeTrackBtn = null;
  const detail = document.getElementById('albumDetail');
  detail.innerHTML = '';

  const artPanel = document.createElement('div'); artPanel.className = 'album-detail-art-panel';
  const art = document.createElement('img'); art.className = 'album-detail-art'; art.src = getLargeArtwork(album.artworkUrl100); art.alt = album.collectionName;
  const info = document.createElement('div'); info.className = 'album-detail-info';
  const ih2 = document.createElement('h2'); ih2.textContent = album.collectionName;
  const ip = document.createElement('p'); ip.textContent = album.artistName;
  info.append(ih2, ip);
  const score = document.createElement('div'); score.className = 'score-badge'; score.textContent = rating.toFixed(1);
  const scoreLabel = document.createElement('p'); scoreLabel.className = 'score-label'; scoreLabel.textContent = getRatingLabel(rating);
  artPanel.append(art, info, score, scoreLabel);

  if (isClassicAlbum(album.collectionName)) {
    const b = document.createElement('div');
    b.style.cssText = 'margin-top:14px;display:inline-flex;align-items:center;gap:8px;background:var(--dark);border:2px solid var(--red);padding:8px 16px;border-radius:2px;';
    b.innerHTML = '<span style="font-family:Bebas Neue,sans-serif;color:var(--cream);font-size:16px;letter-spacing:2px;">RMR CLASSIC ★</span>';
    artPanel.appendChild(b);
  }

  const trackPanel = document.createElement('div'); trackPanel.className = 'track-panel';
  const playBtn = document.createElement('button'); playBtn.className = 'play-button'; playBtn.type = 'button'; playBtn.innerHTML = '<i class="fa fa-play"></i>';
  activePlayButton = playBtn;
  const trackTitle = document.createElement('h3'); trackTitle.textContent = 'Track List';
  const trackList = document.createElement('ol'); trackList.className = 'track-list';

  tracks.slice(0, 12).forEach(track => {
    const li = document.createElement('li');
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'track-button'; btn.disabled = !track.previewUrl;
    const name = document.createElement('span'); name.className = 'track-name'; name.textContent = track.trackName;
    const meta = document.createElement('span'); meta.className = 'track-meta';
    meta.textContent = getTrackDuration(track.trackTimeMillis) || (track.previewUrl ? 'Preview' : 'No preview');
    meta.dataset.defaultText = meta.textContent;
    btn.append(name, meta);
    if (highlight && track.trackId === highlight.trackId) { activeTrackBtn = btn; btn.classList.add('is-highlight-track'); }
    btn.addEventListener('click', () => { selectedTrack = track; setActiveTrack(btn, track); togglePreview(track); });
    li.appendChild(btn); trackList.appendChild(li);
  });

  const highlightEl = document.createElement('p'); highlightEl.className = 'highlight-track'; highlightEl.textContent = 'Highlight: ';
  const hlSpan = document.createElement('span'); hlSpan.textContent = highlight ? highlight.trackName : 'None';
  highlightEl.appendChild(hlSpan);

  const commentBtn = document.createElement('button'); commentBtn.className = 'comment-button'; commentBtn.type = 'button';
  const user = getUser();
  if (user) {
    commentBtn.innerHTML = '<i class="fa fa-comment-dots"></i> Write Review';
    commentBtn.addEventListener('click', () => { if (typeof showPage === 'function') showPage('submit'); else window.location.href = 'submit_review.html'; });
  } else {
    commentBtn.innerHTML = '<i class="fa fa-lock"></i> Sign In to Review';
    commentBtn.classList.add('locked');
    commentBtn.addEventListener('click', () => openModal());
  }

  playBtn.addEventListener('click', () => togglePreview(selectedTrack));
  trackPanel.append(playBtn, trackTitle, trackList, highlightEl, commentBtn);
  detail.append(artPanel, trackPanel);
  setActiveTrack(activeTrackBtn, selectedTrack);

  function setActiveTrack(btn, track) {
    trackList.querySelectorAll('.track-meta').forEach(m => { m.textContent = m.dataset.defaultText; });
    if (activeTrackBtn) activeTrackBtn.classList.remove('is-highlight-track');
    activeTrackBtn = btn;
    if (activeTrackBtn) { activeTrackBtn.classList.add('is-highlight-track'); const m = activeTrackBtn.querySelector('.track-meta'); if (m && track?.previewUrl) m.textContent = '▶ Playing'; }
    selectedTrack = track; hlSpan.textContent = selectedTrack ? selectedTrack.trackName : 'None';
    if (!selectedTrack?.previewUrl) { pausePreview(); playBtn.disabled = true; return; }
    playBtn.disabled = false;
  }

  function togglePreview(track) {
    if (!track?.previewUrl) return;
    if (activePreviewTrackId === track.trackId && !albumPreviewAudio.paused) { pausePreview(); return; }
    if (activePreviewTrackId !== track.trackId) {
      albumPreviewAudio.pause(); albumPreviewAudio = new Audio(track.previewUrl);
      activePreviewTrackId = track.trackId;
      albumPreviewAudio.addEventListener('ended', () => { activePreviewTrackId = null; pausePreview(); }, { once: true });
    }
    albumPreviewAudio.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  }
}

async function openAlbumDetail(id) {
  const album = currentAlbums.find(a => a.collectionId === id); if (!album) return;
  pausePreview();
  document.getElementById('albumSearchSectionEl').hidden = true;
  document.getElementById('sortToolbarEl').hidden = true;
  document.getElementById('albumDetailSection').hidden = false;
  document.getElementById('albumDetail').innerHTML = '<p class="album-status">Loading album…</p>';
  try {
    const res = await fetch('https://itunes.apple.com/lookup?id=' + encodeURIComponent(id) + '&entity=song');
    const data = await res.json();
    const tracks = (data.results || []).filter(r => r.wrapperType === 'track');
    renderAlbumDetail(album, tracks);
    document.getElementById('albumDetailSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch { document.getElementById('albumDetail').innerHTML = '<p class="album-status">Could not load this album.</p>'; }
}

// ═══════════ GENRES ═══════════
async function showGenre(genre, icon, desc) {
  document.getElementById('genreListView').style.display = 'none';
  document.getElementById('genreDetailView').style.display = 'block';
  document.getElementById('genreDetailTitle').textContent = icon + ' ' + genre;
  document.getElementById('genreDetailSub').textContent = desc;
  document.getElementById('genreStatus').textContent = 'Loading albums…';
  document.getElementById('genreAlbumsGrid').innerHTML = '';
  try {
    const res = await fetch('https://itunes.apple.com/search?entity=album&limit=20&term=' + encodeURIComponent(genre));
    const data = await res.json();
    const albums = (data.results || []).map(a => ({ ...a, rating: getAlbumRating(a) }));
    const grid = document.getElementById('genreAlbumsGrid');
    grid.innerHTML = '';
    if (!albums.length) { document.getElementById('genreStatus').textContent = 'No albums found.'; return; }
    document.getElementById('genreStatus').textContent = '';
    albums.forEach(album => {
      const card = document.createElement('article'); card.className = 'album-card'; card.tabIndex = 0;
      if (isClassicAlbum(album.collectionName)) { const b = document.createElement('div'); b.className = 'rmr-badge'; b.innerHTML = '<span class="rmr-text">RMR</span><span class="rmr-classic">CLASSIC</span><span class="rmr-star">★</span>'; card.appendChild(b); }
      const art = document.createElement('img'); art.className = 'album-art'; art.src = getLargeArtwork(album.artworkUrl100); art.alt = album.collectionName;
      const title = document.createElement('h3'); title.textContent = album.collectionName;
      const artist = document.createElement('p'); artist.className = 'album-artist'; artist.textContent = album.artistName;
      const rating = document.createElement('p'); rating.className = 'album-rating'; rating.textContent = album.rating + ' / 10';
      card.append(art, title, artist, rating);
      card.addEventListener('click', () => { currentAlbums = albums; window.location.href = 'index.html'; openAlbumDetail(album.collectionId); });
      grid.appendChild(card);
    });
  } catch { document.getElementById('genreStatus').textContent = 'Could not load albums.'; }
}

function backToGenreList() {
  document.getElementById('genreListView').style.display = 'block';
  document.getElementById('genreDetailView').style.display = 'none';
}

// ═══════════ ARTISTS ═══════════
function renderArtists() {
  const grid = document.getElementById('artistsGrid'); grid.innerHTML = '';
  ARTISTS.forEach(artist => {
    const card = document.createElement('div'); card.className = 'artist-card';
    const avatar = document.createElement('div'); avatar.className = 'artist-avatar'; avatar.textContent = artist.name[0];
    const name = document.createElement('h3'); name.className = 'artist-name'; name.textContent = artist.name;
    const genre = document.createElement('p'); genre.className = 'artist-genre'; genre.textContent = artist.genre;
    const stars = document.createElement('div'); stars.className = 'artist-stars';
    for (let i = 1; i <= 5; i++) { const s = document.createElement('span'); s.className = 'star' + (i > artist.stars ? ' empty' : ''); s.textContent = '★'; stars.appendChild(s); }
    const albums = document.createElement('p'); albums.className = 'artist-albums'; albums.textContent = artist.albums.join(' · ');
    card.append(avatar, name, genre, stars, albums);
    grid.appendChild(card);
  });
}

// ═══════════ TOP RATED ═══════════
function renderTopRated(genreFilter) {
  const filtered = genreFilter === 'all' ? allTopRated : allTopRated.filter(a => a.genre === genreFilter);
  const list = document.getElementById('topRatedList'); list.innerHTML = '';
  filtered.sort((a, b) => b.score - a.score).forEach((album, i) => {
    const item = document.createElement('div'); item.className = 'top-rated-item';
    const rank = document.createElement('div'); rank.className = 'top-rated-rank'; rank.textContent = '#' + (i + 1);
    const art = document.createElement('img'); art.className = 'top-rated-art'; art.src = album.art || ''; art.alt = album.title; art.onerror = () => { art.style.background = 'var(--tan)'; art.src = ''; };
    const info = document.createElement('div'); info.className = 'top-rated-info';
    const h3 = document.createElement('h3'); h3.textContent = album.title;
    const p = document.createElement('p'); p.textContent = album.artist;
    const badge = document.createElement('span'); badge.className = 'top-rated-genre-badge'; badge.textContent = album.genre;
    if (isClassicAlbum(album.title)) { const cb = document.createElement('span'); cb.style.cssText = 'display:inline-block;background:var(--red);color:white;font-size:9px;padding:2px 7px;margin-left:6px;font-weight:700;letter-spacing:1px;vertical-align:middle;'; cb.textContent = 'RMR CLASSIC ★'; h3.appendChild(cb); }
    info.append(h3, p, badge);
    const score = document.createElement('div'); score.className = 'top-rated-score'; score.textContent = album.score.toFixed(1);
    item.append(rank, art, info, score);
    list.appendChild(item);
  });
  if (!filtered.length) { list.innerHTML = '<p class="album-status">No albums in this genre yet.</p>'; }
}

function filterTopRated(val) { renderTopRated(val); }

// ═══════════ SUBMIT REVIEW ═══════════
function updateReviewForm() {
  const user = getUser();
  const notice = document.getElementById('reviewLockNotice');
  const fields = document.getElementById('reviewFormFields');
  if (!notice || !fields) return;
  if (user) { notice.style.display = 'none'; fields.style.display = 'flex'; }
  else { notice.style.display = 'block'; fields.style.display = 'none'; }
}

function submitReview() {
  const album = document.getElementById('reviewAlbum').value.trim();
  const artist = document.getElementById('reviewArtist').value.trim();
  const score = document.getElementById('reviewScore').value;
  const body = document.getElementById('reviewBody').value.trim();
  const msg = document.getElementById('reviewMsg');
  if (!album || !artist || !score || !body) { msg.textContent = 'Please fill in all fields.'; return; }
  const genre = document.getElementById('reviewGenre').value || 'Unknown';
  const sc = parseFloat(score);
  if (sc >= 7) {
    allTopRated.push({ title: album, artist, score: sc, genre, art: '' });
    allTopRated.sort((a, b) => b.score - a.score);
    allTopRated = allTopRated.slice(0, 20);
  }
  msg.style.color = 'green'; msg.textContent = 'Review submitted! Thank you.';
  document.getElementById('reviewAlbum').value = '';
  document.getElementById('reviewArtist').value = '';
  document.getElementById('reviewScore').value = '';
  document.getElementById('reviewBody').value = '';
  setTimeout(() => { msg.textContent = ''; msg.style.color = 'var(--red)'; }, 3000);
}

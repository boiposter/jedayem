/**
 * Jedayem — Home Page Logic with Polymarket-style UI
 */

// Mock data - Saudi/Gulf sports matches with realistic data
const MOCK_MATCHES = [
    {
        id: 1,
        sport: 'كرة قدم',
        team_home: 'النصر',
        team_away: 'الهلال',
        odds_home: 2.15,
        odds_draw: 3.50,
        odds_away: 3.20,
        status: 'live',
        start_time: 'الآن',
        score_home: 1,
        score_away: 1,
        volume: 24530,
        participants: 418,
        odds_change: 2.3,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 2,
        sport: 'كرة سلة',
        team_home: 'الشرقية للكرة الطائرة',
        team_away: 'جدة للسلة',
        odds_home: 1.85,
        odds_draw: 3.70,
        odds_away: 2.10,
        status: 'live',
        start_time: 'الآن',
        score_home: 78,
        score_away: 72,
        volume: 18920,
        participants: 287,
        odds_change: -1.5,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 3,
        sport: 'تنس',
        team_home: 'عبدالعزيز الدعيع',
        team_away: 'فهد الدعيلج',
        odds_home: 1.92,
        odds_draw: 0.00,
        odds_away: 1.95,
        status: 'live',
        start_time: 'الآن',
        score_home: 2,
        score_away: 1,
        volume: 8750,
        participants: 156,
        odds_change: 0.8,
        league: 'بطولة الخليج للتنس',
        thumbnail_emoji: '🎾'
    },
    {
        id: 4,
        sport: 'كرة قدم',
        team_home: 'الاتحاد',
        team_away: 'الأهلي',
        odds_home: 2.40,
        odds_draw: 3.30,
        odds_away: 2.95,
        status: 'upcoming',
        start_time: 'في 2 ساعة',
        score_home: null,
        score_away: null,
        volume: 15640,
        participants: 342,
        odds_change: -0.5,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 5,
        sport: 'كرة قدم',
        team_home: 'الفتح',
        team_away: 'الفيحاء',
        odds_home: 2.05,
        odds_draw: 3.65,
        odds_away: 3.60,
        status: 'upcoming',
        start_time: 'في 4 ساعات',
        score_home: null,
        score_away: null,
        volume: 9280,
        participants: 201,
        odds_change: 1.2,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 6,
        sport: 'كرة قدم',
        team_home: 'الشباب',
        team_away: 'الرياض',
        odds_home: 1.95,
        odds_draw: 3.80,
        odds_away: 3.90,
        status: 'upcoming',
        start_time: 'في 6 ساعات',
        score_home: null,
        score_away: null,
        volume: 7540,
        participants: 178,
        odds_change: -2.1,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 7,
        sport: 'كرة سلة',
        team_home: 'الرياض للسلة',
        team_away: 'الدمام للسلة',
        odds_home: 1.78,
        odds_draw: 4.10,
        odds_away: 2.25,
        status: 'upcoming',
        start_time: 'في 8 ساعات',
        score_home: null,
        score_away: null,
        volume: 5920,
        participants: 142,
        odds_change: 3.4,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 8,
        sport: 'كرة طائرة',
        team_home: 'الفيحاء للطائرة',
        team_away: 'الأهلي للطائرة',
        odds_home: 2.30,
        odds_draw: 0.00,
        odds_away: 1.70,
        status: 'upcoming',
        start_time: 'في 10 ساعات',
        score_home: null,
        score_away: null,
        volume: 3450,
        participants: 89,
        odds_change: -0.3,
        league: 'دوري الطائرة السعودي',
        thumbnail_emoji: '🏐'
    },
    {
        id: 9,
        sport: 'ملاكمة',
        team_home: 'محمد الذيابي',
        team_away: 'علي الشهري',
        odds_home: 1.88,
        odds_draw: 0.00,
        odds_away: 2.05,
        status: 'upcoming',
        start_time: 'في 12 ساعة',
        score_home: null,
        score_away: null,
        volume: 4120,
        participants: 112,
        odds_change: 1.8,
        league: 'بطولة الملاكمة الخليجية',
        thumbnail_emoji: '🥊'
    },
    {
        id: 10,
        sport: 'كرة قدم',
        team_home: 'الدعيم',
        team_away: 'الوحدة',
        odds_home: 2.50,
        odds_draw: 3.20,
        odds_away: 2.70,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 2,
        score_away: 1,
        volume: 32100,
        participants: 521,
        odds_change: -3.2,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 11,
        sport: 'كرة سلة',
        team_home: 'جدة للسلة',
        team_away: 'الخليج للسلة',
        odds_home: 2.15,
        odds_draw: 3.95,
        odds_away: 1.80,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 85,
        score_away: 79,
        volume: 14560,
        participants: 289,
        odds_change: 1.5,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 12,
        sport: 'تنس',
        team_home: 'سارة الشهري',
        team_away: 'ريم العتيبي',
        odds_home: 1.75,
        odds_draw: 0.00,
        odds_away: 2.20,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 2,
        score_away: 0,
        volume: 6840,
        participants: 134,
        odds_change: -1.3,
        league: 'بطولة الخليج للتنس',
        thumbnail_emoji: '🎾'
    }
];

// Mock trending items
const MOCK_TRENDING = [
    {
        title: 'النصر يحقق الفوز',
        odds_pct: 78,
        volume: 24530,
        change: 5.2,
        emoji: '⚽'
    },
    {
        title: 'شرقية الكرة الطائرة',
        odds_pct: 65,
        volume: 18920,
        change: -2.1,
        emoji: '🏐'
    },
    {
        title: 'الاتحاد يفوز على الأهلي',
        odds_pct: 58,
        volume: 15640,
        change: 3.8,
        emoji: '⚽'
    },
    {
        title: 'ديربي الرياض',
        odds_pct: 72,
        volume: 12400,
        change: 1.5,
        emoji: '⚽'
    },
    {
        title: 'بطولة التنس الخليجية',
        odds_pct: 45,
        volume: 8750,
        change: -0.8,
        emoji: '🎾'
    }
];

// Mock activity feed
const MOCK_ACTIVITY = [
    {
        user: 'محمد السلمان',
        action: 'راهن على',
        match: 'النصر vs الهلال',
        amount: '500 ريال',
        time: 'قبل دقيقة'
    },
    {
        user: 'فاطمة الشهري',
        action: 'ربحت من',
        match: 'الاتحاد vs الأهلي',
        amount: '1,200 ريال',
        time: 'قبل دقيقتين'
    },
    {
        user: 'علي الدوسري',
        action: 'راهن على',
        match: 'الفتح vs الفيهاء',
        amount: '300 ريال',
        time: 'قبل 3 دقائق'
    },
    {
        user: 'سارة المطيري',
        action: 'ربحت من',
        match: 'الرياض vs الدمام (سلة)',
        amount: '850 ريال',
        time: 'قبل 5 دقائق'
    },
    {
        user: 'خالد الزهراني',
        action: 'راهن على',
        match: 'الشباب vs الرياض',
        amount: '600 ريال',
        time: 'قبل 7 دقائق'
    },
    {
        user: 'نور العنزي',
        action: 'ربحت من',
        match: 'التنس - الدعيع vs الدعيلج',
        amount: '420 ريال',
        time: 'قبل 9 دقائق'
    },
    {
        user: 'حسن البقمي',
        action: 'راهن على',
        match: 'الفيحاء vs الأهلي (طائرة)',
        amount: '250 ريال',
        time: 'قبل 11 دقيقة'
    },
    {
        user: 'ليلى الشمري',
        action: 'ربحت من',
        match: 'محمد الذيابي vs علي الشهري',
        amount: '1,500 ريال',
        time: 'قبل 15 دقيقة'
    }
];

let currentFilter = 'all';

/**
 * Initialize the home page
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Try to fetch API data, fall back to mock data
    let matches = MOCK_MATCHES;
    let stats = null;

    try {
        const apiMatches = await apiGet('/api/matches');
        if (apiMatches && apiMatches.matches && apiMatches.matches.length > 0) {
            matches = apiMatches.matches;
        }
    } catch(e) {
        console.log('API unavailable, using mock data');
    }

    // Calculate stats from matches
    const liveMatches = matches.filter(m => m.status === 'live');
    const uniqueSports = [...new Set(matches.map(m => m.sport))];

    stats = {
        total_matches: matches.length,
        live_now: liveMatches.length,
        sports_count: uniqueSports.length
    };

    // Update stats in hero
    document.getElementById('total-matches').textContent = stats.total_matches;
    document.getElementById('live-count').textContent = stats.live_now;
    document.getElementById('sports-count').textContent = stats.sports_count;

    // Render featured carousel (show 3 live matches)
    renderFeaturedCarousel(liveMatches.slice(0, 4));

    // Render all upcoming/today matches
    renderMatchesGrid(matches);

    // Render trending section
    renderTrending();

    // Render top movers (matches with biggest odds changes)
    renderTopMovers(matches);

    // Render activity feed
    renderActivityFeed();

    // Setup category filter
    setupCategoryTabs(matches);
});

/**
 * Render featured carousel with large cards
 */
function renderFeaturedCarousel(liveMatches) {
    const carousel = document.getElementById('featuredCarousel');

    if (!liveMatches || liveMatches.length === 0) {
        carousel.innerHTML = '<div class="empty-state"><p>لا توجد مباريات حية الآن</p></div>';
        return;
    }

    carousel.innerHTML = liveMatches.map((match, idx) => {
        const oddsArray = [
            { label: 'المضيف', value: match.odds_home },
            { label: 'التعادل', value: match.odds_draw },
            { label: 'الضيف', value: match.odds_away }
        ].filter(o => o.value > 0);

        const maxOdds = Math.max(...oddsArray.map(o => o.value));

        return `
            <div class="carousel-card">
                <div class="card-thumbnail">${match.thumbnail_emoji}</div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-sport">${match.sport}</h3>
                        <span class="live-badge">🔴 مباشر</span>
                    </div>
                    <div class="card-matchup">
                        <div class="team">
                            <span class="team-name">${match.team_home}</span>
                            ${match.status === 'live' ? `<span class="team-score">${match.score_home}</span>` : ''}
                        </div>
                        <div class="vs">vs</div>
                        <div class="team">
                            ${match.status === 'live' ? `<span class="team-score">${match.score_away}</span>` : ''}
                            <span class="team-name">${match.team_away}</span>
                        </div>
                    </div>
                    <div class="card-odds">
                        ${oddsArray.map((odds, i) => {
                            const pct = Math.round((odds.value / maxOdds) * 100);
                            return `
                                <div class="odds-row">
                                    <div class="odds-label">${odds.label}</div>
                                    <div class="odds-bar-container">
                                        <div class="odds-bar" style="width: ${pct}%"></div>
                                    </div>
                                    <div class="odds-value">${odds.value.toFixed(2)}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="card-stats">
                        <div class="stat-badge">📊 ${match.volume} تداول</div>
                        <div class="stat-badge">👥 ${match.participants} مشارك</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render matches grid with filter
 */
function renderMatchesGrid(allMatches) {
    const container = document.getElementById('featuredMatches');

    let matches = allMatches;
    if (currentFilter !== 'all') {
        matches = allMatches.filter(m => m.sport === currentFilter);
    }

    // Show upcoming and finished matches
    const displayMatches = matches.filter(m => m.status === 'upcoming' || m.status === 'finished').slice(0, 6);

    if (!displayMatches || displayMatches.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>لا توجد مباريات</p></div>';
        return;
    }

    container.innerHTML = displayMatches.map(match => renderMatchCard(match)).join('');
}

/**
 * Render a single match card
 */
function renderMatchCard(match) {
    const statusClass = match.status === 'finished' ? 'finished' : 'upcoming';
    const statusText = match.status === 'finished' ? 'انتهت' : 'قادمة';

    return `
        <div class="match-card ${statusClass}">
            <div class="match-header">
                <span class="match-sport">${match.sport}</span>
                <span class="match-league">${match.league}</span>
            </div>
            <div class="match-teams">
                <div class="team-row">
                    <span class="team-name">${match.team_home}</span>
                    ${match.status === 'finished' ? `<span class="final-score">${match.score_home}</span>` : ''}
                </div>
                <div class="vs-text">vs</div>
                <div class="team-row">
                    ${match.status === 'finished' ? `<span class="final-score">${match.score_away}</span>` : ''}
                    <span class="team-name">${match.team_away}</span>
                </div>
            </div>
            <div class="match-odds">
                <div class="odds-option">
                    <div class="odds-label">المضيف</div>
                    <div class="odds-value">${match.odds_home.toFixed(2)}</div>
                </div>
                ${match.odds_draw > 0 ? `
                <div class="odds-option">
                    <div class="odds-label">تعادل</div>
                    <div class="odds-value">${match.odds_draw.toFixed(2)}</div>
                </div>
                ` : ''}
                <div class="odds-option">
                    <div class="odds-label">الضيف</div>
                    <div class="odds-value">${match.odds_away.toFixed(2)}</div>
                </div>
            </div>
            <div class="match-footer">
                <div class="match-volume">📊 ${match.volume}</div>
                <div class="match-status">${match.start_time}</div>
            </div>
        </div>
    `;
}

/**
 * Render trending section
 */
function renderTrending() {
    const container = document.getElementById('trending-list');

    container.innerHTML = MOCK_TRENDING.map((item, idx) => {
        return `
            <div class="trending-item">
                <div class="trending-rank">${idx + 1}</div>
                <div class="trending-content">
                    <div class="trending-title">${item.emoji} ${item.title}</div>
                    <div class="trending-bar-container">
                        <div class="trending-bar" style="width: ${item.odds_pct}%"></div>
                    </div>
                    <div class="trending-meta">
                        <span class="trending-volume">${item.volume}</span>
                        <span class="trending-change ${item.change >= 0 ? 'positive' : 'negative'}">
                            ${item.change >= 0 ? '▲' : '▼'} ${Math.abs(item.change).toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render top movers section
 */
function renderTopMovers(matches) {
    const container = document.getElementById('top-movers');

    // Sort by biggest odds change
    const movers = [...matches]
        .sort((a, b) => Math.abs(b.odds_change) - Math.abs(a.odds_change))
        .slice(0, 5);

    container.innerHTML = movers.map(match => {
        const isPositive = match.odds_change >= 0;
        return `
            <div class="mover-item">
                <div class="mover-info">
                    <div class="mover-match">${match.team_home} vs ${match.team_away}</div>
                    <div class="mover-change ${isPositive ? 'positive' : 'negative'}">
                        ${isPositive ? '▲ +' : '▼ '}${Math.abs(match.odds_change).toFixed(1)}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render activity feed
 */
function renderActivityFeed() {
    const container = document.getElementById('activity-feed');

    container.innerHTML = MOCK_ACTIVITY.map(activity => {
        const firstLetter = activity.user.charAt(0);
        return `
            <div class="activity-item">
                <div class="activity-avatar">${firstLetter}</div>
                <div class="activity-content">
                    <div class="activity-text">
                        <span class="activity-user">${activity.user}</span>
                        <span class="activity-action">${activity.action}</span>
                        <span class="activity-match">${activity.match}</span>
                    </div>
                    <div class="activity-meta">
                        <span class="activity-amount">${activity.amount}</span>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Setup category filter tabs
 */
function setupCategoryTabs(allMatches) {
    const tabs = document.querySelectorAll('.tab-pill');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update filter and re-render
            currentFilter = this.dataset.category || 'all';
            renderMatchesGrid(allMatches);
        });
    });
}

/**
 * Draw a mini sparkline chart using Chart.js
 */
function drawMiniChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Generate random odds movement data (7 points)
    const data = [];
    let baseOdds = 2.5;
    for (let i = 0; i < 7; i++) {
        baseOdds += (Math.random() - 0.5) * 0.3;
        data.push(parseFloat(baseOdds.toFixed(2)));
    }

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                label: 'تحرك الاحتمالات',
                data: data,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    display: false,
                    min: Math.min(...data) - 0.2,
                    max: Math.max(...data) + 0.2
                },
                x: {
                    display: false
                }
            }
        }
    });
}

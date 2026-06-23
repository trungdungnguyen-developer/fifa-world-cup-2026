const teams = [
  { id: "mex", name: "Mexico", short: "MEX", group: "A", played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, points: 7 },
  { id: "kor", name: "Hàn Quốc", short: "KOR", group: "A", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, points: 4 },
  { id: "cro", name: "Croatia", short: "CRO", group: "A", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, points: 3 },
  { id: "rsa", name: "Nam Phi", short: "RSA", group: "A", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 4, points: 2 },
  { id: "can", name: "Canada", short: "CAN", group: "B", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 1, points: 6 },
  { id: "sui", name: "Thụy Sĩ", short: "SUI", group: "B", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, points: 4 },
  { id: "qat", name: "Qatar", short: "QAT", group: "B", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
  { id: "sco", name: "Scotland", short: "SCO", group: "B", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 5, points: 0 },
  { id: "bra", name: "Brazil", short: "BRA", group: "C", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 2, points: 4 },
  { id: "mar", name: "Ma Rốc", short: "MAR", group: "C", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 2, points: 4 },
  { id: "aus", name: "Australia", short: "AUS", group: "C", played: 2, won: 0, drawn: 1, lost: 1, gf: 2, ga: 4, points: 1 },
  { id: "par", name: "Paraguay", short: "PAR", group: "C", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, points: 1 },
  { id: "usa", name: "Hoa Kỳ", short: "USA", group: "D", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, points: 6 },
  { id: "ned", name: "Hà Lan", short: "NED", group: "D", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 3, points: 3 },
  { id: "jpn", name: "Nhật Bản", short: "JPN", group: "D", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "egy", name: "Ai Cập", short: "EGY", group: "D", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 6, points: 0 },
  { id: "ger", name: "Đức", short: "GER", group: "E", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 1, points: 6 },
  { id: "civ", name: "Bờ Biển Ngà", short: "CIV", group: "E", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "cur", name: "Curaçao", short: "CUR", group: "E", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 5, points: 3 },
  { id: "uae", name: "UAE", short: "UAE", group: "E", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 2, points: 0 },
  { id: "fra", name: "Pháp", short: "FRA", group: "F", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 1, points: 4 },
  { id: "sen", name: "Senegal", short: "SEN", group: "F", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 2, points: 4 },
  { id: "irq", name: "Iraq", short: "IRQ", group: "F", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
  { id: "nor", name: "Na Uy", short: "NOR", group: "F", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
  { id: "esp", name: "Tây Ban Nha", short: "ESP", group: "G", played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 0, points: 3 },
  { id: "uru", name: "Uruguay", short: "URU", group: "G", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, points: 3 },
  { id: "ksa", name: "Ả Rập Xê Út", short: "KSA", group: "G", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 4, points: 0 },
  { id: "jam", name: "Jamaica", short: "JAM", group: "G", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, points: 0 },
  { id: "arg", name: "Argentina", short: "ARG", group: "H", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 0, points: 6 },
  { id: "aut", name: "Áo", short: "AUT", group: "H", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "alg", name: "Algeria", short: "ALG", group: "H", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 4, points: 1 },
  { id: "nzl", name: "New Zealand", short: "NZL", group: "H", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
  { id: "eng", name: "Anh", short: "ENG", group: "I", played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 1, points: 3 },
  { id: "gha", name: "Ghana", short: "GHA", group: "I", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "pan", name: "Panama", short: "PAN", group: "I", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "por", name: "Bồ Đào Nha", short: "POR", group: "I", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 3, points: 0 },
  { id: "bel", name: "Bỉ", short: "BEL", group: "J", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "uzb", name: "Uzbekistan", short: "UZB", group: "J", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "col", name: "Colombia", short: "COL", group: "J", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "tun", name: "Tunisia", short: "TUN", group: "J", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "ita", name: "Ý", short: "ITA", group: "K", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "chi", name: "Chile", short: "CHI", group: "K", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "nga", name: "Nigeria", short: "NGA", group: "K", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "crc", name: "Costa Rica", short: "CRC", group: "K", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "den", name: "Đan Mạch", short: "DEN", group: "L", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "ecu", name: "Ecuador", short: "ECU", group: "L", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "irn", name: "Iran", short: "IRN", group: "L", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 },
  { id: "ukr", name: "Ukraine", short: "UKR", group: "L", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 }
];

const matches = [
  {
    id: 1,
    group: "A",
    status: "finished",
    date: "2026-06-11T20:00:00",
    venue: "Estadio Azteca, Mexico City",
    home: "Mexico",
    away: "Hàn Quốc",
    homeScore: 2,
    awayScore: 1,
    possession: { home: 54, away: 46 },
    shots: { home: 13, away: 9 },
    fouls: { home: 11, away: 14 },
    yellow: { home: 2, away: 3 },
    red: { home: 0, away: 0 },
    events: [
      { minute: "18'", type: "goal", text: "Santiago Gimenez ghi bàn cho Mexico" },
      { minute: "41'", type: "card", text: "Kim Min-jae nhận thẻ vàng" },
      { minute: "66'", type: "goal", text: "Son Heung-min gỡ hòa cho Hàn Quốc" },
      { minute: "82'", type: "goal", text: "Hirving Lozano ấn định tỷ số 2-1" }
    ]
  },
  {
    id: 2,
    group: "B",
    status: "finished",
    date: "2026-06-13T19:00:00",
    venue: "BMO Field, Toronto",
    home: "Canada",
    away: "Qatar",
    homeScore: 3,
    awayScore: 0,
    possession: { home: 58, away: 42 },
    shots: { home: 16, away: 6 },
    fouls: { home: 9, away: 12 },
    yellow: { home: 1, away: 2 },
    red: { home: 0, away: 0 },
    events: [
      { minute: "12'", type: "goal", text: "Jonathan David mở tỷ số cho Canada" },
      { minute: "37'", type: "goal", text: "Alphonso Davies nâng tỷ số lên 2-0" },
      { minute: "73'", type: "goal", text: "Tajon Buchanan ghi bàn thứ ba" }
    ]
  },
  {
    id: 3,
    group: "C",
    status: "finished",
    date: "2026-06-16T21:00:00",
    venue: "Hard Rock Stadium, Miami",
    home: "Brazil",
    away: "Ma Rốc",
    homeScore: 1,
    awayScore: 1,
    possession: { home: 61, away: 39 },
    shots: { home: 17, away: 8 },
    fouls: { home: 10, away: 16 },
    yellow: { home: 1, away: 4 },
    red: { home: 0, away: 0 },
    events: [
      { minute: "29'", type: "goal", text: "Vinicius Junior ghi bàn cho Brazil" },
      { minute: "52'", type: "card", text: "Sofyan Amrabat nhận thẻ vàng" },
      { minute: "78'", type: "goal", text: "Achraf Hakimi gỡ hòa cho Ma Rốc" }
    ]
  },
  {
    id: 4,
    group: "D",
    status: "finished",
    date: "2026-06-18T18:00:00",
    venue: "SoFi Stadium, Los Angeles",
    home: "Hoa Kỳ",
    away: "Nhật Bản",
    homeScore: 2,
    awayScore: 0,
    possession: { home: 49, away: 51 },
    shots: { home: 12, away: 10 },
    fouls: { home: 13, away: 10 },
    yellow: { home: 2, away: 1 },
    red: { home: 0, away: 0 },
    events: [
      { minute: "34'", type: "goal", text: "Christian Pulisic mở tỷ số" },
      { minute: "59'", type: "card", text: "Weston McKennie nhận thẻ vàng" },
      { minute: "88'", type: "goal", text: "Folarin Balogun ghi bàn kết thúc trận đấu" }
    ]
  },
  {
    id: 5,
    group: "B",
    status: "upcoming",
    date: "2026-06-24T20:00:00",
    venue: "BC Place, Vancouver",
    home: "Thụy Sĩ",
    away: "Canada"
  },
  {
    id: 6,
    group: "C",
    status: "upcoming",
    date: "2026-06-25T17:00:00",
    venue: "MetLife Stadium, New York/New Jersey",
    home: "Australia",
    away: "Paraguay"
  },
  {
    id: 7,
    group: "D",
    status: "upcoming",
    date: "2026-06-26T21:00:00",
    venue: "AT&T Stadium, Dallas",
    home: "Hà Lan",
    away: "Hoa Kỳ"
  }
];

const state = {
  view: "standings",
  group: "all",
  query: ""
};

const views = {
  standings: document.querySelector("#standingsView"),
  results: document.querySelector("#resultsView"),
  schedule: document.querySelector("#scheduleView")
};

const titles = {
  standings: ["Tổng quan bảng đấu", "Bảng xếp hạng"],
  results: ["Các trận đã kết thúc", "Tỷ số đã qua"],
  schedule: ["Những trận tiếp theo", "Lịch thi đấu sắp tới"]
};

const formatter = new Intl.DateTimeFormat("vi-VN", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

function getTeam(name) {
  return teams.find((team) => team.name === name);
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchSearch(value) {
  if (!state.query) return true;
  return normalize(value).includes(normalize(state.query));
}

function teamChip(name) {
  const team = getTeam(name);
  return `
    <span class="flag">${team?.short || name.slice(0, 3).toUpperCase()}</span>
    <span class="team-name">${name}</span>
  `;
}

function filteredTeams() {
  return teams.filter((team) => {
    const groupOk = state.group === "all" || team.group === state.group;
    const queryOk = matchSearch(`${team.name} ${team.short} Bảng ${team.group}`);
    return groupOk && queryOk;
  });
}

function filteredMatches(status) {
  return matches.filter((match) => {
    const groupOk = state.group === "all" || match.group === state.group;
    const queryOk = matchSearch(`${match.home} ${match.away} ${match.venue} Bảng ${match.group}`);
    return match.status === status && groupOk && queryOk;
  });
}

function renderStandings() {
  const grouped = filteredTeams().reduce((acc, team) => {
    acc[team.group] ||= [];
    acc[team.group].push(team);
    return acc;
  }, {});

  const cards = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, groupTeams]) => {
      const sorted = groupTeams.sort((a, b) => {
        const gdA = a.gf - a.ga;
        const gdB = b.gf - b.ga;
        return b.points - a.points || gdB - gdA || b.gf - a.gf;
      });

      return `
        <article class="group-card">
          <div class="group-header">
            <h3>Bảng ${group}</h3>
            <span>${sorted.length} đội</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hạng</th>
                  <th>Đội</th>
                  <th>Trận</th>
                  <th>Thắng</th>
                  <th>Hòa</th>
                  <th>Thua</th>
                  <th>BT</th>
                  <th>BB</th>
                  <th>HS</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                ${sorted
                  .map(
                    (team, index) => `
                      <tr>
                        <td><span class="rank">${index + 1}</span></td>
                        <td><span class="team-cell">${teamChip(team.name)}</span></td>
                        <td>${team.played}</td>
                        <td>${team.won}</td>
                        <td>${team.drawn}</td>
                        <td>${team.lost}</td>
                        <td>${team.gf}</td>
                        <td>${team.ga}</td>
                        <td>${team.gf - team.ga > 0 ? "+" : ""}${team.gf - team.ga}</td>
                        <td><strong>${team.points}</strong></td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </article>
      `;
    });

  views.standings.innerHTML = `<div class="group-grid">${cards.join("")}</div>`;
  return filteredTeams().length;
}

function renderMatchCard(match) {
  const isFinished = match.status === "finished";
  const score = isFinished ? `${match.homeScore} - ${match.awayScore}` : "vs";
  const statusText = isFinished ? "Đã kết thúc" : "Sắp diễn ra";

  return `
    <article class="match-card ${isFinished ? "past" : ""}" ${isFinished ? `data-match-id="${match.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${match.home} gặp ${match.away}"` : ""}>
      <div class="team home">${teamChip(match.home)}</div>
      <div class="score-block">
        <span class="status-pill ${isFinished ? "finished" : "upcoming"}">${statusText}</span>
        <span class="score">${score}</span>
        <span class="match-meta">Bảng ${match.group} · ${formatter.format(new Date(match.date))}</span>
        <span class="match-meta">${match.venue}</span>
      </div>
      <div class="team away">${teamChip(match.away)}</div>
    </article>
  `;
}

function renderResults() {
  const data = filteredMatches("finished").sort((a, b) => new Date(b.date) - new Date(a.date));
  views.results.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function renderSchedule() {
  const data = filteredMatches("upcoming").sort((a, b) => new Date(a.date) - new Date(b.date));
  views.schedule.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function renderStats() {
  const played = matches.filter((match) => match.status === "finished");
  const goals = played.reduce((total, match) => total + match.homeScore + match.awayScore, 0);
  document.querySelector("#teamCount").textContent = teams.length;
  document.querySelector("#playedCount").textContent = played.length;
  document.querySelector("#upcomingCount").textContent = matches.filter((match) => match.status === "upcoming").length;
  document.querySelector("#goalCount").textContent = goals;
}

function render() {
  const counts = {
    standings: renderStandings(),
    results: renderResults(),
    schedule: renderSchedule()
  };

  Object.entries(views).forEach(([name, element]) => {
    element.classList.toggle("active-view", name === state.view);
  });

  document.querySelector("#viewKicker").textContent = titles[state.view][0];
  document.querySelector("#viewTitle").textContent = titles[state.view][1];
  document.querySelector("#resultCount").textContent = `${counts[state.view]} mục`;
  document.querySelector("#emptyState").hidden = counts[state.view] > 0;
}

function renderGroupOptions() {
  const groupFilter = document.querySelector("#groupFilter");
  const groups = [...new Set(teams.map((team) => team.group))].sort();
  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = `Bảng ${group}`;
    groupFilter.append(option);
  });
}

function openMatchDialog(matchId) {
  const match = matches.find((item) => item.id === Number(matchId));
  if (!match) return;

  document.querySelector("#dialogContent").innerHTML = `
    <div class="dialog-title">
      <p class="eyebrow">Chi tiết trận đấu · Bảng ${match.group}</p>
      <h3>${match.home} ${match.homeScore} - ${match.awayScore} ${match.away}</h3>
      <p>${formatter.format(new Date(match.date))} · ${match.venue}</p>
    </div>
    <div class="detail-grid">
      <div class="detail-box"><span>${match.possession.home}% - ${match.possession.away}%</span>Cầm bóng</div>
      <div class="detail-box"><span>${match.shots.home} - ${match.shots.away}</span>Cú sút</div>
      <div class="detail-box"><span>${match.fouls.home} - ${match.fouls.away}</span>Lỗi</div>
      <div class="detail-box"><span>${match.yellow.home} - ${match.yellow.away}</span>Thẻ vàng</div>
      <div class="detail-box"><span>${match.red.home} - ${match.red.away}</span>Thẻ đỏ</div>
      <div class="detail-box"><span>${match.events.filter((event) => event.type === "goal").length}</span>Bàn thắng</div>
    </div>
    <h4>Diễn biến chính</h4>
    <div class="timeline">
      ${match.events
        .map(
          (event) => `
            <div class="timeline-item ${event.type === "card" ? "card-event" : ""}">
              <span class="minute">${event.minute}</span>
              <span>${event.text}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;

  document.querySelector("#matchDialog").showModal();
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

document.querySelector("#groupFilter").addEventListener("change", (event) => {
  state.group = event.target.value;
  render();
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  render();
});

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-match-id]");
  if (card) openMatchDialog(card.dataset.matchId);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const card = event.target.closest("[data-match-id]");
  if (card) openMatchDialog(card.dataset.matchId);
});

document.querySelector(".close-dialog").addEventListener("click", () => {
  document.querySelector("#matchDialog").close();
});

renderGroupOptions();
renderStats();
render();

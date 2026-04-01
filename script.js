document.addEventListener('DOMContentLoaded', () => {
// ===================== STATE MODULE =====================
const BOARD_COLORS = [
  '#0079bf','#d29034','#519839','#b04632','#89609e',
  '#cd5a91','#4bbf6b','#00aecc','#838c91'
];
const LABEL_COLORS = [
  {id:'green',color:'#61bd4f',name:'Verde'},
  {id:'yellow',color:'#f2d600',name:'Amarelo'},
  {id:'orange',color:'#ff9f1a',name:'Laranja'},
  {id:'red',color:'#eb5a46',name:'Vermelho'},
  {id:'purple',color:'#c377e0',name:'Roxo'},
  {id:'blue',color:'#0079bf',name:'Azul'}
];
const MEMBERS = [
  {id:'user-1',name:'Ana Silva',initials:'AS',color:'#0079bf'},
  {id:'user-2',name:'Bruno Costa',initials:'BC',color:'#519839'},
  {id:'user-3',name:'Carla Dias',initials:'CD',color:'#b04632'},
  {id:'user-4',name:'Daniel Reis',initials:'DR',color:'#89609e'}
];
const STORAGE_KEY = 'trelloCloneState';

let state = { boards:[], lists:[], cards:[], members: MEMBERS };

const genId = (p) => `${p}-${Date.now()}-${Math.floor(Math.random()*10000)}`;

function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const parsed = JSON.parse(s);
      state = { ...state, ...parsed, members: MEMBERS };
      // Migration from old format
      if (parsed.columns && !parsed.boards) {
        const boardId = genId('board');
        state.boards = [{ id: boardId, title: 'Meu Kanban', background: '#0079bf', starred: false }];
        state.lists = parsed.columns.map((c,i) => ({
          id: c.id, boardId, title: c.title, position: i
        }));
        state.cards = (parsed.cards || []).map((c,i) => ({
          id: c.id, listId: c.columnId, title: c.title,
          description: c.description || '', position: i,
          labels: [], members: [], dueDate: null, dueComplete: false,
          cover: null, checklists: [], comments: []
        }));
        delete state.columns;
        saveState();
      }
    }
    if (!state.boards) state.boards = [];
    if (!state.lists) state.lists = [];
    if (!state.cards) state.cards = [];
  } catch(e) { state = { boards:[], lists:[], cards:[], members: MEMBERS }; }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    boards: state.boards, lists: state.lists, cards: state.cards
  }));
}

function getBoard(id) { return state.boards.find(b => b.id === id); }
function getListsByBoard(bid) {
  return state.lists.filter(l => l.boardId === bid).sort((a,b) => a.position - b.position);
}
function getCardsByList(lid) {
  return state.cards.filter(c => c.listId === lid).sort((a,b) => a.position - b.position);
}
function getCard(id) { return state.cards.find(c => c.id === id); }
function getList(id) { return state.lists.find(l => l.id === id); }

// ===================== ROUTER MODULE =====================
let currentRoute = { path: '/', params: {} };
let currentBoardId = null;

function navigate(hash) {
  window.location.hash = hash;
}

function parseRoute() {
  const h = window.location.hash || '#/';
  const parts = h.replace('#','').split('/').filter(Boolean);
  if (parts[0] === 'board' && parts[1]) {
    return { path: '/board', params: { id: parts[1] } };
  }
  return { path: '/', params: {} };
}

function onRouteChange() {
  currentRoute = parseRoute();
  closeAllPopovers();
  closeCardDetailModal();
  closeBoardMenu();
  if (currentRoute.path === '/board') {
    currentBoardId = currentRoute.params.id;
    const board = getBoard(currentBoardId);
    if (!board) { navigate('#/'); return; }
    showBoardView(board);
  } else {
    currentBoardId = null;
    showHomeScreen();
  }
}

window.addEventListener('hashchange', onRouteChange);

// ===================== UI HELPERS =====================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function updateTitle(text) {
  document.title = text ? `${text} | Trello Clone` : 'Trello Clone';
}

function relativeTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'agora mesmo';
  if (diff < 3600) return `há ${Math.floor(diff/60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff/3600)}h`;
  return d.toLocaleDateString('pt-BR');
}

function formatDueDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function getDueStatus(card) {
  if (!card.dueDate) return null;
  if (card.dueComplete) return 'complete';
  const now = new Date();
  const due = new Date(card.dueDate);
  const diff = due - now;
  if (diff < 0) return 'overdue';
  if (diff < 86400000) return 'soon';
  return 'future';
}

// ===================== POPOVER SYSTEM =====================
function showPopover(title, contentFn, anchorEl) {
  const overlay = $('#popover-overlay');
  const pop = $('#popover');
  const titleEl = $('#popover-title');
  const body = $('#popover-body');
  titleEl.textContent = title;
  body.innerHTML = '';
  contentFn(body);
  overlay.style.display = 'block';
  pop.style.display = 'block';
  // Position
  if (anchorEl) {
    const r = anchorEl.getBoundingClientRect();
    pop.style.top = (r.bottom + 4) + 'px';
    pop.style.left = Math.min(r.left, window.innerWidth - 320) + 'px';
  } else {
    pop.style.top = '100px';
    pop.style.left = '50%';
    pop.style.transform = 'translateX(-50%)';
  }
}

function closeAllPopovers() {
  $('#popover-overlay').style.display = 'none';
  $('#popover').style.display = 'none';
  $('#popover').style.transform = '';
}

$('#popover-overlay').addEventListener('click', closeAllPopovers);
$('#popover-close').addEventListener('click', closeAllPopovers);

// ===================== HOME SCREEN =====================
function showHomeScreen() {
  $('#home-screen').style.display = 'flex';
  $('#board-view').style.display = 'none';
  $('#board-sub-header').style.display = 'none';
  document.body.style.backgroundColor = '#0079bf';
  updateTitle('');
  renderHomeBoards();
}

function renderHomeBoards() {
  const grid = $('#boards-grid');
  grid.innerHTML = '';
  if (state.boards.length === 0) {
    grid.innerHTML = '<div class="empty-state"><i class="fas fa-columns"></i>Crie seu primeiro quadro!</div>';
  }
  state.boards.forEach(b => {
    const card = document.createElement('div');
    card.className = 'board-card';
    card.style.backgroundColor = b.background || '#0079bf';
    card.innerHTML = `<span class="board-card-title">${esc(b.title)}</span>`;
    card.addEventListener('click', () => navigate(`#/board/${b.id}`));
    grid.appendChild(card);
  });
  // Create board button
  const createCard = document.createElement('div');
  createCard.className = 'board-card board-card-create';
  createCard.innerHTML = '<i class="fas fa-plus"></i> Criar novo quadro';
  createCard.addEventListener('click', (e) => openCreateBoardPopover(e.currentTarget));
  grid.appendChild(createCard);
}

function openCreateBoardPopover(anchorEl) {
  let selectedColor = BOARD_COLORS[0];
  showPopover('Criar quadro', (body) => {
    body.innerHTML = `<div class="create-board-popover">
      <div class="color-grid" id="create-board-colors"></div>
      <input type="text" id="create-board-title" placeholder="Título do quadro">
      <button class="btn btn-primary btn-create" id="create-board-submit" disabled>Criar</button>
    </div>`;
    const colorsDiv = body.querySelector('#create-board-colors');
    BOARD_COLORS.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch' + (c === selectedColor ? ' selected' : '');
      sw.style.backgroundColor = c;
      sw.addEventListener('click', () => {
        colorsDiv.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        sw.classList.add('selected');
        selectedColor = c;
      });
      colorsDiv.appendChild(sw);
    });
    const titleInput = body.querySelector('#create-board-title');
    const submitBtn = body.querySelector('#create-board-submit');
    titleInput.addEventListener('input', () => {
      submitBtn.disabled = !titleInput.value.trim();
    });
    submitBtn.addEventListener('click', () => {
      const title = titleInput.value.trim();
      if (!title) return;
      const boardId = genId('board');
      state.boards.push({ id: boardId, title, background: selectedColor, starred: false });
      // Default lists
      ['A Fazer','Em Progresso','Concluído'].forEach((t,i) => {
        state.lists.push({ id: genId('list'), boardId, title: t, position: i });
      });
      saveState();
      closeAllPopovers();
      navigate(`#/board/${boardId}`);
    });
    setTimeout(() => titleInput.focus(), 50);
  }, anchorEl);
}

// ===================== BOARD VIEW =====================
function showBoardView(board) {
  $('#home-screen').style.display = 'none';
  $('#board-view').style.display = 'flex';
  $('#board-sub-header').style.display = 'flex';
  document.body.style.backgroundColor = board.background || '#0079bf';
  updateTitle(board.title);
  renderSubHeader(board);
  renderBoardCanvas(board);
}

function renderSubHeader(board) {
  const titleEl = $('#board-title-display');
  titleEl.textContent = board.title;
  titleEl.onclick = () => startBoardTitleEdit(board);
  const starBtn = $('#star-btn');
  starBtn.className = 'star-btn' + (board.starred ? ' starred' : '');
  starBtn.innerHTML = board.starred ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
  starBtn.onclick = () => {
    board.starred = !board.starred;
    saveState();
    renderSubHeader(board);
  };
}

function startBoardTitleEdit(board) {
  const container = $('#board-title-display').parentNode;
  const display = $('#board-title-display');
  const input = document.createElement('input');
  input.className = 'board-title-input';
  input.value = board.title;
  display.style.display = 'none';
  container.insertBefore(input, display);
  input.focus();
  input.select();
  const finish = () => {
    const v = input.value.trim();
    if (v) { board.title = v; saveState(); updateTitle(v); }
    input.remove();
    display.style.display = '';
    display.textContent = board.title;
  };
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = board.title; input.blur(); }
  });
}

// Board Menu
$('#board-menu-btn').addEventListener('click', () => {
  const panel = $('#board-menu-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});
$('#board-menu-close').addEventListener('click', closeBoardMenu);
$('#board-menu-delete').addEventListener('click', () => {
  if (!currentBoardId) return;
  if (!confirm('Tem certeza que deseja excluir este quadro e todas as suas listas e cartões?')) return;
  state.cards = state.cards.filter(c => {
    const list = getList(c.listId);
    return list && list.boardId !== currentBoardId;
  });
  state.lists = state.lists.filter(l => l.boardId !== currentBoardId);
  state.boards = state.boards.filter(b => b.id !== currentBoardId);
  saveState();
  closeBoardMenu();
  navigate('#/');
});

function closeBoardMenu() {
  $('#board-menu-panel').style.display = 'none';
}

function renderBoardCanvas(board) {
  const canvas = $('#board-canvas');
  canvas.innerHTML = '';
  const lists = getListsByBoard(board.id);
  lists.forEach(list => {
    canvas.appendChild(renderList(list));
  });
  // Add list placeholder
  const addListDiv = document.createElement('div');
  addListDiv.className = 'add-list-placeholder';
  addListDiv.innerHTML = `<button class="add-list-btn"><i class="fas fa-plus"></i> Adicionar outra lista</button>`;
  addListDiv.querySelector('.add-list-btn').addEventListener('click', () => {
    showAddListForm(addListDiv, board.id);
  });
  canvas.appendChild(addListDiv);
  // Empty state
  if (lists.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.style.color = 'white';
    empty.innerHTML = '<i class="fas fa-columns"></i>Adicione uma lista para começar!';
    canvas.insertBefore(empty, addListDiv);
  }
  setupCardDragAndDrop();
  setupListDragAndDrop();
}

function renderList(list) {
  const el = document.createElement('div');
  el.className = 'list';
  el.dataset.listId = list.id;
  el.draggable = true;

  // Header
  const header = document.createElement('div');
  header.className = 'list-header';
  const titleSpan = document.createElement('span');
  titleSpan.className = 'list-title';
  titleSpan.textContent = list.title;
  titleSpan.addEventListener('click', (e) => {
    e.stopPropagation();
    startListTitleEdit(list, titleSpan);
  });
  const menuBtn = document.createElement('button');
  menuBtn.className = 'list-menu-btn';
  menuBtn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openListMenu(list, menuBtn);
  });
  header.appendChild(titleSpan);
  header.appendChild(menuBtn);

  // Cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-container';
  cardsContainer.dataset.listId = list.id;
  const cards = getCardsByList(list.id);
  cards.forEach(card => {
    cardsContainer.appendChild(renderCardFront(card));
  });

  // Footer
  const footer = document.createElement('div');
  footer.className = 'list-footer';
  const addBtn = document.createElement('button');
  addBtn.className = 'add-card-btn';
  addBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar um cartão';
  addBtn.addEventListener('click', () => showAddCardForm(footer, list.id));
  footer.appendChild(addBtn);

  el.appendChild(header);
  el.appendChild(cardsContainer);
  el.appendChild(footer);
  return el;
}

// ===================== LIST INLINE EDIT =====================
function startListTitleEdit(list, titleSpan) {
  const input = document.createElement('input');
  input.className = 'list-title-input';
  input.value = list.title;
  titleSpan.replaceWith(input);
  input.focus();
  input.select();
  const finish = () => {
    const v = input.value.trim();
    if (v) { list.title = v; saveState(); }
    const newSpan = document.createElement('span');
    newSpan.className = 'list-title';
    newSpan.textContent = list.title;
    newSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      startListTitleEdit(list, newSpan);
    });
    input.replaceWith(newSpan);
  };
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = list.title; input.blur(); }
  });
}

// ===================== LIST MENU =====================
function openListMenu(list, anchorEl) {
  showPopover('Ações da lista', (body) => {
    const items = [
      { text: 'Adicionar cartão', icon: 'fa-plus', action: () => {
        closeAllPopovers();
        const footer = document.querySelector(`.list[data-list-id="${list.id}"] .list-footer`);
        if (footer) showAddCardForm(footer, list.id);
      }},
      { text: 'Copiar lista', icon: 'fa-copy', action: () => {
        closeAllPopovers();
        copyList(list);
      }},
      { text: 'Mover todos os cartões', icon: 'fa-arrows-alt', action: () => {
        closeAllPopovers();
        // Simple: just show info
      }},
      { sep: true },
      { text: 'Arquivar esta lista', icon: 'fa-archive', action: () => {
        if (!confirm('Tem certeza que deseja arquivar esta lista?')) return;
        closeAllPopovers();
        state.cards = state.cards.filter(c => c.listId !== list.id);
        state.lists = state.lists.filter(l => l.id !== list.id);
        saveState();
        renderBoardCanvas(getBoard(currentBoardId));
      }}
    ];
    items.forEach(item => {
      if (item.sep) {
        body.appendChild(Object.assign(document.createElement('div'), { className: 'popover-separator' }));
        return;
      }
      const btn = document.createElement('button');
      btn.className = 'popover-item';
      btn.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
      btn.addEventListener('click', item.action);
      body.appendChild(btn);
    });
  }, anchorEl);
}

function copyList(list) {
  const newListId = genId('list');
  const maxPos = Math.max(0, ...state.lists.filter(l=>l.boardId===list.boardId).map(l=>l.position));
  state.lists.push({ id: newListId, boardId: list.boardId, title: list.title + ' (cópia)', position: maxPos + 1 });
  const cards = getCardsByList(list.id);
  cards.forEach((c, i) => {
    state.cards.push({
      ...JSON.parse(JSON.stringify(c)),
      id: genId('card'), listId: newListId, position: i
    });
  });
  saveState();
  renderBoardCanvas(getBoard(currentBoardId));
}

// ===================== ADD LIST FORM =====================
function showAddListForm(container, boardId) {
  container.innerHTML = `<div class="add-list-form">
    <input type="text" placeholder="Insira o título da lista..." autofocus>
    <div class="form-actions">
      <button class="btn btn-primary">Adicionar lista</button>
      <button class="btn-close">&times;</button>
    </div>
  </div>`;
  const input = container.querySelector('input');
  const addBtn = container.querySelector('.btn-primary');
  const closeBtn = container.querySelector('.btn-close');
  input.focus();
  const doAdd = () => {
    const title = input.value.trim();
    if (!title) return;
    const maxPos = Math.max(0, ...state.lists.filter(l=>l.boardId===boardId).map(l=>l.position), -1);
    state.lists.push({ id: genId('list'), boardId, title, position: maxPos + 1 });
    saveState();
    renderBoardCanvas(getBoard(boardId));
  };
  addBtn.addEventListener('click', doAdd);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); doAdd(); }
    if (e.key === 'Escape') resetAddList(container, boardId);
  });
  closeBtn.addEventListener('click', () => resetAddList(container, boardId));
}

function resetAddList(container, boardId) {
  container.innerHTML = `<button class="add-list-btn"><i class="fas fa-plus"></i> Adicionar outra lista</button>`;
  container.querySelector('.add-list-btn').addEventListener('click', () => showAddListForm(container, boardId));
}

// ===================== ADD CARD FORM =====================
function showAddCardForm(footer, listId) {
  footer.innerHTML = `<div class="add-card-form">
    <textarea placeholder="Insira um título para este cartão..." autofocus></textarea>
    <div class="form-actions">
      <button class="btn btn-primary">Adicionar cartão</button>
      <button class="btn-close">&times;</button>
    </div>
  </div>`;
  const ta = footer.querySelector('textarea');
  const addBtn = footer.querySelector('.btn-primary');
  const closeBtn = footer.querySelector('.btn-close');
  ta.focus();
  const doAdd = () => {
    const title = ta.value.trim();
    if (!title) return;
    const maxPos = Math.max(0, ...state.cards.filter(c=>c.listId===listId).map(c=>c.position), -1);
    state.cards.push({
      id: genId('card'), listId, title, description: '', position: maxPos + 1,
      labels: [], members: [], dueDate: null, dueComplete: false,
      cover: null, checklists: [], comments: []
    });
    saveState();
    // Re-render cards only
    const container = document.querySelector(`.cards-container[data-list-id="${listId}"]`);
    if (container) {
      container.innerHTML = '';
      getCardsByList(listId).forEach(c => container.appendChild(renderCardFront(c)));
      setupCardDragAndDrop();
    }
    ta.value = '';
    ta.focus();
  };
  addBtn.addEventListener('click', doAdd);
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doAdd(); }
    if (e.key === 'Escape') resetAddCard(footer, listId);
  });
  closeBtn.addEventListener('click', () => resetAddCard(footer, listId));
}

function resetAddCard(footer, listId) {
  footer.innerHTML = '';
  const addBtn = document.createElement('button');
  addBtn.className = 'add-card-btn';
  addBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar um cartão';
  addBtn.addEventListener('click', () => showAddCardForm(footer, listId));
  footer.appendChild(addBtn);
}

// ===================== CARD FRONT (PREVIEW) =====================
function renderCardFront(card) {
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.cardId = card.id;
  el.draggable = true;
  let html = '';
  // Cover
  if (card.cover) {
    html += `<div class="card-cover-bar" style="background-color:${card.cover}"></div>`;
  }
  html += '<div class="card-inner">';
  // Labels
  if (card.labels && card.labels.length > 0) {
    html += '<div class="card-labels">';
    card.labels.forEach(lId => {
      const lbl = LABEL_COLORS.find(l => l.id === lId);
      if (lbl) html += `<div class="card-label-chip" style="background-color:${lbl.color}" title="${lbl.name}"></div>`;
    });
    html += '</div>';
  }
  // Title
  html += `<div class="card-title-text">${esc(card.title)}</div>`;
  // Badges
  const badges = [];
  if (card.description) badges.push('<span class="card-badge"><i class="fas fa-align-left"></i></span>');
  if (card.comments && card.comments.length > 0) {
    badges.push(`<span class="card-badge"><i class="fas fa-comment"></i> ${card.comments.length}</span>`);
  }
  if (card.dueDate) {
    const status = getDueStatus(card);
    const cls = status === 'complete' ? 'due-complete' : status === 'soon' ? 'due-soon' : status === 'overdue' ? 'due-overdue' : '';
    badges.push(`<span class="card-badge ${cls}" data-due-toggle="${card.id}"><i class="far fa-clock"></i> ${formatDueDate(card.dueDate)}</span>`);
  }
  if (card.checklists && card.checklists.length > 0) {
    let total = 0, checked = 0;
    card.checklists.forEach(cl => { cl.items.forEach(i => { total++; if (i.checked) checked++; }); });
    const cls = total > 0 && checked === total ? 'checklist-complete' : '';
    badges.push(`<span class="card-badge ${cls}"><i class="far fa-check-square"></i> ${checked}/${total}</span>`);
  }
  if (badges.length) html += `<div class="card-badges">${badges.join('')}</div>`;
  // Members
  if (card.members && card.members.length > 0) {
    html += '<div class="card-members">';
    card.members.forEach(mId => {
      const m = MEMBERS.find(mm => mm.id === mId);
      if (m) html += `<div class="card-member-avatar" style="background-color:${m.color}" title="${m.name}">${m.initials}</div>`;
    });
    html += '</div>';
  }
  html += '</div>';
  // Edit button
  html += '<button class="card-edit-btn" title="Edição rápida"><i class="fas fa-pencil-alt"></i></button>';
  el.innerHTML = html;
  // Events
  el.addEventListener('click', (e) => {
    if (e.target.closest('.card-edit-btn')) return;
    if (e.target.closest('[data-due-toggle]')) {
      card.dueComplete = !card.dueComplete;
      saveState();
      refreshCardInDOM(card);
      return;
    }
    openCardDetailModal(card.id);
  });
  el.querySelector('.card-edit-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    quickEditCard(card, el);
  });
  return el;
}

function refreshCardInDOM(card) {
  const old = document.querySelector(`.card[data-card-id="${card.id}"]`);
  if (old) {
    const newEl = renderCardFront(card);
    old.replaceWith(newEl);
  }
}

function quickEditCard(card, cardEl) {
  const inner = cardEl.querySelector('.card-inner');
  if (!inner) return;
  const titleDiv = inner.querySelector('.card-title-text');
  if (!titleDiv) return;
  const input = document.createElement('textarea');
  input.className = 'list-title-input';
  input.value = card.title;
  input.style.width = '100%';
  input.style.minHeight = '40px';
  titleDiv.replaceWith(input);
  input.focus();
  input.select();
  const finish = () => {
    const v = input.value.trim();
    if (v) { card.title = v; saveState(); }
    refreshCardInDOM(card);
  };
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = card.title; input.blur(); }
  });
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ===================== SEARCH =====================
$('#search-input').addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.card').forEach(cardEl => {
    const id = cardEl.dataset.cardId;
    const card = getCard(id);
    if (!card) return;
    if (query && !card.title.toLowerCase().includes(query)) {
      cardEl.classList.add('search-dimmed');
    } else {
      cardEl.classList.remove('search-dimmed');
    }
  });
});

// ===================== CARD DETAIL MODAL =====================
let openCardId = null;

function openCardDetailModal(cardId) {
  const card = getCard(cardId);
  if (!card) return;
  openCardId = cardId;
  const overlay = $('#card-detail-overlay');
  overlay.style.display = 'flex';
  // Cover
  const coverEl = $('#card-detail-cover');
  if (card.cover) {
    coverEl.style.display = 'block';
    coverEl.style.backgroundColor = card.cover;
  } else {
    coverEl.style.display = 'none';
  }
  // Title
  const titleEl = $('#card-detail-title');
  titleEl.value = card.title;
  autoResizeTextarea(titleEl);
  titleEl.oninput = () => autoResizeTextarea(titleEl);
  titleEl.onblur = () => {
    const v = titleEl.value.trim();
    if (v && v !== card.title) { card.title = v; saveState(); refreshCardInDOM(card); }
  };
  titleEl.onkeydown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); }
    if (e.key === 'Escape') { titleEl.value = card.title; titleEl.blur(); }
  };
  // List info
  const list = getList(card.listId);
  $('#card-detail-list-info').textContent = list ? `na lista ${list.title}` : '';
  // Labels display
  renderModalLabels(card);
  // Members display
  renderModalMembers(card);
  // Due date display
  renderModalDueDate(card);
  // Description
  renderModalDescription(card);
  // Checklists
  renderModalChecklists(card);
  // Comments
  renderModalComments(card);
  // Sidebar events
  setupModalSidebar(card);
}

function closeCardDetailModal() {
  $('#card-detail-overlay').style.display = 'none';
  openCardId = null;
}
$('#card-detail-close').addEventListener('click', closeCardDetailModal);
$('#card-detail-overlay').addEventListener('click', (e) => {
  if (e.target === $('#card-detail-overlay')) closeCardDetailModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if ($('#popover').style.display !== 'none') { closeAllPopovers(); return; }
    if (openCardId) closeCardDetailModal();
  }
});

function autoResizeTextarea(ta) {
  ta.style.height = 'auto';
  ta.style.height = ta.scrollHeight + 'px';
}

// Modal: Labels
function renderModalLabels(card) {
  const section = $('#card-detail-labels-display');
  const chips = $('#card-detail-labels-chips');
  if (!card.labels || card.labels.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  chips.innerHTML = '';
  card.labels.forEach(lId => {
    const lbl = LABEL_COLORS.find(l => l.id === lId);
    if (lbl) {
      const chip = document.createElement('span');
      chip.className = 'label-chip-expanded';
      chip.style.backgroundColor = lbl.color;
      chip.textContent = lbl.name;
      chips.appendChild(chip);
    }
  });
}

// Modal: Members
function renderModalMembers(card) {
  const section = $('#card-detail-members-display');
  const list = $('#card-detail-members-list');
  if (!card.members || card.members.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  list.innerHTML = '';
  card.members.forEach(mId => {
    const m = MEMBERS.find(mm => mm.id === mId);
    if (m) {
      const circle = document.createElement('div');
      circle.className = 'member-circle';
      circle.style.backgroundColor = m.color;
      circle.textContent = m.initials;
      circle.title = m.name;
      list.appendChild(circle);
    }
  });
  const addBtn = document.createElement('button');
  addBtn.className = 'member-add-btn';
  addBtn.innerHTML = '<i class="fas fa-plus"></i>';
  addBtn.addEventListener('click', () => openMembersPopover(card, addBtn));
  list.appendChild(addBtn);
}

// Modal: Due Date
function renderModalDueDate(card) {
  const section = $('#card-detail-due-display');
  const badge = $('#card-detail-due-badge');
  if (!card.dueDate) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  const status = getDueStatus(card);
  const cls = status === 'complete' ? 'due-complete' : status === 'soon' ? 'due-soon' : status === 'overdue' ? 'due-overdue' : '';
  badge.innerHTML = `
    <input type="checkbox" class="due-badge-checkbox" ${card.dueComplete ? 'checked' : ''}>
    <span class="due-badge-text ${cls}">${new Date(card.dueDate).toLocaleString('pt-BR')}</span>
    <button class="due-badge-remove" title="Remover"><i class="fas fa-times"></i></button>
  `;
  badge.querySelector('.due-badge-checkbox').addEventListener('change', (e) => {
    card.dueComplete = e.target.checked;
    saveState();
    renderModalDueDate(card);
    refreshCardInDOM(card);
  });
  badge.querySelector('.due-badge-remove').addEventListener('click', () => {
    card.dueDate = null;
    card.dueComplete = false;
    saveState();
    renderModalDueDate(card);
    refreshCardInDOM(card);
  });
}

// Modal: Description
function renderModalDescription(card) {
  const placeholder = $('#card-detail-desc-placeholder');
  const editor = $('#card-detail-desc-editor');
  const text = $('#card-detail-desc-text');
  const input = $('#card-detail-desc-input');
  if (card.description) {
    placeholder.style.display = 'none';
    text.style.display = 'block';
    text.textContent = card.description;
    editor.style.display = 'none';
  } else {
    placeholder.style.display = 'block';
    text.style.display = 'none';
    editor.style.display = 'none';
  }
  placeholder.onclick = () => {
    placeholder.style.display = 'none';
    text.style.display = 'none';
    editor.style.display = 'block';
    input.value = card.description || '';
    input.focus();
  };
  text.onclick = () => {
    text.style.display = 'none';
    editor.style.display = 'block';
    input.value = card.description || '';
    input.focus();
  };
  $('#card-detail-desc-save').onclick = () => {
    card.description = input.value.trim();
    saveState();
    renderModalDescription(card);
    refreshCardInDOM(card);
  };
  $('#card-detail-desc-cancel').onclick = () => {
    renderModalDescription(card);
  };
}

// Modal: Checklists
function renderModalChecklists(card) {
  const container = $('#card-detail-checklists');
  container.innerHTML = '';
  if (!card.checklists) card.checklists = [];
  card.checklists.forEach((cl, clIdx) => {
    const section = document.createElement('div');
    section.className = 'checklist-section';
    const total = cl.items.length;
    const checked = cl.items.filter(i => i.checked).length;
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    let html = `
      <div class="checklist-header">
        <i class="far fa-check-square card-detail-icon"></i>
        <span class="checklist-title">${esc(cl.title)}</span>
        <button class="checklist-delete-btn">Excluir</button>
      </div>
      <div class="checklist-progress">
        <div class="checklist-progress-bar ${pct===100?'complete':''}" style="width:${pct}%"></div>
      </div>
      <ul class="checklist-items">
    `;
    cl.items.forEach((item, itemIdx) => {
      html += `<li class="checklist-item">
        <input type="checkbox" ${item.checked?'checked':''} data-cl="${clIdx}" data-item="${itemIdx}">
        <span class="checklist-item-text ${item.checked?'checked':''}">${esc(item.text)}</span>
        <button class="checklist-item-delete" data-cl="${clIdx}" data-item="${itemIdx}"><i class="fas fa-times"></i></button>
      </li>`;
    });
    html += `</ul>
      <div class="checklist-add-item">
        <button class="checklist-add-item-btn">Adicionar um item</button>
      </div>`;
    section.innerHTML = html;
    // Delete checklist
    section.querySelector('.checklist-delete-btn').addEventListener('click', () => {
      card.checklists.splice(clIdx, 1);
      saveState();
      renderModalChecklists(card);
      refreshCardInDOM(card);
    });
    // Toggle items
    section.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const ci = parseInt(cb.dataset.cl);
        const ii = parseInt(cb.dataset.item);
        card.checklists[ci].items[ii].checked = cb.checked;
        saveState();
        renderModalChecklists(card);
        refreshCardInDOM(card);
      });
    });
    // Delete items
    section.querySelectorAll('.checklist-item-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const ci = parseInt(btn.dataset.cl);
        const ii = parseInt(btn.dataset.item);
        card.checklists[ci].items.splice(ii, 1);
        saveState();
        renderModalChecklists(card);
        refreshCardInDOM(card);
      });
    });
    // Add item
    section.querySelector('.checklist-add-item-btn').addEventListener('click', () => {
      const addDiv = section.querySelector('.checklist-add-item');
      addDiv.innerHTML = `<div class="checklist-add-item-form">
        <input type="text" placeholder="Adicionar um item">
        <button class="btn btn-primary">Adicionar</button>
        <button class="btn btn-cancel">Cancelar</button>
      </div>`;
      const inp = addDiv.querySelector('input');
      inp.focus();
      const doAdd = () => {
        const t = inp.value.trim();
        if (!t) return;
        cl.items.push({ id: genId('cli'), text: t, checked: false });
        saveState();
        renderModalChecklists(card);
        refreshCardInDOM(card);
      };
      addDiv.querySelector('.btn-primary').addEventListener('click', doAdd);
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doAdd();
        if (e.key === 'Escape') { renderModalChecklists(card); }
      });
      addDiv.querySelector('.btn-cancel').addEventListener('click', () => renderModalChecklists(card));
    });
    container.appendChild(section);
  });
}

// Modal: Comments
function renderModalComments(card) {
  const list = $('#comments-list');
  list.innerHTML = '';
  if (!card.comments) card.comments = [];
  const sorted = [...card.comments].sort((a,b) => new Date(b.date) - new Date(a.date));
  sorted.forEach(com => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <div class="comment-avatar">${esc(com.author ? com.author[0] : 'U')}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="comment-author">${esc(com.author || 'Usuário')}</span>
          <span class="comment-date">${relativeTime(com.date)}</span>
        </div>
        <div class="comment-text">${esc(com.text)}</div>
      </div>
    `;
    list.appendChild(item);
  });
  // Setup input
  const input = $('#comment-input');
  const saveBtn = $('#comment-save-btn');
  input.value = '';
  saveBtn.style.display = 'none';
  input.onfocus = () => { saveBtn.style.display = 'inline-block'; };
  input.onblur = () => { setTimeout(() => { if (!input.value.trim()) saveBtn.style.display = 'none'; }, 200); };
  saveBtn.onclick = () => {
    const t = input.value.trim();
    if (!t) return;
    card.comments.push({ id: genId('com'), author: 'Usuário', text: t, date: new Date().toISOString() });
    saveState();
    renderModalComments(card);
    refreshCardInDOM(card);
  };
  input.onkeydown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); saveBtn.click(); }
  };
}

// Modal: Sidebar setup
function setupModalSidebar(card) {
  $('#sidebar-labels-btn').onclick = () => openLabelsPopover(card, $('#sidebar-labels-btn'));
  $('#sidebar-members-btn').onclick = () => openMembersPopover(card, $('#sidebar-members-btn'));
  $('#sidebar-checklist-btn').onclick = () => openChecklistPopover(card, $('#sidebar-checklist-btn'));
  $('#sidebar-dates-btn').onclick = () => openDatesPopover(card, $('#sidebar-dates-btn'));
  $('#sidebar-cover-btn').onclick = () => openCoverPopover(card, $('#sidebar-cover-btn'));
  $('#sidebar-move-btn').onclick = () => openMovePopover(card, $('#sidebar-move-btn'));
  $('#sidebar-copy-btn').onclick = () => {
    const list = getList(card.listId);
    if (!list) return;
    const maxPos = Math.max(0, ...state.cards.filter(c=>c.listId===card.listId).map(c=>c.position));
    const copy = { ...JSON.parse(JSON.stringify(card)), id: genId('card'), position: maxPos + 1 };
    state.cards.push(copy);
    saveState();
    closeCardDetailModal();
    renderBoardCanvas(getBoard(currentBoardId));
  };
  $('#sidebar-archive-btn').onclick = () => {
    if (!confirm('Tem certeza que deseja arquivar este cartão?')) return;
    state.cards = state.cards.filter(c => c.id !== card.id);
    saveState();
    closeCardDetailModal();
    renderBoardCanvas(getBoard(currentBoardId));
  };
}

// ===================== SIDEBAR POPOVERS =====================
function openLabelsPopover(card, anchor) {
  showPopover('Labels', (body) => {
    LABEL_COLORS.forEach(lbl => {
      const div = document.createElement('div');
      div.className = 'label-toggle';
      const isSelected = card.labels && card.labels.includes(lbl.id);
      div.innerHTML = `
        <div class="label-toggle-color" style="background-color:${lbl.color}">
          ${lbl.name}
          ${isSelected ? '<span class="label-toggle-check"><i class="fas fa-check"></i></span>' : ''}
        </div>
      `;
      div.addEventListener('click', () => {
        if (!card.labels) card.labels = [];
        const idx = card.labels.indexOf(lbl.id);
        if (idx >= 0) card.labels.splice(idx, 1);
        else card.labels.push(lbl.id);
        saveState();
        renderModalLabels(card);
        refreshCardInDOM(card);
        openLabelsPopover(card, anchor);
      });
      body.appendChild(div);
    });
  }, anchor);
}

function openMembersPopover(card, anchor) {
  showPopover('Membros', (body) => {
    MEMBERS.forEach(m => {
      const div = document.createElement('div');
      div.className = 'member-toggle';
      const isSelected = card.members && card.members.includes(m.id);
      div.innerHTML = `
        <div class="member-toggle-avatar" style="background-color:${m.color}">${m.initials}</div>
        <span class="member-toggle-name">${m.name}</span>
        ${isSelected ? '<span class="member-toggle-check"><i class="fas fa-check"></i></span>' : ''}
      `;
      div.addEventListener('click', () => {
        if (!card.members) card.members = [];
        const idx = card.members.indexOf(m.id);
        if (idx >= 0) card.members.splice(idx, 1);
        else card.members.push(m.id);
        saveState();
        renderModalMembers(card);
        refreshCardInDOM(card);
        openMembersPopover(card, anchor);
      });
      body.appendChild(div);
    });
  }, anchor);
}

function openChecklistPopover(card, anchor) {
  showPopover('Adicionar checklist', (body) => {
    body.innerHTML = `
      <input type="text" class="checklist-name-input" placeholder="Título" value="Checklist">
      <button class="btn btn-primary" style="width:100%">Adicionar</button>
    `;
    const input = body.querySelector('input');
    input.focus();
    input.select();
    body.querySelector('.btn-primary').addEventListener('click', () => {
      const title = input.value.trim() || 'Checklist';
      if (!card.checklists) card.checklists = [];
      card.checklists.push({ id: genId('cl'), title, items: [] });
      saveState();
      closeAllPopovers();
      renderModalChecklists(card);
      refreshCardInDOM(card);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') body.querySelector('.btn-primary').click();
    });
  }, anchor);
}

function openDatesPopover(card, anchor) {
  showPopover('Data de entrega', (body) => {
    body.innerHTML = `
      <input type="datetime-local" class="date-picker-input" value="${card.dueDate ? new Date(card.dueDate).toISOString().slice(0,16) : ''}">
      <button class="btn btn-primary" style="width:100%;margin-bottom:8px">Salvar</button>
      <button class="btn" style="width:100%">Remover</button>
    `;
    body.querySelector('.btn-primary').addEventListener('click', () => {
      const val = body.querySelector('input').value;
      if (val) { card.dueDate = new Date(val).toISOString(); card.dueComplete = false; }
      saveState();
      closeAllPopovers();
      renderModalDueDate(card);
      refreshCardInDOM(card);
    });
    body.querySelectorAll('.btn')[1].addEventListener('click', () => {
      card.dueDate = null;
      card.dueComplete = false;
      saveState();
      closeAllPopovers();
      renderModalDueDate(card);
      refreshCardInDOM(card);
    });
  }, anchor);
}

function openCoverPopover(card, anchor) {
  showPopover('Cover', (body) => {
    const colors = ['#61bd4f','#f2d600','#ff9f1a','#eb5a46','#c377e0','#0079bf'];
    body.innerHTML = '<div class="cover-grid"></div><button class="btn" style="width:100%;margin-top:8px">Sem cover</button>';
    const grid = body.querySelector('.cover-grid');
    colors.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'cover-swatch' + (card.cover === c ? ' selected' : '');
      sw.style.backgroundColor = c;
      sw.addEventListener('click', () => {
        card.cover = c;
        saveState();
        closeAllPopovers();
        // Update modal cover
        const coverEl = $('#card-detail-cover');
        coverEl.style.display = 'block';
        coverEl.style.backgroundColor = c;
        refreshCardInDOM(card);
      });
      grid.appendChild(sw);
    });
    body.querySelector('.btn').addEventListener('click', () => {
      card.cover = null;
      saveState();
      closeAllPopovers();
      $('#card-detail-cover').style.display = 'none';
      refreshCardInDOM(card);
    });
  }, anchor);
}

function openMovePopover(card, anchor) {
  if (!currentBoardId) return;
  const lists = getListsByBoard(currentBoardId);
  showPopover('Mover cartão', (body) => {
    let html = '<select class="move-list-select">';
    lists.forEach(l => {
      html += `<option value="${l.id}" ${l.id===card.listId?'selected':''}>${esc(l.title)}</option>`;
    });
    html += '</select><button class="btn btn-primary" style="width:100%">Mover</button>';
    body.innerHTML = html;
    body.querySelector('.btn-primary').addEventListener('click', () => {
      const newListId = body.querySelector('select').value;
      card.listId = newListId;
      const maxPos = Math.max(0, ...state.cards.filter(c=>c.listId===newListId&&c.id!==card.id).map(c=>c.position));
      card.position = maxPos + 1;
      saveState();
      closeAllPopovers();
      closeCardDetailModal();
      renderBoardCanvas(getBoard(currentBoardId));
    });
  }, anchor);
}

// ===================== DRAG AND DROP - CARDS =====================
let draggedCardEl = null;
let cardPlaceholder = null;

function setupCardDragAndDrop() {
  const cards = document.querySelectorAll('.card[data-card-id]');
  const containers = document.querySelectorAll('.cards-container');

  cards.forEach(cardEl => {
    cardEl.addEventListener('dragstart', (e) => {
      draggedCardEl = cardEl;
      cardPlaceholder = document.createElement('div');
      cardPlaceholder.className = 'card-placeholder';
      cardPlaceholder.style.height = cardEl.offsetHeight + 'px';
      setTimeout(() => {
        cardEl.classList.add('dragging');
        cardEl.parentNode.insertBefore(cardPlaceholder, cardEl);
      }, 0);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', cardEl.dataset.cardId);
    });
    cardEl.addEventListener('dragend', () => {
      if (draggedCardEl) draggedCardEl.classList.remove('dragging');
      if (cardPlaceholder && cardPlaceholder.parentNode) cardPlaceholder.remove();
      draggedCardEl = null;
      cardPlaceholder = null;
      // Update state from DOM
      updateCardPositionsFromDOM();
      saveState();
    });
  });

  containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!draggedCardEl) return;
      const after = getDragAfterElement(container, e.clientY);
      if (cardPlaceholder) {
        if (after) container.insertBefore(cardPlaceholder, after);
        else container.appendChild(cardPlaceholder);
      }
      if (after) container.insertBefore(draggedCardEl, after);
      else container.appendChild(draggedCardEl);
    });
    container.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  });
}

function getDragAfterElement(container, y) {
  const els = [...container.querySelectorAll('.card:not(.dragging)')];
  return els.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateCardPositionsFromDOM() {
  document.querySelectorAll('.cards-container').forEach(container => {
    const listId = container.dataset.listId;
    container.querySelectorAll('.card[data-card-id]').forEach((el, idx) => {
      const card = getCard(el.dataset.cardId);
      if (card) { card.listId = listId; card.position = idx; }
    });
  });
}

// ===================== DRAG AND DROP - LISTS =====================
let draggedListEl = null;

function setupListDragAndDrop() {
  const lists = document.querySelectorAll('.list[data-list-id]');
  const canvas = $('#board-canvas');

  lists.forEach(listEl => {
    const header = listEl.querySelector('.list-header');
    header.addEventListener('mousedown', () => { listEl.draggable = true; });
    header.addEventListener('mouseup', () => { listEl.draggable = true; });
    listEl.addEventListener('dragstart', (e) => {
      if (e.target !== listEl) return;
      draggedListEl = listEl;
      setTimeout(() => listEl.classList.add('dragging-list'), 0);
      e.dataTransfer.effectAllowed = 'move';
    });
    listEl.addEventListener('dragend', () => {
      if (draggedListEl) draggedListEl.classList.remove('dragging-list');
      draggedListEl = null;
      updateListPositionsFromDOM();
      saveState();
    });
  });

  canvas.addEventListener('dragover', (e) => {
    if (!draggedListEl) return;
    e.preventDefault();
    const after = getListAfterElement(canvas, e.clientX);
    if (after) canvas.insertBefore(draggedListEl, after);
    else {
      const placeholder = canvas.querySelector('.add-list-placeholder');
      if (placeholder) canvas.insertBefore(draggedListEl, placeholder);
      else canvas.appendChild(draggedListEl);
    }
  });
}

function getListAfterElement(canvas, x) {
  const els = [...canvas.querySelectorAll('.list:not(.dragging-list)')];
  return els.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateListPositionsFromDOM() {
  const canvas = $('#board-canvas');
  canvas.querySelectorAll('.list[data-list-id]').forEach((el, idx) => {
    const list = getList(el.dataset.listId);
    if (list) list.position = idx;
  });
}

// ===================== HEADER NAVIGATION =====================
$('#boards-btn').addEventListener('click', () => navigate('#/'));
$('.header-logo').addEventListener('click', () => navigate('#/'));

// ===================== INIT =====================
loadState();

// Migrate old localStorage key
if (!state.boards.length) {
  const old = localStorage.getItem('kanbanState');
  if (old) {
    try {
      const parsed = JSON.parse(old);
      if (parsed.columns) {
        const boardId = genId('board');
        state.boards = [{ id: boardId, title: 'Meu Kanban', background: '#0079bf', starred: false }];
        state.lists = parsed.columns.map((c,i) => ({ id: c.id, boardId, title: c.title, position: i }));
        state.cards = (parsed.cards || []).map((c,i) => ({
          id: c.id, listId: c.columnId, title: c.title,
          description: c.description || '', position: i,
          labels: [], members: [], dueDate: null, dueComplete: false,
          cover: null, checklists: [], comments: []
        }));
        saveState();
        localStorage.removeItem('kanbanState');
      }
    } catch(e) {}
  }
}

onRouteChange();

}); // end DOMContentLoaded

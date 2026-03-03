document.addEventListener('DOMContentLoaded', () => {
    // Basic state management
    let state = {
        columns: [],
        cards: []
    };

    // Load from local storage
    const loadState = () => {
        const savedState = localStorage.getItem('kanbanState');
        if (savedState) {
            state = JSON.parse(savedState);
        } else {
            // Initial state if empty
            state = {
                columns: [
                    { id: 'col-1', title: 'A Fazer' },
                    { id: 'col-2', title: 'Em Progresso' },
                    { id: 'col-3', title: 'Concluído' }
                ],
                cards: [
                    { id: 'card-1', columnId: 'col-1', title: 'Criar HTML', description: 'Estruturar o index.html', color: '#ffffff' },
                    { id: 'card-2', columnId: 'col-1', title: 'Adicionar CSS', description: 'Estilizar como o Trello', color: '#ffffff' }
                ]
            };
        }
    };

    // Save to local storage
    const saveState = () => {
        localStorage.setItem('kanbanState', JSON.stringify(state));
    };

    // DOM Elements
    const boardContainer = document.getElementById('board-container');
    const addBoardBtn = document.getElementById('add-board-btn');

    // Card Modal Elements
    const cardModal = document.getElementById('card-modal');
    const cardForm = document.getElementById('card-form');
    const closeCardModalBtn = cardModal.querySelector('.close-btn');
    const cardModalTitle = document.getElementById('modal-title');
    const cardIdInput = document.getElementById('card-id');
    const columnIdInput = document.getElementById('column-id');
    const cardTitleInput = document.getElementById('card-title-input');
    const cardDescInput = document.getElementById('card-desc-input');
    const cardColorInput = document.getElementById('card-color-input');

    // Column Modal Elements
    const columnModal = document.getElementById('column-modal');
    const columnForm = document.getElementById('column-form');
    const closeColumnModalBtn = columnModal.querySelector('.close-btn');
    const columnModalTitle = document.getElementById('column-modal-title');
    const editColumnIdInput = document.getElementById('edit-column-id');
    const columnTitleInput = document.getElementById('column-title-input');

    // Generate unique ID
    const generateId = (prefix) => {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    // Render Board
    const renderBoard = () => {
        boardContainer.innerHTML = '';

        state.columns.forEach(column => {
            const columnEl = document.createElement('div');
            columnEl.className = 'column';
            columnEl.dataset.id = column.id;

            // Column Header
            const headerEl = document.createElement('div');
            headerEl.className = 'column-header';

            const titleEl = document.createElement('h3');
            titleEl.className = 'column-title';
            titleEl.textContent = column.title;

            const actionsEl = document.createElement('div');
            actionsEl.className = 'column-actions';

            const editBtn = document.createElement('i');
            editBtn.className = 'fas fa-edit';
            editBtn.title = 'Editar Lista';
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openColumnModal(column.id);
            });

            const deleteBtn = document.createElement('i');
            deleteBtn.className = 'fas fa-trash';
            deleteBtn.title = 'Excluir Lista';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Tem certeza que deseja excluir esta lista e todos os seus cartões?')) {
                    deleteColumn(column.id);
                }
            });

            actionsEl.appendChild(editBtn);
            actionsEl.appendChild(deleteBtn);

            headerEl.appendChild(titleEl);
            headerEl.appendChild(actionsEl);

            // Cards Container
            const cardsContainerEl = document.createElement('div');
            cardsContainerEl.className = 'cards-container';
            cardsContainerEl.dataset.columnId = column.id;

            // Add Cards
            const columnCards = state.cards.filter(card => card.columnId === column.id);
            columnCards.forEach(card => {
                const cardEl = renderCard(card);
                cardsContainerEl.appendChild(cardEl);
            });

            // Add Card Button
            const addCardBtn = document.createElement('button');
            addCardBtn.className = 'btn add-card-btn';
            addCardBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar um cartão';
            addCardBtn.addEventListener('click', () => openCardModal(null, column.id));

            columnEl.appendChild(headerEl);
            columnEl.appendChild(cardsContainerEl);
            columnEl.appendChild(addCardBtn);

            boardContainer.appendChild(columnEl);
        });

        // Add Column Button
        const addColumnBtn = document.createElement('button');
        addColumnBtn.className = 'btn add-column-btn';
        addColumnBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar outra lista';
        addColumnBtn.addEventListener('click', () => openColumnModal(null));

        boardContainer.appendChild(addColumnBtn);

        // Setup Drag and Drop after rendering
        setupDragAndDrop();
    };

    // Render single card
    const renderCard = (card) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = card.id;
        cardEl.draggable = true;

        if (card.color && card.color !== '#ffffff') {
            cardEl.style.borderLeftColor = card.color;
        }

        const titleEl = document.createElement('div');
        titleEl.className = 'card-title';
        titleEl.textContent = card.title;

        cardEl.appendChild(titleEl);

        if (card.description && card.description.trim() !== '') {
            const descIndicator = document.createElement('i');
            descIndicator.className = 'fas fa-align-left card-desc-indicator visible';
            cardEl.appendChild(descIndicator);
        }

        // Actions (Edit/Delete) visible on hover
        const actionsEl = document.createElement('div');
        actionsEl.className = 'card-actions';

        const editBtn = document.createElement('i');
        editBtn.className = 'fas fa-pencil-alt';
        editBtn.title = 'Editar Cartão';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCardModal(card.id, null);
        });

        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash-alt';
        deleteBtn.title = 'Excluir Cartão';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Tem certeza que deseja excluir este cartão?')) {
                deleteCard(card.id);
            }
        });

        actionsEl.appendChild(editBtn);
        actionsEl.appendChild(deleteBtn);
        cardEl.appendChild(actionsEl);

        // Click to edit
        cardEl.addEventListener('click', () => {
            openCardModal(card.id, null);
        });

        return cardEl;
    };

    // --- Drag and Drop Logic ---
    let draggedCard = null;

    const setupDragAndDrop = () => {
        const cards = document.querySelectorAll('.card');
        const containers = document.querySelectorAll('.cards-container');

        // Setup cards
        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                draggedCard = card;
                setTimeout(() => {
                    card.classList.add('sortable-ghost');
                }, 0);
            });

            card.addEventListener('dragend', () => {
                setTimeout(() => {
                    draggedCard.classList.remove('sortable-ghost');
                    draggedCard = null;
                }, 0);
            });
        });

        // Setup containers (columns)
        containers.forEach(container => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                if (afterElement == null) {
                    container.appendChild(draggedCard);
                } else {
                    container.insertBefore(draggedCard, afterElement);
                }
            });

            container.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedCard) {
                    const cardId = draggedCard.dataset.id;
                    const newColumnId = container.dataset.columnId;

                    // Update state
                    const cardIndex = state.cards.findIndex(c => c.id === cardId);
                    if (cardIndex !== -1) {
                        state.cards[cardIndex].columnId = newColumnId;

                        // We also need to update the order if we want to save it,
                        // but for simplicity we'll just update the columnId
                        // A more robust implementation would re-order the state array based on DOM
                        updateCardsOrder();
                        saveState();
                    }
                }
            });
        });
    };

    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.card:not(.sortable-ghost)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    const updateCardsOrder = () => {
        // Rebuild cards array based on current DOM order
        const newCardsArray = [];
        const columns = document.querySelectorAll('.column');

        columns.forEach(col => {
            const colId = col.dataset.id;
            const cardElements = col.querySelectorAll('.card');

            cardElements.forEach(cardEl => {
                const cardId = cardEl.dataset.id;
                const cardData = state.cards.find(c => c.id === cardId);
                if (cardData) {
                    cardData.columnId = colId;
                    newCardsArray.push(cardData);
                }
            });
        });

        // Add any cards that might be lost (safeguard)
        const unassignedCards = state.cards.filter(c => !newCardsArray.find(nc => nc.id === c.id));
        state.cards = [...newCardsArray, ...unassignedCards];
    };

    // --- Modal Logic ---

    // Card Modal
    const openCardModal = (cardId = null, columnId = null) => {
        cardForm.reset();

        if (cardId) {
            // Edit mode
            cardModalTitle.textContent = 'Editar Cartão';
            const card = state.cards.find(c => c.id === cardId);

            cardIdInput.value = card.id;
            columnIdInput.value = card.columnId;
            cardTitleInput.value = card.title;
            cardDescInput.value = card.description || '';
            cardColorInput.value = card.color || '#ffffff';
        } else {
            // Add mode
            cardModalTitle.textContent = 'Adicionar Cartão';
            cardIdInput.value = '';
            columnIdInput.value = columnId;
            cardColorInput.value = '#ffffff';
        }

        cardModal.classList.add('show');
        cardTitleInput.focus();
    };

    const closeCardModal = () => {
        cardModal.classList.remove('show');
    };

    // Column Modal
    const openColumnModal = (columnId = null) => {
        columnForm.reset();

        if (columnId) {
            // Edit mode
            columnModalTitle.textContent = 'Editar Lista';
            const column = state.columns.find(c => c.id === columnId);

            editColumnIdInput.value = column.id;
            columnTitleInput.value = column.title;
        } else {
            // Add mode
            columnModalTitle.textContent = 'Adicionar Lista';
            editColumnIdInput.value = '';
        }

        columnModal.classList.add('show');
        columnTitleInput.focus();
    };

    const closeColumnModal = () => {
        columnModal.classList.remove('show');
    };

    // --- CRUD Operations ---

    // Save Card
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = cardIdInput.value;
        const columnId = columnIdInput.value;
        const title = cardTitleInput.value.trim();
        const description = cardDescInput.value.trim();
        const color = cardColorInput.value;

        if (!title) return;

        if (id) {
            // Update
            const index = state.cards.findIndex(c => c.id === id);
            if (index !== -1) {
                state.cards[index] = { ...state.cards[index], title, description, color };
            }
        } else {
            // Create
            const newCard = {
                id: generateId('card'),
                columnId,
                title,
                description,
                color
            };
            state.cards.push(newCard);
        }

        saveState();
        renderBoard();
        closeCardModal();
    });

    // Delete Card
    const deleteCard = (id) => {
        state.cards = state.cards.filter(c => c.id !== id);
        saveState();
        renderBoard();
    };

    // Save Column
    columnForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = editColumnIdInput.value;
        const title = columnTitleInput.value.trim();

        if (!title) return;

        if (id) {
            // Update
            const index = state.columns.findIndex(c => c.id === id);
            if (index !== -1) {
                state.columns[index].title = title;
            }
        } else {
            // Create
            const newColumn = {
                id: generateId('col'),
                title
            };
            state.columns.push(newColumn);
        }

        saveState();
        renderBoard();
        closeColumnModal();
    });

    // Delete Column
    const deleteColumn = (id) => {
        state.columns = state.columns.filter(c => c.id !== id);
        // Also delete associated cards
        state.cards = state.cards.filter(c => c.columnId !== id);
        saveState();
        renderBoard();
    };

    // --- Event Listeners ---

    // Close Modals
    closeCardModalBtn.addEventListener('click', closeCardModal);
    closeColumnModalBtn.addEventListener('click', closeColumnModal);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cardModal) {
            closeCardModal();
        }
        if (e.target === columnModal) {
            closeColumnModal();
        }
    });

    // Add board (reset basically or add new column)
    addBoardBtn.addEventListener('click', () => {
        openColumnModal(null);
    });

    // Initialize
    loadState();
    renderBoard();
});

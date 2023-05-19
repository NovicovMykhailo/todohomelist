export function items() {
  const Array = [
    { id: 'Постирушки', value: 'Постирушки' },
    { id: 'Джинджик', value: 'Джинджик' },
    { id: 'Посуда', value: 'Посуда' },
    { id: 'Ужин', value: 'Ужин' },
    { id: 'Завтрак', value: 'Завтрак' },
    { id: 'Уборка', value: 'Уборка' },
  ];
  if (localStorage.getItem('Items-List') !== null) {
    return JSON.parse(localStorage.getItem('Items-List'));
  } else {
    localStorage.setItem('Items-List', JSON.stringify(Array));
    return Array;
  }
}

export function setItems(name) {
  const arrayToFilter = [...JSON.parse(localStorage.getItem('Items-List'))];

  if (arrayToFilter.filter(item => item.id === name).length === 0 && name.trim() !== '') {
    const newArray = [...JSON.parse(localStorage.getItem('Items-List')), { id: name, value: name }];
    localStorage.setItem('Items-List', JSON.stringify(newArray));
  }
}

export function removeItem(id) {
  const arrayToDelete = [...JSON.parse(localStorage.getItem('Items-List'))];
  const renewArray = arrayToDelete.filter(item => item.id !== id);
  localStorage.setItem('Items-List', JSON.stringify(renewArray));
}

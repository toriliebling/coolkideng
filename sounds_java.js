// Функция для воспроизведения звука через HTML5 audio
function playSound(letter, buttonElement) {
    const audioElement = document.getElementById(`audio-${letter}`);
    if (audioElement) {
        audioElement.currentTime = 0; // Перемотка в начало
        audioElement.play().catch(e => {
            console.log("Аудио не может быть воспроизведено:", e);
        });
    } else {
        // Если аудио элемент не найден
        alert(`Произношение буквы ${letter}.`);
    }
    
    // Визуальная обратная связь
    if (buttonElement) {
        buttonElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buttonElement.style.transform = '';
        }, 200);
    }
}

// Данные о животных для каждой буквы (название и факт на русском)
const animalData = {
    'A': { name: 'Антилопа', fact: 'Антилопы — быстрые травоядные животные, обитающие в саваннах Африки.' },
    'B': { name: 'Бегемот', fact: 'Бегемоты проводят большую часть дня в воде, чтобы защитить кожу от солнца.' },
    'C': { name: 'Кошка', fact: 'Кошки могут поворачивать уши на 180 градусов и слышать ультразвук.' },
    'D': { name: 'Дельфин', fact: 'Дельфины спят с одним открытым глазом, чтобы оставаться начеку.' },
    'E': { name: 'Слон', fact: 'Слоны — самые крупные наземные животные, их хобот содержит около 40 000 мышц.' },
    'F': { name: 'Лиса', fact: 'Лисы используют магнитное поле Земли для охоты, чтобы точнее прыгать на добычу.' },
    'G': { name: 'Жираф', fact: 'Жирафы имеют самую длинную шею среди животных, но у них всего семь шейных позвонков, как у человека.' },
    'H': { name: 'Ёж', fact: 'Ёжики рождаются с мягкими иголками, которые твердеют через несколько часов после рождения.' },
    'I': { name: 'Игуана', fact: 'Игуаны могут находиться под водой до 30 минут благодаря способности замедлять сердцебиение.' },
    'J': { name: 'Жираф', fact: 'Жирафы спят всего 20 минут в день, часто стоя.' },
    'K': { name: 'Кенгуру', fact: 'Кенгуру не умеют ходить назад, их мощные ноги приспособлены только для прыжков вперёд.' },
    'L': { name: 'Лев', fact: 'Львы — единственные кошки, которые живут группами, называемыми прайдами.' },
    'M': { name: 'Обезьяна', fact: 'Обезьяны используют инструменты, например, камни, чтобы разбивать орехи.' },
    'N': { name: 'Носорог', fact: 'Рог носорога состоит из кератина, того же материала, что и человеческие ногти.' },
    'O': { name: 'Орёл', fact: 'Орлы обладают невероятным зрением и могут заметить добычу с расстояния более 3 километров.' },
    'P': { name: 'Пингвин', fact: 'Пингвины могут пить морскую воду благодаря специальным железам, фильтрующим соль.' },
    'Q': { name: 'Кво́кка', fact: 'Квокка известна как «самое счастливое животное» из-за своей улыбки.' },
    'R': { name: 'Носорог', fact: 'Носороги могут развивать скорость до 50 км/ч, несмотря на свой большой вес.' },
    'S': { name: 'Змея', fact: 'Змеи чувствуют запах языком, собирая частицы воздуха и передавая их в орган Якобсона.' },
    'T': { name: 'Тигр', fact: 'Полоски на шкуре тигра уникальны, как отпечатки пальцев у человека.' },
    'U': { name: 'Утконос', fact: 'Утконос — одно из немногих млекопитающих, которое откладывает яйца.' },
    'V': { name: 'Стервятник', fact: 'Стервятники обладают острым зрением и могут обнаружить падаль с высоты нескольких километров.' },
    'W': { name: 'Кит', fact: 'Синий кит — самое большое животное из когда-либо существовавших на Земле.' },
    'X': { name: 'Ксенопс', fact: 'Ксенопс — маленькая птица, которая использует инструменты, чтобы доставать насекомых из коры.' },
    'Y': { name: 'Як', fact: 'Яки могут выживать в высокогорных районах Гималаев, где мало кислорода.' },
    'Z': { name: 'Зебра', fact: 'Полоски зебры уникальны для каждой особи и помогают отпугивать насекомых.' }
};

// Функция для открытия попапа с животным
function showAnimalPopup(letter, buttonElement) {
    const data = animalData[letter];
    if (!data) return;
    
    document.getElementById('popup-letter').textContent = letter;
    document.getElementById('popup-animal-name').textContent = data.name;
    document.getElementById('popup-fact').textContent = data.fact;
    // Изображение-заглушка (books.jpg) уже установлено в HTML, можно менять если есть разные картинки
    // document.getElementById('popup-image').src = `images/${letter.toLowerCase()}.jpg`; // если будут свои картинки
    
    const popup = document.getElementById('animal-popup');
    // Позиционируем попап над или под кнопкой в зависимости от доступного места
    if (buttonElement) {
        const buttonRect = buttonElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.alphabet-section');
        const sectionRect = section.getBoundingClientRect();
        
        // Относительные координаты кнопки внутри секции
        const buttonTop = buttonRect.top - sectionRect.top;
        const buttonLeft = buttonRect.left - sectionRect.left;
        const buttonHeight = buttonRect.height;
        const buttonWidth = buttonRect.width;
        
        // Доступное пространство сверху и снизу
        const spaceAbove = buttonTop;
        const spaceBelow = sectionRect.height - (buttonTop + buttonHeight);
        
        let top, left;
        const horizontalCenter = buttonLeft + (buttonWidth - popupRect.width) / 2;
        left = Math.max(0, Math.min(horizontalCenter, sectionRect.width - popupRect.width));
        
        // Выбираем позицию: сверху, если достаточно места, иначе снизу
        const margin = 10;
        if (spaceAbove >= popupRect.height + margin) {
            // Помещаем над кнопкой
            top = buttonTop - popupRect.height - margin;
        } else {
            // Помещаем под кнопкой
            top = buttonTop + buttonHeight + margin;
        }
        
        // Ограничиваем, чтобы попап не выходил за границы секции
        top = Math.max(0, Math.min(top, sectionRect.height - popupRect.height));
        
        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
    }
    
    popup.style.display = 'block';
}

// Функция для закрытия попапа
function closeAnimalPopup() {
    const popup = document.getElementById('animal-popup');
    popup.style.display = 'none';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('animal-popup');
    if (event.target === popup) {
        closeAnimalPopup();
    }
});

// Обновляем обработчики кнопок букв, чтобы показывать попап вместе со звуком
function playSoundAndShowAnimal(letter, buttonElement) {
    playSound(letter, buttonElement);
    showAnimalPopup(letter, buttonElement);
}
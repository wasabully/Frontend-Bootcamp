let currentValue = 0;
let buffer = '0';
let prevOperator = null;

const screen = document.querySelector('#result');

const init = () => {
	setupEventListeners();
	updateScreen();
};

const setupEventListeners = () => {
	const buttonsContainer = document.querySelector('.calc-buttons');
	const clearButton = document.querySelector('.clear');

	buttonsContainer.addEventListener('click', handleButtonClick);
	clearButton.addEventListener('click', () => {
		handleClear();
		updateScreen();
	});
};

const handleButtonClick = (event) => {
	const value = event.target.innerText.trim();
	if (!value) return;

	isNaN(Number(value)) && value !== '.'
		? handleSymbol(value)
		: handleNumber(value);
	updateScreen();
};

const updateScreen = () => {
	screen.innerText = buffer.slice(0, 11);
};

const handleSymbol = (symbol) => {
	switch (symbol) {
		case 'C':
			handleClear();
			break;
		case '=':
			calcRes();
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			handleMathOperation(symbol);
			break;
	}
};

const handleClear = () => {
	buffer = buffer.length > 1 ? buffer.slice(0, -1) : '0';
};

const calcRes = () => {
	if (prevOperator !== null) {
		executeOperation(parseFloat(buffer));
		buffer = currentValue.toString();
		currentValue = 0;
		prevOperator = null;
	}
};

const handleMathOperation = (operator) => {
	if (buffer === '0') return;

	const intBuffer = parseFloat(buffer);
	currentValue = currentValue === 0 ? intBuffer : executeOperation(intBuffer);
	prevOperator = operator;
	buffer = '0';
};

const executeOperation = (intBuffer) => {
	if (prevOperator === '/' && intBuffer === 0) {
		buffer = 'Error';
		currentValue = 0;
		prevOperator = null;
		return;
	}

	switch (prevOperator) {
		case '+':
			currentValue += intBuffer;
			break;
		case '-':
			currentValue -= intBuffer;
			break;
		case '*':
			currentValue *= intBuffer;
			break;
		case '/':
			currentValue /= intBuffer;
			break;
	}
	return parseFloat(currentValue.toFixed(10));
};

const handleNumber = (numberString) => {
	if (numberString === '.' && buffer.includes('.')) return;

	if (buffer.length < 11) {
		buffer = buffer === '0' ? numberString : buffer + numberString;
	}
};

init();

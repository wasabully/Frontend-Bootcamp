let currentValue = 0;
let buffer = '0';
let prevOperator = null;

const screen = document.querySelector('#result');

const buttonClick = (value) => {
	if (isNaN(value) && value !== '.') {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	updateScreen();
};

const updateScreen = () => {
	screen.innerText = buffer;
};

const handleSymbol = (value) => {
	switch (value) {
		case 'C':
			if (buffer.length > 1) {
				buffer = buffer.slice(0, -1);
			} else {
				buffer = '0';
			}
			break;
		case '=':
			if (prevOperator === null) return;
			flushOperation(parseFloat(buffer));
			prevOperator = null;
			buffer = currentValue.toString();
			currentValue = 0;
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			handleMath(value);
			break;
	}
};

const handleMath = (operator) => {
	if (buffer === '0') return;

	const intBuffer = parseFloat(buffer);

	if (currentValue === 0) {
		currentValue = intBuffer;
	} else {
		flushOperation(intBuffer);
	}

	prevOperator = operator;
	buffer = '0';
};

const flushOperation = (intBuffer) => {
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

	currentValue = parseFloat(currentValue.toFixed(10));
};

const handleNumber = (numberString) => {
	if (numberString === '.' && buffer.includes('.')) return;

	if (buffer.length < 11) {
		if (buffer === '0') {
			buffer = numberString;
		} else {
			if (buffer.length < 10 || (buffer.includes('.') && buffer.length < 11)) {
				buffer += numberString;
			}
		}
	}
};

const init = () => {
	document
		.querySelector('.calc-buttons')
		.addEventListener('click', function (event) {
			if (event.target.innerText.trim()) {
				buttonClick(event.target.innerText.trim());
			}
		});

	document.querySelector('.clear').addEventListener('click', () => {
		handleSymbol('C');
		updateScreen();
	});
};

init();

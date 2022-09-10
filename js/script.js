const alertBox = document.querySelector(".alert");
const output = document.querySelector(".output");
const generate = document.querySelector(".generate");
const copy = document.querySelector(".copy");
const hex = "0123456789ABCDEF";
const outputCode = document.querySelector(".code");
const back = document.querySelector(".backward");
const next = document.querySelector(".forward");
const numbers = document.querySelector("#numbers");
let a = 0;
let x = 1;

class Gradients {
	constructor() {
		this.gradients = [];
		this.background = [];
	}

	create(code, style) {
		this.gradients.push(code);
		this.background.push(style);
	}
}

let gradientsContainer = new Gradients();


function randomColor() {
	let hexCode = "#";
	for(i=1; i <= 6; i++) {
		hexCode += hex[Math.floor(Math.random() * hex.length)];
	}
	return hexCode;
}

function generateGradient() {
	outputCode.style.display = "block";
	const Color_1 = randomColor();
	const Color_2 = randomColor();
	const Deg = Math.floor(Math.random() * 360);
	output.style.background = `linear-gradient(${Deg}deg, ${Color_1}, ${Color_2})`;
	outputCode.value = `background-image: linear-gradient(${Deg}deg, ${Color_1}, ${Color_2});`;
	gradientsContainer.create(outputCode.value, output.style.background);
	x = 1;
	return a++;
}

copy.addEventListener("click", ()=> {
	outputCode.select();
	document.execCommand("copy");
	alertBox.classList.add("active");
	setTimeout(()=>{
		alertBox.classList.remove("active");
	}, 3000);
});

generate.addEventListener("click", generateGradient);

back.addEventListener("click", ()=> {
	if(x == 0) {
		x++;
	}else if (x < gradientsContainer.gradients.length) {
		x++;
	}
	output.style.background = gradientsContainer.background[gradientsContainer.background.length - x];
	outputCode.value = gradientsContainer.gradients[gradientsContainer.gradients.length - x];
})

next.addEventListener("click" , ()=> {
	if(x == 0) {
		x++;
	}else if (x > 1) {
		x--;
	}
	output.style.background = gradientsContainer.background[gradientsContainer.background.length - x];
	outputCode.value = gradientsContainer.gradients[gradientsContainer.gradients.length - x];
})

onload = generateGradient;

setInterval(()=> {
	numbers.innerHTML = `<h2>${(gradientsContainer.gradients.length - x) + 1} of ${gradientsContainer.gradients.length}</h2>`;
}, 10);
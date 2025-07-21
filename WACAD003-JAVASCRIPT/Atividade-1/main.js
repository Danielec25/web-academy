const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}


const storyText = `Era uma noite de 50 fahrenheit em Seul, 
então :insertx: decidiu dar uma volta. Quando chegou em :inserty:, 
encontrou seu amor de infância e, de repente, :insertz:. 
Kang Tae-moo, que estava de férias, viu tudo, mas não se surpreendeu — afinal, :insertx: 
sempre atrai situações dramáticas.`;

const insertX = [
    'Um CEO rico e arrogante',
    'Uma garota pobre e esforçada',
    'O melhor amigo que está na "friendzone"'
  ];

const insertY = [
    'a Namsan Tower',
    'uma loja de conveniência',
    'a ilha de Jeju'
  ];

const insertZ = [
    'começou a tocar uma música triste no piano',
    'a cena congelou para um flashback em preto e branco',
    'pegou um guarda-chuva amarelo no meio da chuva'
  ];


randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);

    if (customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll('Kang Tae-moo', name);
    }

    
    if (document.getElementById("uk").checked) {
        
        const weight = `${Math.round(300 / 14)} stone`;
        
        
        const temperature = `${Math.round((50 - 32) * 5 / 9)} centigrade`;

       
        newStory = newStory.replaceAll('50 fahrenheit', temperature);
        
    }

  
    story.textContent = newStory;
    story.style.visibility = 'visible';
}
'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const quizLabel = document.getElementById('quizNum');
  const scoreLabel = document.querySelector('#result > .score');
  const commentLabel = document.querySelector('#result > .comment')

  const quizSet = shuffle([
    {q: 'SOUND極ROAD時代にTAKUYA∞とツインボーカルをしていた人物は誰?', c: ['リョウヘイ', 'セイカ', 'ヒコ', 'タケシ']},
    {q: 'TAKUYA∞がピアノを始めたのはいつ?', c: ['22歳', '18歳', '20歳', '24歳']},
    {q: 'ラジオで彰のことを「アキチャン」と呼んでいるのは誰?', c: ['TAKUYA∞', '克哉', '師匠', '真太郎']},
    {q: 'CoCo壱のカレーとディズニーが好きなメンバーは誰?', c: ['彰', 'TAKUYA∞', '克哉', '信人']},
    {q: 'SOUND極ROAD時代に作られた名曲｢Sad\'it｣はどんなﾃｰﾏの曲?', c: ['中絶', '心中', '自殺', '浮気と彼女の死']},
    {q: 'TAKUYA∞の血液型は何型?', c: ['B', 'A', 'O', 'AB']},
    {q: '信人のキョウダイ構成はどれ?', c: ['兄と妹', '兄と弟', '姉と弟', '姉と妹']},
    {q: '次のうち、彰が単独で作曲したのはどれ?', c: ['ゼロの答', 'Just break the limit!', 'ハルジオン', '儚くも永久のカナシ']}, 
    {q: '「モノクローム〜気づけなかった devotion〜」の仮タイトルは?', c: ['秋', '春', '夏', '冬']}, 
    {q: '克哉の趣味は何?', c: ['靴集め', '切手集め', 'ピック集め', '神集め']}, 
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    quizLabel.textContent = `Q${currentNum + 1}.`;
    question.textContent = quizSet[currentNum].q;
  
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      if (score === quizSet.length) {
        commentLabel.textContent = 'もしかして、UverWorldのメンバーですか？';
      } else if (score === 0) {
        commentLabel.textContent = '選択問題なのに0点？？？その辺のファンよりも詳しいアンチか？';
      } else if (score <= quizSet.length * 0.5) {
        commentLabel.textContent = 'もっとUverWorldを聴きましょう！';
      } else {
        commentLabel.textContent = 'あなた、crewですね？？';
      }
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
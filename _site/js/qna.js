const element = document.getElementsByClassName('question')[0];
element.addEventListener('click', function(){
  // 답변 요소에 hidden이라는 클래스를 넣자
  const answer = document.getElementsByClassName('answer')[0];
  answer.classList.add('show');
})

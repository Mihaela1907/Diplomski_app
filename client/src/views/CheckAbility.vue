<template>
    <div id="checking" class="checking">
        <h3>{{ quiz.title }}</h3>
        <!-- index is used to check with current question index -->
        <div class="progressbar">
            <div class="progressbar progress-bar-striped active text-center" 
                style="background-color: green; margin: 0; color: white;"
                :style="{width: progress + '%'}">
            </div>
        </div>
        <div class="questionBox" v-for="(question, index) in quiz.questions" v-bind:key="question.id">
            <!-- Hide all questions, show only the one with index === to current question index -->
            <div v-show="index === questionIndex">
            <h4>{{ question.text }}</h4>
            <label class="answer" v-for="response in question.responses" v-bind:key="response.id">
                <!-- The radio button has three new directives -->
                <!-- v-bind:value sets "value" to "true" if the response is correct -->
                <!-- v-bind:name sets "name" to question index to group answers by question -->
                <!-- v-model creates binding with userResponses -->
                <input type="radio" 
                    v-bind:value="response.correct" 
                    v-bind:name="index" 
                    v-model="userResponses[index]"> {{response.text}}
            </label>
            <!-- The two navigation buttons -->
            <!-- Note: prev is hidden on first question -->
            <br>
            <button class="btn btn-primary questionBtn" v-if="questionIndex > 0" v-on:click="prev">
                Prethodno pitanje
            </button>
            <button class="btn btn-primary questionBtn" v-on:click="next">
                Sljedeće pitanje
            </button>
            </div>
        </div>
        <div v-show="questionIndex === quiz.questions.length">
            <h4>
             Provjera mogućnosti darivanja krvi je završena!
            </h4>
            <p id="message" class="message">
                {{ score() }}
                Hvala što ste riješili test. Savjetujemo da ne donirate krv. <br>Pročitajte informacije o tome tko može i ne može donirati na našoj stranici - O darivanju
            </p>
            <div class="bloodDrop" >
                <img id="bloodDrop" src="">
            </div>
        </div>
    </div>
</template>

<script>
var quiz = {
  title: 'Odgovorite na sljedeća pitanja kako biste saznali možete li donirati krv:',
  questions: [
    {text: "Jeste li mlađi od 18 godina?", responses: [{text: 'Da'}, {text: 'Ne', correct: true}, ]}, 
    {text: "Jeste li stariji od 75 godina?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Jeste li se tetovirali u zadnjih 6 mjeseci?", responses: [{text: 'Da'}, {text: 'Ne', correct: true}, ]}, 
    {text: "Jeste li trudni ili ste nedavno rodili?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Imate li problema sa srcem?", responses: [{text: 'Da'}, {text: 'Ne', correct: true}, ]}, 
    {text: "Imate li problema sa željezom u krvi?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Bolujete li od akutne ili kronične bolesti?", responses: [{text: 'Da'}, {text: 'Ne', correct: true}, ]}, 
    {text: "Jeste li u zadnjih mjesec dana koristili lijekove?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Jeste li boravili izvan države u zadnjih 6 mjeseci?", responses: [{text: 'Da'}, {text: 'Ne', correct: true}, ]}, 
    {text: "Jeste li konzumirali alkoholna pića u posljednjih 8 sati?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Jeste li imali operativne zahvate u posljednjih mjesec dana?", responses: [ {text: 'Da'},{text: 'Ne', correct: true}, ]},
    {text: "Bolujete li od ikakvih zloćudnih bolesti?", responses: [{text: 'Ne', correct: true}, {text: 'Da'}, ]},
    {text: "Bolujete li od šećerne bolesti?", responses: [ {text: 'Da'},{text: 'Ne', correct: true}, ]},
  ]
};
export default {
  data() {
    return {
        quiz: quiz,
        // Store current question index
        questionIndex: 0,
        // An array initialized with "false" values for each question
        // It means: "did the user answered correctly to the question n?" "no".
        userResponses: Array(quiz.questions.length).fill(false),
        progress: 0,
        message: "Hvala što ste riješili test. Savjetujemo da pokušate donirati krv i da se registrirate."
    }
  },
  // The view will trigger these methods on click
  methods: {
    // Go to next question
    next: function() {
      this.questionIndex++;
      this.progress = this.questionIndex/13*100
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
      this.progress = this.questionIndex/13*100
    },
    // Return "true" count in userResponses
    score: function() {
        if(this.questionIndex == this.quiz.questions.length) {
            if(this.userResponses.filter(function(val) { return val }).length >= 12) {
                document.getElementById("message").innerText = this.message
                document.getElementById("bloodDrop").src= require('../assets/can-donate.png');
            } else {
                document.getElementById("bloodDrop").src= require('../assets/cant-donate.png');
            }
        }
        return this.userResponses.filter(function(val) { return val }).length;
      
    }
  }
}
</script>

<style>
.checking {
    height: 700px;
    text-align: center;
}
.checking h3 {
    padding-top: 40px;
    margin-bottom: 40px;
    width: 50%;
    margin: 0 auto;
}
.progressbar {
    width: 50%;
    height: 10px;
    background-color: #eee;
    margin: 2em auto;
    transition: width 500ms;
}
.questionBox {
    width: 80%;
    margin: 0 auto;
}
.answer {
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 22px;
}
.questionBtn {
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
}
.message {
    font-size: 20px;
    font-weight: 500;
}
.bloodDrop {
    margin: 0 auto;
    width: 280px;
    height: 280px;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
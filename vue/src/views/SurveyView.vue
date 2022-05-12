<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-grey-900">
          {{ model.id ? model.title : "Create a survey" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  type="file"
                  @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!--/ Image -->
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <!--/ Title -->

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
              <div class="mt-1">
                <textarea id="description" name="description" v-model="model.description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Describe your survey" />
              </div>
            </div>
            <!--/ Description -->
            
            <!-- Expire Date -->
            <div>
              <label for="expire_date">
                <span class="block text-sm font-medium text-gray-700"> Expire Date </span>
              </label>
              <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <!--/ Expire Date -->

            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input type="checkbox" name="status" id="status" v-model="model.status" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700">
                  Active
                </label>
              </div>
            </div>
            <!--/ Status-->
        </div>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions
            <button
              type="button"
              @click="addQuestion()"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Add Question
            </button>
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any qustions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion" />    
          </div>
        </div>
        <!--/ Survey Fields-->
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
      </div>
      <!-- <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <div class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
          <img :src="model.image" alt="" class="w-full h-48 object-cover" />
          <h4 class="mt-4 text-lg font-bold">{{ model.title }}</h4>
          <div v-html="model.description" class="overflow-hidden flex-1"></div>
           -->
    </form>
  </PageComponent>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import store from "../store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

// import route from '../router';
const router = useRouter();
const route = useRoute();

// Create empty survey object
let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});

if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}


function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    model.value.image = reader.result;

    // The field to display here
    model.value.image_url = reader.result;
    ev.target.value = "";
  };
  console.log(model);

  reader.readAsDataURL(file);
  console.log(model);
}

function addQuestion(index){
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  }

  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question){
  model.value.questions = model.value.questions.filter(
    (q) => q !== question
  );
}

function questionChange(question){
  modal.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {
  store.dispatch("saveSurvey",  { ...model.value }).then(({data}) => {
    router.push({
      name: "SurveyView",
      params: {
        id: data.data.id,
      },
    })
  })
}


</script>

<style></style>

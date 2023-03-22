<template>
    <div class="container">
      <h1 class="title">Company Information</h1>
      <div class="form">
        <div class="field">
          <label class="label">Company Name</label>
          <div class="control">
            <input class="input" type="text" v-model="companyName">
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company Description</label>
          <div class="control">
            <textarea class="textarea" v-model="companyDescription"></textarea>
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company Social Media</label>
          <div class="control">
            <input class="input" type="text" v-model="companySocialMedia">
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company Phone</label>
          <div class="control">
            <input class="input" type="tel" v-model="companyPhone">
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company Website</label>
          <div class="control">
            <input class="input" type="url" v-model="companyWebsite">
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company Address</label>
          <div class="control">
            <textarea class="textarea" v-model="companyAddress"></textarea>
          </div>
        </div>
  
        <div class="field">
          <label class="label">Company R&amp;D</label>
          <div class="control">
            <input class="input" type="text" v-model="companyRAndD">
          </div>
        </div>
  
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">Submit</button>
          </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        companyName: '',
        companyDescription: '',
        companySocialMedia: '',
        companyPhone: '',
        companyWebsite: '',
        companyAddress: '',
        companyRAndD: ''
      }
    },
    methods: {
        
    }
  }
  </script>
  
  <style>
  .container {
    max-width: 800px;
  }
  .form {
    margin-bottom: 100px;
  }
  .title {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  </style>
  
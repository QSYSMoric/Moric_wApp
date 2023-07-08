<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup(){
  },
}
</script>

<style>
  html {
      overflow-y: scroll;
      box-sizing: border-box;
  }
  *,
  ::before,
  ::after {
      box-sizing: inherit;
  }
  :root{
      font-size: calc(0.5em + 1vw);
  }
  body {
  margin: 0;
  }
  div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p {
      padding: 0;
      margin: 0;
  }
  table,td,tr,th {
      font-size: 12px;
  }
  li {
      list-style-type: none;
  }
  img {
      vertical-align: top;
  border: 0;
  }
  ol,ul {
      list-style: none;
  }
  h1,h2,h3,h4,h5,h6 {
      font-size: 12px;
      font-weight: normal;
  }
  address,cite,code,em,th {
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
    font-family: "Luckiest";
    src: url("@/assets/fonts/LuckiestGuy.ttf") format('truetype');
  }
  @font-face {
    font-family: "IOS";
    src:url("@/assets/fonts/ios.ttf") format('truetype');
  }
  #app{
    width: 100%;
    height: 100vh;
  }
  @media(min-width: 600pt){
    #app{
      width: 100%;
      height: 100vh;
      padding: 0 10%;
    }
  }
</style>

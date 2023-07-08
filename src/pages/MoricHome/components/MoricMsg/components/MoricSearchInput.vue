<template>
    <div class="MoricSearchInput">
          <input type="text" title="search" placeholder=" 好友">
    </div>
  </template>
  
  <script>
  export default {
      name:"MoricSearchInput",
  }
  </script>
  
  <style scoped> 
      *{
          font-family: 'icomoon';
      }
      .MoricSearchInput{
          width: 100%;
          height: 28pt;
          margin: 5px 0;
          padding: 0 24px;
      }
      .MoricSearchInput input{
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 12pt;
          outline: none;
          border: none;
          /* color: #d2d0da; */
          background-color: #f0eff4;
          border-radius: 10px;
          text-indent: 1em;
      }
  </style>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/About">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: rgb(46, 46, 46);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(46, 46, 46);
  color: #cecece;
}

#nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.507);

  a {
    font-size: 1.3rem;
    color: #9f9f9f;
    padding-left: 1rem;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}

button{
  background: rgb(100, 100, 100);
  border: none;
  padding: 1rem;
  color: rgb(208, 208, 208);
  border-radius: 10px;
  font-size: 1.2rem;
}

button:hover{
  background: rgba(0, 0, 0, 0.473);
  color: white;
}
</style>

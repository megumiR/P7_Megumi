<template>
    <div class="header" >
      <img class="header__logo" alt="Groupomania logo" src="./../assets/icon-above-font.png" /> 
      <h1 class="header__title header__title--size">Groupomania chat{{title}}</h1>
    </div>
</template>


<script>
export default {
  name: 'HeaderLogo',
  props: {
    title: String
  },
  beforeMount() {
    console.log('it is before mount:)')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only        ./src/assets/icon-above-font.png   -->
<style scoped lang="scss">
.header{
    display: flex;
    justify-content: center;
    align-content: center;
    min-height: 3em;
    &__logo{
        display: inline-block;
        min-height: 3em;
        max-height: 11em;
        padding: 0;
        margin: 0 10px;
    }
    &__title{
        color: #787878;
        display: flex;
        align-self: center;
        &--size{
            max-height: 3em;
            font-style: bold;
        }
    }
    
}

</style>
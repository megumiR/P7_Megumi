<template>
    <div class="navLink ">
                    <!--
                <li v-for="linkname in linknames">
                <a :href="url" >
                    {{ linkname.text }}
                </a>
            </li>
            -->
            
        <li>
            <a :href="url">
                {{ text }}
            </a>
        </li>
    </div>
</template>

<script>
export default {
  name: 'NavLink',
  props: [
       'url', 'text'
  ]
  
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navLink{
    width: 33.3%;
    height: 3em;
    display: inline-flex;
    justify-content: center;
    align-content: center;
    font-size: 1.4em;

    
    background-color: #e9e9e9;
}
li {
  display: flex;
  margin: 10px;
  padding: 5px;
}
a {
  color: #fa3200;

}
</style>